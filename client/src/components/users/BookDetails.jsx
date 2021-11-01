import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import axios from "axios";
// import { useHistory } from "react-router-dom";


function BookDetails() {
  const url =
    "https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  const BookingButton = styled(Button)({
    display: "flex",
    marginTop: 20,
    padding:0,
    textTransform: "none",
    backgroundColor: "#ABB2B9",
    borderColor: "#ABB2B9",
    '&:hover': {
        backgroundColor: '#ABB2B9',
        borderColor: '#ABB2B9',
        boxShadow: 'none',
      },
  });

  const bookDetails = {
      id: "_id",
      title: "The Adventures of Chicken",
      qty: 3,
      genre: "fiction",
      author: "Mr Chicken",
      img: url,
      description: "It is a very good book",
      session: "testing" //! FAKE SESSION ID
  }

  // let history = useHistory()

  const handleBooking = async(bookID, sessionID) => {
      console.log(bookID)
      const data = {bookID: bookID, userID:sessionID}
      await axios.post(`/api/onLoan/`, data)
      .then(res=>{
        console.log(res);
        console.log(res.data)
        console.log("here!")
    })
    // history.push("/chicken/home");
}

  return (
    <div>
      <h1>Network Status: {status} </h1>
      <Paper
        sx={{
          p: 4,
          margin: "auto",
          maxWidth: 800,
          flexGrow: 1,
          maxheight: 400,
        }}
      >
        <Grid container spacing={4}>
          <Grid item>
            <ButtonBase sx={{ width: 200, height: 200 }}>
              <Img alt="complex" src={bookDetails.img} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ textAlign: "left" }}>
                  {bookDetails.title}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left" }}
                >
                  Description: 
                </Typography>
                <Typography 
                  variant="subtitle2"
                  sx={{ textAlign: "left" }}>
                      {bookDetails.description} 
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                Availability: Yes
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <BookingButton variant="contained" onClick={()=> handleBooking(bookDetails.id, bookDetails.session)}> 
              Book! 
          </BookingButton>
        </Grid>
      </Paper>
    </div>
  );
}

export default BookDetails;
