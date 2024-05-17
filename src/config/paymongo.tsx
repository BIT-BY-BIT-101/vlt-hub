import axios from "axios";

const paymongo = axios.create({
  baseURL: "https://api.paymongo.com/v1/",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    Authorization: `Basic `,
  },
});

export default paymongo;
