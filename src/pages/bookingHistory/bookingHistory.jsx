import React, {useEffect, useState} from 'react';
import { Button, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from 'moment'
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate, useParams} from "react-router-dom";

function ListingBookingHistory() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const params = useParams()
  const [history, setHistory] = useState([]);

  const headerOptions = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('user_token')}`
};

  useEffect(() => {
    const fetchApi = async () => {
        const res = await fetch(`https://ourairbnb.herokuapp.com/api/v1/user/listing/${params.listingID}`, {headers:headerOptions})
        // const res = await fetch(`http:///api/v1/user/listing/${params.listingID}`, {headers:headerOptions})
        const data = await res.json()
        console.log(data)
        setHistory(data)
    }
    fetchApi()
}, [params])


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    await fetch(`https://ourairbnb.herokuapp.com/api/v1/user/listing/${params.listingID}`, {
    // await fetch(`http://localhost:8000/api/v1/user/listing/${params.listingID}`,{
      method: 'DELETE'
    })
    alert('Delete successfully!');
    navigate('/users/my/listings');
  }

  
  const renderHistory = () => {
    return history.map((item, index )=> {
      return (
        <TableRow key={item._id}>
          <TableCell>{index}</TableCell>
          <TableCell>{item.booked_by.firstname}</TableCell>
          <TableCell>
            {moment(item.checkin_date).format(`DD/MM/YYYY`)}-
            {moment(item.checkout_date).format(`DD/MM/YYYY`)}
            </TableCell>
          <TableCell>{item.total_guests}</TableCell>
      </TableRow>)
    })
  }


  return (
    <div className={'container-fluid p-0'}>

      <div className={'container mt-4'}>

        <div className={'d-flex justify-content-end mb-4'}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => {
              navigate(`/users/my/listings/${params.listingID}/edit`)
              handleClose();
            }}>
              Edit
            </MenuItem>

            <MenuItem onClick={() => {
              handleDelete()
              handleClose();
            }}>
              Delete
              </MenuItem>
          </Menu>

        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Booked By</TableCell>
                <TableCell>Date Period</TableCell>
                <TableCell>Guests</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderHistory()}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
export default ListingBookingHistory;