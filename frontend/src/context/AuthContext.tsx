import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// Tipagem do usuário
interface Usuario {
  id: number;
  email: string;
  nome: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (token: string, usuario: Usuario) => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    // Tenta carregar o usuário do localStorage, se tiver
    const usuarioSalvo = localStorage.getItem("usuario");
    if (token && usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, [token]);

  const login = (novoToken: string, usuario: Usuario) => {
    setToken(novoToken);
    setUsuario(usuario);
    localStorage.setItem("token", novoToken);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    navigate("/dashboard"); // Redireciona para área logada
  };

  const logout = () => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para facilitar o uso do contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro do AuthProvider");
  return context;
};
