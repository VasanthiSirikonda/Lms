import LockIcon from "@mui/icons-material/Lock";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import SourceIcon from "@mui/icons-material/Source";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardCover from "@mui/joy/CardCover";
import Grid from "@mui/joy/Grid";
import Box from "@mui/material/Box";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/auth";
//import './registration.css';
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";

export default function Registration(props) {

  const [values, setValues] = React.useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    businessPurpose: "",
    status: "pending",
    role: "user",
  });
  const [errors, setErrors] = React.useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChangeForm = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    if (
      name === "fname" ||
      name === "lname" ||
      name === "username" ||
      name === "email"
    ) {
      if (values[name].length >= 2) {
        setErrors({ ...errors, [name]: "" });
      }
    }
    if (name === "mobile") {
      if (values[name].length >= 9) {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.fname.length < 3) {
      setErrors((prevUser) => ({
        ...prevUser,
        ["fname"]: "Should Contain 3 letters",
      }));
    }
    if (values.lname.length < 3) {
      setErrors((prevUser) => ({
        ...prevUser,
        ["lname"]: "Should Contain 3 letters",
      }));
    }
    if (values.username.length < 3) {
      setErrors((prevUser) => ({
        ...prevUser,
        ["username"]: "Should Contain 3 letters",
      }));
    }
    if (values.email.length < 3) {
      setErrors((prevUser) => ({
        ...prevUser,
        ["email"]: "Should Contain 3 letters",
      }));
    }
    if (values.password != values.confirmPassword) {
      setErrors((prevUser) => ({
        ...prevUser,
        ["confirmPassword"]: "Password should match",
      }));
    }
    if (values.password === values.confirmPassword) {
      setErrors((prevUser) => ({ ...prevUser, ["confirmPassword"]: "" }));
    }
    if (values.mobile.length != 10) {
      setErrors((prevUser) => ({
        ...prevUser,
        ["mobile"]: "Please Enter 10 digit Phone number",
      }));
    }

    registerUser(values)
      .then((res) => {
        setSeverity("success");
        setMessage("User registered successfully!");
        setOpen(true);
        setValues({})
        // setTimeout(() => {
        //   props.history.push("/");
        // }, 1000);
      })
      .catch((error) => {
        setSeverity("error");
        setMessage("Something went wrong!");
        setOpen(true);
      });
  };
  return (
    
    <div className="registrationScreen">
      <div className="d-flex mb-4">
        <img
          style={{ width: "50px" , height: "50px", marginTop:"auto"}}
          src="/images/lib.png"
          alt=""
        />
        <h3 className="text-black mt-4 mb-0"><b>LIBRARY MANAGEMENT SYSTEM</b></h3>
      </div>
      <Card
        // component="li"
        // orientation="horizontal"
        // className="p-0"
        // sx={{
        //   flexGrow: 1,
        //   flexDirection: "column",
        //   justifyContent: "center",
        // }}

      component="li"
      className="p-0"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1em',
        margin: 'auto',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
        borderRadius: '10px',
        width: '80%', // Adjust this value to change the width
        height: '90%', 
      }}
      >
        <CardCover>
          <video autoPlay loop muted>
            <source src="/videos/lib.mp4" type="video/mp4" />
          </video>
        </CardCover>
        <CardContent>
          <Grid
            container
            className="d-flex justify-content-end"
            sx={{ flexGrow: 1 }}
          >
            <div
              className="border p-4 rounded"
              style={{ background: "rgba(0, 0, 0, 0.5)" }}
            >
              <Box
                // sx={{
                //   width: 600,
                //   // backgroundColor: "#fff",
                //   // background:
                //   //   "linear-gradient(52deg, #fbfbfb 20%, #fca0a0 75%)",
                // }}
                className="p-3 rounded">

                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                    <Grid md={12} xs={12}>
                      <div className="ms-2">

                        <p className="text-start fs-3 mb-0 fw-bold text-white">
                          Register an account
                        </p>

                        <p className="text-start text-white">Let's get started!</p>

                      </div>
                    </Grid>
                    <Grid md={6} xs={12}>
                      <TextField
                        onChange={handleChangeForm("fname")}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon style={{ color: 'white' }}/>
                            </InputAdornment>
                          ),
                          style: { color: 'white' } // Add this line
                        }}
                        id="outlined-basic"
                        style={{ width: "100%", color: 'white' }} // Add color: 'white' here
                        className="mb-3"
                        label="Firstname"
                        variant="outlined"
                        color="secondary"
                        helperText={errors.fname ? errors.fname : ""}
                        required
                        error={errors.fname}
                        InputLabelProps={{ style: { color: 'white' } }} // Add this line
                        FormHelperTextProps={{ style: { color: 'white' } }} // Add this line
                      />

                    </Grid>
                    <Grid md={6} xs={12}>
                      <TextField
                        onChange={handleChangeForm("lname")}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon style={{ color: 'white' }} />
                            </InputAdornment>
                          ), style: { color: 'white' }
                        }}
                        id="outlined-basic"
                        style={{ width: "100%", color: 'white' }}
                        className="mb-3"
                        label="Lastname"
                        variant="outlined"
                        color="secondary"
                        helperText={errors.lname ? errors.lname : ""}
                        required
                        error={errors.lname}
                        InputLabelProps={{ style: { color: 'white' } }} // Add this line
                        FormHelperTextProps={{ style: { color: 'white' } }}
                      />
                    </Grid>
                    <Grid md={6} xs={12}>
                      <TextField
                        onChange={handleChangeForm("username")}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon style={{ color: 'white' }}/>
                            </InputAdornment>
                          ), style: { color: 'white' }
                        }}
                        id="outlined-basic"
                        style={{ width: "100%", color: 'white' }}
                        className="mb-3"
                        label="Username"
                        variant="outlined"
                        color="secondary"
                        helperText={errors.username ? errors.username : ""}
                        required
                        error={errors.username}
                        InputLabelProps={{ style: { color: 'white' } }} // Add this line
                        FormHelperTextProps={{ style: { color: 'white' } }}
                      />
                    </Grid>
                    <Grid md={6} xs={12}>
                      <TextField
                        onChange={handleChangeForm("email")}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MailIcon style={{ color: 'white' }}/>
                            </InputAdornment>
                          ), style: { color: 'white' }
                        }}
                        id="outlined-basic"
                        style={{ width: "100%", color: 'white' }}
                        className="mb-3"
                        label="Email"
                        type="email"
                        required
                        variant="outlined"
                        color="secondary"
                        helperText={errors.email ? errors.email : ""}
                        error={errors.email}
                        InputLabelProps={{ style: { color: 'white' } }} // Add this line
                        FormHelperTextProps={{ style: { color: 'white' } }}
                      />
                    </Grid>
                    <Grid md={6} xs={12}>
                      <TextField
                        onChange={handleChangeForm("password")}
                        type="password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon style={{ color: 'white' }}/>
                            </InputAdornment>
                          ), style: { color: 'white' }
                        }}
                        id="outlined-basic"
                        style={{ width: "100%", color: 'white' }}
                        className=""
                        label="Password"
                        variant="outlined"
                        color="secondary"
                        helperText={errors.password ? errors.password : ""}
                        required
                        error={errors.password}
                        InputLabelProps={{ style: { color: 'white' } }} // Add this line
                        FormHelperTextProps={{ style: { color: 'white' } }}
                      />
                    </Grid>
                    <Grid md={6} xs={12}>
                      <TextField
                        onChange={handleChangeForm("confirmPassword")}
                        type="password"
                        className="mb-3"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon style={{ color: 'white' }}/>
                            </InputAdornment>
                          ), style: { color: 'white' }
                        }}
                        id="outlined-basic"
                        style={{ width: "100%", color: 'white' }}
                        label="Confirm Password"
                        variant="outlined"
                        color="secondary"
                        helperText={
                          errors.confirmPassword ? errors.confirmPassword : ""
                        }
                        required
                        error={errors.confirmPassword}
                        InputLabelProps={{ style: { color: 'white' } }} // Add this line
                        FormHelperTextProps={{ style: { color: 'white' } }}
                      />
                    </Grid>
                    <Grid md={6} xs={12}>
                      <TextField
                        onChange={handleChangeForm("mobile")}
                        type="number"
                        className="mb-3"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon style={{ color: 'white' }}/>
                            </InputAdornment>
                          ), style: { color: 'white' }
                        }}
                        id="outlined-basic"
                        style={{ width: "100%", color: 'white' }}
                        label="Phone"
                        variant="outlined"
                        color="secondary"
                        helperText={errors.mobile ? errors.mobile : ""}
                        required
                        error={errors.mobile}
                        InputLabelProps={{ style: { color: 'white' } }} // Add this line
                        FormHelperTextProps={{ style: { color: 'white' } }}
                      />
                    </Grid>
                    <Grid md={6} xs={12}>
                      <TextField
                        onChange={handleChangeForm("businessPurpose")}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SourceIcon style={{ color: 'white' }}/>
                            </InputAdornment>
                          ), style: { color: 'white' }
                        }}
                        id="outlined-basic"
                        style={{ width: "100%", color: 'white' }}
                        className="mb-3"
                        label="Business Purpose"
                        variant="outlined"
                        color="secondary"
                        InputLabelProps={{ style: { color: 'white' } }} // Add this line
                        FormHelperTextProps={{ style: { color: 'white' } }}
                      />
                    </Grid>
                  </Grid>
                  <div className="d-flex justify-content-center">
                    <Button
                      style={{ backgroundColor: "#ff0000" }}
                      type="submit"
                      className="rounded-pill"
                      variant="contained"
                    >
                      SIGNUP
                    </Button>
                    <Snackbar
                      open={open}
                      autoHideDuration={3000}
                      onClose={handleSnackbarClose}
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                      className="snackbar-root"
                    >
                      <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={handleSnackbarClose}
                        severity={severity}
                      >
                        {message}
                      </MuiAlert>
                    </Snackbar>
                  </div>
                </form>
                <div className="d-flex justify-content-center mt-2" style={{ color: 'white' }}>
                  <p className="mb-0" style={{ color: 'white' }}>
                    Already have account? , <Link to="/" >Login</Link>
                  </p>
                </div>

              </Box>
            </div>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
