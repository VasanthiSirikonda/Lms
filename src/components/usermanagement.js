import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Unstable_Grid2";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { useEffect, useState } from "react";
import InfraModal from "../commonComponents/modal";
import AppBar2 from "../commonComponents/appBar2";
import AddIcon from "@mui/icons-material/Add";
import pendingIcon from "../assets/images/pending3.png";
import approvedIcon from "../assets/images/approved2.png";
import rejectedIcon from "../assets/images/Rejected2.png";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

import {
  aproveUser,
  deleteAuser,
  getUsersData,
  addUser,
  rejectAuser,
  updateUser,
  deleteUserApi,
} from "../services/user-service";
import "../styles/usermanagement.css";
import { commonService, snackBarMessage } from "../services/common-service";

export default function DataTable() {
  const [usersData, setUsersData] = useState([]);
  const [roles] = useState(commonService.getUserRoles());
  const [editUserForm, setEditUserForm] = useState({
    id: 0,
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    username: "",
    role: "",
    status: "approved",
  });


  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    commonService.setCurrentComponent("User Management");
    getUsers();
  }, []);

  const oncloseDialog = () => {
    setOpen(false);
    setClose(false);
    setErrors({});
  };

  const closeDialog = () => {
    setClose(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateUserForm(editUserForm));

    if (Object.keys(errors).length === 0) {
      saveUser();
    }
  };

  const saveUser = () => {
    if (editUserForm.id === 0 || !editUserForm?.id) {
      addUser(editUserForm).then((res) => {
        getUsers();
        setErrors({});
        closeDialog();
        snackBarMessage.next("User Added Successfully");
      });
    } else {
      updateUser(editUserForm).then((res) => {
        getUsers();
        setErrors({});
        closeDialog();
        snackBarMessage.next("User Updated Successfully");
      });
    }
  };

  const deleteUserFun = () => {
    deleteUserApi(editUserForm?.id).then((resp) => {
      getUsers();
      closeDialog();
      snackBarMessage.next("User Deleted Successfully");
    });
  };

  const handleChangeEditForm = (name) => (event) => {
    setEditUserForm({ ...editUserForm, [name]: event.target.value });
    setErrors(validateUserForm(editUserForm));
  };

  const validateUserForm = (inputValues) => {
    let errors = {};
    if (!inputValues?.fname || inputValues?.fname?.length < 3) {
      errors.fname =
        "First Name is required and should be minimum 3 characters.";
    }
    if (!inputValues?.lname || inputValues?.lname?.length < 3) {
      errors.lname =
        "Last Name is required and should be minimum 3 characters.";
    }
    if (!inputValues?.username || inputValues?.username?.length < 3) {
      errors.username =
        "Username is required and should be minimum 3 characters.";
    }
    if (
      !inputValues?.email ||
      !inputValues?.email?.includes("@") ||
      !inputValues?.email?.includes(".")
    ) {
      errors.email = "Invalid Email Id.";
    }

    if (!inputValues?.mobile || inputValues?.mobile?.length < 10) {
      errors.mobile = "Mobile Number is required and should be 10 characters.";
    }

    // if (!inputValues?.role) {
    //   errors.role = "Role is required.";
    // }

    return errors;
  };

  const editUser = (
    <div>
      <Grid container spacing={2}>
        <Grid md={6} xs={12}>
          <p className="mb-1">
            First Name <span className="text-danger">*</span>{" "}
          </p>
          <input
            type="text"
            value={editUserForm.fname}
            placeholder="Enter First Name"
            onChange={handleChangeEditForm("fname")}
            className="form-control p-1 rounded border-0"
          />
          <div className="text-danger fs-7">
            {errors?.fname ? errors?.fname : ""}
          </div>
        </Grid>
        <Grid md={6} xs={12}>
          <p className="mb-1">
            Last Name <span className="text-danger">*</span>
          </p>
          <input
            type="text"
            value={editUserForm.lname}
            placeholder="Enter Last Name"
            onChange={handleChangeEditForm("lname")}
            className="form-control p-1 rounded border-0"
          />
          <div className="text-danger fs-7">
            {errors?.lname ? errors?.lname : ""}
          </div>
        </Grid>
        <Grid md={6} xs={12}>
          <p className="mb-1">
            Username <span className="text-danger">*</span>
          </p>
          <input
            type="text"
            value={editUserForm.username}
            placeholder="Enter Username"
            onChange={handleChangeEditForm("username")}
            className="form-control p-1 rounded border-0"
          />
          <div className="text-danger fs-7">
            {errors?.username ? errors?.username : ""}
          </div>
        </Grid>
        <Grid md={6} xs={12}>
          <p className="mb-1">
            Email <span className="text-danger">*</span>
          </p>
          <input
            type="text"
            value={editUserForm.email}
            placeholder="Ex : example@email.com"
            onChange={handleChangeEditForm("email")}
            className="form-control p-1 rounded border-0"
          />
          <div className="text-danger fs-7">
            {errors?.email ? errors?.email : ""}
          </div>
        </Grid>
        <Grid md={6} xs={12}>
          <p className="mb-1">
            Mobile Number <span className="text-danger">*</span>
          </p>
          <input
            type="text"
            value={editUserForm.mobile}
            placeholder="Enter Mobile Number"
            onChange={handleChangeEditForm("mobile")}
            className="form-control p-1 rounded border-0"
          />
          <div className="text-danger fs-7">
            {errors?.mobile ? errors?.mobile : ""}
          </div>
        </Grid>

        <Grid md={6} xs={12}>
          <label>
            Role <span className="text-danger">*</span>
          </label>
          <FormControl
            className="mt-1 form-control form-control-sm"
            sx={{ minWidth: 120, width: "100%" }}
            size="small"
          >
            {/* <InputLabel id="demo-select-small">Role</InputLabel> */}
            <Select
              value={editUserForm.role}
              onChange={handleChangeEditForm("role")}
            >

              {roles.includes("ROLE_ADMIN") ? (
                <MenuItem
                  selected={editUserForm.role === "admin"}
                  value="admin"
                >
                  Admin
                </MenuItem>
              ) : (
                <span></span>
              )}

              {roles.includes("ROLE_USER") ? (
                <MenuItem selected={editUserForm.role === "user"} value="user">
                  User
                </MenuItem>
              ) : (
                <span></span>
              )}
            </Select>
          </FormControl>
          <div className="text-danger fs-7">
            {errors?.role ? errors?.role : ""}
          </div>
        </Grid>
        <Grid xs={12}>
          <div className="mt-4 float-end custom">
            <Button className="me-3" variant="outlined" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#59a0f7" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );

  const viewUser = (
    <div>
      <Grid container spacing={2}>
        <Grid md={6} xs={12}>
          <p className="mb-1">First Name</p>
          <input
            type="text"
            placeholder="Enter First Name"
            value={editUserForm.fname}
            className="form-control p-1 rounded border-0"
            disabled
          />
          <div className="text-danger fs-7">
            {errors?.fname ? errors?.fname : ""}
          </div>
        </Grid>
        <Grid md={6} xs={12}>
          <p className="mb-1">Last Name</p>
          <input
            type="text"
            placeholder="Enter Last Name"
            value={editUserForm.lname}
            className="form-control p-1 rounded border-0"
            disabled
          />
          <div className="text-danger fs-7">
            {errors?.lname ? errors?.lname : ""}
          </div>
        </Grid>
        <Grid md={6} xs={12}>
          <p className="mb-1">Username</p>
          <input
            type="text"
            placeholder="Enter Username"
            value={editUserForm.username}
            onChange={handleChangeEditForm("username")}
            className="form-control p-1 rounded border-0"
            disabled
          />
          <div className="text-danger fs-7">
            {errors?.username ? errors?.username : ""}
          </div>
        </Grid>




        <Grid md={6} xs={12}>
          <p className="mb-1">Email</p>
          <input
            type="text"
            value={editUserForm.email}
            placeholder="Ex : example@email.com"
            className="form-control p-1 rounded border-0"
            disabled
          />
          <div className="text-danger fs-7">
            {errors?.email ? errors?.email : ""}
          </div>
        </Grid>
        <Grid md={6} xs={12}>
          <p className="mb-1">Mobile Number</p>
          <input
            type="text"
            placeholder="Enter Mobile Number"
            value={editUserForm.mobile}
            className="form-control p-1 rounded border-0"
            disabled
          />
          <div className="text-danger fs-7">
            {errors?.mobile ? errors?.mobile : ""}
          </div>
        </Grid>

        <Grid md={6} xs={12}>
          <label>
            Role <span className="text-danger">*</span>
          </label>
          <FormControl
            className="mt-1"
            sx={{ minWidth: 120, width: "100%" }}
            size="small"
          >
            {/* <InputLabel id="demo-select-small">Role</InputLabel> */}
            <Select
              value={editUserForm.role}
              onChange={handleChangeEditForm("role")}
              disabled
            >

              {roles.includes("ROLE_ADMIN") ? (
                <MenuItem
                  selected={editUserForm.role === "admin"}
                  value="admin"
                >
                  Admin
                </MenuItem>
              ) : (
                <span></span>
              )}

              {roles.includes("ROLE_ADMIN") ? (
                <MenuItem selected={editUserForm.role === "user"} value="user">
                  User
                </MenuItem>
              ) : (
                <span></span>
              )}
            </Select>
          </FormControl>
          <div className="text-danger fs-7">
            {errors?.role ? errors?.role : ""}
          </div>
        </Grid>
      </Grid>
    </div>
  );

  const deleteUser = (
    <div className="text-center custom">
      <br />
      <h6>
        Are you sure? &nbsp; You want to delete user &nbsp;{" "}
        <span className="text-dark">"{editUserForm.username}"</span>
      </h6>
      <br />
      <Button className="me-3" variant="outlined" onClick={closeDialog}>
        NO
      </Button>

      <Button
        variant="contained"
        style={{ backgroundColor: "#59a0f7" }}
        onClick={deleteUserFun}
      >
        YES
      </Button>
    </div>
  );

  const columns = [
    {
      field: "id",
      headerName: "S.No",
      headerClassName: "bg-danger text-white",
      renderCell: (params) => params.row.index + 1,
    },
    {
      field: "username",
      headerName: "Username",
      headerClassName: "bg-danger text-white",
      flex: 1,
      width: 40,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "bg-danger text-white",
      type: "email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      headerClassName: "bg-danger text-white",
      sortable: false,
      flex: 1,
      width: 60,
      renderCell: (params) =>
        params.value === "spadmin" ? (
          <div>Platform Admin</div>
        ) : (
          <div style={{ textTransform: "capitalize" }}>{params.value}</div>
        ),
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "bg-danger text-white",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        // if (params.value === "approved")
        //   return <img src={approvedIcon} width={110} alt="approved" />;
        // else if (params.value === "rejected")
        //   return <img src={rejectedIcon} width={110} alt="rejected" />;
        // else return <img src={pendingIcon} width={110} alt="pending" />;
        return (
          <div style={{ textTransform: "capitalize" }}>{params.value}</div>
        );
      },
    },
    {
      field: "Actions",
      headerName: "Actions",
      headerClassName: "bg-danger text-white",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <span className="d-flex mt-1">
          <InfraModal
            content={
              <ContentPasteSearchIcon
                className="pointer"
                style={{
                  width: "0.85em",
                  height: "0.73em",
                  marginTop: "0px",
                }}
              />
            }
            header={
              <div className="d-flex flex-row">
                <div>
                  <h6 className="mt-1 mx-1">User Details</h6>
                </div>
              </div>
            }
            modalBody={viewUser}
          />

          {roles.includes("ROLE_ADMIN") ? (
            <div className="d-flex">
              <InfraModal
                forceClose={close}
                onclose={oncloseDialog}
                content={<i className="px-4 fa fa-edit"></i>}
                header={
                  <div className="d-flex flex-row">
                    <div>
                      <h6 className="mt-1 mx-2">Edit User</h6>
                    </div>
                  </div>
                }
                modalBody={editUser}
              />

              <InfraModal
                forceClose={close}
                onclose={oncloseDialog}
                width={40}
                content={<i className="fa fa-trash mt-1"></i>}
                header={
                  <div className="d-flex flex-row">
                    <div>
                      <h6 className="mt-1 mx-1">Delete User</h6>
                    </div>
                  </div>
                }
                modalBody={deleteUser}
              />
              {/* <i className="fa fa-trash mt-1 "></i> */}
            </div>
          ) : (
            ""
          )}
        </span>
      ),
    },
  ];

  const rows = usersData;
  const titleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const openAddUser = () => {
    let currentUser = sessionStorage.getItem("username");
    let data = usersData.filter((ud) => ud.username === currentUser);
    setEditUserForm({ departmentId: data[0]?.departmentId });
    setOpen(true);
  };

  const getUsers = () => {
    getUsersData().then((res) => {
      let modifiedData = [];
      res.data.forEach((val, i) => {
        val["index"] = i;
        modifiedData.push(val);
      });
      setUsersData(modifiedData);
      //   getInfraGroups().then(grps =>{
      //     setGroups(grps.data);
      //   })
    });
  };
  const handleRowChange = (e) => {
    // setSelectedUser(e.row);
    console.log("Chckec", e.row);
    setEditUserForm({
      ...editUserForm,
      id: e.row.id,
      fname: e.row.fname,
      lname: e.row.lname,
      email: e.row.email,
      mobile: e.row.mobile,
      username: e.row.username,
      role: e.row.role,
    });
  };
  return (
    <div className="container mt-2">
      <div className="d-flex my-3 custom">
        <h5 className="mt-2">User Management</h5>
        <span className="spacer"></span>
        <Button
          variant="contained"
          style={{ backgroundColor: "#0d0d0d" }}
          disableFocusRipple={true}
          onClick={openAddUser}
        >
          <i className="fa fa-add"></i> &nbsp; Add User
        </Button>
      </div>
      <div
        style={{ maxHeight: "85vh", width: "100%" }}
        className="commonDataGrid"
      >
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.index}
          pageSizeOptions={[10, 20, 50, 100]}
          pageSize={10}
          columnHeaderHeight={45}
          onRowClick={handleRowChange}
        />
      </div>
      {open ? (
        <InfraModal
          open={open}
          onclose={oncloseDialog}
          header={
            <div className="d-flex flex-row">
              <div>
                <h6 className="mt-1 ml-2"> Add User</h6>
              </div>
            </div>
          }
          modalBody={editUser}
        />
      ) : (
        ""
      )}
    </div>
  );
}
