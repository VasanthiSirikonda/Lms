import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { resetPassword } from "../services/auth";
export default function ResetPassword(props) {
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [values, setValues] = React.useState({
    username: "",
    tempPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChangeForm = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const savePassword = () => {
    if (values.newPassword === values.confirmPassword) {
        resetPassword(values).then((res)=>{
            setSeverity("success");
            setMessage("Password reset success!");
            setOpen(true);
            props.history.push('/')
        })
        .catch((error)=>{
            setSeverity("error");
            setMessage("Something went wrong!");
            setOpen(true);
        })
    } else {
      setSeverity("error");
      setMessage("Password not matched!");
      setOpen(true);
    }
  };
  return (
    <div className="p-5 d-flex justify-content-center">
      <Card className="w-50">
        <CardContent>
          <div>
            <h4>Reset Password</h4>
            <div className="float-start px-5 w-100">
              <h6 htmlFor="" className="float-start">
                Username
              </h6>
              <input
                type="text"
                onChange={handleChangeForm("username")}
                className="form-control mb-4"
              />
              <h6 className="float-start">Temparory Password</h6>
              <input
                type="text"
                onChange={handleChangeForm("tempPassword")}
                className="form-control mb-4"
              />
              <h6 className="float-start">New Password</h6>
              <input
                type="text"
                onChange={handleChangeForm("newPassword")}
                className="form-control mb-4"
              />
              <h6 className="float-start">Confirm Password</h6>
              <input
                type="password"
                onChange={handleChangeForm("confirmPassword")}
                className="form-control mb-4"
              />
            </div>
            <button className="btn btn-primary" onClick={savePassword}>SAVE</button>
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
        </CardContent>
      </Card>
    </div>
  );
}
