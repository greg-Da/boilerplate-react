import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import allFetch from "../utils/allFetch";
import Cookies from "js-cookie";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    const data = {
      name,
      email,
      password,
    };
    allFetch("", "post", data, "").then((data) => {
      console.log(data);
      Cookies.set("token", data.jwt, { expires: 1, sameSite: "strict" });
    });
  }

  return (
    <div className="m-auto w-4/6">
      <Card className="p-10">
        <h1 className="text-center mb-5 font-bold text-3xl">Register</h1>
        <form className="grid gap-y-5">
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
          />
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
          />
          <div className="flex justify-center">
            <Button onClick={() => handleSubmit()} variant="contained">
              Register
            </Button>
          </div>
        </form>
        <small className="mt-5">
          Already have an account?{" "}
          <Link className="underline" to={"/login"}>
            Login
          </Link>
        </small>
      </Card>
    </div>
  );
}
