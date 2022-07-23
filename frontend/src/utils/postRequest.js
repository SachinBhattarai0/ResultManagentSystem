export const API_ROUTE = "http://localhost:8000/api";

export const postRequest = async (url, body, extraheaders = {}) => {
  if (!url || !body) return;

  return await fetch(`${API_ROUTE}/${url}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      ...extraheaders,
    },
    body: JSON.stringify(body),
  });
};
