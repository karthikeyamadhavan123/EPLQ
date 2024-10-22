import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("user"); // Default role is 'user'

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          role: role, // Save role to Firestore
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-8"
    >
      <h3 className="text-2xl font-semibold mb-6 text-center">Sign Up</h3>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          First name
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Last name
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email address
        </label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select Role
        </label>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="user"
            name="role"
            value="user"
            className="mr-2"
            checked={role === "user"}
            onChange={() => setRole("user")}
          />
          <label htmlFor="user" className="text-gray-700">
            User
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="admin"
            name="role"
            value="admin"
            className="mr-2"
            checked={role === "admin"}
            onChange={() => setRole("admin")}
          />
          <label htmlFor="admin" className="text-gray-700">
            Admin
          </label>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Sign Up
        </button>
      </div>

      <p className="text-sm text-gray-600 mt-4 text-center">
        Already registered?{" "}
        <a href="/login" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
    </form>
  );
}

export default Register;
