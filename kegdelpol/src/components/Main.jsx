import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Main.css";
import ConfirmButton from "./ConfirmButton";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    // Get role from localStorage
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  useEffect(() => {
    if (role) {
      switch (role.toUpperCase()) {
        case "EMPLOYEE":
          navigate("/employeeUI");
          break;
        case "CUSTOMER":
          navigate("/clientUI");
          break;
        case "DRIVER":
          navigate("/driverUI");
          break;
        default:
          console.error("Unknown role");
      }
    }
  }, [role, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Logowanie użytkownika
    const loginResponse = await fetch(
      "https://www.igorgawlowicz.pl/kegdelpol/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!loginResponse.ok) {
      console.error("Login failed");
      setErrorMessage("Invalid username or password");
      return;
    }

    const loginData = await loginResponse.json();
    const authToken = loginData.token;

    // Pobranie auth_id i roli
    const authIdAndRoleResponse = await fetch(
      "https://www.igorgawlowicz.pl/kegdelpol/auth/get_auth_id_and_role",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Przekazanie JWT tokena
        },
        body: JSON.stringify({ token: authToken }),
      }
    );

    if (!authIdAndRoleResponse.ok) {
      console.error("Failed to fetch auth ID and role");
      return;
    }

    const authIdAndRoleData = await authIdAndRoleResponse.json();
    const { role, auth_id } = authIdAndRoleData;

    // Zapisanie danych do localStorage
    localStorage.setItem("jwt", authToken);
    localStorage.setItem("auth_id", auth_id);
    localStorage.setItem("role", role);

    // Przekierowanie na odpowiedni interfejs użytkownika w zależności od roli
    if (role.toUpperCase() === "EMPLOYEE") {
      navigate("/employeeUI");
    } else if (role.toUpperCase() === "CUSTOMER") {
      navigate("/clientUI");
    } else if (role.toUpperCase() === "DRIVER") {
      navigate("/driverUI");
    } else {
      console.error("Unknown role");
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="container">
        <div className="main-container">
          <div className="heading"><span>LOG</span> IN TO YOUR ACCOUNT</div>
          <form className="login-form">
            <div className="input-container">
              <label htmlFor="login">Login</label>
              <input
                type="text"
                id="login"
                placeholder="Login"
                className="input-field"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="input-field"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <ConfirmButton buttonText="Sign in" onClick={handleLogin} />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
