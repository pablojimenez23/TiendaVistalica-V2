import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DetalleProducto from "../src/Componentes/DetalleProducto";
import { CarritoProvider } from "../src/Componentes/Carrito";

const renderWithProviders = (productId = "1") => {
  return render(
    <MemoryRouter initialEntries={[`/producto/${productId}`]}>
      <CarritoProvider>
        <Routes>
          <Route path="/producto/:id" element={<DetalleProducto />} />
        </Routes>
      </CarritoProvider>
    </MemoryRouter>
  );
};

describe("Componente DetalleProducto", () => {
  it("renderiza el nombre del producto", async () => {
    renderWithProviders("1");
    await waitFor(() => {
      expect(screen.getByText("Sweater Clásico")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("renderiza el precio del producto", async () => {
    renderWithProviders("1");
    await waitFor(() => {
      expect(screen.getByText("$25.000")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("muestra la imagen del producto", async () => {
    renderWithProviders("1");
    await waitFor(() => {
      const imagen = screen.getByAltText("Sweater Clásico");
      expect(imagen).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("muestra el badge de disponible cuando hay stock", async () => {
    renderWithProviders("1");
    await waitFor(() => {
      expect(screen.getByText("Disponible")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("muestra el badge sin stock cuando no hay disponibilidad", async () => {
    renderWithProviders("2");
    await waitFor(() => {
      expect(screen.getByText("Sin stock")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("muestra la descripción del producto", async () => {
    renderWithProviders("1");
    await waitFor(() => {
      expect(screen.getByText(/Sweater clásico de algodón premium/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("muestra las tallas disponibles", async () => {
    renderWithProviders("1");
    await waitFor(() => {
      expect(screen.getByText("S")).toBeInTheDocument();
      expect(screen.getByText("M")).toBeInTheDocument();
      expect(screen.getByText("L")).toBeInTheDocument();
      expect(screen.getByText("XL")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("permite seleccionar una talla", async () => {
    renderWithProviders("1");
    await waitFor(() => {
      const tallaM = screen.getByText("M");
      fireEvent.click(tallaM);
      expect(tallaM).toHaveClass("btn-primary");
    }, { timeout: 3000 });
  });

  it("muestra los controles de cantidad cuando hay stock", async () => {
    renderWithProviders("1");
    await waitFor(() => {
      expect(screen.getByText("Cantidad")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("permite incrementar la cantidad", async () => {
    renderWithProviders("1");
    await waitFor(() => {
      const btnIncrementar = screen.getAllByRole("button").find(btn => 
        btn.querySelector(".bi-plus")
      );
      fireEvent.click(btnIncrementar);
    }, { timeout: 3000 });
    
    await waitFor(() => {
      expect(screen.getByText("2")).toBeInTheDocument();
    });
  });

  it("muestra el botón de agregar al carrito cuando hay stock", async () => {
    renderWithProviders("1");
    await waitFor(() => {
      expect(screen.getByText("Agregar al Carrito")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("muestra el botón sin stock cuando no hay disponibilidad", async () => {
    renderWithProviders("2");
    await waitFor(() => {
      expect(screen.getByText("Sin Stock")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("muestra los detalles adicionales del producto", async () => {
    renderWithProviders("1");
    await waitFor(() => {
      expect(screen.getByText("Detalles del Producto")).toBeInTheDocument();
      expect(screen.getByText("Material:")).toBeInTheDocument();
      expect(screen.getByText("Categoría:")).toBeInTheDocument();
      expect(screen.getByText("Cuidados:")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("muestra el material del producto", async () => {
    renderWithProviders("1");
    await waitFor(() => {
      expect(screen.getByText("100% Algodón")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("muestra la categoría del producto", async () => {
    renderWithProviders("1");
    await waitFor(() => {
      expect(screen.getByText("Sweater y Polerones")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("muestra el botón volver al catálogo", async () => {
    renderWithProviders("1");
    await waitFor(() => {
      expect(screen.getByText("Volver al Catálogo")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("el botón agregar al carrito está habilitado con stock", async () => {
    renderWithProviders("1");
    
    await waitFor(() => {
      const btnAgregar = screen.getByText("Agregar al Carrito");
      expect(btnAgregar).toBeInTheDocument();
      expect(btnAgregar).not.toBeDisabled();
    }, { timeout: 3000 });
  });

  it("deshabilita el botón cuando no hay stock", async () => {
    renderWithProviders("2");
    
    await waitFor(() => {
      const btnSinStock = screen.getByText("Sin Stock");
      expect(btnSinStock).toBeDisabled();
    }, { timeout: 3000 });
  });
});