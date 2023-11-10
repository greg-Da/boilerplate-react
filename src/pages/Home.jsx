import { Button } from "@mui/material";
import getFetch from "../utils/getFetch";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AlertContext } from "../components/Alert";

export default function Home() {
  const [data, setData] = useState(null);
  const {setAlert} = useContext(AlertContext);
  
  useEffect(() => {
    getFetch("https://randomuser.me/api").then((data) => setData(data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button onClick={() => setAlert({text:"test", type:"success"})} variant="contained">
        Button
      </Button>
      {data && (
        <div>
          <p>{data.results[0].gender}</p>
          <p>{data.results[0].email}</p>
        </div>
      )}
    </div>
  );
}
