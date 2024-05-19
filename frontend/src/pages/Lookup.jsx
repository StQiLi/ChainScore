import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box, Alert, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { PlaceholdersAndVanishInput } from '../components/ui/placeholders-and-vanish-input';

const Lookup = () => {
  const [address, setAddress] = useState('');
  const [walletDetails, setWalletDetails] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const placeholders = [
    "Enter your CryptoWallet ID",
  ];

  const handleChange = (e) => {
    setAddress(e.target.value);
  };
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(''); // Clear previous errors
    try {
      const response = await axios.get(`http://localhost:3000/wallet`, {
        params: {
          address: address // Pass the address as a URL parameter
        }
      });
      setWalletDetails(response.data); // Set wallet details
      setLoading(false); // Stop loading
    } catch (err) {
      setError('Error fetching wallet details. Please check the address and try again.');
      setLoading(false); // Stop loading
    }
  };


  return (
    <Container maxWidth="sm">
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Wallet Lookup
        </Typography>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          value={address}
          onChange={handleChange}
          onSubmit={handleFormSubmit}
        />
        {loading && <CircularProgress style={{ marginTop: '20px' }} />} {/* Loading animation */}
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
