import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { calcularPrecoPorDia } from "../utils/caminhaoUtils";
import styles from '../styles/AlugarCaminhao.module.css';

interface Caminhao {
  modelo: string;
  ano: number;
  precoPorDia?: number;
}

const AlugarCaminhao = () => {
  const { idcaminhao } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    idusuario: "",
    idcaminhao: idcaminhao || "",
    dataInicio: "",
    dataFim: "",
    valorTotal: ""
  });

  const [caminhaoInfo, setCaminhaoInfo] = useState<Caminhao | null>(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (idcaminhao) {
      setFormData((prev) => ({ ...prev, idcaminhao }));

      const fetchCaminhao = async () => {
        try {
          const response = await fetch(`http://localhost:3000/caminhoes/${idcaminhao}`);
          if (response.ok) {
            const data = await response.json();
            const precoPorDiaCalculado = calcularPrecoPorDia(data.ano);
            setCaminhaoInfo({ ...data, precoPorDia: precoPorDiaCalculado });
          } else {
            setMensagem("Erro ao buscar informações do caminhão.");
          }
        } catch (error) {
          console.error(error);
          setMensagem("Erro ao conectar com o servidor.");
        }
      };

      fetchCaminhao();
    }
  }, [idcaminhao]);

  useEffect(() => {
    const calcularValorTotal = () => {
      const { dataInicio, dataFim } = formData;
      if (dataInicio && dataFim && caminhaoInfo?.precoPorDia) {
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        const diffDias = (fim.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24);

        if (diffDias > 0) {
          const valor = diffDias * caminhaoInfo.precoPorDia;
          setFormData((prev) => ({
            ...prev,
            valorTotal: valor.toFixed(2)
          }));
        }
      }
    };

    calcularValorTotal();
  }, [formData.dataInicio, formData.dataFim, caminhaoInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/aluguel/novo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMensagem("Aluguel realizado com sucesso!");
        setTimeout(() => {
          setMensagem("");
          navigate("/catalogoCaminhao");
        }, 2000);
      } else {
        const erro = await response.json();
        setMensagem(erro.erro || "Erro ao realizar aluguel.");
      }
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h2 className={styles.title}>Alugar Caminhão</h2>
        {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
  
        {caminhaoInfo && (
          <div className={styles.caminhaoInfo}>
            <h3>{caminhaoInfo.modelo}</h3>
            <p>Ano: {caminhaoInfo.ano}</p>
            <p>Preço por Dia: R$ {caminhaoInfo.precoPorDia?.toFixed(2)}</p>
          </div>
        )}
  
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="idusuario"
            placeholder="ID do Usuário"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="idcaminhao"
            value={formData.idcaminhao}
            readOnly
          />
          <input type="date" name="dataInicio" onChange={handleChange} required />
          <input type="date" name="dataFim" onChange={handleChange} required />
          <input
            type="text"
            name="valorTotal"
            value={formData.valorTotal}
            readOnly
          />
          <button type="submit">Alugar</button>
        </form>
      </div>
    </div>
  );
  
};

export default AlugarCaminhao;
