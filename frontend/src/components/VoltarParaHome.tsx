//import React from "react";
import { useNavigate } from "react-router-dom";

const VoltarParaHome = () => {
  const navigate = useNavigate();

  const irParaHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <h2>Página de Navegação</h2>
      <button onClick={irParaHome}>Voltar para Home</button>
    </div>
  );
};

export default VoltarParaHome;
