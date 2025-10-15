import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Contacto from "../src/Componentes/Contacto";

describe("Componente Contacto", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza todos los campos del formulario", () => {
    render(<Contacto />);
    
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/motivo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
  });

  it("muestra errores si los campos obligatorios están vacíos al enviar", () => {
    render(<Contacto />);
    
    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    expect(screen.getByText(/por favor, ingresa tu nombre/i)).toBeInTheDocument();
    expect(screen.getByText(/por favor, ingresa tu apellido/i)).toBeInTheDocument();
    expect(screen.getByText(/el correo es obligatorio/i)).toBeInTheDocument();
    expect(screen.getByText(/por favor, selecciona un motivo/i)).toBeInTheDocument();
    expect(screen.getByText(/por favor, escribe un mensaje/i)).toBeInTheDocument();
  });

  it("muestra error si el correo es inválido", () => {
    render(<Contacto />);
    
    const inputCorreo = screen.getByLabelText(/correo/i);
    fireEvent.change(inputCorreo, { target: { value: "correo-invalido" } });
    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    expect(screen.getByText(/el correo debe contener "@"/i)).toBeInTheDocument();
  });

  it("muestra error si el mensaje supera 250 caracteres", () => {
    render(<Contacto />);
    
    const textareaMensaje = screen.getByLabelText(/mensaje/i);
    fireEvent.change(textareaMensaje, { target: { value: "a".repeat(251) } });
    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    expect(screen.getByText(/el mensaje no puede exceder los 250 caracteres/i)).toBeInTheDocument();
  });

  it("permite enviar el formulario si todos los campos son válidos", () => {
    render(<Contacto />);

    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Pablo" } });
    fireEvent.change(screen.getByLabelText(/apellido/i), { target: { value: "Jiménez" } });
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/motivo/i), { target: { value: "consulta" } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: "Hola, esto es una prueba." } });

    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    expect(alertMock).toHaveBeenCalledWith("Formulario enviado correctamente");

    alertMock.mockRestore();
  });

  it("no permite ingresar números en nombre y apellido", () => {
    render(<Contacto />);

    const inputNombre = screen.getByLabelText(/nombre/i);
    const inputApellido = screen.getByLabelText(/apellido/i);

    fireEvent.change(inputNombre, { target: { value: "Pablo123" } });
    fireEvent.change(inputApellido, { target: { value: "Jiménez456" } });

    expect(inputNombre.value).toBe("Pablo");
    expect(inputApellido.value).toBe("Jiménez");
  });

  it("muestra contador de caracteres del mensaje correctamente", () => {
    render(<Contacto />);

    const textareaMensaje = screen.getByLabelText(/mensaje/i);
    fireEvent.change(textareaMensaje, { target: { value: "Hola" } });

    expect(screen.getByText(/4 \/ 250 caracteres/i)).toBeInTheDocument();
  });
});
