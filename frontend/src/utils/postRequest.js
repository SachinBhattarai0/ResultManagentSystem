import { API_ROUTE } from "./api";

export const postRequest = async (url, body, headers = {}) => {
  if (!url || !body) return;
  return await fetch(`${API_ROUTE}/${url}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
};
