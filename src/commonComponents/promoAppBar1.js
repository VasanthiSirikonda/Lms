// // import React, { useState } from "react";
// // import AppBar from "@mui/material/AppBar";
// // import Box from "@mui/material/Box";
// // import Drawer from "@mui/material/Drawer";
// // import List from "@mui/material/List";
// // import ListItem from "@mui/material/ListItem";
// // import ListItemText from "@mui/material/ListItemText";
// // import IconButton from "@mui/material/IconButton";
// // import Toolbar from "@mui/material/Toolbar";
// // import Typography from "@mui/material/Typography";
// // import Avatar from "@mui/material/Avatar";
// // import Button from "@mui/material/Button";
// // import Tooltip from "@mui/material/Tooltip";
// // import { createTheme, ThemeProvider } from "@mui/material/styles";
// // import { NavLink } from "react-router-dom";
// // import { commonService } from "../services/common-service";
// // import Menu from '@mui/material/Menu';
// // import MenuItem from '@mui/material/MenuItem';

// // const settings = ["Profile", "Logout"];

// // const darkTheme = createTheme({
// //   palette: {
// //     mode: "dark",
// //     primary: {
// //       main: "#1976d2",
// //     },
// //   },
// // });

// // const pages = [
// //   { component: "Dashboard", path: "/home" },
// //   { component: "Books", path: "/book-management" },
// //   { component: "Users Management", path: "/user-management" },
// //   {component: "Authors", path: "/authors"},
// //   { component: "About", path: "/about" },
// //   { component: "Contact Us", path: "/contact" },


// // ];



// // function ResponsiveAppBar() {

// // const [openDrawer, setOpenDrawer] = useState(false);
// // const [anchorElUser, setAnchorElUser] = useState(null);
// // const [currentComponent] = useState(
// //   commonService.getCurrentComponent()
// // );
// // // const [loggedInUserName, setLoggedInUserName] = useState("");

// // const handleToggleDrawer = () => {
// //   setOpenDrawer(!openDrawer);
// // };

// // const handleOpenUserMenu = (event) => {
// //   setAnchorElUser(event.currentTarget);
// // };

// // const handleCloseUserMenu = () => {
// //   setAnchorElUser(null);
// // };


// //   return (
// //     <ThemeProvider theme={darkTheme}>
// //       <AppBar position="sticky">
// //         <Toolbar>
// //           <IconButton
// //             size="large"
// //             edge="start"
// //             color="inherit"
// //             onClick={handleToggleDrawer}
// //           >
// //             &#9776;
// //           </IconButton>

// //           <Drawer
// //             anchor="left"
// //             open={openDrawer}
// //             onClose={handleToggleDrawer}
// //           >
// //             <Box>
// //               {/* Person Icon at the top of the sidebar */}
// //               <Tooltip title="Profile">
// //                 <Avatar
// //                   alt="Person Icon"
// //                   src="/path/to/person_icon.png"
// //                   sx={{ width: 50, height: 50, margin: "40px auto" }}
// //                 />
// //               </Tooltip>
// //               {/* <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
// //                 {loggedInUserName}
// //               </Typography> */}

// //               {/* List of Pages in the Sidebar */}
// //               <List>
// //                 {pages.map((page) => (
// //                   <ListItem
// //                     button
// //                     key={page.component}
// //                     component={NavLink}
// //                     to={page.path}
// //                     onClick={() => handleToggleDrawer()}
// //                   >
// //                     <ListItemText primary={page.component} />
// //                   </ListItem>
// //                 ))}
// //               </List>
// //             </Box>
// //           </Drawer>

// //           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
// //             Library Management System
// //           </Typography>
// //           <Box>
// //             {/* Single IconButton for both Profile and Logout */}
// //             <Tooltip title="Open Settings">
// //               <IconButton onClick={handleOpenUserMenu} color="inherit">
// //                 <Avatar alt="Admin" src="/static/images/avatar/2.jpg" />
// //               </IconButton>
// //             </Tooltip>

