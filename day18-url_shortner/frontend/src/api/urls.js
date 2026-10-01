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
    // console.log("res", response);
    return response.data;
  } catch (error) {
    console.log(
      "Something went wrong,",
      error?.message || "Error in shortening the URL",
      error,
    );
  }
}

export async function fetchAllUrls() {
  try {
    const response = await axios.get("http://localhost:5173/api/urls/");
    return response.data;
  } catch (error) {
    console.log(
      "Something went wrong,",
      error?.message || "Error in shortening the URL",
      error,
    );
  }
}

export async function deleteUrl(id) {
  try {
    await axios.delete(`http://localhost:5173/api/urls/${id}`);
  } catch (error) {
    console.log(
      "Error in deleting URL:",
      error?.message || "Failed to delete URL",
    );
    throw error; // propagate error so caller can handle it
  }
}
