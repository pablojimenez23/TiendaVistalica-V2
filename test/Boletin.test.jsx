import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Boletin from "../src/Componentes/Boletin";

describe("Componente Boletin", () => {
  it("renderiza el título correctamente", () => {
    render(<Boletin />);
    expect(screen.getByText("Suscríbete a nuestro boletín")).toBeInTheDocument();
  });

  it("contiene un párrafo descriptivo", () => {
    render(<Boletin />);
    expect(
      screen.getByText(/Recibe novedades, descuentos y colecciones exclusivas/i)
    ).toBeInTheDocument();
  });

  it("renderiza el campo de correo electrónico", () => {
    render(<Boletin />);
    const inputEmail = screen.getByPlaceholderText("Tu correo electrónico");
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveAttribute("type", "email");
  });

  it('renderiza el botón "Suscribirme"', () => {
    render(<Boletin />);
    expect(
      screen.getByRole("button", { name: /suscribirme/i })
    ).toBeInTheDocument();
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
  
    const feedback = document.querySelector('#boletinFeedback');
    expect(feedback).toBeInTheDocument();
    expect(feedback.textContent).toMatch(/formato válido/i);
    expect(feedback.style.display).toBe('block');
  });

  it("muestra alerta cuando el correo es válido", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    
    render(<Boletin />);
    
    const inputEmail = screen.getByPlaceholderText("Tu correo electrónico");
    fireEvent.change(inputEmail, { target: { value: "test@example.com" } });
    
    const boton = screen.getByRole("button", { name: /suscribirme/i });
    fireEvent.click(boton);
    
    expect(alertMock).toHaveBeenCalledWith("¡Suscripción realizada correctamente!");
    expect(inputEmail.value).toBe("");
    
    alertMock.mockRestore();
  });
});