export const handleDateFormatting = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

export const customRequest = async (url, method, body = "") => {
  try {
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    return new Response("Request Sent Successfully");
  } catch (error) {
    return new Response(`Error in sending request, ${error}`, { status: 500 });
  }
};
