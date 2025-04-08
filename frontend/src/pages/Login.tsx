import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Login.module.css";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const validarEmail = (email: string) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarEmail(email)) {
      toast.error("E-mail inválido.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await api.post("/usuarios/login", { email, senha });
      localStorage.setItem("token", resposta.data.token);
      toast.success("Login realizado com sucesso!");
      setTimeout(() => navigate("/home"), 1500);
    } catch (err: any) {
      toast.error(err.response?.data?.erro || "Erro ao fazer login");
    } finally {
      setCarregando(false);
    }
  };

  const voltarParaHome = () => {
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <FaUserCircle className={styles.icon} />
        <h2 className={styles.title}>Login</h2>

        <form onSubmit={handleLogin} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit" className={styles.button} disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <button onClick={voltarParaHome} className={styles.secondaryButton}>
          Voltar para Home
        </button>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Login;



