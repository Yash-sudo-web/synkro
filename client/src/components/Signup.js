import React from "react";
import facebook from "../assets/facebook.png";
import google from "../assets/google.jpg";
import logo from "../assets/logo.png";
import arrow from "../assets/arrow.png"
import arrowgray from "../assets/arrowgray.png"
import { Link } from "react-router-dom";
import "../index.css";
import { useState } from "react";
const Signup = () => {
  const [email, setEmail] = useState('');
  const [isEmailFilled, setIsEmailFilled] = useState(false);
  const [isAuthFilled, setIsAuthFilled] = useState(false);
  const [isUserNameFilled, setIsUserNameFilled] = useState(false);
  const [isPasswordFilled, setIsPasswordFilled] = useState(false);
  const [data, setdata] = useState({
    emailreq: "",
    userName: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    location: "",
})
  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsEmailFilled(newEmail !== "");
  };

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    data.emailreq = email;
  };
  const handleAuthSubmit = (event) => {
    event.preventDefault();
    setIsAuthFilled(true);
  };
  const handleInputChange = ({ currentTarget: input }) => {
    setdata({ ...data, [input.name]: input.value });
  
    if (input.name === 'userName') {
      setIsUserNameFilled(input.value !== '');
    }
    if (input.name === 'password') {
      setIsPasswordFilled(input.value !== '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    console.log(json);
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
      {/* upper logo part */}
      <div className="border-b-[1px] border-[#525252] text-white h-[60px] flex items-center">
        <div className="w-[32px] flex flex-row ml-4">
          <img src={logo} alt="logo" />
          <div className="ml-2 text-3xl">Synkro</div>
        </div>
      </div>

      <div className="flex flex-row h-screen">
        {/* left div */}
        <div className="text-white border-r-[1px] border-[#525252] h-[100%] w-[25%] relative flex justify-center">
          <div className="absolute top-[60px] flex flex-col">
            <p className="text-[44px]">
              Synkro your chats
              <br /> with us.
            </p>
            <p className="font-semibold pt-[20px] pb-[20px] text-[15px] text-[#9b9b9b]">
              "Embrace the World of Infinite Connections:
              <br /> Chat, Share Pictures, Share Videos - Unleashing
              <br /> Moments Across the Globe, Anytime, Anywhere!"
            </p>
            <div className="hover:cursor-pointer border border-[#525252] w-[340px] rounded-lg h-[50px] flex flex-row justify-between items-center mb-6">
              <div className="ml-3">
                <img width={24} height={24} src={google}></img>
              </div>
              <div className="mr-[27px]" onClick={handleGoogleAuth}>
                <p>Sign in with Google</p>
              </div>
              <div></div>
            </div>
            <div className="hover:cursor-pointer border border-[#525252] w-[340px] rounded-lg h-[50px] flex flex-row justify-between items-center mb-6">
              <div className="ml-3">
                <img width={24} height={24} src={facebook}></img>
              </div>
              <div className="mr-3" onClick={handleFacebookAuth}>
                <p>Sign in with Facebook</p>
              </div>
              <div></div>
            </div>
            <div className="flex flex-row">
              <hr class="h-px w-[144px] my-3 mr-4 bg-[#525252] border-0"></hr>Or
              <hr class="h-px w-[144.5px] my-3 ml-4 bg-[#525252] border-0"></hr>
            </div>
            <div>
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
                  placeholder="test@gmail.com"
                  value={email}
                  onChange={handleEmailChange}
                ></input>
                <div className="pt-2">
                  <button
                    className={`font-bold border border-[#525252] w-[340px] h-[50px] rounded-lg ${
                      isEmailFilled
                        ? "bg-[#a2fe65] text-[#0a0a0a] hover:cursor-pointer hover:bg-[#77cc3a]"
                        : "bg-[#141414] text-[#525252] cursor-not-allowed"
                    }`}
                    disabled={!isEmailFilled}
                    onClick={handleEmailSubmit}
                  >
                    Get Started
                  </button>
                </div>
              </form>
              <br />
              <p className="text-[#9b9b9b] font-semibold">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="text-[#a2fe65] font-semibold hover:cursor-pointer">
                    Login
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* right div */}
        <div className="flex justify-center h-[100%] w-[75%]">
          {/* <div className="text-white text-4xl">
            Welcome to Synkro! Start your journey by entering your email
            address.
          </div> */}
          {data.emailreq && (
            <div className="text-white text-2xl">{data.emailreq}</div>
          )}
          {!isAuthFilled && (
            <>
              <div className="bg-[#18181b] h-[75%] w-[60%] relative flex flex-col items-center justify-center rounded-2xl top-[10%]">
                <div className="text-white font-bold text-5xl absolute top-[6%]">
                  Enter your authentication details
                </div>
                <label className="font-semibold text-2xl text-white">
                  Username<span className="text-[#a2fe65]">*</span>
                </label>
                <input
                  name="userName"
                  type="text"
                  className="bg-[#0a0a0a] pl-3 mt-1 mb-5 border border-[#525252] w-[50%] h-[32px] text-white custom-placeholder"
                  placeholder="Your Username"
                  value={data.userName}
                  onChange={handleInputChange}
                  required
                ></input>

                <label className="font-semibold text-2xl text-white">
                  Password<span className="text-[#a2fe65]">*</span>
                </label>

                <input
                  name="password"
                  type="password"
                  className="bg-[#0a0a0a] pl-3 mt-1 mb-5 border border-[#525252] w-[340px] h-[32px] text-white custom-placeholder"
                  placeholder="Your Password"
                  value={data.password}
                  onChange={handleInputChange}
                  required
                ></input>
                <button onClick={handleAuthSubmit}
                  className={`border border-[#525252] w-[10%] h-[10%] flex justify-center items-center rounded-lg ${
                    isUserNameFilled && isPasswordFilled
                      ? "bg-[#a2fe65] text-[#0a0a0a] hover:cursor-pointer hover:bg-[#77cc3a]"
                      : "bg-[#141414] text-[#525252] cursor-not-allowed"
                  }`}
                  disabled={!isUserNameFilled || !isPasswordFilled}
                >
                  <img
                    src={isUserNameFilled && isPasswordFilled ? arrow : arrowgray}
                    className="w-[48px] h-[48px]"
                    alt="Next Arrow"
                  />
                </button>
              </div>
            </>
          )}

          {isAuthFilled && (
            <>
              <div className="bg-[#18181b] h-[75%] w-[60%] relative flex flex-col items-center justify-center rounded-2xl top-[10%]">
                <div className="text-white font-bold text-5xl absolute top-[6%]">
                  Enter your authentication details
                </div>
                <label>
                  Phone Number<span className="text-[#a2fe65]">*</span>
                </label>

                <input
                  name="phoneNumber"
                  type="tel"
                  className="bg-[#0a0a0a] pl-3 mt-1 mb-5 border border-[#525252] w-[340px] h-[32px] text-white custom-placeholder"
                  placeholder="Your Phone Number"
                  value={data.phoneNumber}
                  onChange={handleInputChange}
                  required
                ></input>

                <label>Date of Birth</label>

                <input
                  name="dateOfBirth"
                  type="date"
                  className="bg-[#0a0a0a] pl-3 mt-1 mb-5 border border-[#525252] w-[340px] h-[32px] text-white custom-placeholder"
                  value={data.dateOfBirth}
                  onChange={handleInputChange}
                  required
                ></input>

                <label>Gender</label>

                <select
                  name="gender"
                  className="bg-[#0a0a0a] pl-3 mt-1 mb-5 border border-[#525252] w-[340px] h-[32px] text-white custom-placeholder"
                  value={data.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                <label>Location</label>

                <input
                  name="location"
                  type="text"
                  className="bg-[#0a0a0a] pl-3 mt-1 mb-5 border border-[#525252] w-[340px] h-[32px] text-white custom-placeholder"
                  placeholder="Your Country"
                  value={data.location}
                  onChange={handleInputChange}
                  required
                ></input>
                <button
                  type="submit"
                  className="bg-[#a2fe65] hover:bg-[#77cc3a] py-2 px-4 text-black rounded-full cursor-pointer w-[100px]"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
              </div>
            </>
          )}

          {/* <form className="text-white flex flex-col">
            <label>
              Username<span className="text-[#a2fe65]">*</span>
            </label>
            <input
              name="userName"
              type="text"
              className="bg-[#0a0a0a] pl-3 mt-1 mb-5 border border-[#525252] w-[340px] h-[32px] text-white custom-placeholder"
              placeholder="Your Username"
              value={data.userName}
              onChange={handleInputChange}
              required
            ></input>

            <label>
              Password<span className="text-[#a2fe65]">*</span>
            </label>

            <input
              name="password"
              type="password"
              className="bg-[#0a0a0a] pl-3 mt-1 mb-5 border border-[#525252] w-[340px] h-[32px] text-white custom-placeholder"
              placeholder="Your Password"
              value={data.password}
              onChange={handleInputChange}
              required
            ></input>

            <label>
              Phone Number<span className="text-[#a2fe65]">*</span>
            </label>

            <input
              name="phoneNumber"
              type="tel"
              className="bg-[#0a0a0a] pl-3 mt-1 mb-5 border border-[#525252] w-[340px] h-[32px] text-white custom-placeholder"
              placeholder="Your Phone Number"
              value={data.phoneNumber}
              onChange={handleInputChange}
              required
            ></input>

            <label>Date of Birth</label>

            <input
              name="dateOfBirth"
              type="date"
              className="bg-[#0a0a0a] pl-3 mt-1 mb-5 border border-[#525252] w-[340px] h-[32px] text-white custom-placeholder"
              value={data.dateOfBirth}
              onChange={handleInputChange}
              required
            ></input>

            <label>Gender</label>

            <select
              name="gender"
              className="bg-[#0a0a0a] pl-3 mt-1 mb-5 border border-[#525252] w-[340px] h-[32px] text-white custom-placeholder"
              value={data.gender}
              onChange={handleInputChange}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label>Location</label>

            <input
              name="location"
              type="text"
              className="bg-[#0a0a0a] pl-3 mt-1 mb-5 border border-[#525252] w-[340px] h-[32px] text-white custom-placeholder"
              placeholder="Your Country"
              value={data.location}
              onChange={handleInputChange}
              required
            ></input>

            <button
              type="submit"
              className="bg-[#a2fe65] hover:bg-[#77cc3a] py-2 px-4 text-black rounded-full cursor-pointer w-[100px]"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </form> */}
        </div>
      </div>
    </>
  );
};

export default Signup;
