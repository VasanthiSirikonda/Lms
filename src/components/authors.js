import React from 'react';
import InfraModal from '../commonComponents/modal';

export default function Authors() {
    const [open, setOpen] = React.useState(false);
    const [selectedAuthor, setSelectedAuthor] = React.useState(null);

    const authorsData = [
        { id: 1, firstName: 'Douglas  ', lastName: 'Adams', famousBook: 'The Hitchhiker’s Guide to the Galaxy', genre: 'Science Fiction' },
        { id: 2, firstName: 'Margaret', lastName: ' Atwood', famousBook: 'The Handmaid’s Tale', genre: 'Dystopian' },
        { id: 3, firstName: 'Shubhra', lastName: ' Gupta', famousBook: 'Irrfan Khan: A Life in Movies', genre: 'Biography' },
        { id: 4, firstName: 'Simon Sebag ', lastName: ' Montefiore', famousBook: 'The World: A Family History', genre: 'Non-fiction1' },
        // Add more authors as needed Irrfan Khan
    ];

    const handleRowChange = (author) => {
        setSelectedAuthor(author);
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
        setSelectedAuthor(null);
    };

    const columns = [
        { field: "id", headerName: "S.No", headerClassName: "bg-danger text-white", renderCell: (params) => params.row.index + 1 },
        { field: "firstName", headerName: "First Name", headerClassName: "bg-danger text-white", flex: 1, width: 40 },
        { field: "lastName", headerName: "Last Name", headerClassName: "bg-danger text-white", flex: 1, width: 40 },
        { field: "genre", headerName: "Genre", headerClassName: "bg-danger text-white", flex: 1, width: 40 },
        { field: "famousBook", headerName: "Famous Book", headerClassName: "bg-danger text-white", flex: 1, width: 40 },
    ];

    return (
        <div style={{ maxHeight: '85vh', width: '100%' }} className="commonDataGrid">
            <center>
                <table style={{ border: '1px solid black', borderSpacing: '10px' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '10px', color: 'white', backgroundColor: 'red' }}>First Name</th>
                            <th style={{ border: '1px solid black', padding: '10px', color: 'white', backgroundColor: 'red' }}>Last Name</th>
                            <th style={{ border: '1px solid black', padding: '10px', color: 'white', backgroundColor: 'red' }}>Famous Book</th>
                            <th style={{ border: '1px solid black', padding: '10px', color: 'white', backgroundColor: 'red' }}>Genre</th>
                        </tr>

                    </thead>
                    <tbody>
                        {authorsData.map((author) => (
                            <tr key={author.id} onClick={() => handleRowChange(author)}>
                                <td style={{ border: '1px solid black', padding: '10px' }}>{author.firstName}</td>
                                <td style={{ border: '1px solid black', padding: '10px' }}>{author.lastName}</td>
                                <td style={{ border: '1px solid black', padding: '10px' }}>{author.famousBook}</td>
                                <td style={{ border: '1px solid black', padding: '10px' }}>{author.genre}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>

        </div>

    );
}



// import React, { useState, useEffect } from "react";
// import Grid from "@mui/material/Unstable_Grid2";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// // import { getAuthorsData } from "../services/authors-service";
// import InfraModal from "../commonComponents/modal";
// import Button from "@mui/material/Button";

// export default function Authors() {
//     const [authorsData, setAuthorsData] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [close, setClose] = useState(false);
//     const [selectedAuthor, setSelectedAuthor] = useState(null);

//     useEffect(() => {
//         // commonService.setCurrentComponent("Authors Management");
//         getAuthors();
//     }, []);

//     const oncloseDialog = () => {
//         setOpen(false);
//         setClose(false);
//         setSelectedAuthor(null);
//     };

//     const closeDialog = () => {
//         setClose(true);
//     };

//     const getAuthors = () => {
//         getAuthorsData().then((res) => {
//             let modifiedData = res.data.map((author, index) => ({ ...author, index }));
//             setAuthorsData(modifiedData);
//         });
//     };

//     const handleRowChange = (e) => {
//         setSelectedAuthor(e.row);
//     };

//     const columns = [
//         { field: "id", headerName: "S.No", headerClassName: "bg-danger text-white", renderCell: (params) => params.row.index + 1 },
//         { field: "authorName", headerName: "Author Name", headerClassName: "bg-danger text-white", flex: 1, width: 40 },
//         // Add more columns as needed
//     ];

//     const authors = (
//         <div>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Author Name</th>
//                         {/* Add more table headers based on your needs */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                     authorsData.map((author) => (
//                         <tr key={author.id} onClick={() => handleRowChange({ row: author })}>
//                           <td>{author.authorName}</td>
//                           {/* Add more table cells based on your needs */}
//                         </tr>
//                       ))
//                     }
//             </tbody>
//         </table>
//     </div >
//   );

//     return (
//         <div className="container mt-2">
//             {/* Your JSX for rendering the authors management table */}
//             <div style={{ maxHeight: "85vh", width: "100%" }} className="commonDataGrid">
//                 {/* Render the authors table */}
//                 {authors}
//             </div>

//             {open ? (
//                 <InfraModal open={open} onclose={oncloseDialog} header={<div className="d-flex flex-row"><div><h6 className="mt-1 ml-2"> Author Details</h6></div></div>} modalBody={Authors} />
//             ) : (
//                 ""
//             )}
//         </div>
//     );
// }