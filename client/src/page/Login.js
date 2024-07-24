import React, { useState } from "react";
import { BiShowAlt } from "react-icons/bi";
import loginSignUpImage from "../assest/login-animation.gif";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
          data
        );
        if (response.data.success) {
          toast.success(userData.firstName + response.data.message);
          dispatch(loginRedux(response.data));
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please fill all the fields.");
    }
  };
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow flex m-auto">
          <img
            src={loginSignUpImage}
            alt="loginSignUpImage"
            className="w-full"
          />
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="max-w-[150px] w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-left text-base mt-2">
          New user register here.?{" "}
          <Link to={"/signUp"} className="text-red-500 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
