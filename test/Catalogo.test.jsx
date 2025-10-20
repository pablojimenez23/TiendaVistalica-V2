import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Catalogo from "../src/Componentes/Catalogo";
import { CarritoProvider } from "../src/Componentes/Carrito";

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <CarritoProvider>
        {component}
      </CarritoProvider>
    </BrowserRouter>
  );
};

describe("Componente Catalogo", () => {
  it("renderiza el título correctamente", () => {
    renderWithProviders(<Catalogo />);
    expect(screen.getByText("Catálogo de Productos")).toBeInTheDocument();
  });

  it("contiene el texto introductorio", () => {
    renderWithProviders(<Catalogo />);
    expect(
      screen.getByText(/Explora nuestra selección de ropa/i)
    ).toBeInTheDocument();
  });

  it("muestra todos los botones de filtro", () => {
    renderWithProviders(<Catalogo />);
    expect(screen.getByRole("button", { name: /todos/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sweater y polerones/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /pantalones/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /vestidos/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /zapatillas/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /carteras/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /accesorios/i })).toBeInTheDocument();
  });

  it("el botón Todos está activo por defecto", () => {
    renderWithProviders(<Catalogo />);
    const botonTodos = screen.getByRole("button", { name: /todos/i });
    expect(botonTodos).toHaveClass("active");
  });

  it("muestra productos al renderizar", () => {
    renderWithProviders(<Catalogo />);
    expect(screen.getByText("Sweater Clásico")).toBeInTheDocument();
    expect(screen.getByText("Pantalón Casual")).toBeInTheDocument();
  });

  it("filtra productos al hacer clic en Sweater y Polerones", () => {
    renderWithProviders(<Catalogo />);
    
    const botonSweater = screen.getByRole("button", { name: /sweater y polerones/i });
    fireEvent.click(botonSweater);
    
    expect(botonSweater).toHaveClass("active");
    expect(screen.getByText("Sweater Clásico")).toBeInTheDocument();
    expect(screen.getByText("Polerón Deportivo")).toBeInTheDocument();
    expect(screen.getByText("Sweater Moderno")).toBeInTheDocument();
  });

  it("filtra productos al hacer clic en Pantalones", () => {
    renderWithProviders(<Catalogo />);
    
    const botonPantalones = screen.getByRole("button", { name: /pantalones/i });
    fireEvent.click(botonPantalones);
    
    expect(botonPantalones).toHaveClass("active");
    expect(screen.getByText("Pantalón Casual")).toBeInTheDocument();
    expect(screen.getByText("Jeans Clásico")).toBeInTheDocument();
    expect(screen.getByText("Pantalón Formal")).toBeInTheDocument();
  });

  it("filtra productos al hacer clic en Vestidos", () => {
    renderWithProviders(<Catalogo />);
    
    const botonVestidos = screen.getByRole("button", { name: /vestidos/i });
    fireEvent.click(botonVestidos);
    
    expect(botonVestidos).toHaveClass("active");
    expect(screen.getByText("Vestido Casual")).toBeInTheDocument();
    expect(screen.getByText("Vestido de Noche")).toBeInTheDocument();
    expect(screen.getByText("Vestido Verano")).toBeInTheDocument();
  });

  it("filtra productos al hacer clic en Zapatillas", () => {
    renderWithProviders(<Catalogo />);
    
    const botonZapatillas = screen.getByRole("button", { name: /zapatillas/i });
    fireEvent.click(botonZapatillas);
    
    expect(botonZapatillas).toHaveClass("active");
    expect(screen.getByText("Zapatilla Urbana")).toBeInTheDocument();
    expect(screen.getByText("Zapatilla Deportiva")).toBeInTheDocument();
    expect(screen.getByText("Zapatilla Running")).toBeInTheDocument();
  });

  it("filtra productos al hacer clic en Carteras", () => {
    renderWithProviders(<Catalogo />);
    
    const botonCarteras = screen.getByRole("button", { name: /carteras/i });
    fireEvent.click(botonCarteras);
    
    expect(botonCarteras).toHaveClass("active");
    expect(screen.getByText("Cartera Clásica")).toBeInTheDocument();
    expect(screen.getByText("Cartera de Mano")).toBeInTheDocument();
    expect(screen.getByText("Cartera Elegante")).toBeInTheDocument();
  });

  it("filtra productos al hacer clic en Accesorios", () => {
    renderWithProviders(<Catalogo />);
    
    const botonAccesorios = screen.getByRole("button", { name: /accesorios/i });
    fireEvent.click(botonAccesorios);
    
    expect(botonAccesorios).toHaveClass("active");
    expect(screen.getByText("Collar Minimalista")).toBeInTheDocument();
    expect(screen.getByText("Pulsera de Cuero")).toBeInTheDocument();
    expect(screen.getByText("Aros Plateados")).toBeInTheDocument();
  });

  it("vuelve a mostrar todos los productos al hacer clic en Todos", () => {
    renderWithProviders(<Catalogo />);
    
    const botonVestidos = screen.getByRole("button", { name: /vestidos/i });
    fireEvent.click(botonVestidos);
    
    const botonTodos = screen.getByRole("button", { name: /todos/i });
    fireEvent.click(botonTodos);
    
    expect(botonTodos).toHaveClass("active");
    expect(screen.getByText("Sweater Clásico")).toBeInTheDocument();
    expect(screen.getByText("Pantalón Casual")).toBeInTheDocument();
  });

  it("muestra botones de agregar al carrito", () => {
    renderWithProviders(<Catalogo />);
    const botonesAgregar = screen.getAllByText(/agregar al carrito/i);
    expect(botonesAgregar.length).toBeGreaterThan(0);
  });

  it("muestra botones sin stock para productos agotados", () => {
    renderWithProviders(<Catalogo />);
    const botonesSinStock = screen.getAllByText(/sin stock/i);
    expect(botonesSinStock.length).toBeGreaterThan(0);
  });

  it("muestra el precio de los productos", () => {
    renderWithProviders(<Catalogo />);
    expect(screen.getByText("$25.000")).toBeInTheDocument();
    const precios28 = screen.getAllByText("$28.000");
    expect(precios28.length).toBeGreaterThan(0);
  });

  it("muestra las imágenes de los productos", () => {
    renderWithProviders(<Catalogo />);
    const imagenSweater = screen.getByAltText("Sweater Clásico");
    expect(imagenSweater).toBeInTheDocument();
  });

  it("los productos tienen tarjetas clicables", () => {
    renderWithProviders(<Catalogo />);
    const cards = screen.getAllByText("Sweater Clásico")[0].closest('.card');
    expect(cards).toHaveStyle({ cursor: 'pointer' });
  });

  it("no muestra el mensaje de productos vacíos cuando hay productos", () => {
    renderWithProviders(<Catalogo />);
    expect(screen.queryByText("No hay productos disponibles en esta categoría.")).not.toBeInTheDocument();
  });

  it("cambia el filtro activo al hacer varios clics", () => {
    renderWithProviders(<Catalogo />);
    
    const botonPantalones = screen.getByRole("button", { name: /pantalones/i });
    fireEvent.click(botonPantalones);
    expect(botonPantalones).toHaveClass("active");
    
    const botonCarteras = screen.getByRole("button", { name: /carteras/i });
    fireEvent.click(botonCarteras);
    expect(botonCarteras).toHaveClass("active");
    expect(botonPantalones).not.toHaveClass("active");
  });

  it("mantiene la estructura de grid al filtrar", () => {
    renderWithProviders(<Catalogo />);
    
    const botonSweater = screen.getByRole("button", { name: /sweater y polerones/i });
    fireEvent.click(botonSweater);
    
    const grid = screen.getByText("Sweater Clásico").closest('.row');
    expect(grid).toHaveClass("g-4");
  });

  it("deshabilita botones sin stock correctamente", () => {
    renderWithProviders(<Catalogo />);
    const botonesSinStock = screen.getAllByText(/sin stock/i);
    botonesSinStock.forEach(boton => {
      expect(boton).toBeDisabled();
    });
  });

  it("habilita botones con stock correctamente", () => {
    renderWithProviders(<Catalogo />);
    const botonesConStock = screen.getAllByText(/agregar al carrito/i);
    botonesConStock.forEach(boton => {
      expect(boton).not.toBeDisabled();
    });
  });

  it("muestra 3 productos por categoría", () => {
    renderWithProviders(<Catalogo />);
    
    const botonSweater = screen.getByRole("button", { name: /sweater y polerones/i });
    fireEvent.click(botonSweater);
    
    const productos = screen.getAllByRole("img");
    expect(productos.length).toBe(3);
  });
});