import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
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
    expect(screen.getByRole("button", { name: /suscribirme/i })).toBeInTheDocument();
  });

  it("muestra error cuando el campo está vacío", async () => {
    render(<Boletin />);
    const boton = screen.getByRole("button", { name: /suscribirme/i });
    await userEvent.click(boton);

    expect(await screen.findByText("Por favor, ingresa tu correo.")).toBeInTheDocument();
  });

  it("muestra alerta cuando el correo es válido", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<Boletin />);
    const inputEmail = screen.getByPlaceholderText("Tu correo electrónico");
    await userEvent.type(inputEmail, "test@example.com");

    const boton = screen.getByRole("button", { name: /suscribirme/i });
    await userEvent.click(boton);

    expect(alertMock).toHaveBeenCalledWith("¡Suscripción realizada correctamente!");
    expect(inputEmail.value).toBe("");

    alertMock.mockRestore();
  });
});
