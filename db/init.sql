CREATE TABLE IF NOT EXISTS caminhao (
    idcaminhao INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(255) NOT NULL,
    placa VARCHAR(20) NOT NULL,
    ano VARCHAR(4) NOT NULL,
    ipvaPago BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS usuario (
    idusuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE
);


CREATE TABLE IF NOT EXISTS aluguel (
    idaluguel INT AUTO_INCREMENT PRIMARY KEY,
    idusuario INT NOT NULL,
    idcaminhao INT NOT NULL,
    dataInicio DATE NOT NULL,
    dataFim DATE NOT NULL,
    valorTotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (idusuario) REFERENCES usuario(idusuario) ON DELETE CASCADE,
    FOREIGN KEY (idcaminhao) REFERENCES caminhao(idcaminhao) ON DELETE CASCADE
); 