import axios from "axios"

// const token = "46502e07-e50a-4297-95fc-24a057a25366"
// const API_KEY = "fb5b190d-e027-4a82-8e83-d7b4e881adec"

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    "API-KEY": import.meta.env.VITE_API_KEY,
  },
})
