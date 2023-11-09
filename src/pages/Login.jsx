import { Card, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import allFetch from "../utils/allFetch";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    const data = {
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
        <h1 className="text-center mb-5 font-bold text-3xl">Login</h1>
        <form className="grid gap-y-5">
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
              Login
            </Button>
          </div>
        </form>
        <small className="mt-5">
          Need an account?{" "}
          <Link className="underline" to={"/register"}>
            Register
          </Link>
        </small>
      </Card>
    </div>
  );
}