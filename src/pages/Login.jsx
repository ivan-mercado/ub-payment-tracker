import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "../App.css";
import ubLogo from "../assets/ub-logo.png";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setError("");

    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );

        await setDoc(doc(db, "users", userCredential.user.uid), {
          name: form.name,
          email: form.email,
          createdAt: new Date(),
        });
      } else {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      }
    } catch (err) {
      setError("Login/Register failed. Please check your details.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src={ubLogo} alt="University of Batangas Logo" className="login-logo-img" />

        <p className="login-kicker">University of Batangas</p>
        <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>
        <p className="login-subtitle">
          {isRegister
            ? "Register to access the payment monitoring system."
            : "Login to continue to the payment monitoring system."}
        </p>

        <div className="login-form">
          {isRegister && (
            <input
              className="login-input"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          )}

          <input
            className="login-input"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
          />

          {error && <p className="login-error">{error}</p>}

          <button className="login-submit-btn" onClick={handleSubmit}>
            {isRegister ? "Register" : "Login"}
          </button>
        </div>

        <button
          className="login-switch"
          onClick={() => {
            setIsRegister(!isRegister);
            setError("");
          }}
        >
          {isRegister
            ? "Already have an account? Login"
            : "No account yet? Register"}
        </button>
      </div>
    </div>
  );
}