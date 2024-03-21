import axios from "axios";
import { BASE, config } from "./config"



export const CALL_GET_CATEGORIES = async () => {
  try {
    const category = await axios.get(`${BASE}/category/list`);
    return category.data.data;
  } catch (error) {
    // error(error)
    return error;
  }
};

export const CALL_CREATE_CATEGORIES = async (data: { name: string }) => {
  try {
    const category = await axios.post(`${BASE}/category/create`, data, config);
    return category.data;
  } catch (error) {
    // error(error)
    return error;
  }
};


