import { Card, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import allFetch from "../utils/allFetch";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AlertContext } from "../components/Alert";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../state/auth/authSlice";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = useContext(AlertContext);

  let dispatch = useDispatch()
  let navigate = useNavigate()

  function handleSubmit() {
    const data = {
      identifier,
      password,
    };
    allFetch("http://localhost:1337/api/auth/local", "post", data)
      .then((data) => {
        console.log(data);
        setAlert({ text: "Login successfully", type: "success" });
        Cookies.set("token", data.jwt, { expires: 1, sameSite: "strict" });
        dispatch(logIn(data.user))
        navigate('/')
      })
      .catch(() => setAlert({ text: "error", type: "error" }));
  }

  return (
    <div className="m-auto w-4/6">
      <Card className="p-10">
        <h1 className="text-center mb-5 font-bold text-3xl">Login</h1>
        <form className="grid gap-y-5">
          <TextField
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            type="text"
            placeholder="Enter your username/email"
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
