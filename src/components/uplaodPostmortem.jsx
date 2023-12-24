import { Button, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { readPostmortemExcelFile } from "../services/general-service";
import { FileUploader } from "react-drag-drop-files";
import { commonService } from "../services/common-service";

const UploadPostmortem = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileTypes = ["JPG", "PNG", "GIF"];

  const [previewData, setPreviewData] = React.useState([]);

  useEffect(() => {
    commonService.setCurrentComponent("Upload Postmortems");
  }, []);

  const handleChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  // const handleUpload = async (event) => {
  //   if (selectedFiles.length === 0) {
  //     alert("Please select files");
  //     return;
  //   }
  //   const formData = new FormData();
  //   selectedFiles.forEach((file) => {
  //     formData.append("files", file);
  //   });

  // readPostmortemExcelFile(formData).then((resp) => {
  //   //   console.log(resp.data);
  //   setSelectedFiles([]);
  //   setPreviewData(resp.data);
  // });

  const handleUpload = async (event) => {
    if (selectedFiles.length === 0) {
      alert("Please select files");
      return;
    }

    // Check file size before uploading
    // const maxSize = 2 * 1024 * 1024; // 2MB
    // const isSizeValid = selectedFiles.every(file => file.size <= maxSize);

    // if (!isSizeValid) {
    //   alert("File size exceeds 1MB. Please upload files smaller than 1MB.");
    //   return;
    // }

    const maxSize = 200 * 1024; // 200KB
    const isSizeValid = selectedFiles.every(file => file.size <= maxSize);

    if (!isSizeValid) {
      alert("File size exceeds 1MB. Please upload files smaller than 1MB.");
      return;
    }


    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });



    readPostmortemExcelFile(formData)
      .then((resp) => {
        // console.log(resp.data);
        setSelectedFiles([]);
        setPreviewData(resp.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Invalid file type. Only .xlsx, .xls and .csv files are accepted.');
      });


  };

  const removeFile = (file, index) => {
    let files = selectedFiles;
    files.splice(index, 1);
    setSelectedFiles(files);
  };

  return (
    <div>
      <br />
      <br />
      <div className="d-flex justify-content-center mt-5">
        <div className="text-center">
          <h4>Postmortem Artifact Upload</h4>
          <div className="uploadContent mt-1 p-3 ">
            <IconButton
              style={{ backgroundColor: "transparent" }}
              size="large"
              component="label"
            >
              <CloudUploadOutlinedIcon sx={{ fontSize: 50 }} />
              <input multiple onChange={handleChange} type="file" hidden />
              {/* <FileUploader
                handleChange={handleChange}
                multiple
                name="file"
                types={fileTypes}
                hidden
              /> */}
            </IconButton>
            <div className="" style={{ fontSize: 13 }}>
              Drag And Drop or <span className="text-primary">Browse</span> your
              files
            </div>
          </div>
          <div className="mt-3 custom">
            <div>
              <h6>Selected Files</h6>
              {selectedFiles.map((file, index) => {
                return (
                  <div className="text-muted">
                    {file.name} &nbsp;{" "}
                    <Tooltip title="Remove">
                      <CloseOutlinedIcon
                        onClick={() => removeFile(file, index)}
                        className="pointer"
                        fontSize="medium"
                        style={{ color: "red" }}
                      />
                    </Tooltip>
                  </div>
                );
              })}

              {selectedFiles.length === 0 ? (
                <div className="text-muted">No files selected</div>
              ) : (
                ""
              )}
            </div>

            <Button
              className="mt-3 rounded-pill"
              variant="contained"
              size="medium"
              sx={{ textTransform: "capitalize" }}
              onClick={handleUpload}
            >
              Preview Data
            </Button>
          </div>
        </div>
      </div>

      {/* {previewData.length > 0 ? (
        <div className="container mt-4 mb-4 ">
          <div
            className="d-flex justify-content-between p-2 "
            style={{ backgroundColor: "#d3d3d345" }}
          >
            <h6 className="text-dark mt-2">
              Total Records: {previewData.length}
            </h6>
            <h6 className="text-danger mt-2">Prostmortems Data Preview</h6>
            <div className="custom  d-flex flex-row">
              <span className="spacer"></span>
              <Button
                className="mx-3"
                variant="outlined"
                size="medium"
                sx={{ textTransform: "capitalize" }}
                onClick={() => setPreviewData([])}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                size="medium"
                sx={{ textTransform: "capitalize" }}
              >
                Save All
              </Button>
            </div>
          </div>
          {previewData.map((pd, index) => {
            return (
              <div
                className="card mt-2"
                style={{ backgroundColor: "#d3d3d345" }}
              >
                <div class="card-body">
                  <h6
                    class="card-title text-danger"
                    style={{ fontWeight: 600 }}
                  >
                    {index + 1}. {pd.ticketNo || pd.pir}
                  </h6>
                  <div class="card-text mt-4">
                    {Object.keys(pd).map((key, index) => {
                      return (
                        <div>
                          {pd[key] ? (
                            <div className="mt-1 row">
                              <div
                                className="col-2"
                                style={{
                                  fontWeight: 600,
                                  textTransform: "capitalize",
                                }}
                              >
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </div>
                              <div className="col">
                                {" "}
                                : &nbsp; &nbsp; {pd[key]}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="custom mt-4 d-flex flex-row">
            <span className="spacer"></span>
            <Button
              className="mx-3"
              variant="outlined"
              size="medium"
              sx={{ textTransform: "capitalize" }}
              onClick={() => setPreviewData([])}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              size="medium"
              sx={{ textTransform: "capitalize" }}
            >
              Save All
            </Button>
          </div>
        </div>
      ) : (
        ""
      )} */}

      {previewData.length > 0 ? (
        <div className="container mt-4 mb-4 ">
          <div className="d-flex justify-content-between p-2 " style={{ backgroundColor: "#d3d3d345" }}>
            <h6 className="text-dark mt-2"> Total Records: {previewData.length} </h6>
            <h6 className="text-danger mt-2">Prostmortems Data Preview</h6>
            <div className="custom d-flex flex-row">
              <span className="spacer"></span>
              <Button className="mx-3" variant="outlined" size="medium" sx={{ textTransform: "capitalize" }} onClick={() => setPreviewData([])}>
                Clear
              </Button>
              <Button variant="contained" size="medium" sx={{ textTransform: "capitalize" }}>
                Save All
              </Button>
            </div>
          </div>
          <table className="table mt-2">
            <thead>
              <tr>
                <th>#</th>
                {Object.keys(previewData[0]).map((key) => (
                  <th key={key}>{key.replace(/([A-Z])/g, " $1").trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewData.map((pd, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {Object.keys(pd).map((key) => (
                    <td key={key}>{pd[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="custom mt-4 d-flex flex-row">
            <span className="spacer"></span>
            {/* <Button className="mx-3" variant="outlined" size="medium" sx={{ textTransform: "capitalize" }} onClick={() => setPreviewData([])}>
        Clear
      </Button>
      <Button variant="contained" size="medium" sx={{ textTransform: "capitalize" }}>
        Save All
      </Button> */}
          </div>
        </div>
      ) : ("")}

    </div>
  );
};
export default UploadPostmortem;
