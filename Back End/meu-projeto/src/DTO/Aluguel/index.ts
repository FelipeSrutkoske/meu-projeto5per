export class AluguelDTO {
    idaluguel: number | null;
    idusuario: number;
    idcaminhao: number;
    dataInicio: string;
    dataFim: string;
    valorTotal: number;
  
    constructor(
      idaluguel: number | null,
      idusuario: number,
      idcaminhao: number,
      dataInicio: string,
      dataFim: string,
      valorTotal: number
    ) {
      this.idaluguel = idaluguel;
      this.idusuario = idusuario;
      this.idcaminhao = idcaminhao;
      this.dataInicio = dataInicio;
      this.dataFim = dataFim;
      this.valorTotal = valorTotal;
    }
  }
  