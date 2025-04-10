// components/VoltarParaHome.tsx
import { useNavigate } from "react-router-dom";
import styles from "../styles/VoltarParaHome.module.css";
import { FaHome } from "react-icons/fa";

const VoltarParaHome = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/")} className={styles.voltarBtn}>
      <FaHome style={{ marginRight: "8px" }} />
      Voltar para Home
    </button>
  );
};

export default VoltarParaHome;

