import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Cadastro.module.css";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    cpf: "",
    senha: "",
    confirmarSenha: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/usuarios/novoUsuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          sobrenome: formData.sobrenome,
          email: formData.email,
          senha: formData.senha,
          cpf: formData.cpf,
        }),
      });

      const resultado = await response.text();

      if (!response.ok) {
        if (resultado.includes("email")) {
          toast.error("Este email já está cadastrado.");
        } else if (resultado.includes("cpf")) {
          toast.error("Este CPF já está cadastrado.");
        } else {
          toast.error(resultado || "Erro ao cadastrar.");
        }
        return;
      }

      toast.success("Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.titulo}>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit} className={styles.card}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="sobrenome"
          placeholder="Sobrenome"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmarSenha"
          placeholder="Confirmar Senha"
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.btn}>
          Cadastrar
        </button>
      </form>

      <button onClick={() => navigate("/login")} className={styles.voltarBtn}>
        Voltar
      </button>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Cadastro;


