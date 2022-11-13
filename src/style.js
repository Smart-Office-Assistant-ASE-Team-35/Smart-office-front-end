import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          border: "1px solid #A5A5A5",
          borderRadius: "6px",
          fontFamily: "Poppins",
          input: {
            padding: "14px",
          },
          "&$focused": {
            borderColor: "purple",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: "500",
          fontSize: "18px",
          lineHeight: "27px",
          color: "#081424",
          fontFamily: "Poppins",
          marginBottom: "6px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          MuiOutlinedInput: {
            styleOverrides: {
              root: { padding: "14px" },
            },
          },
        },
      },
    },
  },
});
