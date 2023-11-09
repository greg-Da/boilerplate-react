import { PropTypes } from "prop-types";
import * as React from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

AlertBox.proptypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default function AlertBox({ text, type }) {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="z-50 absolute w-full">
      <Collapse className="max-w-md md:max-w-lg m-auto" in={open}>
        <Alert
          severity={type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <i className="fa-solid fa-x"></i>
            </IconButton>
          }
        >
          {text}
        </Alert>
      </Collapse>
    </div>
  );
}
