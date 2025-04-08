export const calcularPrecoPorDia = (ano: number): number => {
    const anoAtual = new Date().getFullYear();
    const idade = anoAtual - ano;
  
    const precoBase = 200; // valor para caminhão 0km
    const descontoPorAno = 10; // quanto mais velho, mais barato
  
    const precoFinal = precoBase - idade * descontoPorAno;
  
    return precoFinal > 50 ? precoFinal : 50; // valor mínimo de R$50/dia
  };
  