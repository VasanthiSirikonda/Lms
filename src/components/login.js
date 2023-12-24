import LockIcon from "@mui/icons-material/Lock";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Grid from "@mui/joy/Grid";
import MuiAlert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import { useState } from "react";
import { userForgotPasswordMail, verifyAuth } from "../services/auth";
import "../styles/login.css";
import { grey } from "@mui/material/colors";
import { Typography } from "@mui/material";

export default function Login(props) {
  const [values, setValues] = useState({ username: "", password: "" });
  const [forgotPasswordMail, setForgotPasswordMail] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [buttonName, setButtonName] = useState("LOGIN");
  // const [loggedInUserName, setLoggedInUserName] = useState("");


  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const storeForgotMail = (event) => {
    let email = event.target.value;
    setForgotPasswordMail(email);
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const login = () => {
    if (buttonName === "LOGIN") {
      if (values.username !== "" && values.password !== "") {
        verifyAuth(values)
          .then((res) => {
            console.log(res.data)
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("username", res.data.userDetails.username);
            sessionStorage.setItem(
              "authorities",
              JSON.stringify(res.data.userDetails.authorities)
            );

            // setLoggedInUserName(res.data.userDetails.username);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
            setSeverity("error");
            setOpen(true);
          });
      } else if (
        values.username === "" &&
        values.password === "" &&
        !sessionStorage.getItem("id")
      ) {
        setSeverity("error");
        setMessage("Please enter Username and Password!");
        setOpen(true);
      }
    } else {
      sendEmail();
    }
  };

  const cancel = () => {
    setForgotPassword(false);
    setButtonName("LOGIN");
  };

  const sendEmail = () => {
    let cred = { username: values.username, email: forgotPasswordMail };
    userForgotPasswordMail(cred)
      .then((res) => {
        props.history.push("/resetPassword");
      })
      .catch((error) => {
        setSeverity("error");
        setMessage("Something went wrong!");
        setOpen(true);
      });
  };

  const handleChangeForm = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
    setButtonName("SEND EMAIL");
  };

  return (

    

    <div className="loginScreen">

      <div className="d-flex mb-4">
        <img
          style={{ width: "50px" }}
          src="/images/lib.png"
          alt=""
        />

        {/* <Typography variant= "subtitle1" sx={{textAlign: "center", color:"white"}}>
          {loggedInUserName}
        </Typography> */}

        <h3 className="text-black mt-4 mb-0"><b>LIBRARY MANAGEMENT SYSTEM</b></h3>
      </div>

      <Grid container justifyContent="center" alignItems="center" style={{ height: "80vh" }}>
        <Card>
          <CardContent>
            <Box className="p-3">
              {/* <h2 className="text-center mb-4" style={{ color: "black" }}>Login</h2> */}
              {forgotPassword && <h4 className="mb-4 pointer">Forgot Password?</h4>}
              <h4 className="text-center" style={{ color: "black" }}>
                Login 
              </h4>
              <hr style={{ background: 'black', color: 'black', borderColor: 'black', height: '3px' }} />

              
              <div className="position-relative mb-3">
                <span className="position-absolute py-1" style={{ left: 5, top: 7 }}>
                  <PersonIcon style={{ color: "#0d0d0d" }} />
                </span>
                <input
                  type="text"
                  className="form-control rounded px-5 border-0"

                  style={{ height: "50px" }}
                  placeholder="Username"
                  onChange={handleChangeForm("username")}
                />
              </div>
              {!forgotPassword && (
                <div className="position-relative mb-3">
                  <span className="position-absolute py-1" style={{ left: 5, top: 7 }}>
                    <LockIcon style={{ color: "#0d0d0d" }} />
                  </span>
                  <input
                    type="password"
                    className="form-control rounded px-5 border-0"
                    style={{ height: "50px" }}
                    placeholder="Password"
                    onChange={handleChangeForm("password")}
                  />
                </div>
              )}
              {forgotPassword && (
                <div className="position-relative mb-3">
                  <span className="position-absolute py-1" style={{ left: 5, top: 7 }}>
                    <MailIcon style={{ color: "#fff" }} />
                  </span>
                  <input
                    type="text"
                    className="form-control rounded-pill px-5 border-0"
                    style={{ height: "50px" }}
                    placeholder="Mail"
                    onChange={storeForgotMail}
                  />
                </div>
              )}
              {!forgotPassword && (
                <div className="d-flex justify-content-between">
                  <FormControlLabel
                    control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
                    label="Remember me"
                  />
                  <p className="mt-3 pointer" onClick={handleForgotPassword}>
                    Forgot Password?
                  </p>
                </div>
              )}
              <div className="d-flex justify-content-center">
                <Button
                  variant="contained"
                  style={{ backgroundColor: "red", padding: "10px 50px", fontSize: "1.2rem" }}
                  type="submit"
                  className="rounded-pill me-1"
                  onClick={login}
                >
                  {buttonName}
                </Button>

                {forgotPassword && (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "red", padding: "15px 30px", fontSize: "1.2rem" }}
                    type="submit"
                    className="rounded-pill"
                    onClick={cancel}
                  >
                    CANCEL
                  </Button>
                )}
                <Snackbar
                  open={open}
                  autoHideDuration={3000}
                  onClose={handleSnackbarClose}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  className="snackbar-root"
                >
                  <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={severity}>
                    {message}
                  </MuiAlert>
                </Snackbar>
              </div>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}