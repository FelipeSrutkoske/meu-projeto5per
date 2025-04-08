//import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const irParaCatalogo = () => {
    navigate("/catalogoCaminhao");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Empreendize Truck Aluguel</h1>
      <p>
        Bem-vindo ao nosso sistema de aluguel de caminhões!  
        Aqui você pode encontrar veículos prontos para atender às suas necessidades de transporte com segurança, agilidade e preço justo.
      </p>

      <button onClick={irParaCatalogo} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Ver Caminhões Disponíveis
      </button>
    </div>
  );
};

export default Home;
