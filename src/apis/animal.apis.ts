import axios from "axios";
import { BASE, config } from "./config"



export const CALL_GET_ANIMALS = async (q: string) => {
  try {
    const category = await axios.get(`${BASE}/animal/list?q=${q}`);
    return category.data;
  } catch (error) {
    // error(error)
    return error;
  }
};

export const CALL_CREATE_ANIMAL = async (data: { name: string }) => {
  try {
    const category = await axios.post(`${BASE}/animal/create`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return category.data;
  } catch (error) {
    // error(error)
    return error;
  }
};


