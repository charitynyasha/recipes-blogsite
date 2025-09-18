"use client";
import { useState } from "react";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isSignIn) {
        // Handle sign in
        const response = await fetch("/api/auth/signIn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess("Signed in successfully!");
          setFormData({ name: "", email: "", password: "" });
          // Redirect to dashboard or home page
          // window.location.href = "/dashboard";
        } else {
          setError(data.error || "Something went wrong");
        }
      } else {
        // Handle sign up
        const response = await fetch("/api/auth/signUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            username: formData.email.split('@')[0], // Generate username from email
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess("Account created successfully!");
          setFormData({ name: "", email: "", password: "" });
          // Optionally redirect or switch to sign in
          setTimeout(() => setIsSignIn(true), 2000);
        } else {
          setError(data.error || "Something went wrong");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="rounded-2xl shadow-xl w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          {isSignIn ? "Welcome Back 👋" : "Create an Account ✨"}
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {!isSignIn && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-lg border border-[#EBEBEB] bg-[#F9F9F9] text-[#242322] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#BCA067]"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-3 rounded-lg border border-[#EBEBEB] bg-[#F9F9F9] text-[#242322] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#BCA067]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            minLength={6}
            className="w-full p-3 rounded-lg border border-[#EBEBEB] bg-[#F9F9F9] text-[#242322] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#BCA067]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#BCA067] text-white rounded-lg font-medium hover:bg-[#a88b52] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-white/90 mt-6">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignIn(!isSignIn);
              setError("");
              setSuccess("");
              setFormData({ name: "", email: "", password: "" });
            }}
            className="text-[#BCA067] font-semibold hover:underline"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}