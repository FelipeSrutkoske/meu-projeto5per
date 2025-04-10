import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Login.module.css";
import api from "../services/api";
import VoltarParaHome from "../components/VoltarParaHome";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erroLogin, setErroLogin] = useState(""); // <- Novo estado para exibir o erro
  const navigate = useNavigate();

  const validarEmail = (email: string) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarEmail(email)) {
      toast.error("E-mail inválido.");
      setErroLogin("E-mail inválido."); // <- Define o erro no estado
      return;
    }

    setCarregando(true);
    setErroLogin(""); // <- Limpa qualquer erro anterior antes de tentar login

    try {
      const resposta = await api.post("/usuarios/login", { email, senha });
      localStorage.setItem("token", resposta.data.token);
      toast.success("Login realizado com sucesso!");
      setTimeout(() => navigate("/catalogoCaminhao"), 1500);
    } catch (err: any) {
      const mensagemErro = err.response?.data?.erro || "Erro ao fazer login";
      toast.error(mensagemErro);
      setErroLogin(mensagemErro); // <- Mostra o erro também na interface
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={styles.background}>
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

            {/* Exibe a mensagem de erro na interface caso ocorra */}
            {erroLogin && <p className={styles.erro}>{erroLogin}</p>}
          </form>

          <VoltarParaHome />
        </div>

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default Login;
