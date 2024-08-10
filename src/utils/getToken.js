export const getToken = () => {
  return localStorage.getItem("token");
};

export const HEADERS_WITH_JWT = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
};