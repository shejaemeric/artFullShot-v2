import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { Box } from "@mui/system";
import { IconButton, ThemeProvider, createTheme } from "@mui/material";
import { green } from "@mui/material/colors";
import DownloadIcon from "@mui/icons-material/Download";

const theme = createTheme({
  palette: {
    primary: {
      light: "red",
      dark: "blue",
      main: "#bbb", // Set the primary color to green
    },
  },
});

const ImagePopup = ({ image, isOpen, handleClose }) => {
  const handleClick = () => {
    downloadImage(image);
  };

  const downloadImage = (imageUrl) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a temporary URL for the blob
        var blobUrl = URL.createObjectURL(blob);

        // Create an anchor element
        var anchor = document.createElement("a");

        // Set the anchor's href attribute to the blob URL
        anchor.href = blobUrl;

        // Set the download attribute to specify the default file name
        anchor.download = "image.jpg"; // You can change the file name if needed

        // Simulate a click on the anchor element to trigger the download
        anchor.click();

        // Clean up by revoking the blob URL
        URL.revokeObjectURL(blobUrl);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: "red" }}>
        <Dialog
          open={isOpen}
          onClose={handleClose}
          maxWidth="lg"
          fullWidth={true}
          onClick={handleClose}
          sx={{
            "& .MuiDialog-paper": {
              maxWidth: "95vw",
              maxHeight: "95vh",
              width: "fit-content",
              height: "fit-content",
              borderRadius: "20px",
              "& .MuiDialogContent-root": {
                p: 0,
                m: 0,
              },
            },
          }}
        >
          <DialogContent>
            <DialogContentText>
              <Box sx={{ overflow: "hidden", position: "relative" }}>
                <img
                  src={image}
                  alt="Popup"
                  style={{ height: "100%", width: "100%" }}
                />
                <a
                  href="https://i.pinimg.com/736x/14/66/c8/1466c82c3a0c0680f0c71836f28036cf.jpg"
                  download
                >
                  Download Image
                </a>
              </Box>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>

      {/*
      <IconButton
        sx={{
          bgcolor: green[600],
          width: "fit-content",
          position: "sticky",
          bottom: "10vh",
          left: "90%",
          zIndex: 100000000,
          fontSize: "50px",
          ":hover": {
            bgcolor: green[700],
          },
        }}
        onClick={handleClick}
      >
        <DownloadIcon
          fontSize="large"
          sx={{
            color: "white",
          }}
        ></DownloadIcon>
      </IconButton> */}
    </ThemeProvider>
  );
};

export default ImagePopup;
