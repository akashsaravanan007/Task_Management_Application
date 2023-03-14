import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./utils";
const Blog = ({
  title,
  description,
  imageURL,
  userName,
  isUser,
  id,
  uploadTime,
  tags,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/myBlogs"));
  };
  return (
    <div>
      {" "}
      <Card
      style={{ backgroundColor: "#ffffff" }}
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar
              className={classes.font}
              sx={{ bgcolor: "red" }}
              aria-label="recipe"
            >
              {userName ? userName.charAt(0) : ""}
            </Avatar>
          }
          title={title}
        />
        <Typography
           
          height="250"
          image={imageURL}
          alt="Paella dish"
        />

        <CardContent>
          <hr />
          <br />
          <Typography
            className={classes.font}
            variant="body2"
            color="text.secondary"
            fontSize='20px'
          >Posted by:
            <b>{userName}</b>  
          </Typography>
        </CardContent>

        <CardContent>
        <Typography>Description {": "}<b>{description}</b></Typography>
      </CardContent>

        <CardContent>
          <Typography>Technologies must be used {": "}<b>{tags}</b></Typography>
        </CardContent>

        <CardContent>
          <Typography>Duration {": "}<b>{imageURL}</b></Typography>
        </CardContent>

        <CardContent>
          <Typography>
            Posted On {": "}
            <b>{uploadTime}</b>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
