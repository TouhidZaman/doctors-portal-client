import Joi from "joi";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../../../../firebase/firebase.init";
import { useLocation, useNavigate } from "react-router-dom";
import useToken from "../../../../../hooks/useToken";

const Login = () => {
   //Sign in with Email and Password
   const [signInWithEmailAndPassword, user, loading, error] =
      useSignInWithEmailAndPassword(auth);

   const [token, tokenLoading] = useToken(user); //Getting Access Token

   //Handling Navigation
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from.pathname || "/";

   useEffect(() => {
      if (token) {
         navigate(from, { replace: true });
      }
   }, [token, navigate, from]);

   //Joi Validation Schema
   const schema = Joi.object({
      password: Joi.string().min(6).max(20).required(),
      email: Joi.string()
         .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
         .required(),
   });

   //React Hook Form
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: joiResolver(schema),
   });

   //Handling Form submit
   const handleLogin = (data) => {
      const { email, password } = data;
      signInWithEmailAndPassword(email, password);
   };

   //Handling loading state
   if (loading || tokenLoading) {
      return <p className="text-3xl text-center my-20">Loading...</p>;
   }

   return (
      <div className="w-3/4 lg:w-1/3 mx-auto my-8">
         <h3 className="my-4 text-2xl">Login Form</h3>
         <form onSubmit={handleSubmit(handleLogin)}>
            <div className="mb-6">
               <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  Your email
               </label>
               <input
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  {...register("email")}
               />
               <p className="text-red-400">{errors.email?.message}</p>
            </div>
            <div className="mb-6">
               <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
               >
                  Your Password
               </label>
               <input
                  id="name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  {...register("password")}
               />
               <p className="text-red-400">{errors.password?.message}</p>
            </div>
            <div className="flex items-start mb-6">
               <div className="flex items-center h-5">
                  <input
                     id="remember"
                     type="checkbox"
                     value=""
                     className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  />
               </div>
               <label
                  htmlFor="remember"
                  className="ml-2 text-sm font-medium text-gray-900"
               >
                  Remember me
               </label>
            </div>
            {error && <p className="text-red-400">{error?.message}</p>}
            <input
               className="btn btn-active btn-accent"
               type="submit"
               value={"login"}
            />
         </form>
      </div>
   );
};

export default Login;
