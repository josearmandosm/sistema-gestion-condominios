import axios from "axios";
import { HEADERS_WITH_JWT } from "../utils/getToken";

const API_BASE_URL = "https://localhost:7163/api/residencias";



export async function buscarResidencias() {
  try {
    const response = await axios.get(`${API_BASE_URL}`, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener residencias:`, error);
    throw error;
  }
}

export async function buscarResidenciaPorId(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener residencia:`, error);
    throw error;
  }
}

export async function eliminarResidencia(id) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar residencia:`, error);
    throw error;
  }
}

export async function actualizarResidencia(id, item) {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, item, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar residencia:`, error);
    throw error;
  }
}

export async function crearResidencia(item) {
  try {
    const response = await axios.post(`${API_BASE_URL}`, item, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al crear residencia:`, error);
    throw error;
  }
}
