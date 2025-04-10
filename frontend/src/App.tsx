import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from './pages/Cadastro';
import CatalogoCaminhao from './pages/CatalogoCaminhao';
import Home from "./pages/Home";
import AlugarCaminhao from "./pages/AlugarCaminhao";
import EditaUsuario from "./pages/EditaUsuario";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/alugarCaminhao/:idcaminhao" element={<AlugarCaminhao />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/catalogoCaminhao" element={<CatalogoCaminhao />} />
        <Route path="/editaUsuario" element={<EditaUsuario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


