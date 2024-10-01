import axios from "axios";

const nodeMailApi = axios.create({
  baseURL: import.meta.env.VITE_EMAIL_API_BASE_URL,
  // withCredentials: true,
  headers: {
    // Accept: "application/json",
    // "Content-Type": "application/json",
    // Authorization: `Basic `,
  },
});

export default nodeMailApi;
