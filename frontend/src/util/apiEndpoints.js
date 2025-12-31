export const BASE_URL = "http://localhost:8080/api/v1.0";
const CLOUDINARY_CLOUD_NAME = "dhtluqbx0";

export const API_ENDPOINTS = {
    LOGIN_URL: "/login",
    REGISTER_URL: "/register",
    GET_ALL_CATEGORIES_URL: "/categories",
    ADD_CATEGORIES_URL: "/categories",
    UPDATE_CATEGORIES_URL: categoryId=>`/categories/${categoryId}`,
    UPLOAD_URL: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
}