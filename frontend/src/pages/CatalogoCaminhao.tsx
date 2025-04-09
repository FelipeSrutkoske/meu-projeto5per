import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/CatalogoCaminhao.module.css";
import { FiTruck } from "react-icons/fi";
import { calcularPrecoPorDia } from "../utils/caminhaoUtils";



interface Caminhao {
  idcaminhao: number;
  modelo: string;
  placa: string;
  ano: number;
  ipvaPago: boolean;
  precoPorKm?: number;
}

const CatalogoCaminhao = () => {
  const [caminhoes, setCaminhoes] = useState<Caminhao[]>([]);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCaminhoes = async () => {
      try {
        const response = await fetch("http://localhost:3000/caminhoes");
        if (response.ok) {
          const data = await response.json();
          setCaminhoes(data);
        } else {
          setMensagem("Erro ao buscar caminhões.");
        }
      } catch (error) {
        console.error(error);
        setMensagem("Erro ao conectar com o servidor.");
      }
    };

    fetchCaminhoes();
  }, []);

  const voltarParaHome = () => {
    navigate("/home");
  };

  return (
    <div className={styles.background}>
      <div className={styles.pageContainer}>
        <h2 className={styles.title}>Catálogo de Caminhões</h2>
        {mensagem && <p className={styles.mensagem}>{mensagem}</p>}

        <div className={styles.grid}>
          {caminhoes.map((caminhao) => (
            <div key={caminhao.idcaminhao} className={styles.card}>
              <FiTruck size={40} style={{ color: "#555", marginBottom: "10px" }} />
              <h3>{caminhao.modelo}</h3>
              <p>Placa: {caminhao.placa}</p>
              <p>Ano: {caminhao.ano}</p>
              <p>IPVA Pago: {caminhao.ipvaPago ? "Sim" : "Não"}</p>
              <p>Preço por dia: R$ {calcularPrecoPorDia(caminhao.ano)}</p>
              <button
                className={styles.button}
                onClick={() => navigate(`/alugarCaminhao/${caminhao.idcaminhao}`)}
              >
                Alugar
              </button>
            </div>
          ))}
        </div>

        <button onClick={voltarParaHome} className={styles.voltar}>
          Voltar para Home
        </button>
      </div>
    </div>
  );
};

export default CatalogoCaminhao;



