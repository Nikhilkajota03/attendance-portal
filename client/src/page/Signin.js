import "../index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Signin = () => {

  const navigate = useNavigate();
 
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const addAdmin = async (e) => {
    e.preventDefault();

    try {
      const add = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        {  email, password }
      );

      if (add) {
        message.success("Teacher logged in ");

        setemail("");
       
        setpassword("");

        navigate("/home");
      } else {
        message.error("please check credential");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <!-- component --> */}

      <div className="bg-purple-900 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden">
        <div class="flex justify-center min-h-screen">
          <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5 ">
            <div className="bg-white p-[3rem] rounded-2xl">
              <div class="w-full ">
                <h1 class="text-2xl font-semibold tracking-wider text-black capitalize dark:text-black">
                  Sign in Admin
                </h1>

                <p class="mt-4 text-gray-400">
                  Let’s get you all set up so you can verify your personal
                  account and begin setting up your profile.
                </p>

                <form class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                

                  <div>
                    <input
                      type="email"
                      value={email}
                      placeholder="Email address"
                      className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      value={password}
                      type="password"
                      placeholder="Password"
                      className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>

                  <button
                    class="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-800 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:purple-blue-600 focus:ring-opacity-50"
                    onClick={addAdmin}
                    type="submit"
                  >
                    <span>Sign in </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 rtl:-scale-x-100"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>

                  <button  
                    class="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-800 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:purple-blue-600 focus:ring-opacity-50"
                    onClick={  ()=> {navigate("/signup")}}
                    type="submit"
                  >
                    <span>Sign up </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 rtl:-scale-x-100"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>




                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default Signin;
