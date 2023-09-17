import { useEffect, useState } from 'react';
import UserCard from './UserCard';
import { Button, Grid, Typography, TextField } from '@mui/material';
import CustomDialog from './CustomDialog';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import dayjs, { Dayjs } from 'dayjs';

export default function Home() {
  const defaultData = {
    id: 1,
    gender: 'male',
    dob: new Date(),
    age: 0,
    food: '',
    hobbies: '',
    name: '',
  };

  const allowOnlyNumbers = (event) => {
    var key = event.which || event.keyCode;
    if (key && (key <= 47 || key >= 58) && key != 8) {
      event.preventDefault();
    }
  };

  const validateData = (currentData) => {
    for (let curr in currentData) {
      if (currentData[curr] === '') return false;
    }
    return true;
  };

  const [currentData, setCurrentData] = useState(defaultData);
  const [gender, setGender] = useState('male');

  const handleChange = (e) => {
    let value = e.target.value;
    setCurrentData({ ...currentData, [e.target.name]: value });
  };

  const [userList, setUserList] = useState([defaultData]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState('view');

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const addUpdateUser = (userObj, type) => {
    let list = userList;
    let updatedList = [];
    if (type === 'add') {
      updatedList = [
        ...userList,
        { ...userObj, id: userList.length + 1, gender },
      ];
      setUserList(updatedList);
    } else {
      updatedList = list.map((user, index) => {
        if (user.id === userObj.id) return userObj;
        else return user;
      });
      setUserList(updatedList);
    }
    sessionStorage.setItem('userList', JSON.stringify(updatedList));
  };

  const handleDelete = (id) => {
    const updatedlist = userList.filter((user) => user.id != id);
    setUserList(updatedlist);
    sessionStorage.setItem('userList', JSON.stringify(updatedlist));
  };

  useEffect(() => {
    if (sessionStorage.getItem('userList'))
      setUserList(JSON.parse(sessionStorage.getItem('userList')));
  }, []);

  console.log(userList);

  return (
    <div>
      <Grid
        item
        container
        xs={10}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          justifyContent: {
            xs: 'center',
            sm: 'center',
            md: 'space-around',
          },
          mb: '30px',
        }}
      >
        <Grid item xs={12} sm={12} md={6} alignSelf="flex-start">
          <Typography
            display="flex"
            alignSelf="start"
            sx={{ fontSize: '24px', marginLeft: 6 }}
          >
            <b>LIST OF USERS</b>
          </Typography>
        </Grid>{' '}
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          justifyContent="flex-end"
          flexGrow={1}
          display="flex"
          alignSelf="flex-end"
          position="relative"
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginLeft: '16px',
              borderRadius: '6px',
              minWidth: '150px',
            }}
            onClick={() => {
              setOpenDialog(true);
              setEditMode('add');
              setCurrentData(defaultData);
            }}
          >
            ADD USER
          </Button>
        </Grid>{' '}
      </Grid>
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        {userList.map((user, index) => (
          <UserCard
            key={index}
            user={user}
            handleAddUpdateUser={addUpdateUser}
            handleDelete={handleDelete}
            setEditMode={setEditMode}
            editMode={editMode}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            setCurrentData={setCurrentData}
          />
        ))}
      </Grid>
      <CustomDialog
        open={openDialog}
        title={`${editMode.toLocaleUpperCase()} USER`}
        closeHandler={() => setOpenDialog(!openDialog)}
        actions={
          editMode !== 'view' ? (
            <>
              <Button
                variant="contained"
                color="error"
                sx={{
                  borderRadius: '6px',
                  minWidth: '150px',
                }}
                onClick={() => {
                  setOpenDialog(!openDialog);
                  setCurrentData(currentData);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginLeft: '16px',
                  borderRadius: '6px',
                  minWidth: '150px',
                }}
                onClick={() => {
                  if (validateData) {
                    setOpenDialog(!openDialog);
                    addUpdateUser(currentData, editMode);
                  } else {
                    alert('All fields are mandatory!');
                  }
                }}
              >
                Submit
              </Button>{' '}
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginLeft: '16px',
                borderRadius: '6px',
                minWidth: '150px',
              }}
              onClick={() => {
                setOpenDialog(!openDialog);
              }}
            >
              Close
            </Button>
          )
        }
      >
        <Grid
          container
          sx={{ justifyContent: 'space-between' }}
          mt={2}
          spacing={2}
        >
          <Grid item xs={10} sm={10} md={5}>
            <Typography>NAME</Typography>
            <TextField
              type="text"
              name="name"
              required
              fullWidth
              value={currentData.name}
              onChange={handleChange}
              style={{
                wordWrap: 'break-word',
              }}
              size="small"
              disabled={editMode === 'view'}
            />
          </Grid>
          <Grid item xs={10} sm={10} md={5}>
            <Typography>AGE</Typography>
            <TextField
              type="text"
              name="age"
              required
              fullWidth
              value={currentData.age}
              onChange={handleChange}
              onKeyDown={allowOnlyNumbers}
              style={{
                wordWrap: 'break-word',
              }}
              size="small"
              disabled={editMode === 'view'}
            />
          </Grid>
          <Grid item xs={10} sm={10} md={5}>
            <Typography>DOB</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label=""
                name="dob"
                value={dayjs(currentData.dob)}
                onChange={(newValue) => {
                  setCurrentData({
                    ...currentData,
                    dob: newValue.toDate().toLocaleDateString(),
                  });
                }}
                disabled={editMode === 'view'}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={10} sm={10} md={5}>
            <Typography>GENDER</Typography>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                disabled={editMode === 'view'}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={10} sm={10} md={5}>
            <Typography>FAVOURITE FOOD</Typography>
            <TextField
              type="text"
              name="food"
              required
              fullWidth
              value={currentData.food}
              onChange={handleChange}
              style={{
                wordWrap: 'break-word',
              }}
              size="small"
              disabled={editMode === 'view'}
            />
            <Typography>(OPTIONS: PIZZA, BURGER, PASTA)</Typography>
          </Grid>
          <Grid item xs={10} sm={10} md={5}>
            <Typography>HOBBIES</Typography>
            <TextField
              type="text"
              name="hobbies"
              required
              value={currentData.hobbies}
              onChange={handleChange}
              style={{
                wordWrap: 'break-word',
              }}
              multiline
              fullWidth
              rows={5}
              rowsmax={10}
              size="small"
              disabled={editMode === 'view'}
            />
          </Grid>
        </Grid>
      </CustomDialog>
    </div>
  );
}
