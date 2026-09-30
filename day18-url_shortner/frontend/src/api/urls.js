import axios from "axios";

export async function createUrl({ url }) {
  try {
    const response = await axios.post(
      "http://localhost:5173/api/urls/",
      { url },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("res", response);
    return response.data;
  } catch (error) {
    console.log(
      "Something went wrong,",
      error?.message || "Error in shortening the URL",
      error,
    );
  }
}
