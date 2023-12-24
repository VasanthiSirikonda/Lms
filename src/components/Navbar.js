// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
// import { Link } from 'react-router-dom';
// import AddBooks from "./AddBooks";
// import Authors from "./Authors";
// import About from "./About";
// import Contact from "./Contact";
// import Home from "./home";
// import Books from "./Books";

// function Navbar() {
//     return (
//         <div style={{ display: 'flex' }}>
//             <Sidebar
//                 style={{
//                     position: 'fixed',
//                     backgroundColor: 'darkblue',
//                     color: 'white',
//                     height: '100vh'
//                 }} >
//                 <Menu
//                     menuItemStyles={{
//                         button: {
//                             color: 'white',
//                             [`&.active`]: {
//                                 backgroundColor: '#13395e',
//                                 color: '#b6c8d9',
//                             },
//                         },
//                     }}>
//                     <MenuItem component={<Link to="/" />}> Home</MenuItem>
//                     <MenuItem component={<Link to="/books" />}> Books</MenuItem>
//                     <MenuItem component={<Link to="/addBooks" />}> Add Books</MenuItem>
//                     <MenuItem component={<Link to="/authors" />}> Authors</MenuItem>
//                     <MenuItem component={<Link to="/about" />}> About</MenuItem>
//                     <MenuItem component={<Link to="/contact" />}> Contact Us</MenuItem>
//                 </Menu>
//             </Sidebar>
//             <div style={{ flex: 1, padding: '100px', paddingLeft: 'calc(actualSidebarWidth + 100px)' }}>
//                 <Routes>
//                     <Route path="/home" element={<Home />} />
//                     <Route path="/books" element={<Books />} />
//                     <Route path="/addBooks" element={<AddBooks />} />
//                     <Route path="/authors" element={<Authors />} />
//                     <Route path="/about" element={<About />} />
//                     <Route path="/contact" element={<Contact />} />
//                 </Routes>
//             </div>
//         </div>
//     );
// }
// export default Navbar;