import * as React from "react";
import "../styles/appBar2.css";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { commonService } from "../services/common-service";
import HomeIcon from "@mui/icons-material/Home";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Logout from "@mui/icons-material/Logout";
import InfraModal from "../commonComponents/modal";
import { useEffect, useState } from "react";

export default function AppBar2() {
  // let [currentComponent] = React.useState(commonService.getCurrentComponent());

  // const onClickAddBtn = () => {
  //   commonService.setAddButton(true);
  // };

  // const logout = () => {
  //   if (window.confirm("Confirm to Logout.")) {
  //     sessionStorage.clear();
  //     window.location.reload();
  //   }
  // };

  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleLogout = () => {
  //   sessionStorage.clear();
  //   window.location.reload();
  // };


  const [open, setOpen] = React.useState(false);




  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };



  return (
    <div className="p-1 appBar2" >
      <div className="d-flex flex-row" >
        <img
          className="inForm-logo me-1"
          src="/images/verizonLogo-black.png"
          alt="" 
        />
        <span className="spacer"></span>

        <Button variant="outlined" onClick={handleClickOpen}>
        Logout
      </Button>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" className="dialogbody">
      <DialogTitle>
        <LogoutIcon className="me-1" /> Logout
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to logout,{" "}
          <span className="text-dark">{sessionStorage.getItem("username")}</span>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className="me-3" variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" style={{ backgroundColor: "#59a0f7" }} onClick={handleLogout}>
          Logout
        </Button>
      </DialogActions>
    </Dialog>

      </div>
    </div>
  );
}
