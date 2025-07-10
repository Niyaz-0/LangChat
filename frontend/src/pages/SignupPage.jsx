import React from "react";
import { useState } from "react";
import { Languages } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";

export default function SignupPage() {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Account Created Successfully") 
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },

  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(signUpData);
  };

  return (
    <div
      className="flex h-screen items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div className="flex flex-col md:flex-row rounded-2xl gap-5 w-full max-w-4xl border border-gray-200 border-opacity-30">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-4">
          <h1 className="flex gap-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            <Languages className="text-primary" size={38} />
            <span className="text-4xl font-bold">LangChat</span>
          </h1>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <h2 className="text-2xl font-medium mb-3">Create An Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* USERNAME */}
            <div>
              <label htmlFor="username" className="label label-text">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="John Doe"
                value={signUpData.username}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, username: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>
            {/* EMAIL */}
            <div>
              <label htmlFor="email" className="label label-text">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="john@gmail.com"
                value={signUpData.email}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, email: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>
            {/* PASSWORD */}
            <div>
              <label htmlFor="password" className="label label-text">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="*******"
                value={signUpData.password}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, password: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>
            <span className="text-sm text-gray-300">
              Password must be of at least 6 characters.
            </span>

            <div className="flex gap-2 mt-3">
              <input
                type="checkbox"
                id="terms"
                className="checkbox-primary"
                required
              />
              <label htmlFor="terms" className="text-xs cursor-pointer">
                I agree to the{" "}
                <span className="text-primary hover:underline">
                  terms of service
                </span>{" "}
                and <span className="text-primary hover:underline">policy</span>
              </label>
            </div>

            <button
              type="submit"
              className="btn bg-primary text-black text-[16px] btn-block mt-3 font-medium hover:bg-primary/75"
            >
              {isPending ? (
                <div className="loading loading-spinner loading-xs">
                  Creating Account..
                </div>
              ) : "Create Account"}
            </button>
            <div className="text-center mt-4">
              <p className="text-sm">
                Already have an account?
                <Link to="/login" className="text-primary hover:underline pl-1">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="hidden md:block md:w-1/2 bg-primary/50 rounded-2xl relative">
          <img
            src="./sign-up.png"
            alt="Landing image"
            className="h-[500px] object-cover w-full rounded-t-2xl"
          />
          <span className="absolute text-lg text-center w-full bottom-5 font-medium">
            Practice conversations, make friends, and improve language skills
            together
          </span>
        </div>
      </div>
    </div>
  );
}
