import { useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';

const UserCard = ({
  user,
  handleAddUpdateUser,
  handleDelete,
  handleDialog,
  setEditMode,
  setCurrentData,
  setOpenDialog,
}) => {
  const getCircleColor = () => {
    let age = user.age;
    let col = 'orange';
    if (age <= 25) col = 'green';
    if (age > 25 && age <= 50) col = 'purple';
    return col;
  };

  useEffect(() => {
    setCurrentData(user);
  }, [user]);

  return (
    <>
      <Grid
        item
        xs={10}
        sm={10}
        md={5}
        lg={3.5}
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid grey',
          borderRadius: '4px',
          marginBottom: '30px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '30px',
            padding: '5px',
          }}
        >
          <span>
            <b>{user.name}</b>
          </span>
          <div
            style={{
              backgroundColor: getCircleColor(),
              display: 'flex',
              width: '20px',
              height: '20px',
              borderRadius: '10px',
            }}
          ></div>
        </div>
        <hr />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '5px',
            paddingTop: '5px',
            paddingBottom: '5px',
          }}
        >
          <span>{`AGE: ${user.age}`}</span>
          <span>{`DOB: ${user.dob}`}</span>
          <span>{`GENDER: ${user.gender}`}</span>
          <span>{`FOOD: ${user.food}`}</span>
          <span>{`HOBBIES: ${user.hobbies}`}</span>
        </div>
        <hr />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '5px',
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ mt: { xs: 2, sm: 0 } }}
            onClick={() => {
              handleDelete(user.id);
            }}
          >
            DELETE
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ mt: { xs: 2, sm: 0 } }}
            onClick={() => {
              setOpenDialog(true);
              setEditMode('view');
            }}
          >
            VIEW
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ mt: { xs: 2, sm: 0 } }}
            onClick={() => {
              setOpenDialog(true);
              setEditMode('edit');
            }}
          >
            EDIT
          </Button>
        </div>
      </Grid>
    </>
  );
};

export default UserCard;
