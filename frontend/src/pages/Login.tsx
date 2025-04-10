import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Login.module.css";
import api from "../services/api";
import VoltarParaHome from "../components/VoltarParaHome";

//                                                                  {Componente de Login - Página principal que lida com autenticação de usuário}                                                                       //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------- //
const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erroLogin, setErroLogin] = useState(""); 
  const navigate = useNavigate();

  //                                                                  {Validar Email com Regex para garantir formato válido}                                                                       //
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------- //
  const validarEmail = (email: string) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  //                                                                  {Função responsável por lidar com o envio do formulário de login e autenticar o usuário via API}                                                                       //
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------- //
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarEmail(email)) {
      toast.error("E-mail inválido.");
      setErroLogin("E-mail inválido."); 
      return;
    }

    setCarregando(true);
    setErroLogin(""); 

    try {
      const resposta = await api.post("/usuarios/login", { email, senha });
      localStorage.setItem("token", resposta.data.token);
      toast.success("Login realizado com sucesso!");
      setTimeout(() => navigate("/catalogoCaminhao"), 1500);
    } catch (err: any) {
      const mensagemErro = err.response?.data?.erro || "Erro ao fazer login";
      toast.error(mensagemErro);
      setErroLogin(mensagemErro); 
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
