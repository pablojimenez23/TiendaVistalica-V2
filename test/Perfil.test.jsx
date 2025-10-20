import React from "react";
import { render, screen } from "@testing-library/react";
import Perfil from "../src/Componentes/Perfil";
import { useAuth } from "../src/Componentes/AuthContext";
import { useNavigate } from "react-router-dom";

vi.mock("../src/Componentes/AuthContext");
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn()
}));

describe("Perfil", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(navigateMock);
  });

  it("redirige al login si no hay usuario y no se está cargando", () => {
    useAuth.mockReturnValue({ usuario: null, cargando: false });
    render(<Perfil />);
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  it("muestra cargando mientras cargan los datos", () => {
    useAuth.mockReturnValue({ usuario: null, cargando: true });
    render(<Perfil />);
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
  });

  it("muestra información del usuario cuando está autenticado", () => {
    useAuth.mockReturnValue({
      usuario: { 
        nombre: "Pablo", apellido: "Jimenez", correo: "pablo@mail.com", genero: "Masculino" 
      },
      cargando: false
    });

    render(<Perfil />);
    expect(screen.getByText(/Pablo/)).toBeInTheDocument();
    expect(screen.getByText(/Jimenez/)).toBeInTheDocument();
    expect(screen.getByText(/pablo@mail.com/)).toBeInTheDocument();
    expect(screen.getByText(/Masculino/)).toBeInTheDocument();
  });
});