// //             {/* Menu for Profile and Logout */}
// //             <Menu
// //               anchorEl={anchorElUser}
// //               open={Boolean(anchorElUser)}
// //               onClose={handleCloseUserMenu}
// //             >
// //               {settings.map((setting) => (
// //                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
// //                   <Typography>{setting}</Typography>
// //                 </MenuItem>
// //               ))}
// //             </Menu>
// //           </Box>

// //         </Toolbar>
// //       </AppBar>
// //     </ThemeProvider>
// //   );
// // }

// // export default ResponsiveAppBar;


// import React, { useState } from "react";
// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import Route from "react-router-dom";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import MenuIcon from "@mui/icons-material/Menu";
// import { NavLink } from "react-router-dom";
// import Box from "@mui/material/Box";
// import { commonService } from "../services/common-service";
// import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
// import { Home } from "@mui/icons-material";
// import BooksTable from "../components/books";
// import DataTable from "../components/usermanagement";
// import "react-pro-sidebar/dist/css/styles.css";
// import Authors from "../components/authors";


// const settings = ["Profile", "Logout"];

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#1976d2",
//     },
//   },
// });

// const pages = [
//   { component: "Dashboard", path: "/home" },
//   { component: "Books", path: "/book-management" },
//   { component: "Users Management", path: "/user-management" },
//   { component: "Authors", path: "/authors" },
//   { component: "About", path: "/about" },
//   { component: "Contact Us", path: "/contact" },
// ];

// function ResponsiveAppBar() {
//   const [openSidebar, setOpenSidebar] = useState(false);

//   const handleToggleSidebar = () => {
//     setOpenSidebar(!openSidebar);
//   };

//   const [anchorElUser, setAnchorElUser] = useState(null);
//   const [currentComponent] = useState(
//     commonService.getCurrentComponent()
//   );
//   // const [loggedInUserName, setLoggedInUserName] = useState("");



//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   // Render content based on the current component
//   let mainContent;
//   switch (currentComponent) {
//     case "Dashboard":
//       mainContent = <Home />;
//       break;
//     case "Books":
//       mainContent = <BooksTable />;
//       break;
//     case "Users Management":
//       mainContent = <DataTable />;
//       break;
//     case "Authors":
//       mainContent = <Authors />;
//       break;
//     // case "About":
//     //   mainContent = <About />;
//     //   break;
//     // case "Contact Us":
//     //   mainContent = <ContactUs />;
//     //   break;
//     default:
//       mainContent = <Typography variant="h3">Default Content</Typography>;
//   }

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <AppBar position="sticky" sx={{ height: "60px", marginTop: "15px" }}>
//         <Toolbar>
//           <IconButton size="large" edge="start" color="inherit" onClick={handleToggleSidebar}>
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}> Library Management System </Typography>

//           <Box>
//             {/* Single IconButton for both Profile and Logout */}
//             <Tooltip title="Open Settings">
//               <IconButton onClick={handleOpenUserMenu} color="inherit">
//                 <Avatar alt="Admin" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>

//             {/* Menu for Profile and Logout */}
//             {/* <Menu
//               anchorEl={anchorElUser}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography>{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu> */}
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Box className="container" sx={{display: 'flex', height: '100vh'}}> 
//       <ProSidebar collapsed={openSidebar} width={250} sx={{flex: '0 0 auto', marginleft: '50px'}}>
//       {/* Sidebar Content */}
//       <SidebarHeader>
//         <Avatar alt="Person Icon" src="/path/to/person_icon.png" />
//       </SidebarHeader>
//       <SidebarContent>
//         <Menu iconShape="square">
//           {pages.map((page) => (
//             <MenuItem key={page.component} icon={<span>{}</span>} onClick={handleToggleSidebar}>
//               <NavLink to={page.path}>
//                 <Typography variant="body2">{page.component}</Typography>
//               </NavLink>
//             </MenuItem>
//           ))}
//         </Menu>
        
