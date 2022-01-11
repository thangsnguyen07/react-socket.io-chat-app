import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

import { Link, useNavigate } from "react-router-dom";

import { Spin } from "antd";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const {
    auth: { isAuthenticated, authLoading },
    loginUser,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    // Check auth user
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setLoginData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(loginData);
  };

  let body;

  if (authLoading) {
    body = <Spin />;
  } else {
    body = (
      <div className="w-full max-w-md px-16 py-10 bg-white rounded-lg">
        <h1 className="mt-4 mb-12 text-2xl font-medium text-center text-primary">
          Log in to your account 🔐
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Username</label>
            <input
              name="username"
              type="text"
              className="w-full p-2 mb-4 text-sm transition duration-150 ease-in-out border rounded-md outline-none text-primary"
              placeholder="Your Username"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              className="w-full p-2 mb-4 text-sm transition duration-150 ease-in-out border rounded-md outline-none text-primary"
              placeholder="Your Password"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center mt-6">
            <button className="px-6 py-2 text-sm text-white bg-green-500 rounded">
              Login
            </button>
          </div>
          <div className="flex justify-between mt-6">
            <p>Do not have an account?</p>
            <Link to="/register">
              <button className="px-4 py-1 text-sm text-white bg-green-500 rounded">
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-700">
      {body}
    </div>
  );
};

export default Login;
