import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { AuthProvider, useAuth } from "../src/Componentes/AuthContext";

const TestComponent = () => {
  const { usuario, iniciarSesion, cerrarSesion, estaAutenticado, agregarPedido, obtenerPedidosUsuario } = useAuth();

  return (
    <div>
      <p data-testid="usuario">{usuario?.nombre || "null"}</p>
      <p data-testid="autenticado">{estaAutenticado() ? "true" : "false"}</p>
      <button onClick={() => iniciarSesion({ id: 1, nombre: "Pablo" })}>Login</button>
      <button onClick={cerrarSesion}>Logout</button>
      <button onClick={() => agregarPedido([{ id: 1, nombre: "Producto" }], 100)}>Agregar Pedido</button>
      <p data-testid="pedidos">{JSON.stringify(obtenerPedidosUsuario())}</p>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("inicia sin usuario", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByTestId("usuario").textContent).toBe("null");
    expect(screen.getByTestId("autenticado").textContent).toBe("false");
  });

  it("inicia sesión correctamente", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    fireEvent.click(screen.getByText("Login"));

    expect(screen.getByTestId("usuario").textContent).toBe("Pablo");
    expect(screen.getByTestId("autenticado").textContent).toBe("true");
    expect(localStorage.getItem("usuarioActivo")).toBe(JSON.stringify({ id: 1, nombre: "Pablo" }));
  });

  it("cierra sesión correctamente", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    fireEvent.click(screen.getByText("Login"));
    fireEvent.click(screen.getByText("Logout"));

    expect(screen.getByTestId("usuario").textContent).toBe("null");
    expect(screen.getByTestId("autenticado").textContent).toBe("false");
    expect(localStorage.getItem("usuarioActivo")).toBeNull();
  });

  it("agrega un pedido correctamente", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    fireEvent.click(screen.getByText("Login"));
    fireEvent.click(screen.getByText("Agregar Pedido"));

    const pedidosUsuario = JSON.parse(screen.getByTestId("pedidos").textContent);
    expect(pedidosUsuario.length).toBe(1);
    expect(pedidosUsuario[0].usuarioId).toBe(1);
    expect(pedidosUsuario[0].total).toBe(100);
  });
});
