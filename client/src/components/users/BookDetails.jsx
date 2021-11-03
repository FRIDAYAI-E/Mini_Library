import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import axios from "axios";
import { arrAtom } from "./BrowseBooks";
import { useAtom } from "jotai";
import { useHistory } from "react-router-dom";
import { sessionAtom } from "../LoginPage";
import { add } from 'date-fns'

function BookDetails() {
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  const BookingButton = styled(Button)({
    display: "flex",
    marginTop: 20,
    padding: 0,
    textTransform: "none",
    backgroundColor: "#ABB2B9",
    borderColor: "#ABB2B9",
    "&:hover": {
      backgroundColor: "#ABB2B9",
      borderColor: "#ABB2B9",
      boxShadow: "none",
    },
  });

  const data = useAtom(sessionAtom)[0];
  const bookData = useAtom(arrAtom)[0];
  let history = useHistory();

  const isAuthenticated = () => {
    if (data.loginUser === undefined) {
      history.push("/login");
    }
  };
  isAuthenticated();


  const handleBooking = async (bookID, sessionID) => {
    console.log("bookID", bookID);
    console.log("sessionID", sessionID);

    const newDate = new Date()
    const returnDate = add(new Date(), {days: 7,})
    console.log("returnDate", returnDate);
    const data = {
      bookID: bookID,
      userID: sessionID,
      dateBorrowed: newDate,
      dateReturned: returnDate,
    };
    await axios.post(`/api/onLoan/`, data).then((res) => {
      console.log(res.data);
    });
    history.push("/books/success");
  };
  return (
    <div>
      <Paper
        sx={{
          p: 4,
          margin: "auto",
          maxWidth: 800,
          flexGrow: 1,
          maxheight: 400,
        }}
      >
        <Grid container spacing={3}>
          <Grid item>
            <ButtonBase sx={{ width: 200, height: 200 }}>
              <Img alt="complex" src={bookData.bookImg} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ textAlign: "left" }}
                >
                  {bookData.title}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left" }}
                >
                  Genre: {bookData.genre}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ textAlign: "left", paddingTop: 4, paddingBottom: 10 }}
                >
                  {bookData.description}
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
          <BookingButton
            variant="contained"
            onClick={() => handleBooking(bookData._id, data.loginUser._id)}
          >
            Book!
          </BookingButton>
        </Grid>
      </Paper>
    </div>
  );
}

export default BookDetails;
