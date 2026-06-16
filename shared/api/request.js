import { getBaseUrl } from "@/shared/lib/getBaseUrl";

export const request = async (path, options = {}) => {
  const response = await fetch(`${getBaseUrl()}${path}`, {
    cache: "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "string" ? payload : payload.message || "Request failed";
    throw new Error(message);
  }

  return payload;
};
