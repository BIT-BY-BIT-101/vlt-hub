import axios from "axios";

const paymongo = axios.create({
  baseURL: "https://api.paymongo.com/v1/",
  // withCredentials: true,
  headers: {
    Accept: "application/json",
    // Authorization: `Basic `,
  },
  auth: {
    username: "sk_test_qMQKQJZmFWoj37eQFX9kuvwN",
    password: "",
  },
});

export default paymongo;
