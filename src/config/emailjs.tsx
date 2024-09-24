import axios from "axios";

const emailjsApi = axios.create({
  baseURL: "https://api.emailjs.com/api/v1.0/email/",
  // withCredentials: true,
  headers: {
    // Accept: "application/json",
    "Content-Type": "application/json",
    // Authorization: `Basic `,
  },
});

export default emailjsApi;
