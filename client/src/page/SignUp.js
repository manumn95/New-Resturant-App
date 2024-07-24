import React, { useState } from "react";
import { BiShowAlt } from "react-icons/bi";
import loginSignUpImage from "../assest/login-animation.gif";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import imagetoBase64 from "../utility/imagetoBase64";
import axios from "axios";
import toast from "react-hot-toast";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProfileImage = async (e) => {
    const data = await imagetoBase64(e.target.files[0]);
    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = data;
    if (firstName && lastName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/signUp`, data);

          if(response.data.success)
          {
            toast.success(response.data.message)
            navigate("/login");
          }
 if(response.data.error)
 {
  toast.error(response.data.message)
 }
         
        } catch (error) {
          console.error("Error during sign up:", error);
          
        }
      } else {
        alert("Pswd not match");
      }
    } else {
      alert("fill all the fields");
    }
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow flex m-auto relative ">
          <img
            src={data.image ? data.image : loginSignUpImage}
            alt="loginSignUpImage"
            className="w-full h-full object-cover"
          />
          <label
            htmlFor="profileImage"
            className="absolute bottom-0 h-1/3 bg-slate-700 w-full text-center cursor-pointer bg-opacity-40"
          >
            <p className="text-sm p-1 text-white font-bold">Upload</p>
            <input
              type="file"
              accept="image/*"
              id="profileImage"
              className="hidden"
              onChange={handleUploadProfileImage}
            ></input>
          </label>
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={data.firstName}
            placeholder="Enter the first name here...."
            className="w-full bg-slate-200 px-1 py-1 rounded mt-1 mb-2 focus-within:outline-blue-300"
            onChange={handleOnChange}
          ></input>

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={data.lastName}
            placeholder="Enter the last name here...."
            className="w-full bg-slate-200 px-1 py-1 rounded mt-1 mb-2 focus-within:outline-blue-300"
            onChange={handleOnChange}
          ></input>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            placeholder="Enter email here...."
            className="w-full bg-slate-200 px-1 py-1 rounded mt-1 mb-2 focus-within:outline-blue-300"
            onChange={handleOnChange}
          ></input>

          <label htmlFor="password">Password</label>
          <div className="flex px-1 py-1 w-full bg-slate-200  rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
              placeholder="Enter the password here...."
              className="w-full bg-slate-200  rounded border-none outline-none"
              onChange={handleOnChange}
            ></input>
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShowAlt /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex px-1 py-1 w-full bg-slate-200  rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={data.confirmPassword}
              placeholder="Enter the confirm password here...."
              className="w-full bg-slate-200  rounded border-none outline-none"
              onChange={handleOnChange}
            ></input>
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShowAlt /> : <BiHide />}
            </span>
          </div>

          <button
            type="submit"
            className="max-w-[150px] w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-2"
          >
            SignUp
          </button>
        </form>
        <p className="text-left text-base mt-2">
          Already have account ?{" "}
          <Link to={"/login"} className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
