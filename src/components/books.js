import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { approveBook, deleteBook, getBooksData, addBook, rejectBook, updateBook, deleteBookApi } from "../services/books-service";
import InfraModal from "../commonComponents/modal";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { commonService, snackBarMessage } from "../services/common-service";
import "../styles/booksmanagement.css";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";



export default function BooksTable() {
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [booksData, setBooksData] = useState([]);
    const [open, setOpen] = useState(false);
    const [close, setClose] = useState(false);
    const [roles] = useState(commonService.getUserRoles());
    const [editBookForm, setEditBookForm] = useState({
        id: 0,
        bName: "",
        authorName: "",
        genre: "",
        rate: "",
        bstatus: "",
        rack: "",
    });


    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const [allGenres, setAllGenres] = useState([]);


    useEffect(() => {
        commonService.setCurrentComponent("Books Management");
        getBooks();
    }, []);

    const oncloseDialog = () => {
        setOpen(false);
        setClose(false);
        setErrors({});
    };

    const closeDialog = () => {
        setClose(true);
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setErrors(validateBookForm(editBookForm));
    //     if (Object.keys(errors).length === 0) {
    //         saveBook();
    //     }
    // };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formErrors = validateBookForm(editBookForm);

        if (Object.keys(formErrors).length === 0 && Object.values(editBookForm).every((value) => value !== "")) {
            setErrors({});
            setSubmitting(true);
            saveBook();
        } else {
            setErrors(formErrors);
        }
    };

    const saveBook = () => {
        if (editBookForm.id === 0 || !editBookForm?.id) {
            addBook(editBookForm).then((res) => {
                getBooks();
                setErrors({});
                oncloseDialog();
                snackBarMessage.next("Book Added Successfully");
            });
        } else {
            updateBook(editBookForm).then((res) => {
                getBooks();
                setErrors({});
                closeDialog();
                snackBarMessage.next("Book Updated Successfully");

            });
        }
    };

    // const deleteBookFun = () => {
    //     deleteBookApi(editBookForm?.id).then((resp) => {
    //         getBooks();
    //         oncloseDialog();
    //         snackBarMessage.next("Book Deleted Successfully");
    //     });
    // };

    const deleteBookFun = () => {
        deleteBookApi(editBookForm?.id).then((resp) => {
      const remainingBooks = booksData.filter((book) => book.id !== editBookForm?.id);
          
          // Check if the deleted book was the only one in the selected genre
          const isOnlyBookInGenre = remainingBooks.every((book) => book.genre !== selectedGenre);
       
          getBooks();
       
          if (isOnlyBookInGenre) {
            setSelectedGenre("All");
          }
       
          closeDialog();
          snackBarMessage.next("Book Deleted Successfully");
        });
      };

    const handleChangeEditForm = (name) => (event) => {
        setEditBookForm({ ...editBookForm, [name]: event.target.value });
        setErrors(validateBookForm(editBookForm));
    };

    const validateBookForm = (inputValues) => {
        let errors = {};
        if (!inputValues?.bName || inputValues?.bName?.length < 3) {
            errors.bName =
                "Book Name is required and should be minimum 3 characters.";
        }
        if (!inputValues?.authorName || inputValues?.authorName?.length < 3) {
            errors.authorName =
                "Author Name is required and should be minimum 3 characters.";
        }
        if (!inputValues?.genre || inputValues?.genre?.length < 3) {
            errors.genre =
                "Genre is required and should be minimum 3 characters.";
        }


        if (!inputValues?.rate || inputValues?.rate?.length < 2) {
            errors.rate = "Rate Number is required.";
        }

        if (!inputValues?.bstatus || inputValues?.bstatus?.length < 2) {
            errors.bstatus = "Status is required.";
        }

        if (!inputValues?.rack || inputValues?.rack?.length < 2) {
            errors.rack = "Rack is required.";
        }

        // if (!inputValues?.role) {
        //   errors.role = "Role is required.";
        // }

        if (
            !inputValues?.bName ||
            !inputValues?.authorName ||
            !inputValues?.genre ||
            !inputValues?.rate ||
            !inputValues?.bstatus ||
            !inputValues?.rack
        ) {
            errors.allFields = " Please fill in all fields."
        }

        return errors;
    };

    const editBook = (
        <div>
            <Grid container spacing={2}>
                <Grid md={6} xs={12}>
                    <p className="mb-1">
                        Book Name <span className="text-danger">*</span>{" "}
                    </p>
                    <input
                        type="text"
                        value={editBookForm.bName}
                        placeholder="Enter Book Name"
                        onChange={handleChangeEditForm("bName")}
                        className="form-control p-1 rounded border-0"
                    />
                    <div className="text-danger fs-7">
                        {errors?.bName ? errors?.bName : ""}
                    </div>
                </Grid>
                <Grid md={6} xs={12}>
                    <p className="mb-1">
                        Author Name <span className="text-danger">*</span>
                    </p>
                    <input
                        type="text"
                        value={editBookForm.authorName}
                        placeholder="Enter Author Name"
                        onChange={handleChangeEditForm("authorName")}
                        className="form-control p-1 rounded border-0"
                    />
                    <div className="text-danger fs-7">
                        {errors?.authorName ? errors?.authorName : ""}
                    </div>
                </Grid>
                <Grid md={6} xs={12}>
                    <p className="mb-1">
                        Genre <span className="text-danger">*</span>
                    </p>
                    <input
                        type="text"
                        value={editBookForm.genre}
                        placeholder="Enter Genre"
                        onChange={handleChangeEditForm("genre")}
                        className="form-control p-1 rounded border-0"
                    />
                    <div className="text-danger fs-7">
                        {errors?.genre ? errors?.genre : ""}
                    </div>
                </Grid>
                {/* <Grid md={6} xs={12}>
                    <p className="mb-1">
                        Email <span className="text-danger">*</span>
                    </p>
                    <input
                        type="text"
                        value={editBookForm.email}
                        placeholder="Ex : example@email.com"
                        onChange={handleChangeEditForm("email")}
                        className="form-control p-1 rounded border-0"
                    />
                    <div className="text-danger fs-7">
                        {errors?.email ? errors?.email : ""}
                    </div>
                </Grid> */}
                <Grid md={6} xs={12}>
                    <p className="mb-1">
                        Rate <span className="text-danger">*</span>
                    </p>
                    <input
                        type="text"
                        value={editBookForm.rate}
                        placeholder="Enter Rate"
                        onChange={handleChangeEditForm("rate")}
                        className="form-control p-1 rounded border-0"
                    />
                    <div className="text-danger fs-7">
                        {errors?.rate ? errors?.rate : ""}
                    </div>
                </Grid>


                <Grid md={6} xs={12}>
                    <p className="mb-1">
                        Status <span className="text-danger">*</span>{" "}
                    </p>
                    <input
                        type="text"
                        value={editBookForm.bstatus}
                        placeholder="Enter Status"
                        onChange={handleChangeEditForm("bstatus")}
                        className="form-control p-1 rounded border-0"
                    />
                    <div className="text-danger fs-7">
                        {errors?.bstatus ? errors?.bstatus : ""}
                    </div>
                </Grid>


                <Grid md={6} xs={12}>
                    <p className="mb-1">
                        Rack <span className="text-danger">*</span>{" "}
                    </p>
                    <input
                        type="text"
                        value={editBookForm.rack}
                        placeholder="Enter Rack"
                        onChange={handleChangeEditForm("rack")}
                        className="form-control p-1 rounded border-0"
                    />
                    <div className="text-danger fs-7">
                        {errors?.rack ? errors?.rack : ""}
                    </div>
                </Grid>

                {/* <Grid md={6} xs={12}>
                    <label>
                        Role <span className="text-danger">*</span>
                    </label>
                    <FormControl
                        className="mt-1 form-control form-control-sm"
                        sx={{ minWidth: 120, width: "100%" }}
                        size="small"
                    >
                        <InputLabel id="demo-select-small">Role</InputLabel>
                        <Select
                            value={editBookForm.role}
                            onChange={handleChangeEditForm("role")}
                        >

                            {roles.includes("ROLE_ADMIN") ? (
                                <MenuItem
                                    selected={editBookForm.role === "admin"}
                                    value="admin"
                                >
                                    Admin
                                </MenuItem>
                            ) : (
                                <span></span>
                            )}

                            {roles.includes("ROLE_USER") ? (
                                <MenuItem selected={editBookForm.role === "user"} value="user">
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
                </Grid> */}
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

    const viewBook = (
        <div>
            <Grid container spacing={2}>
                <Grid md={6} xs={12}>
                    <p className="mb-1">Book Name</p>
                    <input
                        type="text"
                        placeholder="Enter Book Name"
                        value={editBookForm.bName}
                        className="form-control p-1 rounded border-0"
                        disabled
                    />
                    <div className="text-danger fs-7">
                        {errors?.bName ? errors?.bName : ""}
                    </div>
                </Grid>
                <Grid md={6} xs={12}>
                    <p className="mb-1">Author Name</p>
                    <input
                        type="text"
                        placeholder="Enter Author Name"
                        value={editBookForm.authorName}
                        className="form-control p-1 rounded border-0"
                        disabled
                    />
                    <div className="text-danger fs-7">
                        {errors?.authorName ? errors?.authorName : ""}
                    </div>
                </Grid>
                <Grid md={6} xs={12}>
                    <p className="mb-1">Genre</p>
                    <input
                        type="text"
                        placeholder="Enter Genre"
                        value={editBookForm.genre}
                        onChange={handleChangeEditForm("genre")}
                        className="form-control p-1 rounded border-0"
                        disabled
                    />
                    <div className="text-danger fs-7">
                        {errors?.genre ? errors?.genre : ""}
                    </div>
                </Grid>
                <Grid md={6} xs={12}>
                    <p className="mb-1">Status</p>
                    <input
                        type="text"
                        placeholder="Enter Status"
                        value={editBookForm.bstatus}
                        onChange={handleChangeEditForm("bstatus")}
                        className="form-control p-1 rounded border-0"
                        disabled
                    />
                    <div className="text-danger fs-7">
                        {errors?.bstatus ? errors?.bstatus : ""}
                    </div>
                </Grid>
                {/* <Grid md={6} xs={12}>
                    <p className="mb-1">Email</p>
                    <input
                        type="text"
                        value={editBookForm.email}
                        placeholder="Ex : example@email.com"
                        className="form-control p-1 rounded border-0"
                        disabled
                    />
                    <div className="text-danger fs-7">
                        {errors?.email ? errors?.email : ""}
                    </div>
                </Grid> */}
                <Grid md={6} xs={12}>
                    <p className="mb-1">Rate</p>
                    <input
                        type="text"
                        placeholder="Enter Rate "
                        value={editBookForm.rate}
                        className="form-control p-1 rounded border-0"
                        disabled
                    />
                    <div className="text-danger fs-7">
                        {errors?.rate ? errors?.rate : ""}
                    </div>
                </Grid>

                {/* <Grid md={6} xs={12}>
                    <label>
                        Role <span className="text-danger">*</span>
                    </label>
                    <FormControl
                        className="mt-1"
                        sx={{ minWidth: 120, width: "100%" }}
                        size="small"
                    >
                        <InputLabel id="demo-select-small">Role</InputLabel>
                        <Select
                            value={editBookForm.role}
                            onChange={handleChangeEditForm("role")}
                            disabled
                        >

                            {roles.includes("ROLE_ADMIN") ? (
                                <MenuItem
                                    selected={editBookForm.role === "admin"}
                                    value="admin"
                                >
                                    Admin
                                </MenuItem>
                            ) : (
                                <span></span>
                            )}

                            {roles.includes("ROLE_ADMIN") ? (
                                <MenuItem selected={editBookForm.role === "book"} value="book">
                                    Book
                                </MenuItem>
                            ) : (
                                <span></span>
                            )}
                        </Select>
                    </FormControl>
                    <div className="text-danger fs-7">
                        {errors?.role ? errors?.role : ""}
                    </div>
                </Grid> */}
            </Grid>
        </div>
    );

    const deleteBook = (
        <div className="text-center custom">
            <br />
            <h6>
                Are you sure? &nbsp; You want to delete book &nbsp;{" "}
                <span className="text-dark">"{editBookForm.bName}"</span>
            </h6>
            <br />
            <Button className="me-3" variant="outlined" onClick={closeDialog}>
                NO
            </Button>

            <Button
                variant="contained"
                style={{ backgroundColor: "#59a0f7" }}
                onClick={deleteBookFun}
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
            field: "bName",
            headerName: "Book Name",
            headerClassName: "bg-danger text-white",
            flex: 1,
            width: 40,
        },
        {
            field: "authorName",
            headerName: "Author Name",
            headerClassName: "bg-danger text-white",
            // type: "email",
            flex: 1,
        },
        {
            field: "genre",
            headerName: "Genre",
            headerClassName: "bg-danger text-white",
            flex: 1,
            width: 40,
        },
        {
            field: "rate",
            headerName: "Rate",
            headerClassName: "bg-danger text-white",
            flex: 1,
            width: 40,
        },
        {
            field: "rack",
            headerName: " Rack",
            headerClassName: "bg-danger text-white",
            flex: 1,
            width: 40,
        },


        // {
        //     field: "role",
        //     headerName: "Role",
        //     headerClassName: "bg-danger text-white",
        //     sortable: false,
        //     flex: 1,
        //     width: 60,
        //     renderCell: (params) =>
        //         params.value === "spadmin" ? (
        //             <div>Platform Admin</div>
        //         ) : (
        //             <div style={{ textTransform: "capitalize" }}>{params.value}</div>
        //         ),
        // },
        // {
        //     field: "status",
        //     headerName: "Status",
        //     headerClassName: "bg-danger text-white",
        //     sortable: false,
        //     flex: 1,
        //     renderCell: (params) => {
        //         // if (params.value === "approved")
        //         //   return <img src={approvedIcon} width={110} alt="approved" />;
        //         // else if (params.value === "rejected")
        //         //   return <img src={rejectedIcon} width={110} alt="rejected" />;
        //         // else return <img src={pendingIcon} width={110} alt="pending" />;
        //         return (
        //             <div style={{ textTransform: "capitalize" }}>{params.value}</div>
        //         );
        //     },
        // },
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
                                    <h6 className="mt-1 mx-1">Book Details</h6>
                                </div>
                            </div>
                        }
                        modalBody={viewBook}
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
                                            <h6 className="mt-1 mx-2">Edit Book</h6>
                                        </div>
                                    </div>
                                }
                                modalBody={editBook}
                            />

                            <InfraModal
                                forceClose={close}
                                onclose={oncloseDialog}
                                width={40}
                                content={<i className="fa fa-trash mt-1"></i>}
                                header={
                                    <div className="d-flex flex-row">
                                        <div>
                                            <h6 className="mt-1 mx-1">Delete Book</h6>
                                        </div>
                                    </div>
                                }
                                modalBody={deleteBook}
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

    const rows = booksData;

    // Rest of your code remains mostly unchanged

    const titleCase = (str) => {
        return str
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const openAddBook = () => {
        let currentBook = sessionStorage.getItem("bName");
        let data = booksData.filter((ud) => ud.bName === currentBook);
        setEditBookForm({ departmentId: data[0]?.departmentId });
        setOpen(true);
    };

    const getBooks = () => {
        getBooksData().then((res) => {
            let modifiedData = [];
            res.data.forEach((val, i) => {
                val["index"] = i;
                modifiedData.push(val);
            });
            setBooksData(modifiedData);

            //update
            const uniqueGenres= Array.from(new Set(modifiedData.map((row)=> row.genre)));
            setAllGenres(uniqueGenres);

        });
    };
    const handleRowChange = (e) => {
        // setSelectedBook(e.row);
        console.log("Chckec", e.row);
        setEditBookForm({
            ...editBookForm,
            id: e.row.id,
            bName: e.row.bName,
            authorName: e.row.authorName,
            genre: e.row.genre,
            rate: e.row.rate,
            bstatus: e.row.bstatus,
            rack: e.row.rack,
        });
    };

    return (
        // Your JSX for rendering the books management table
        <div className="container mt-2">
            <div className="d-flex my-3 custom">
                <h5 className="mt-2">Book Management</h5>
                <span className="spacer"></span>

                <FormControl variant="outlined" className="mx-2">
                    <InputLabel id="genre-select-label">Genre</InputLabel>
                    {/* <Select
                        label="Genre"
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        <MenuItem value="All">All Genres</MenuItem>
                        
                        {Array.from(new Set(rows.map((row) => row.genre))).map((genre, index) => (
                            <MenuItem key={index} value={genre}>
                                {genre}
                            </MenuItem>
                        ))}
                    </Select> */}

                    <Select
                        label="Genre"
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        <MenuItem value="All">All Genres</MenuItem>
                        {allGenres.map((genre,index)=>(
                        <MenuItem key={index} value={genre}>{genre}</MenuItem>

                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    style={{ backgroundColor: "#0d0d0d" }}
                    disableFocusRipple={true}
                    onClick={openAddBook}
                >
                    <i className="fa fa-add"></i> &nbsp; Add Book
                </Button>
            </div>
            <div
                style={{ maxHeight: "85vh", width: "100%" }}
                className="commonDataGrid"
            >
                <DataGrid

                    rows={selectedGenre === "All" ? rows : rows.filter((row) => row.genre === selectedGenre)}
                    columns={columns}
                    getRowId={(row) => row.index}
                    pageSizeOptions={[10, 20, 50, 100]}
                    pageSize={10}
                    columnHeaderHeight={45}
                    onRowClick={handleRowChange}

                // rows={rows}
                // columns={columns}
                // getRowId={(row) => row.index}
                // pageSizeOptions={[10, 20, 50, 100]}
                // pageSize={10}
                // columnHeaderHeight={45}
                // onRowClick={handleRowChange}
                />
            </div>
            {open ? (
                <InfraModal
                    open={open}
                    onclose={oncloseDialog}
                    header={
                        <div className="d-flex flex-row">
                            <div>
                                <h6 className="mt-1 ml-2"> Add Book</h6>
                            </div>
                        </div>
                    }
                    modalBody={editBook}
                />
            ) : (
                ""
            )}
        </div>
    );
}