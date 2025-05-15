import Cookies from "js-cookie";

const fetcher = async (url, options = {}) => {
  const method = options.method?.toUpperCase() || "GET";

  // Handling query params for GET requests
  if (method === "GET" && options.params && url instanceof URL) {
    Object.keys(options.params).forEach((key) =>
      url.searchParams.append(key, options.params[key])
    );
  }

  const isFormData = options.body instanceof FormData;

  const headers = {
    Authorization: "Bearer " + Cookies.get("access_token"),
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  const response = await fetch(url, {
    ...options,
    method,
    headers,
    // if not formData, JSON.stringify body
    body: isFormData ? options.body : JSON.stringify(options.body),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "API Request Failed");
    error.response = data;
    throw error;
  }

  return data;
};

export default fetcher;
