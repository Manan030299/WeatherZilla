import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import {sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {auth, database, provider} from '../../Firebase';
import {toast} from 'react-hot-toast';
import {ThemeContext} from '../../App';
import sun from '../../assets/images/icons/sun.svg';
import moon from '../../assets/images/icons/moon.svg';
import googleIcon from '../../assets/images/icons/google.png';
import {onValue, ref} from 'firebase/database';
import {set} from 'firebase/database';

export const SignIn = () => {
  const [signinInput, setSigninInput] = useState({
    email: '',
    password: '',
  });
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [resetPasswordDialog, setResetPasswordDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordResetEmail, setPasswordResetEmail] = useState('');
  const [noAccountFound, setNoAccountFound] = useState('');
  const navigate = useNavigate();
  const mode = useContext(ThemeContext);

  useEffect(() => {
    if (localStorage.getItem('uid')) {
      navigate('/dashboard');
    }
  }, []);

  const handleCheck = () => {
    setRememberMe(!rememberMe);
  };

  const onHandleChange = (e) => {
    const {name, value} = e.target;
    setSigninInput({...signinInput, [name]: value});
  };

  const handleValidation = () => {
    setLoading(true);
    let isError = false;
    const validationMessages = {
      email: '',
      password: '',
    };
    if (!signinInput.email) {
      validationMessages.email = 'Please enter email address';
      isError = true;
    }
    if (!signinInput.password) {
      validationMessages.password = 'Please enter password';
      isError = true;
    }

    if (isError) {
      setErrorMessages(validationMessages);
      setLoading(false);
    }
    if (!isError) {
      signInWithEmailAndPassword(auth, signinInput.email, signinInput.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            if (rememberMe) {
              localStorage.setItem('uid', user.uid);
            }
            if (!rememberMe) {
              sessionStorage.setItem('uid', user.uid);
            }
            toast.success('User Logged Successfully');
            navigate('/dashboard');
            setLoading(false);
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
    }
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  const handleGoogleSignIn = () => {
    onValue(ref(database, 'users/'), (snapshot) => {
      const userData = Object.values(snapshot.val() || {});
      const emails = userData.map((user) => user.email);
      signInWithPopup(auth, provider)
          .then((result) => {
            const user = result.user;
            if (emails.includes(user.email)) {
              localStorage.setItem('uid', user.uid);
              navigate('/dashboard');
              window.location.reload();
            } else {
              const displayName = user.displayName.split(' ');
              const r = Math.floor(Math.random() * 256);
              const g = Math.floor(Math.random() * 256);
              const b = Math.floor(Math.random() * 256);
              const a = 1;
              set(ref(database, 'users/' + user.uid), {
                firstName: displayName[0],
                lastName: displayName[displayName.length - 1],
                email: user.email,
                uid: user.uid,
                avatarColor: `rgba(${r}, ${g}, ${b}, ${a})`,
              });
              localStorage.setItem('uid', user.uid);
              navigate('/dashboard');
            }
            toast.success('Logging In...');
          })
          .catch((error) => {
          });
    });
  };

  const handleForgotPassword = () => {
    setResetPasswordDialog(true);
  };

  const closeResetPasswordDialog = () => {
    setResetPasswordDialog(false);
    setPasswordResetEmail('');
    setNoAccountFound('');
  };

  const resetPassword = () => {
    onValue(ref(database, 'users/'), (snapshot) => {
      const userData = Object.values(snapshot.val());
      const emails = userData.map((user) => user.email);
      if (emails.includes(passwordResetEmail)) {
        sendPasswordResetEmail(auth, passwordResetEmail)
            .then(() => {
              // Password reset email sent!
              // ..
              toast.success('Password Reset Email Sent');
              setPasswordResetEmail('');
              setNoAccountFound('');
              setResetPasswordDialog(false);
            })
            .catch((error) => {
              const errorMessage = error.message;
              toast.error(errorMessage);
              // ..
            });
      } else {
        setNoAccountFound('Invalid Email Address');
      }
    });
  };

  return (
    <>
      <Box
        sx={{
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
          }}>
          <Typography
            variant="h3"
            sx={{
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
           Your Ultimate Forecast Companion!
          </Typography>
          <TextField
            sx={{
              marginBottom: '10px',
            }}
            variant="outlined"
            type='email'
            name='email'
            value={signinInput.email.toLowerCase()}
            onChange={onHandleChange}
            label="Email Address"
            helperText={errorMessages.email}
            error={errorMessages.email? true : false}
          />
          <TextField
            sx={{
              marginTop: '10px',
            }}
            variant="outlined"
            type='password'
            name='password'
            value={signinInput.password}
            onChange={onHandleChange}
            label="Password"
            helperText={errorMessages.password}
            error={errorMessages.password? true : false}
          />
          <Box >
            <FormControlLabel
              sx={{
                marginRight: '60px',
                color: 'text.primary',
              }}
              control={
                <Checkbox
                  sx={{
                    color: 'text.primary',
                  }}
                  name='rememberMe'
                  checked={rememberMe}
                  onChange={handleCheck}
                />} label="Remember me" />
            <Link
              underline='none'
              onClick={handleForgotPassword}
              sx={{
                fontWeight: '600',
                cursor: 'pointer',
              }}>
              Forgot password?
            </Link>
          </Box>
          <Button
            onClick={handleValidation}
            disabled={loading}
            type='submit'
            variant="contained"
            sx={{
              padding: '10px',
              fontSize: '1rem',
              margin: '10px 0',
              fontWeight: '600',
              borderRadius: '10px',
              boxShadow: 4,
              marginBottom: '20px',
            }}
          >
            {loading ? 'Loading...' : 'Login'}
          </Button>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'text.primary',
            }}
          >
              Don&apos;t have an account?&nbsp;
            <Link
              underline='none'
              onClick={goToSignUp}
              sx={{
                fontWeight: '600',
                cursor: 'pointer',
              }}>
                Sign up
            </Link>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.primary',
            }}
          >
            or
          </Typography>
          <Button
            variant='text'
            onClick={handleGoogleSignIn}
            sx={{
              padding: '10px',
              marginTop: '10px',
              fontWeight: '600',
              borderRadius: '10px',
              boxShadow: 4,
            }}
          >
            <img
              style={{
                marginRight: '10px',
                height: '30px',
              }}
              src={googleIcon} alt='googleIcon'
            />Sign in with Google
          </Button>
        </FormControl>
        <Dialog
          open={resetPasswordDialog}
          fullWidth
          maxWidth='sm'
          sx={{'& .MuiDialog-paper': {
            borderRadius: '10px',
            backgroundColor: 'background.default',
            width: 'max-content',
          }}}
        >
          <Box
            sx={{
              backgroundColor: 'background.default',
              padding: '20px',
            }}>
            <Typography
              variant='h5'
              sx={{
                fontWeight: '600',
              }}
            >
              Reset Your Password
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '20px',
                width: '400px',
              }}
            >
              <TextField
                size='medium'
                onChange={(e) => setPasswordResetEmail(e.target.value)}
                value={passwordResetEmail}
                sx={{
                  marginBottom: '10px',
                }}
                variant="outlined"
                type='email'
                name='passwordResetEmail'
                label="Email"
                helperText={noAccountFound}
                error={noAccountFound? true : false}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'right',
                  marginTop: '10px',
                }}
              >
                <Button
                  variant='text'
                  onClick={closeResetPasswordDialog}
                  sx={{
                    padding: '10px 15px',
                    borderRadius: '10px',
                    fontWeight: '600',
                    marginRight: '5px',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  onClick={resetPassword}
                  sx={{
                    padding: '10px 15px',
                    borderRadius: '10px',
                    fontWeight: '600',
                    marginLeft: '5px',
                  }}
                >
                  Reset Password
                </Button>
              </Box>
            </Box>
          </Box>
        </Dialog>
      </Box>
    </>
  );
};
