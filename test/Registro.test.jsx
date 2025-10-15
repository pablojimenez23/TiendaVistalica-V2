// test/Registro.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Registro from "../src/Componentes/Registro";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock del AuthContext
const mockIniciarSesion = vi.fn();
vi.mock("../src/Componentes/AuthContext", () => ({
  useAuth: () => ({
    iniciarSesion: mockIniciarSesion,
  }),
}));

// Helper para renderizar con Router
const renderConRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

// Limpiar localStorage antes de cada test
beforeEach(() => {
  localStorage.clear();
  mockIniciarSesion.mockClear();
});

describe("Componente Registro", () => {
  it("muestra errores si los campos están vacíos al enviar", () => {
    renderConRouter(<Registro />);

    // Mock alert
    window.alert = vi.fn();

    fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));

    expect(screen.getByText(/el nombre es obligatorio/i)).toBeInTheDocument();
    expect(screen.getByText(/el apellido es obligatorio/i)).toBeInTheDocument();
    expect(screen.getAllByText(/por favor, selecciona un género/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/el correo es obligatorio/i)).toBeInTheDocument();
    expect(screen.getByText(/la contraseña es obligatoria/i)).toBeInTheDocument();
    expect(screen.getByText(/debe confirmar la contraseña/i)).toBeInTheDocument();
  });

  it("permite registrar un usuario válido", () => {
    renderConRouter(<Registro />);

    // Mock alert
    window.alert = vi.fn();

    // Rellenar formulario
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Juan" } });
    fireEvent.change(screen.getByLabelText(/apellido/i), { target: { value: "Pérez" } });
    fireEvent.change(screen.getByLabelText(/género/i), { target: { value: "masculino" } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: "juan@mail.com" } });
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: "Password1" } });
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: "Password1" } });

    fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));

    // Verificar alert y que iniciarSesion fue llamado
    expect(window.alert).toHaveBeenCalledWith("Cuenta registrada correctamente");
    expect(mockIniciarSesion).toHaveBeenCalled();

    // Verificar que el usuario se guardó en localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    expect(usuarios).toHaveLength(1);
    expect(usuarios[0].nombre).toBe("Juan");
    expect(usuarios[0].correo).toBe("juan@mail.com");
  });

  it("muestra error si el correo ya está registrado", () => {
    // Guardar usuario previo
    localStorage.setItem(
      "usuarios",
      JSON.stringify([{ id: 1, nombre: "Juan", apellido: "Pérez", correo: "juan@mail.com", password: "Password1" }])
    );

    renderConRouter(<Registro />);
    window.alert = vi.fn();

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Juan" } });
    fireEvent.change(screen.getByLabelText(/apellido/i), { target: { value: "Pérez" } });
    fireEvent.change(screen.getByLabelText(/género/i), { target: { value: "masculino" } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: "juan@mail.com" } });
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: "Password1" } });
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: "Password1" } });

    fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));

    expect(screen.getByText(/este correo ya está registrado/i)).toBeInTheDocument();
    expect(mockIniciarSesion).not.toHaveBeenCalled();
  });
});
