import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import {toast} from 'react-hot-toast';
import {digitsRegExp, emailValidRegExp, lowercaseRegExp, minLengthRegExp,
  specialCharRegExp, uppercaseRegExp} from '../../constant/config';
import {auth} from '../../Firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {ref, set} from 'firebase/database';
import {database} from '../../Firebase';
import {ThemeContext} from '../../App';
import sun from '../../assets/images/icons/sun.svg';
import moon from '../../assets/images/icons/moon.svg';

export const SignUp = () => {
  const [errorMessages, setErrorMessages] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [signupInput, setSignupInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    uid: '',
  });
  const navigate = useNavigate();
  const mode = useContext(ThemeContext);

  const onHandleChange = (e) => {
    const {name, value} = e.target;
    setSignupInput({...signupInput, [name]: value});
  };

  const handleValidation = () => {
    const validationMessages = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    let isError = false;
    let message = '';

    if (!signupInput.firstName) {
      validationMessages.firstName = 'Please enter first name';
      isError = true;
    }

    if (!signupInput.lastName) {
      validationMessages.lastName = 'Please enter last name';
      isError = true;
    }

    if (!emailValidRegExp.test(signupInput.email)) {
      validationMessages.email = 'Please enter a valid email address';
      isError = true;
    }

    if (!minLengthRegExp.test(signupInput.password)) {
      message = message + '8 characters, ';
      isError = true;
    }

    if (!uppercaseRegExp.test(signupInput.password)) {
      message = message + 'one upper case, ';
      isError = true;
    }

    if (!lowercaseRegExp.test(signupInput.password)) {
      message = message + 'one lower case, ';
      isError = true;
    }

    if (!specialCharRegExp.test(signupInput.password)) {
      message = message + 'one special character, ';
      isError = true;
    }

    if (!digitsRegExp.test(signupInput.password)) {
      message = message + 'one number ';
      isError = true;
    }

    if (signupInput.confirmPassword === signupInput.password) {
      validationMessages.confirmPassword = '';
    } else {
      validationMessages.confirmPassword = 'Passwords do not match';
      isError = true;
    }

    validationMessages.password = message ?
    'Password should contain atleast ' + message : '';
    setErrorMessages(validationMessages);

    if (isError) {
      setErrorMessages(validationMessages);
    }
    if (!isError) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const a = 1;
      createUserWithEmailAndPassword(
          auth, signupInput.email, signupInput.password)
          .then((userCredential) => {
          // Signed in
            const user = userCredential.user;
            set(ref(database, 'users/' + user.uid), {
              firstName: signupInput.firstName,
              lastName: signupInput.lastName,
              email: signupInput.email,
              uid: user.uid,
              avatarColor: `rgba(${r}, ${g}, ${b}, ${a})`,
            })
                .then(() => {
                  toast.success('User Registered Successfully!');
                  navigate('/');
                });
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
          // ..
          });
    }
  };

  const goToLogin = () => {
    navigate('/');
  };

  return (
    <>
      <Box
        sx=
          {{
            fontFamily: 'Arial',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            height: '100vh',
            backgroundColor: 'background.default',
          }}>
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
          }}>
          {mode === 'light'?
          (<img
            style={{
              height: '200px',
            }}
            src={sun}
            alt='sun'
          />) :
          (<img
            style={{
              height: '200px',
            }}
            src={moon}
            alt='moon'
          />)
          }
        </Box>
        <FormControl
          sx={{
            zIndex: '2',
            marginBottom: '20px',
          }}>
          <Typography
            variant="h3"
            sx={{
              marginBottom: '10px',
              color: 'text.primary',
            }}>
              WeatherZilla
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              marginBottom: '10px',
              color: 'text.primary',
            }}
          >
            Sign up, It&apos;s quick and easy
          </Typography>
          <Box
            marginBottom='10px'
          >
            <TextField
              sx={{
                margin: '0px 5px 0px 0px',
                width: '170px'}}
              variant="outlined"
              type='text'
              onChange={onHandleChange}
              value={signupInput.firstName}
              name='firstName'
              label="First name"
              required
              helperText={errorMessages.firstName}
              error={errorMessages.firstName? true : false}
            />
            <TextField
              sx={{
                margin: '0px 0px 0px 5px',
                width: '170px',
              }}
              variant="outlined"
              type='text'
              onChange={onHandleChange}
              value={signupInput.lastName}
              name='lastName'
              label="Last name"
              helperText={errorMessages.lastName}
              error={errorMessages.lastName? true : false}
              required />
          </Box>
          <TextField
            sx={{
              margin: '0px 0px 0px 0px',
              width: '350px',
            }}
            variant="outlined"
            type='email'
            name='email'
            value={signupInput.email.toLowerCase()}
            onChange={onHandleChange}
            label="Email address"
            helperText={errorMessages.email}
            error={errorMessages.email? true : false}
            required
          />
          <Box
            display='flex'
            flexDirection='column'>
            <TextField
              sx={{
                margin: '10px 0px 5px 0px',
                width: '350px',
              }}
              variant="outlined"
              type='password'
              name='password'
              value={signupInput.password}
              onChange={onHandleChange}
              label="New password"
              helperText={errorMessages.password}
              error={errorMessages.password? true : false}
              required />
            <TextField
              sx={{
                margin: '5px 0px 10px 0px',
                width: '350px',
              }}
              variant="outlined"
              type='password'
              name='confirmPassword'
              value={signupInput.confirmPassword}
              onChange={onHandleChange}
              label="Confirm new password"
              helperText={errorMessages.confirmPassword}
              error={errorMessages.confirmPassword? true : false}
              required
            />
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              marginBottom: '15px',
              color: 'text.primary',
            }}
          >
            Already a member?&nbsp;
            <Link
              underline='none'
              onClick={goToLogin}
              sx={{
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Log in
            </Link>
          </Typography>
          <Button
            onClick={handleValidation}
            type='submit'
            variant="contained"
            sx={{
              padding: '10px',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '10px',
              boxShadow: '0px 4px 4px 0px #0000004D',
              marginBottom: '20px',
            }}>
              Create Account
          </Button>
        </FormControl>
      </Box>
    </>
  );
};
