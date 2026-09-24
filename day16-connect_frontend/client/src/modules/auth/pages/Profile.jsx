import React, { use, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import useApi from "../shared/api";

const Profile = () => {
  const api = useApi();
  const { user, setUser } = useAuthContext();

  const fetchUserDetails = async () => {
    try {
      const response = await api.get("/auth/me");
      console.log("profile response", response);

      setUser(response.data.data.user);
    } catch (error) {
      console.log(
        "Error in fetching details",
        error?.message || "User Details Not Found",
      );
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div>
      <h1>Name: {user.name}</h1>
      <h1>Email: {user.email}</h1>
    </div>
  );
};

export default Profile;
