import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { snackBarMessage } from "../services/common-service";

export const CustomeSnackbar = (props) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(false);

  const vertical = "top";
  const horizontal = "center";

  useEffect(() => {
    if (props?.message) {
      setMessage(props.message);
      handleClick();
    }
    snackBarMessage.next("");
  }, [props]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        ContentProps={{
          sx: {
            // display: "block",
            textAlign: "center",
          },
        }}
        sx={{ height: "100%" }}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={60000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
};
