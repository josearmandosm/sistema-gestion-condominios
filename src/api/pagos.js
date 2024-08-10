import axios from "axios";
import { HEADERS_WITH_JWT } from "../utils/getToken";

const API_BASE_URL = "https://localhost:7163/api/pagos";

export async function buscarPagos() {
  try {
    const response = await axios.get(`${API_BASE_URL}`, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener pagos:`, error);
    throw error;
  }
}

export async function buscarPagoPorId(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener pago:`, error);
    throw error;
  }
}

export async function eliminarPago(id) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar pago:`, error);
    throw error;
  }
}

export async function actualizarPago(id, item) {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, item, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar pago:`, error);
    throw error;
  }
}

export async function crearPago(item) {
  try {
    const response = await axios.post(`${API_BASE_URL}`, item, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al crear pago:`, error);
    throw error;
  }
}
