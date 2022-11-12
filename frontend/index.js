// React
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

// NEAR
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = process.env.CONTRACT_NAME

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS })

const theme = createTheme();

const useStyles = makeStyles((theme) => {
  root: {
    // some CSS that accesses the theme
  }
});

// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp()
 
  const root = ReactDOM.createRoot(document.getElementById('root'));

  root.render(
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        <App isSignedIn={isSignedIn} contractId={CONTRACT_ADDRESS} wallet={wallet} />
      </ChakraProvider>
    </ThemeProvider>
  );
}