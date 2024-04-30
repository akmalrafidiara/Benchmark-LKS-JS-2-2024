import React, { useEffect } from "react";

function VerifyToken(props) {
  const Next = props.Next;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <>
      <Next />
    </>
  );
}

export default VerifyToken;
