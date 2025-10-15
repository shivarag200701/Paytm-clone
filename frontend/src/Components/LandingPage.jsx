import React from "react";
import { useEffect } from "react";
import axios from "axios";

const LandingPage = () => {
  useEffect(() => {
    const tokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    const token = tokenCookie?.split("=")[1];

    if (!token) {
      console.log("here");

      window.location.href = "/signup";
    }
    async function fetchUser() {
      try {
        console.log("here");

        const res = await axios.get("http://localhost:3001/api/v1/me", {
          headers: { Authorization: `bearer ${token}` },
        });
        console.log("response", res.response.data);

        const userId = res.data.userId;
        if (userId) {
          window.location.href = "/dashboard";
        }
      } catch (err) {
        console.error("failed while authentication of token:", err);
        window.location.href = "/signup";
      }
    }
    fetchUser();
  }, []);
  return (
    <div className="h-[100vh] flex items-center justify-center">
      Landing Page
    </div>
  );
};

export default LandingPage;
