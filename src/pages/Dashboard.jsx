// import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import sign from "../assets/sign.png";

function Dashboard() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [results, setResults] = useState();
  const [name, setName] = useState();

  // Define a state variable to store the keyword
  const [keyword, setKeyword] = useState("");

  // functions to search anything
  const login = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify({ ...result }));
        navigate("/dashboard");
      })
      .catch((error) => {
        showToast(error.message, "error");
      });
  };

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("user"));
    if (!profile) {
      navigate("/login");
    }
    setName(JSON.parse(localStorage.getItem("user"))?.user?.displayName);
  }, [navigate]);

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        alignItems: "start",
        background:
          "linear-gradient(180deg, #0D150D 32.81%, rgba(29, 53, 29, 0.57) 94.27%)",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "50px",
          alignItems: "center",
          paddingTop: "20px",
        }}
        className="flex justify-between items-start text-white px-12"
      >
        <span>
          <img
            src={sign}
            style={{ maxWidth: "80%", height: "auto" }}
            alt="logo"
          />
        </span>

        <div
          style={{ alignItems: "center" }}
          className="flex justify-between items-center gap-8"
        >
          <div className="navlinks">
            <div className="navlinks flex items-center gap-8 font-medium ">
              <a href="#" style={{ fontSize: "16px" }}>
                Home
              </a>
              <a href="#" style={{ fontSize: "16px" }}>
                Explore
              </a>
              <a href="#" style={{ fontSize: "16px" }}>
                License
              </a>
              {name ? <p>{`Welcome ${name}`}</p> : <></>}
              <button
                style={{
                  backgroundColor: "none",
                  color: "white",
                  border: "1px solid white",
                  padding: "4px 16px",
                }}
                onClick={logOut}
              >
                {" "}
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "start",
          flexDirection: "column",
          paddingTop: "30vh",
          paddingLeft: "90px",
        }}
      >
        <p style={{ fontSize: "45px", fontWeight: "normal" }}>
          GET EVERY IMAGE{" "}
        </p>
        <p style={{ fontSize: "18px", fontWeight: "normal" }}>
          WITH JUST A CLICK
        </p>
        <button
          style={{
            display: "inline-flex",
            padding: "10px 32px",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            backgroundColor: "#464F3FF0",
            marginTop: "50px",
          }}
          onClick={() => {
            navigate("/explore");
          }}
        >
          Explore Our Library
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