//       </SidebarContent>
//     </ProSidebar>
 

//         {/* Main Content */}
//         <Box className="main-content" sx={{flexGrow: 1, p:3}}>
//           {/* component="main" sx={{ flexGrow: 1, p: 3, display: "flex", flexDirection: "column"}} */}

//           {/* Your main content goes here */}
//             {/* <Route path="/book-management" component={books}/> */}
            
//           <Typography variant="h3"></Typography>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default ResponsiveAppBar;


import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Route from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
// import { commonService } from "../services/common-service";
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { Home } from "@mui/icons-material";
// import BooksTable from "../components/books";
// import DataTable from "../components/usermanagement";
import "react-pro-sidebar/dist/css/styles.css";
// import Authors from "../components/authors";
const settings = ["Profile", "Logout"];
 
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});
 
const pages = [
  { component: "Dashboard", path: "/home" },
  { component: "Books", path: "/book-management" },
  { component: "Users Management", path: "/user-management" },
  { component: "Authors", path: "/authors" },
  { component: "About", path: "/about" },
  { component: "Contact Us", path: "/contact" },
];
 
const ResponsiveAppBar = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
 
    const handleToggleSidebar = () => {
      setOpenSidebar(!openSidebar);
    };
  
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [currentComponent] = useState(
    //   commonService.getCurrentComponent()
    );
    // const [loggedInUserName, setLoggedInUserName] = useState("");
  
  
  
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  
    // Render content based on the current component
    let mainContent;
    switch (currentComponent) {
      case "Dashboard":
        mainContent = <Home />;
        break;
    //   case "Books":
    //     mainContent = <BooksTable />;
    //     break;
    //   case "Users Management":
    //     mainContent = <DataTable />;
    //     break;
    //   case "Authors":
    //     mainContent = <Authors />;
    //     break;
      // case "About":
      //   mainContent = <About />;
      //   break;
      // case "Contact Us":
      //   mainContent = <ContactUs />;
      //   break;
      default:
        mainContent = <Typography variant="h3">Default Content</Typography>;
    }
  
      return (
        <ThemeProvider theme={darkTheme}>
        <AppBar position="sticky" sx={{ height: "60px", marginTop: "15px" }}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" onClick={handleToggleSidebar}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}> Library Management System </Typography>
  
            <Box>
              {/* Single IconButton for both Profile and Logout */}
              <Tooltip title="Open Settings">
                <IconButton onClick={handleOpenUserMenu} color="inherit">
                  <Avatar alt="Admin" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
  
              {/* Menu for Profile and Logout */}
              {/* <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu> */}
            </Box>
          </Toolbar>
        </AppBar>
        <Box className="container" sx={{display: 'flex', height: '100vh'}}>
        <ProSidebar collapsed={openSidebar} width={250} sx={{flex: '0 0 auto', marginleft: '50px'}}>
        {/* Sidebar Content */}
        <SidebarHeader>
          <Avatar alt="Person Icon" src="/path/to/person_icon.png" />
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            {pages.map((page) => (
              <MenuItem key={page.component} icon={<span>{}</span>} onClick={handleToggleSidebar}>
                {/* <NavLink to={page.path}>
                  <Typography variant="body2">{page.component}</Typography>
                </NavLink> */}
                <li>Dashboard</li>
              </MenuItem>
            ))}
          </Menu>
          
        </SidebarContent>
      </ProSidebar>
   
  
          {/* Main Content */}
          <Box className="main-content" sx={{flexGrow: 1, p:3}}>
            {/* component="main" sx={{ flexGrow: 1, p: 3, display: "flex", flexDirection: "column"}} */}
  
            {/* Your main content goes here */}
              {/* <Route path="/book-management" component={books}/> */}
              
            <Typography variant="h3"></Typography>
          </Box>
        </Box>
      </ThemeProvider>
      )
};
export default ResponsiveAppBar;