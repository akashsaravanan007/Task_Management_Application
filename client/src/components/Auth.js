import {
  Box,
  Button,
  OutlinedInput,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setInputs({
      ...inputs,
      showPassword: !inputs.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };

  return (
    <div style={{ marginTop: "10%" }}>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Stack spacing={2}>
            <Typography variant="h2" padding={3} textAlign="center">
              {isSignup ? "Signup" : "login"}
            </Typography>
            {isSignup && (
              <TextField
                name="name"
                onChange={handleChange}
                type="name"
                value={inputs.name}
                placeholder="Enter Name"
                margin="normal"
              />
            )}{" "}
            <TextField
              name="email"
              onChange={handleChange}
              type="email"
              value={inputs.email}
              placeholder="Enter valid email"
              margin="normal"
            />
            <OutlinedInput
              id="outlined-adornment-password"
              name="password"
              onChange={handleChange}
              type={inputs.showPassword ? "text" : "password"}
              value={inputs.password}
              placeholder="Enter password"
              margin="normal"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {inputs.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ borderRadius: 3, marginTop: 3 }}
              color="warning"
            >
              Submit
            </Button>
            <Button
              onClick={() => setIsSignup(!isSignup)}
              sx={{ borderRadius: 3, marginTop: 3 }}
            >
              Change to {isSignup ? "login" : "Signup"}
            </Button>
          </Stack>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
