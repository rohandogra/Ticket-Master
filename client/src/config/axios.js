import Axios from "axios";

const axios = Axios.create({
  baseURL: `https://ticket-master-new.herokuapp.com/api/user`,
});

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `${token}` : "";

  return config;
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const ms = error.message.split(" ")[5];
    console.log(ms, "msg");
    document.body.classList.remove("loading-indicator");
    if (ms === "403") {
      localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axios;
