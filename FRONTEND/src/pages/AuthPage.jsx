import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { login, fetchCurrentUser } from "../store/slice/authSlice";

const AuthPage = () => {
  const [loginMode, setLoginMode] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      await dispatch(login({ email, password })).unwrap();
      await dispatch(fetchCurrentUser());
      navigate({ to: "/dashboard" });
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {loginMode ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          {loginMode
            ? "Sign in to access your dashboard"
            : "Sign up to start shortening your URLs"}
        </p>
        {loginMode ? (
          <LoginForm onLogin={handleLogin} state={setLoginMode} />
        ) : (
          <RegisterForm state={setLoginMode} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
