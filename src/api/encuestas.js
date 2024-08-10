import axios from "axios";
import { HEADERS_WITH_JWT } from "../utils/getToken";

const API_BASE_URL = "https://localhost:7163/api/encuestas";

export async function buscarEncuestas() {
  try {
    const response = await axios.get(`${API_BASE_URL}`, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener encuestas:`, error);
    throw error;
  }
}

export async function buscarEncuestaPorId(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, HEADERS_WITH_JWT, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener encuesta:`, error);
    throw error;
  }
}

export async function eliminarEncuesta(id) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar encuesta:`, error);
    throw error;
  }
}

export async function actualizarEncuesta(id, item) {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, item, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar encuesta:`, error);
    throw error;
  }
}

export async function crearEncuesta(item) {
  try {
    const response = await axios.post(`${API_BASE_URL}`, item, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al crear encuesta:`, error);
    throw error;
  }
}
