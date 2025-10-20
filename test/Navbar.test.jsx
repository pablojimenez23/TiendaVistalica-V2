import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

const renderWithUser = (component) => {
  const usuarioMock = {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    correo: "juan@example.com",
    genero: "masculino"
  };
  
  localStorage.setItem('usuarioActivo', JSON.stringify(usuarioMock));
  
  return renderWithProviders(component);
};

describe("Componente Navbar", () => {
  beforeEach(() => {
    localStorage.clear();
  });

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

  it("muestra el nombre del usuario cuando está logueado", async () => {
    renderWithUser(<Navbar />);
    
    await waitFor(() => {
      const nombres = screen.getAllByText(/Juan Pérez/i);
      expect(nombres.length).toBeGreaterThan(0);
    });
  });

  it("muestra el dropdown del usuario cuando está logueado", async () => {
    renderWithUser(<Navbar />);
    
    await waitFor(() => {
      const dropdownButton = screen.getByRole("button", { name: /Juan Pérez/i });
      expect(dropdownButton).toBeInTheDocument();
    });
  });

  it("muestra el correo en el dropdown", async () => {
    renderWithUser(<Navbar />);
    
    await waitFor(() => {
      expect(screen.getByText("juan@example.com")).toBeInTheDocument();
    });
  });

  it("muestra el enlace a Mi Perfil cuando está logueado", async () => {
    renderWithUser(<Navbar />);
    
    await waitFor(() => {
      expect(screen.getByText("Mi Perfil")).toBeInTheDocument();
    });
  });

  it("muestra el enlace a Mis Pedidos cuando está logueado", async () => {
    renderWithUser(<Navbar />);
    
    await waitFor(() => {
      expect(screen.getByText("Mis Pedidos")).toBeInTheDocument();
    });
  });

  it("muestra el botón Cerrar Sesión cuando está logueado", async () => {
    renderWithUser(<Navbar />);
    
    await waitFor(() => {
      expect(screen.getByText("Cerrar Sesión")).toBeInTheDocument();
    });
  });

  it("no muestra el botón de usuario simple cuando está logueado", async () => {
    renderWithUser(<Navbar />);
    
    await waitFor(() => {
      const userSimpleButton = screen.queryByTitle("Usuario");
      expect(userSimpleButton).not.toBeInTheDocument();
    });
  });

  it("cierra sesión al hacer clic en Cerrar Sesión", async () => {
    renderWithUser(<Navbar />);
    
    await waitFor(() => {
      const cerrarSesionBtn = screen.getByText("Cerrar Sesión");
      fireEvent.click(cerrarSesionBtn);
    });
    
    await waitFor(() => {
      expect(localStorage.getItem('usuarioActivo')).toBeNull();
    });
  });

  it("el logo es clickeable", () => {
    renderWithProviders(<Navbar />);
    const logo = screen.getByAltText("Logo Vistalica");
    const logoLink = logo.closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it("los enlaces de navegación son clickeables", () => {
    renderWithProviders(<Navbar />);
    const inicioLink = screen.getByText("Inicio").closest('a');
    expect(inicioLink).toHaveAttribute('href', '/');
  });

  it("el badge del carrito no se muestra cuando está vacío", () => {
    renderWithProviders(<Navbar />);
    const badge = document.querySelector('.carrito-badge');
    expect(badge).not.toBeInTheDocument();
  });
});