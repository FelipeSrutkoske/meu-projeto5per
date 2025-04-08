import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h2>Catálogo de Caminhões</h2>
      {mensagem && <p>{mensagem}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {caminhoes.map((caminhao) => (
          <div
            key={caminhao.idcaminhao}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
            }}
          >
            {/* Imagem virá depois */}
            <h3>{caminhao.modelo}</h3>
            <p>Placa: {caminhao.placa}</p>
            <p>Ano: {caminhao.ano}</p>
            <p>IPVA Pago: {caminhao.ipvaPago ? "Sim" : "Não"}</p>
            <p>Preço por Km: R$ {caminhao.precoPorKm ?? "?"}</p>
            <button
              onClick={() =>
                navigate(`/alugarCaminhao/${caminhao.idcaminhao}`)
              }
            >
              Alugar
            </button>
          </div>
        ))}
      </div>

      <button onClick={voltarParaHome} style={{ marginTop: "20px" }}>
        Voltar para Home
      </button>
    </div>
  );
};

export default CatalogoCaminhao;

