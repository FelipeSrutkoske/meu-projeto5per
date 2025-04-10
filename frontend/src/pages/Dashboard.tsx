//                                                                  Dashboard.tsx - Visualização de Usuário com Estilo Cartoonsco Colorido                                                                //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Dashboard.module.css";
import api from "../services/api";


const Dashboard = () => {
  const [usuario, setUsuario] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const resposta = await api.get("/usuarios/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsuario(resposta.data);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        navigate("/login");
      }
    };

    fetchUsuario();
  }, []);

  if (!usuario) {
    return <p style={{ textAlign: "center" }}>Carregando informações do usuário...</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.background}></div>

      <div className={styles.container}>
        <h2 className={styles.title}>Bem-vindo, {usuario.nome}!</h2>

        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>Nome:</span>
          <span className={styles.infoValue}>{usuario.nome}</span>

          <span className={styles.infoLabel}>Sobrenome:</span>
          <span className={styles.infoValue}>{usuario.sobrenome}</span>

          <span className={styles.infoLabel}>Email:</span>
          <span className={styles.infoValue}>{usuario.email}</span>

          <span className={styles.infoLabel}>CPF:</span>
          <span className={styles.infoValue}>{usuario.cpf}</span>

          <span className={styles.infoLabel}>ID do Usuário:</span>
          <span className={styles.infoValue}>{usuario.idusuario}</span>
        </div>

        <button className={styles.voltarBtn} onClick={() => navigate("/")}>
          Voltar
        </button>
        <button className={styles.voltarBtn} onClick={() => navigate("/editausuario")}>
          Atualizar Usuário
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
