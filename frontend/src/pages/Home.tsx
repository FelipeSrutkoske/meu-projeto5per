import { useNavigate } from "react-router-dom";
import { FaTruckMoving } from "react-icons/fa";
import styles from "../styles/Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  const irParaCatalogo = () => {
    navigate("/catalogoCaminhao");
  };

  const irParaLogin = () => {
    navigate("/login");
  };

  const irParaCadastro = () => {
    navigate("/cadastro");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <h1 className={styles.titulo}>
          <FaTruckMoving className={styles.icon} />
          Empreendize Truck Aluguel
        </h1>
        <p className={styles.descricao}>
          Bem-vindo ao nosso sistema de aluguel de caminhões!
          Aqui você pode encontrar veículos prontos para atender às suas necessidades de transporte com segurança, agilidade e preço justo.
        </p>
        <div className={styles.botoes}>
          <button className={styles.btn} onClick={irParaCatalogo}>
            Ver Caminhões Disponíveis
          </button>
          <button className={styles.btnSecundario} onClick={irParaLogin}>
            Login
          </button>
          <button className={styles.btnSecundario} onClick={irParaCadastro}>
            Cadastro
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
