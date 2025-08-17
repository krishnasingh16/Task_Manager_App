import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import body from "../assets/body-bg.png";
import logo from "../assets/favicon.png";
import Loader from "../Shared/Loader";
import { endpoint } from "../utils/APIRoutes";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const reqBody = {
        email: values.email,
        password: values.password,
      };
      loginFn(reqBody);
    },
  });

  const loginFn = async (reqBody) => {
    setLoading(true);
    try {
      const response = await axios.post(endpoint?.login_api, reqBody, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      toast(response?.data?.message);
      setLoading(false);
      if (response?.data?.success === true) {
        localStorage.setItem("logindataen", response?.data?.token);
        localStorage.setItem("role", response?.data?.user?.role);
        navigate("/dashboard");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error during login.");
      setLoading(false);
    }
  };

  return (
    <>
      <Loader isLoading={loading} />
      <div
        className="flex justify-center items-center min-h-screen"
        style={{
          backgroundImage: `url(${body})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-lg lg:p-6 p-4 border-border-color-green border rounded-xl shadow-2xl">
          <div className="flex justify-center my-2">
            <img src={logo} alt="Logo" className="h-20  " />
          </div>
          <h2 className="text-xl font-bold text-center text-white mb-6">
            Login to Your Account
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <input
                placeholder="email"
                type="text"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="w-full p-3 mt-1 text-black placeholder:text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008eff] transition duration-300 ease-in-out transform hover:scale-105"
                required
              />
            </div>
            <div className="mb-6">
              <input
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="w-full p-3 mt-1 text-black placeholder:text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008eff] transition duration-300 ease-in-out transform hover:scale-105"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white border-2 border-border-color-green font-semibold rounded-full hover:bg-black bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#128C7E] transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </button>
          </form>
          <div className="">
            <p
              className="text-white text-sm text-right py-2 mx-4 hover:underline cursor-pointer"
            >
              Forget Password ?
            </p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700">
              Don't have an account?{" "}
              <span
                className="text-white cursor-pointer hover:underline"
                onClick={() => navigate("/register")}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
