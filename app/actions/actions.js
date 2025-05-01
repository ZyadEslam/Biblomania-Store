"use server";
export const newDataSubmissionAction = async (formData, type) => {
  const data = Object.fromEntries(formData.entries());
  const dataKeys = Object.keys(data).filter((key) => {
    if (type === "order" && key.includes("اسم الكتاب")) {
      return key;
    } else if (type === "payment" && key.includes("اسم الصنف")) {
      return key;
    }
  });
  data[type === "order" ? "الاوردر" : "الاصناف"] = dataKeys
    .map((k) => data[k])
    .join(" && ");

  try {
    await fetch(`http://localhost:3000/api/${type}/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });
  } catch (error) {
    console.log("Error in sending POST request", error);
  }
};

export const updateDataAction = async (formData, type) => {
  const data = Object.fromEntries(formData.entries());
  data["التاريخ"] = new Date(data["التاريخ"]);

  try {
    const response = await fetch(
      `http://localhost:3000/api/${type}/${data["id"]}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
  } catch (error) {
    console.log("Error in sending Patch request");
  }
};
