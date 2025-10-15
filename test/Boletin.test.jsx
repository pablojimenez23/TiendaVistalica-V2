import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Boletin from "../src/Componentes/Boletin";

describe("Componente Boletin", () => {
  it("renderiza el título correctamente", () => {
    render(<Boletin />);
    expect(screen.getByText("Suscríbete a nuestro boletín")).toBeInTheDocument();
  });

  it("renderiza el campo de correo y botón", () => {
    render(<Boletin />);
    expect(screen.getByPlaceholderText("Tu correo electrónico")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /suscribirme/i })).toBeInTheDocument();
  });

  it("muestra error cuando el campo está vacío", () => {
    render(<Boletin />);
    
    const boton = screen.getByRole("button", { name: /suscribirme/i });
    fireEvent.click(boton);
    
    expect(screen.getByText("Por favor, ingresa tu correo.")).toBeInTheDocument();
  });

  it("muestra error cuando el correo es inválido", () => {
    render(<Boletin />);
    
    const inputEmail = screen.getByPlaceholderText("Tu correo electrónico");
    fireEvent.change(inputEmail, { target: { value: "correosinvalido" } });
    
    const boton = screen.getByRole("button", { name: /suscribirme/i });
    fireEvent.click(boton);
    
    expect(
      screen.getByText("Por favor, ingresa un correo con formato válido.")
    ).toBeInTheDocument();
  });

  it("muestra alerta cuando el correo es válido", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    
    render(<Boletin />);
    
    const inputEmail = screen.getByPlaceholderText("Tu correo electrónico");
    fireEvent.change(inputEmail, { target: { value: "test@example.com" } });
    
    const boton = screen.getByRole("button", { name: /suscribirme/i });
    fireEvent.click(boton);
    
    expect(alertMock).toHaveBeenCalledWith("¡Suscripción realizada correctamente!");
    expect(inputEmail.value).toBe(""); // Verifica que se limpia el campo
    
    alertMock.mockRestore();
  });
});