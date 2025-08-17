import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import body from "../assets/body-bg.png";
import logo from "../assets/favicon.png";
import Loader from "../Shared/Loader";
import { endpoint } from "../utils/APIRoutes";


const Registration = () => {
  const navigate = useNavigate();
  const [loding, setLoading] = useState(false);
  const initialValue = {
    full_name: "",
    email: "",
    phoneNumber: "",
    password: "",
  };
  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      const reqbody = {
        fullname: fk.values.full_name,
        email: fk.values.email,
        phoneNumber: fk.values.phoneNumber,
        password: fk.values.password,
      };
      RegistrationFn(reqbody);
    },
  });
  const RegistrationFn = async (reqbody) => {
    setLoading(true);
    try {
      const response = await axios.post(endpoint?.registration_api, reqbody, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      toast(response?.data?.message);
      setLoading(false);
      if (response?.data?.success === true) {
        fk.handleReset();
        navigate("/login");
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <>
      <Loader isLoading={loding} />
      <div
        className="flex justify-center items-center min-h-screen"
        style={{
          backgroundImage: `url(${body})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >

        <div
          className="w-full max-w-lg lg:p-6 p-4 border-border-color-green border rounded-xl shadow-2xl"
        >
          <div className="flex justify-center my-2">
            <img src={logo} alt="Logo" className="h-14 w-16" />
          </div>
          <h2 className="text-sm font-bold text-center text-white mb-6">
            You might have already account ?
            <span
              className="text-black text-sm px-2 font-bold underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </h2>
          <form onSubmit={fk.handleSubmit}>
            <div className="grid grid-cols-2 place-items-center gap-2">
              <div className="mb-4">
                <input
                  placeholder="Email Id"
                  type="email"
                  id="email"
                  name="email"
                  value={fk.values.email}
                  onChange={fk.handleChange}
                  className="w-full p-3 mt-1 text-black placeholder:text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-border-color-green transition duration-300 ease-in-out transform hover:scale-105"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  placeholder="Full Name"
                  id="full_name"
                  name="full_name"
                  value={fk.values.full_name}
                  onChange={fk.handleChange}
                  className="w-full p-3 mt-1 border text-black placeholder:text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-border-color-green transition duration-300 ease-in-out transform hover:scale-105"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  placeholder="phoneNumber"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={fk.values.phoneNumber}
                  onChange={fk.handleChange}
                  className="w-full p-3 mt-1 border text-black placeholder:text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-border-color-green transition duration-300 ease-in-out transform hover:scale-105"
                  required
                />
              </div>
                  <div className="mb-6">
                <input
                  placeholder="Password"
                  id="password"
                  value={fk.values.password}
                  onChange={fk.handleChange}
                  className="w-full p-3 mt-1 border text-black placeholder:text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-border-color-green transition duration-300 ease-in-out transform hover:scale-105"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white border-2 border-border-color-green font-semibold rounded-full hover:bg-black bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#128C7E] transition duration-300 ease-in-out transform hover:scale-105"
              onClick={fk.handleSubmit}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
