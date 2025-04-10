import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/EditaUsuario.module.css"; // Importando o CSS module

export default function EditarUsuario() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
  });
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMensagem("Você precisa estar logado para acessar essa página.");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    fetch("http://localhost:3000/usuarios", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.status === 403 || res.status === 401) {
          throw new Error("Token inválido ou expirado");
        }

        const data = await res.json();
        setFormData({
          nome: data.nome,
          sobrenome: data.sobrenome,
          cpf: data.cpf,
        });
      })
      .catch((err) => {
        console.error("Erro ao carregar dados:", err);
        setMensagem("Sessão expirada. Faça login novamente.");
        localStorage.removeItem("token");
        setTimeout(() => navigate("/login"), 2000);
      });
  }, [navigate]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/usuarios/atualizaUsuario", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem("Usuário atualizado com sucesso!");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setMensagem(data.erro || "Erro ao atualizar usuário");
      }
    } catch (error) {
      console.error(error);
      setMensagem("Erro de rede");
    }
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.editarCard}>
          <h2 className={styles.editarTitulo}>Editar Perfil</h2>
          {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Nome"
              required
            />
            <input
              className={styles.input}
              type="text"
              name="sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
              placeholder="Sobrenome"
              required
            />
            <input
              className={styles.input}
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="CPF"
              required
            />
            <button type="submit" className={styles.button}>
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
