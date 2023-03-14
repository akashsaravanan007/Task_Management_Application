import React, { useState } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useStyles } from "./utils";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
// import Blog from "./Blog";

const Header = () => {
  const classes = useStyles();
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const homePage = () => {
    navigate(`/blogs`);
  };
  const [value, setValue] = useState();
  return (
    <CssBaseline>
      <AppBar
        position="fixed"
        sx={{
          background:
            "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(34,28,2,1) 100%);",
        }}
      >
        <Toolbar>
          <Typography className={classes.font} variant="h4">
            <img
              alt="logo"
              src={logo}
              width={50}
              style={{ marginTop: "4px", cursor: "pointer" }}
              onClick={homePage}
            />
          </Typography>
          {isLoggedIn && (
            <Box display="flex" marginLeft={"auto"} marginRight="auto">
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab
                  className={classes.font}
                  LinkComponent={Link}
                  to="/blogs"
                  label="All Tasks"
                  value={0}
                />
                <Tab
                  className={classes.font}
                  LinkComponent={Link}
                  to="/myBlogs"
                  label="My Tasks"
                  value={1}
                />
                <Tab
                  className={classes.font}
                  LinkComponent={Link}
                  to="/blogs/add"
                  label="Add Task"
                  value={2}
                />
              </Tabs>
            </Box>
          )}
          <Box display="flex" marginLeft="auto">
            {!isLoggedIn && (
              <>
                {" "}
                <Button
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  sx={{ margin: 1, borderRadius: 10 }}
                  color="primary"
                >
                  Login
                </Button>
              </>
            )}

            {isLoggedIn && (
              <Button
                onClick={() => dispath(authActions.logout())}
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </CssBaseline>
  );
};

export default Header;
