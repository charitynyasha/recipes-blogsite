// app/signIn/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

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

  const router = useRouter();
  const { login } = useAuth();

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
          // Set user in context
          login(data.user);
          
          // Show success message
          setSuccess("Sign in successful! Redirecting...");
          
          // Small delay to show success message, then redirect
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 1000);
        } else {
          setError(data.error || "Invalid credentials");
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
            username: formData.email.split('@')[0],
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess("Account created successfully! Please sign in.");
          setFormData({ name: "", email: "", password: "" });
          setTimeout(() => {
            setIsSignIn(true);
            setSuccess("");
          }, 2000);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1C1C1C] to-[#2D2D2D] px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md p-8 border border-white/20">
        <h1 className="text-2xl font-bold text-center text-white mb-2">
          {isSignIn ? "Welcome Back 👋" : "Create an Account ✨"}
        </h1>
        <p className="text-center text-white/70 mb-6">
          {isSignIn ? "Sign in to continue your culinary journey" : "Join Flavourist today"}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-100 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 text-green-100 rounded-lg text-sm">
            {success}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {!isSignIn && (
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#BCA067] focus:border-transparent transition-all"
              />
            </div>
          )}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#BCA067] focus:border-transparent transition-all"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength={6}
              className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#BCA067] focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#BCA067] text-white rounded-xl font-semibold hover:bg-[#a88b52] transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : isSignIn ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="text-center text-white/70 text-sm">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsSignIn(!isSignIn);
                setError("");
                setSuccess("");
                setFormData({ name: "", email: "", password: "" });
              }}
              className="text-[#BCA067] font-semibold hover:text-[#a88b52] transition-colors"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}