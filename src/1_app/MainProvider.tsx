import { Box, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthProvider from "./AuthProvider";
import { PropsWithChildren } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#201E1F",
    },
    secondary: {
      main: "#FEEFDD",
    },
    info: {
      main: "#FF4000",
    },
  },
  components: {
    // MuiContainer: {
    //   defaultProps: {
    //     sx: {
    //       pt: 8
    //     }
    //   }
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
  },
});

const queryClient = new QueryClient();

export default function MainProvider({ children }: PropsWithChildren) {
  return (
    <>
      <Toaster position="top-right" />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider key={"authProvider"}>
            <Box
              sx={{
                display: { xs: "block", sm: "grid" },
                gridTemplateColumns: "auto 1fr",
              }}
            >
              {children}
            </Box>
          </AuthProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
