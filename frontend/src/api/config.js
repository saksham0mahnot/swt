const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  endpoints: {
    auth: {
      register: "/auth/register",
      login: "/auth/login",
    },
  },
};

export default API_CONFIG;
