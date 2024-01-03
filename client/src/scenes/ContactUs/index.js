import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  TextareaAutosize,
  TextField,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";

import Snackbar from "@mui/material/Snackbar";

import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Textarea = styled(TextareaAutosize)(
  ({ theme }) => `
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);
const ContactPage = () => {
  const { palette } = useTheme();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInResponse = await fetch("/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const loggedIn = await loggedInResponse.json();
      console.log(loggedIn);
      setMsg("Someone from admin will contact you shortly");
      setOpen(true);
      navigate("/home");
    } catch (error) {
      setMsg(error.message);
      setOpen(true);
    }
  };
  const [values, setValues] = useState({
    contact: "",
    email: "",
    issue: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const handleClose = () => {
    setOpen(false);
    setMsg("");
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sociopedia
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Drop your details here
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="Email"
              //   onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              //   error={Boolean(touched.email) && Boolean(errors.email)}
              //   helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Contact Number"
              type="contact"
              //   onBlur={handleBlur}
              onChange={handleChange}
              value={values.contact}
              name="contact"
              //   error={Boolean(touched.password) && Boolean(errors.password)}
              //   helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            <Textarea
              type="text"
              name="issue"
              aria-label="Issue"
              onChange={handleChange}
              placeholder="Issue"
              value={values.issue}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {"Submit"}
            </Button>
          </Box>
        </form>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={msg}
        action={action}
      />
    </Box>
  );
};

export default ContactPage;
