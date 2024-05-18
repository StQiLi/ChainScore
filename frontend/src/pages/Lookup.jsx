import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const Lookup = () => {
  const [address, setAddress] = useState('');
  const [walletDetails, setWalletDetails] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.get(`http://localhost:5000/wallet/${address}`);
      setWalletDetails(response.data);
    } catch (err) {
      setError('Error fetching wallet details. Please check the address and try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFormSubmit(e);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Wallet Lookup
        </Typography>
        <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
          <TextField
            label="Crypto Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={handleChange}
            margin="normal"
            onKeyPress={handleKeyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* <Box mt={2} display="flex" justifyContent="center">
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </Box> */}
        </form>
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
