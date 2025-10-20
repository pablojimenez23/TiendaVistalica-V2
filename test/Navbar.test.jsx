import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../src/Componentes/Navbar";
import { AuthProvider } from "../src/Componentes/AuthContext";
import { CarritoProvider } from "../src/Componentes/Carrito";

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <CarritoProvider>
          {component}
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe("Componente Navbar", () => {
  it("renderiza el logo correctamente", () => {
    renderWithProviders(<Navbar />);
    const logo = screen.getByAltText("Logo Vistalica");
    expect(logo).toBeInTheDocument();
  });

  it("contiene los enlaces principales de navegación", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Catálogo")).toBeInTheDocument();
    expect(screen.getByText("Historia")).toBeInTheDocument();
    expect(screen.getByText("Impacto")).toBeInTheDocument();
    expect(screen.getByText("Contacto")).toBeInTheDocument();
  });

  it("muestra el campo de búsqueda", () => {
    renderWithProviders(<Navbar />);
    const searchInput = screen.getByPlaceholderText("Buscar productos...");
    expect(searchInput).toBeInTheDocument();
  });

  it("muestra el botón de búsqueda", () => {
    renderWithProviders(<Navbar />);
    const searchButton = screen.getByTitle("Buscar");
    expect(searchButton).toBeInTheDocument();
  });

  it("muestra el botón del carrito", () => {
    renderWithProviders(<Navbar />);
    const carritoButton = screen.getByTitle("Carrito de compras");
    expect(carritoButton).toBeInTheDocument();
  });

  it("muestra el botón de usuario cuando no hay sesión iniciada", () => {
    renderWithProviders(<Navbar />);
    const userButton = screen.getByTitle("Usuario");
    expect(userButton).toBeInTheDocument();
  });

  it("permite escribir en el campo de búsqueda", () => {
    renderWithProviders(<Navbar />);
    const searchInput = screen.getByPlaceholderText("Buscar productos...");
    fireEvent.change(searchInput, { target: { value: "sweater" } });
    expect(searchInput.value).toBe("sweater");
  });
});