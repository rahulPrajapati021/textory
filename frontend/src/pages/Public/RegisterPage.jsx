import { useState } from "react";
import { Link } from "react-router";
import Navbar from "../../components/App/Navbar";
import { apiService } from "../../service/apiService";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 flex justify-center items-center bg-dark">
        <RegisterForm />
      </div>
    </div>
  );
}

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      name,
      password,
    };
    console.log(data);
    const response = await apiService.register(email, password, name);
    console.log(response);
    if(response) {
      setMessage(response.message);
    }
    setEmail("");
    setName("");
    setPassword("");
  };

  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if(passwordRegex.test(e.target.value)) {
      setIsPasswordStrong(true);
    }
    else {
      setIsPasswordStrong(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-xl flex space-y-4 flex-col bg-[#121212] border border-stone-800 p-4 text-white rounded-lg"
    >
      <legend className="text-center text-2xl font-bold py-3">
        Create new Account
      </legend>
      {message?<span className="text-green-500 text-center">{message}</span>:""}
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Enter Your Name"
        min={10}
        max={100}
        className="border-2 rounded-md px-4 py-2 outline-none"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        name="email"
        id="email"
        required
        placeholder="Enter Email"
        className="border-2 rounded-md px-4 py-2 outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        id="password"
        required
        placeholder="Enter Password"
        className="border-2 rounded-md px-4 py-2 outline-none"
        value={password}
        onChange={handleOnChangePassword}
      />
      {password.length > 0? isPasswordStrong ? (
        <span className="text-green-600 text-[12px] text-center">
          Password is strong
        </span>
      ) : (
        <span className="text-red-400 text-[12px] text-center">Password must be 8 char long & must contain atleast one alphabet, number & special
          character.</span>
      ):""}
      <div className="flex justify-center">
        <input
          type="submit"
          value="Register"
          className="border-2 inline-block px-4 py-2 rounded-md cursor-pointer"
        />
      </div>

      <div className="text-center">
        <p>
          Already have an account,{" "}
          <Link to={"/login"} className="text-blue-300">
            login here
          </Link>{" "}
        </p>
      </div>
    </form>
  );
}

const styles = {
  input: "border-2",
};
