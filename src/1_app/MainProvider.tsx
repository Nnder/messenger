import {ThemeProvider, createTheme } from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react"
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Router from "./Router";

const theme = createTheme({
    palette: {
      primary: {
        main: "#201E1F",
      },
      secondary: {
        main: "#FEEFDD",
      },
      info: {
        main: "#FF4000"
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
    }
  })

const queryClient = new QueryClient()

export default function MainProvider({children}: PropsWithChildren) {
  return (
    <>
      <Toaster/>
      <QueryClientProvider client={queryClient}>
        <Router/>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}
