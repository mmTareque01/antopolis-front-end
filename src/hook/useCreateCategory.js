import { CALL_CREATE_CATEGORIES } from "../apis/category.apis";

export const useCreateCategory = async ({name}) => {
  const newCategory = await CALL_CREATE_CATEGORIES({ name });
  return newCategory;
};
