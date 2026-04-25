import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "../App.css";

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
      setError("Login/Register failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>{isRegister ? "Register" : "Login"}</h2>

        {isRegister && (
          <input
            className="search-input"
            placeholder="Name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        )}

        <input
          className="search-input"
          placeholder="Email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />

        <input
          className="search-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => update("password", e.target.value)}
        />

        {error && <p className="login-error">{error}</p>}

        <button className="btn btn--primary" onClick={handleSubmit}>
          {isRegister ? "Register" : "Login"}
        </button>

        <button
          className="login-switch"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have an account? Login" : "No account? Register"}
        </button>
      </div>
    </div>
  );
}