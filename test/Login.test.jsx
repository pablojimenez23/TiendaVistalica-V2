import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../src/Componentes/Login";


const mockIniciarSesion = vi.fn();

vi.mock("../src/Componentes/AuthContext", () => ({
  useAuth: () => ({
    iniciarSesion: mockIniciarSesion
  })
}));


const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

describe("Componente Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem("usuarios", JSON.stringify([
      { id: 1, nombre: "Pablo", apellido: "Jiménez", correo: "pablo@test.com", password: "1234", genero: "M" }
    ]));
  });

  it("renderiza los inputs y el botón de login", () => {
    render(<Login />, { wrapper: MemoryRouter });

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ingresar/i })).toBeInTheDocument();
  });

  it("muestra error si el correo está vacío", () => {
    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(screen.getByText(/el correo es obligatorio/i)).toBeInTheDocument();
  });

  it("muestra error si el correo es inválido", () => {
    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: "correo-invalido" } });
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(screen.getByText(/el correo no es válido/i)).toBeInTheDocument();
  });

  it("muestra error si la contraseña está vacía", () => {
    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(screen.getByText(/la contraseña es obligatoria/i)).toBeInTheDocument();
  });

  it("muestra error si las credenciales son incorrectas", () => {
    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: "pablo@test.com" } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "wrongpass" } });
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(screen.getByText(/correo o contraseña incorrectos/i)).toBeInTheDocument();
  });

  it("login exitoso con credenciales correctas llama iniciarSesion y muestra alerta", () => {
    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: "pablo@test.com" } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "1234" } });
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(mockIniciarSesion).toHaveBeenCalledWith({
      id: 1,
      nombre: "Pablo",
      apellido: "Jiménez",
      correo: "pablo@test.com",
      genero: "M"
    });

    expect(alertMock).toHaveBeenCalledWith("Bienvenido Pablo Jiménez");
  });
});
