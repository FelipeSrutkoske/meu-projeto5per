import { gravaNovoUsuario } from "../../Controllers/Usuario";
import { UsuarioDAO } from "../../DAO/usuario";

// Mock da DAO para evitar acesso ao banco de dados real
jest.mock("../../DAO/usuario");

describe("Testes do Controller de Usuário", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar erro para email inválido", async () => {
    const resposta = await gravaNovoUsuario({
      nome: "João",
      sobrenome: "Silva",
      email: "emailinvalido",
      senha: "Senha@123",
      cpf: "12345678900"
    });

    expect(resposta).toBe("Email inválido");
  });

  it("deve retornar erro para CPF inválido", async () => {
    const resposta = await gravaNovoUsuario({
      nome: "Maria",
      sobrenome: "Souza",
      email: "maria@example.com",
      senha: "Senha@123",
      cpf: "123"
    });

    expect(resposta).toBe("CPF inválido");
  });

  it("deve retornar erro para senha fraca", async () => {
    const resposta = await gravaNovoUsuario({
      nome: "Pedro",
      sobrenome: "Santos",
      email: "pedro@example.com",
      senha: "fraca",
      cpf: "12345678900"
    });

    expect(resposta).toBe("Senha fraca");
  });

  it("deve cadastrar usuário com sucesso", async () => {
    (UsuarioDAO.gravaNovoUsuario as jest.Mock).mockResolvedValue("Usuário cadastrado com sucesso");

    const resposta = await gravaNovoUsuario({
      nome: "Ana",
      sobrenome: "Lima",
      email: "ana@example.com",
      senha: "Senha@123",
      cpf: "12345678900"
    });

    expect(resposta).toBe("Usuário cadastrado com sucesso");
  });
});
