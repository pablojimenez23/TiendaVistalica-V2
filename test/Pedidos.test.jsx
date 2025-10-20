import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pedidos from "../src/Componentes/Pedidos";
import { useAuth } from "../src/Componentes/AuthContext";
import { useNavigate } from "react-router-dom";

vi.mock("../src/Componentes/AuthContext");
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("Componente Pedidos", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(navigateMock);
  });

  it("redirige al login si el usuario no está autenticado", () => {
    useAuth.mockReturnValue({ usuario: null, cargando: false });

    render(<Pedidos />);
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  it("muestra mensaje cuando no hay pedidos", () => {
    useAuth.mockReturnValue({ usuario: { id: 1, nombre: "Pablo" }, cargando: false, obtenerPedidosUsuario: () => [] });

    render(<Pedidos />);
    
    expect(screen.getByText(/No tienes pedidos aún/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Ir al Catálogo/i })).toBeInTheDocument();
  });

  it("redirige al catálogo al hacer click en el botón", () => {
    useAuth.mockReturnValue({ usuario: { id: 1, nombre: "Pablo" }, cargando: false, obtenerPedidosUsuario: () => [] });

    render(<Pedidos />);
    fireEvent.click(screen.getByRole("button", { name: /Ir al Catálogo/i }));
    
    expect(navigateMock).toHaveBeenCalledWith("/catalogo");
  });

  it("muestra la lista de pedidos cuando hay pedidos", () => {
    const pedidosMock = [
      {
        id: 101,
        fecha: "2025-10-20T12:00:00Z",
        estado: "Pendiente",
        total: 10000,
        productos: [
          { nombre: "Sweater", cantidad: 1, precio: 5000, imagen: "/Imagenes/Imagen Sweater.jpg" },
          { nombre: "Pantalón", cantidad: 1, precio: 5000, imagen: "/Imagenes/Jeans Urbanos.jpg" }
        ]
      }
    ];

    useAuth.mockReturnValue({ usuario: { id: 1, nombre: "Pablo" }, cargando: false, obtenerPedidosUsuario: () => pedidosMock });

    render(<Pedidos />);

    expect(screen.getByText(/Pedido #101/i)).toBeInTheDocument();
    expect(screen.getByText(/Sweater/i)).toBeInTheDocument();
    expect(screen.getByText(/Pantalón/i)).toBeInTheDocument();
    expect(screen.getByText(/\$10\.000/i)).toBeInTheDocument();
    expect(screen.getByText(/Pendiente/i)).toBeInTheDocument();
  });

  it("muestra cargando mientras cargan los pedidos", () => {
    useAuth.mockReturnValue({ usuario: null, cargando: true });

    render(<Pedidos />);
    expect(screen.getByText(/Cargando pedidos.../i)).toBeInTheDocument();
  });
});
