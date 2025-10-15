import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Carrito, { CarritoProvider, useCarrito } from "../src/Componentes/Carrito";
import { useAuth } from "../src/Componentes/AuthContext";

vi.mock("../src/Componentes/AuthContext", () => ({
  useAuth: vi.fn()
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

const renderConProvider = (ui) => {
  return render(<CarritoProvider>{ui}</CarritoProvider>, { wrapper: MemoryRouter });
};

const productoPrueba = {
  id: 1,
  nombre: "Producto 1",
  precio: "$10.000",
  imagen: "imagen.jpg"
};

const TestAgregarProducto = () => {
  const { agregarProducto, toggleCarrito } = useCarrito();
  return (
    <>
      <button onClick={() => agregarProducto(productoPrueba)}>Agregar</button>
      <button onClick={toggleCarrito}>Abrir Carrito</button>
    </>
  );
};

describe("Componente Carrito", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    localStorage.clear();
  });

  it("muestra carrito vacío al iniciar", () => {
    useAuth.mockReturnValue({ usuario: null });
    renderConProvider(<Carrito />);
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
  });

  it("agrega producto al carrito y actualiza cantidad total", () => {
    useAuth.mockReturnValue({ usuario: null });
    renderConProvider(
      <>
        <TestAgregarProducto />
        <Carrito />
      </>
    );

    fireEvent.click(screen.getByText(/agregar/i));
    fireEvent.click(screen.getByText(/abrir carrito/i));

    expect(screen.getByText(productoPrueba.nombre)).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("incrementa y decrementa cantidad de un producto", () => {
    useAuth.mockReturnValue({ usuario: null });
    renderConProvider(
      <>
        <TestAgregarProducto />
        <Carrito />
      </>
    );

    fireEvent.click(screen.getByText(/agregar/i));
    fireEvent.click(screen.getByText(/abrir carrito/i));

    const botonIncrementar = screen.getByText("+");
    const botonDecrementar = screen.getByText("-");

    fireEvent.click(botonIncrementar);
    expect(screen.getByText("2")).toBeInTheDocument();

    fireEvent.click(botonDecrementar);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("elimina un producto del carrito", () => {
    useAuth.mockReturnValue({ usuario: null });
    renderConProvider(
      <>
        <TestAgregarProducto />
        <Carrito />
      </>
    );

    fireEvent.click(screen.getByText(/agregar/i));
    fireEvent.click(screen.getByText(/abrir carrito/i));

    const botonEliminar = screen.getByTitle(/eliminar producto/i);
    fireEvent.click(botonEliminar);

    expect(screen.queryByText(productoPrueba.nombre)).not.toBeInTheDocument();
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
  });

  it("vacía el carrito con botón Vaciar", () => {
    useAuth.mockReturnValue({ usuario: null });
    renderConProvider(
      <>
        <TestAgregarProducto />
        <Carrito />
      </>
    );

    fireEvent.click(screen.getByText(/agregar/i));
    fireEvent.click(screen.getByText(/abrir carrito/i));
    fireEvent.click(screen.getByText(/vaciar/i));

    expect(screen.queryByText(productoPrueba.nombre)).not.toBeInTheDocument();
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
  });

  it("checkout sin usuario muestra alerta y redirige al login", () => {
    useAuth.mockReturnValue({ usuario: null });
    renderConProvider(
      <>
        <TestAgregarProducto />
        <Carrito />
      </>
    );

    fireEvent.click(screen.getByText(/agregar/i));
    fireEvent.click(screen.getByText(/abrir carrito/i));

    const botonFinalizar = screen.getByText(/finalizar compra/i);
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    fireEvent.click(botonFinalizar);

    expect(alertMock).toHaveBeenCalledWith(
      "Debes iniciar sesión para poder finalizar tu compra"
    );
    expect(mockNavigate).toHaveBeenCalledWith("/login");

    alertMock.mockRestore();
  });

  it("checkout con usuario vacía carrito y muestra alerta", () => {
    useAuth.mockReturnValue({ usuario: { nombre: "Test" } });
    renderConProvider(
      <>
        <TestAgregarProducto />
        <Carrito />
      </>
    );

    fireEvent.click(screen.getByText(/agregar/i));
    fireEvent.click(screen.getByText(/abrir carrito/i));

    const botonFinalizar = screen.getByText(/finalizar compra/i);
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    fireEvent.click(botonFinalizar);

    expect(alertMock).toHaveBeenCalledWith(expect.stringContaining("Procesando compra por"));
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();

    alertMock.mockRestore();
  });
});
