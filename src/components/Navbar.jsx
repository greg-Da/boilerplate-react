import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { useState, useRef, useEffect } from "react";
import checkAuth from "../utils/checkAuth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../state/auth/authSlice";

Navbar.proptypes = {
  mode: PropTypes.bool.isRequired,
  onSwitchChange: PropTypes.func.isRequired,
};

export default function Navbar({ mode, onSwitchChange }) {

    let navigate = useNavigate()
    let dispatch = useDispatch()

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleLogout = async (e) => {
    await handleClose(e)
    dispatch(logOut())
    
    navigate('/')
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <nav className="min-h-[5vh] flex justify-between p-2 shadow-lg border-b-2 border-black">
      <div>
        <Link className="font-bold text-3xl" to={"/"}>
          Home
        </Link>
      </div>

      <div className="flex">
        {mode === true ? (
          <i
            onClick={() => onSwitchChange(!mode)}
            className="my-auto mr-2 text-xl fa-solid fa-sun"
          ></i>
        ) : (
          <i
            onClick={() => onSwitchChange(!mode)}
            className="my-auto mr-2 text-xl fa-solid fa-moon"
          ></i>
        )}

        {checkAuth() ? (
          <Stack direction="row" spacing={2}>
            <div
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              {/* ///////////////////////////////
              {currentUser.avatar ? 
              <img src={avatar} alt="Profile Pic" />
              :
              ...
            }
              /////////////////////////////// */}
              <i className="text-3xl cursor-pointer mt-1 mr-2 fa-solid fa-circle-user"></i>
            </div>
            <Popper
            className='z-50'
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        id="composition-menu"
                        aria-labelledby="composition-button"
                      >
                        <MenuItem onClick={handleClose}>
                          <Link to={"/profile"}>
                            Profile
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={(e)=> handleLogout(e)}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Stack>
        ) : (
          <div id="authLink" className="flex my-auto">
            <Link to={"/register"}>Register</Link>
            <Link className="mx-4" to={"/login"}>
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
