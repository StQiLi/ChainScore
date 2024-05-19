import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { PlaceholdersAndVanishInput } from '../components/ui/placeholders-and-vanish-input';

const Lookup = () => {
  const [address, setAddress] = useState('');
  const [walletDetails, setWalletDetails] = useState(null);
  const [error, setError] = useState('');

  const placeholders = [
    "Enter your CryptoWallet ID",
  ];

  const handleChange = (e) => {
    setAddress(e.target.value);
  };
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('Form Submition Error');

    try {
      const json = await axios.get(`http://localhost:3000/wallet`, {
        params: {
          address: address // Pass the address as a URL parameter
        }
      });
      console.log(json)
    } catch (err) {
      setError('Error fetching wallet details. Please check the address and try again.');
    }
  };


  return (
    <Container maxWidth="sm">
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Wallet Lookup
        </Typography>
          <PlaceholdersAndVanishInput
            placeholders= {placeholders}
            value = {address}
            onChange={handleChange}
            onSubmit={handleFormSubmit}
            />
    {/* 
          // <TextField
          //   label="Crypto Address"
          //   variant="outlined"
          //   fullWidth
          //   value={address}
          //   onChange={handleChange}
          //   margin="normal"
          //   onKeyPress={handleKeyPress}
          //   InputProps={{
          //     endAdornment: (
          //       <InputAdornment position="end">
          //         <SearchIcon />
          //       </InputAdornment>
          //     ),
          //   }}
          // />
          {/* <Box mt={2} display="flex" justifyContent="center">
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </Box>  */ }

        {error && <Alert severity="error" style={{ marginTop: '20px' }}>{error}</Alert>}
        {walletDetails && (
          <Box mt={4} width="100%">
            <Typography variant="h6">Wallet Details:</Typography>
            <pre>{JSON.stringify(walletDetails, null, 2)}</pre>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Lookup;
