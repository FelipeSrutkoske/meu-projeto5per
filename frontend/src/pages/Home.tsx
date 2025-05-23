import { useNavigate } from "react-router-dom";
import { FaTruckMoving } from "react-icons/fa";
import styles from "../styles/Home.module.css";

//                                                                  {Componente da Home - Página inicial com navegação para login, cadastro e catálogo}                                                                       //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------- //
const Home = () => {
  const navigate = useNavigate();

  //                                                                  {Redireciona o usuário para a página de catálogo de caminhões}                                                                       //
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------- //
  const irParaCatalogo = () => {
    navigate("/catalogoCaminhao");
  };

  //                                                                  {Redireciona o usuário para a página de login}                                                                       //
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------- //
  const irParaLogin = () => {
    navigate("/login");
  };

  //                                                                  {Redireciona o usuário para a página de cadastro}                                                                       //
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------- //
  const irParaCadastro = () => {
    navigate("/cadastro");
  };

  //                                                                  {Redireciona o usuário para a página de dashboard}                                                                       //
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------- //
  const irParaDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className={styles.background}>
      <div className={styles.pageContainer}>
        <div className={styles.card}>
          <h1 className={styles.titulo}>
            <FaTruckMoving className={styles.icon} />
            Empreendize Truck Fretes
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
            <button className={styles.btnSecundario} onClick={irParaDashboard}>
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
