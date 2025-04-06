export class CaminhaoDTO {
    idcaminhao: number | null;
    modelo: string;
    placa: string;
    ano: string;
    ipvaPago: boolean;
  
    constructor(
      idcaminhao: number | null,
      modelo: string,
      placa: string,
      ano: string,
      ipvaPago: boolean
    ) {
      this.idcaminhao = idcaminhao;
      this.modelo = modelo;
      this.placa = placa;
      this.ano = ano;
      this.ipvaPago = ipvaPago;
    }
  }
  