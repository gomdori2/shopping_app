import axios from "axios";
import { API_HOST } from "./config";

export const createProduct = async newProduct => {
  try {
    const response = await axios.post(`${API_HOST}`, newProduct);
    return response;
  } catch (error) {
    console.log(error);
  }
};
