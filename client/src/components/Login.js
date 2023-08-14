import React from "react";
import logo from "../assets/logo.png";
import google from "../assets/google.jpg";
import facebook from "../assets/facebook.png";
import { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [isEmailFilled, setIsEmailFilled] = useState(false);
  const [pass, setPass] = useState("");
  const [isPassFilled, setIsPassFilled] = useState(false);

  const handlePassChange = (event) => {
    const newPass = event.target.value;
    setPass(newPass);
    setIsPassFilled(newPass !== "");
  };
  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsEmailFilled(newEmail !== "");
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({ 'email':email, 'password':pass }),
    });
    const data = await response.json();
    if(data.success){
      window.location.href = "http://localhost:3000/redirect?Id="+data.token;
    }
  };
  const handleGoogleAuth  = async (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:5000/api/user/google"
  };
  const handleFacebookAuth  = async (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:5000/api/user/facebook"
  };
  return (
    <>
      <div className="border-b-[1px] border-[#525252] text-white h-[60px] flex items-center">
        <div className="w-[32px] flex flex-row ml-4">
          <img src={logo} alt="logo" />
          <div className="ml-2 text-3xl">Synkro</div>
        </div>
      </div>
      <div className="h-[80vh] flex items-center justify-center">
        <div className="w-[1000px] h-[600px] bg-[#0a0a0a] flex flex-col items-center">
          <div className="text-white text-[44px]">Log in to Synkro</div>
          <br />
          <div className="text-white">
            <form className="mt-3">
              <label>
                Email<span className="text-[#a2fe65]">*</span>
              </label>
              <br />
              <input
                name="email"
                type="email"
                autoComplete="email"
                className="bg-[#0a0a0a] pl-3 mt-1 mb-5 border border-[#525252] w-[340px] h-[32px] text-white custom-placeholder"
                placeholder="test@mail.com"
                value={email}
                onChange={handleEmailChange}
              ></input>
              <br />
              <label>
                Password<span className="text-[#a2fe65]">*</span>
              </label>
              <br />
              <input
                name="password"
                type="password"
                className="bg-[#0a0a0a] pl-3 mt-1 mb-5 border border-[#525252] w-[340px] h-[32px] text-white custom-placeholder"
                placeholder="Your Password"
                value={pass}
                onChange={handlePassChange}
              ></input>
              <br />
              <div className="">Forgot your password?</div>
              <div className="pt-5 pb-3">
                <button onClick={handleLogin}
                  className={`font-bold border border-[#525252] w-[340px] h-[50px] rounded-lg ${
                    isEmailFilled && isPassFilled
                      ? "bg-[#a2fe65] text-[#0a0a0a] hover:cursor-pointer"
                      : "bg-[#141414] text-[#525252] cursor-not-allowed"
                  }`}
                  disabled={!isEmailFilled || !isPassFilled}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-row text-white">
              <hr class="h-px w-[144px] mt-3 mb-6 mr-4 bg-[#525252] border-0"></hr>Or
              <hr class="h-px w-[144.5px] mt-3 mb-6 ml-4 bg-[#525252] border-0"></hr>
            </div>
            <div className="hover:cursor-pointer border border-[#525252] w-[340px] rounded-lg h-[50px] flex flex-row justify-between items-center mb-6">
              <div className="ml-3">
                <img width={24} height={24} src={google}></img>
              </div>
              <div className="mr-[27px] text-white" onClick={handleGoogleAuth}>
                <p>Sign in with Google</p>
              </div>
              <div></div>
            </div>
            <div className="hover:cursor-pointer border border-[#525252] w-[340px] rounded-lg h-[50px] flex flex-row justify-between items-center mb-6">
              <div className="ml-3">
                <img width={24} height={24} src={facebook}></img>
              </div>
              <div className="mr-3 text-white" onClick={handleFacebookAuth}>
                <p>Sign in with Facebook</p>
              </div>
              <div></div>
            </div>
            <div className="text-[#9b9b9b] font-semibold">New to Synkro? <Link to="/"><span className="text-[#a2fe65]">Sign up</span></Link></div>
        </div>
      </div>
    </>
  );
};

export default Login;
