import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "../styles/modal.css";
import { commonService } from "../services/common-service";

export default function InfraModal(props) {
  const [open, setOpen] = React.useState(props.open);
  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    right: "50%",
    transform: "translate(-50%, -50%)",
    width: props?.width ? props.width + "vw" : "70vw",
    bgcolor: "#b7c2da",
    boxShadow: 24,
    maxHeight: "60vh",
    borderRadius: "5px",
  };

  React.useEffect(() => {
    if (props?.open === false) {
      handleClose();
    }
    if (props?.forceClose === true) {
      handleClose();
    }
  }, [props]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (props?.onclose) {
      props?.onclose();
    }
    commonService.setAddButton(false);
    setOpen(false);
  };

  return (
    <div style={{ overflowY: "auto" }}>
      <div onClick={handleOpen} className="mb-0">
        {props.content}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            className=" text-white px-2 pt-2 d-flex justify-content-between"
            style={{ backgroundColor: "#dc3545" }}
          >
            <h6 className="mt-1">{props.header}</h6>
            <HighlightOffIcon className="mt-1 pointer" onClick={handleClose} />
          </div>
          <div
            className="p-4 rounded-bottom"
            style={{
              backgroundColor: "#f6f6f6",
              maxHeight: "70vh",
              width: props?.width ? props.width + "vw" : "70vw",
              overflowY: "auto",
            }}
          >
            {props.modalBody}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
