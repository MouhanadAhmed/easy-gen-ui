import React from "react";
import { LoggedInUser } from "../../types/user";
import { authClient } from "../../lib/auth/client";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


let userName = "";
let userEmail = "";

function ApplicationPage() {
    const navigate= useNavigate();
    let loggedUserData: string | null = null;
    if (typeof window !== "undefined") {
    loggedUserData = localStorage.getItem("custom-auth-user");
    }

    const userData = loggedUserData
    ? (JSON.parse(loggedUserData) as LoggedInUser)
    : undefined;
    if (userData) {
    userName = userData?.name ?? "";
    userEmail = userData?.email ?? "";
    }else{
         navigate('/');
        toast.error("You must login first " , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
       
    }
React.useEffect(()=>{
    if (!userData){
        navigate('/');
        toast.error("You must login first " , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
       
    }
},[])


  const onLogout =async()=>{
    const { error } = await authClient.signOut();
    if (error) {
        toast.error("Error: " + error.toString(), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }else{
       
          navigate("/");
          toast.success("Logged out!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      }
    console.log("logout")
  }
  
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to the Application</h1>
        <p className="text-gray-600 my-2 ">Hello, <span className="font-semibold">{userName}</span>!</p>
        <p className="text-gray-500 text-sm">{userEmail}</p>
        <button
          onClick={onLogout}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Logout
        </button>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ApplicationPage;
