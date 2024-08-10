import axios from "axios";

const API_BASE_URL = "https://localhost:7163/api/auth";

export async function iniciarSesion(item) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, item);
    return response.data;
  } catch (error) {
    console.error(`Error al iniciar sesión:`, error);
    throw error;
  }
}

export async function registrar(item) {
  try {
    const response = await axios.post(`${API_BASE_URL}/registrar`, item);
    return response.data;
  } catch (error) {
    console.error(`Error al registrar usuario:`, error);
    throw error;
  }
}
