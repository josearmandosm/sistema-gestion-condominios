import axios from "axios";
import { HEADERS_WITH_JWT } from "../utils/getToken";

const API_BASE_URL = "https://localhost:7163/api/reservas";

export async function buscarReservas() {
  try {
    const response = await axios.get(`${API_BASE_URL}`, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener reservas:`, error);
    throw error;
  }
}

export async function buscarReservaPorId(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener reserva:`, error);
    throw error;
  }
}

export async function eliminarReserva(id) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar reserva:`, error);
    throw error;
  }
}

export async function actualizarReserva(id, item) {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, item, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar reserva:`, error);
    throw error;
  }
}

export async function crearReserva(item) {
  try {
    const response = await axios.post(`${API_BASE_URL}`, item, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al crear reserva:`, error);
    throw error;
  }
}
