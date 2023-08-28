import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../base";
import { showToast } from "../utils";
import background from "../assets/background.png";
import SignInLogo from "../assets/sign-in-logo.png";

const Login = () => {
  const navigate = useNavigate();

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
    if (profile) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const styles = {
    container: {
      height: "100vh",
      width: "100vw",
      backgroundImage: `url(${background})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },

    signContainer: {
      width: "40%",
      height: "80%",
      margin: "auto",
      backgroundColor: "rgb(243 243 243 / 62%)",
      color: "black",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      flexDirection: "column",
      height: "80%",
      gap: "100px",
    },
    button: {
      width: "70%",
      height: "53px",
      borderRadius: "25px",
      fontFamily: "Roboto",
      color: "#fff",
      backgroundColor: "rgb(18 83 64)",
    },
  };

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.signContainer}>
          <img src={SignInLogo} alt="logo"></img>
          <button style={styles.button} onClick={login}>
            Login With Gmail
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
