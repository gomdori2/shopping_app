import axios from "axios";
import { API_HOST } from "./config";

const dataUrl = `${API_HOST}`;

export const getProductOne = async id => {
  try {
    const reponse = await axios.get(`${API_HOST}/${id}`);
    return reponse;
  } catch (error) {
    console.log(error);
  }
};
