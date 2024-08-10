import axios from "axios";
import { HEADERS_WITH_JWT } from "../utils/getToken";

const API_BASE_URL = "https://localhost:7163/api/usuarios";

export async function buscarUsuarios() {
  try {
    const response = await axios.get(`${API_BASE_URL}`, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener usuarios:`, error);
    throw error;
  }
}

export async function buscarUsuarioPorId(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener usuario:`, error);
    throw error;
  }
}

export async function eliminarUsuario(id) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar usuario:`, error);
    throw error;
  }
}

export async function actualizarUsuario(id, item) {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, item, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar usuario:`, error);
    throw error;
  }
}

export async function crearUsuario(item) {
  try {
    const response = await axios.post(`${API_BASE_URL}`, item, HEADERS_WITH_JWT);
    return response.data;
  } catch (error) {
    console.error(`Error al crear usuario:`, error);
    throw error;
  }
}
