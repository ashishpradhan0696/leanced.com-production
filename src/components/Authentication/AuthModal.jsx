import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Tabs, Tab } from '@mui/material';
import Login from './login/Login';
import SignUp from './signUp/SignUp';

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: "whitesmoke",
  border: '2px solid #b7b4b4',
  boxShadow: 24,
  p: 4,
};

export default function AuthModal() {
 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div>
        <Button variant='contained'
            style={{
                width:85,
                height:40,
                backgroundColor:"black"
            }} onClick={handleOpen} 
        > 
          Login
        </Button>

      <Modal className="authModal"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="authBox">
            <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                    <Tab label="Login" />
                    <Tab label="SignUp" />
            </Tabs>

  
            {value===0 && <Login handleClose={handleClose}/>}
            {value===1 && <SignUp handleClose={handleClose}/>}
            
        </Box>

      </Modal>
      
    </div>
  );
}
