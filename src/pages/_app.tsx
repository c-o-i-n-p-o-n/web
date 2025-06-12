import { Box, createTheme, ThemeProvider } from '@mui/material'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from 'react-query';


const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <GoogleOAuthProvider clientId="962460859882-55m5ipupp5i9ifc333rudse3at37jupf.apps.googleusercontent.com">
                    <Box>
                        <Component {...pageProps} />
                    </Box>
                </GoogleOAuthProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default MyApp;
