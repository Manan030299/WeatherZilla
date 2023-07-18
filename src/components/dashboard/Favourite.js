import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {onValue, ref, remove} from 'firebase/database';
import {database} from '../../Firebase';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {Common} from '../../common/Common';
import {useNavigate} from 'react-router-dom';
import {Tooltip} from '@mui/material';
import rain from '../../assets/images/icons/rain.svg';
import haze from '../../assets/images/icons/haze.svg';
import cloud from '../../assets/images/icons/clouds.svg';
import mist from '../../assets/images/icons/mist.svg';
import clear from '../../assets/images/icons/clear.svg';
import thunderstorm from '../../assets/images/icons/thunderstorm.svg';
import drizzle from '../../assets/images/icons/drizzle.svg';
import snow from '../../assets/images/icons/snow.svg';
import smoke from '../../assets/images/icons/smoke.svg';
import dust from '../../assets/images/icons/dust.svg';
import fog from '../../assets/images/icons/fog.svg';
import sandstorm from '../../assets/images/icons/sandstorm.svg';
import squall from '../../assets/images/icons/squall.svg';
import ash from '../../assets/images/icons/ash.svg';
import tornado from '../../assets/images/icons/tornado.svg';
import {toast} from 'react-hot-toast';

export const Favourite = () => {
  const [favouriteData, setFavouriteData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const uid = localStorage.getItem('uid') || sessionStorage.getItem('uid');
    if (uid) {
      onValue(ref(database, 'users/' + uid + '/favourite/'), (snapshot) => {
        const data = Object.values(snapshot.val() || {});
        setFavouriteData(data);
      });
    }
  }, []);

  const handleDelete = (id, city) => {
    const updatedData = favouriteData.filter((data) => data.cityWeatherId !== id);
    setFavouriteData(updatedData);

    const uid = localStorage.getItem('uid') || sessionStorage.getItem('uid');
    if (uid) {
      remove(ref(database, 'users/' + uid + '/favourite/' + id));
      toast.success(`${city} has been removed from favourite locations.`);
    }
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: {max: 4000, min: 3000},
      items: 5,
    },
    desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 3,
    },
    tablet: {
      breakpoint: {max: 1024, min: 464},
      items: 2,
    },
    mobile: {
      breakpoint: {max: 464, min: 0},
      items: 1,
    },
  };
  return (
    <>
      <Box sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}>
        <Box
          sx={{
            display: 'flex',
            padding: '12px',
          }}>
          <Grid container>
            <Grid item xs={9.6}>
              <Typography
                variant="h3"
                sx={{
                  color: 'text.primary',
                }}
              >
                  Favourite Locations
              </Typography>
            </Grid>
            <Grid item xs={1.9}>
              <Tooltip title='Dashboard'>
                <Typography
                  variant='h6'
                  onClick={() => (navigate('/dashboard'))}
                  sx={{
                    cursor: 'pointer',
                    color: 'primary.main',
                    fontWeight: '600',
                    minWidth: 'max-content',
                    marginTop: '14px',
                  }}>
                    Go To Dashboard
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={0.5}
              sx={{
                marginTop: '10px',
              }}
            >
              <Common />
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            marginTop: '100px',
          }}>
          {favouriteData.length > 0 ?
            (
              <Carousel
                showDots={true}
                responsive={responsive}
                infinite={true}
              >
                {favouriteData.map((data, index) => (
                  <Card
                    key={(`data_${index}`)}
                    sx={{
                      maxWidth: '400px',
                      minHeight: '150px',
                      boxShadow: 4,
                      margin: '20px',
                      padding: '20px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                    }}>
                    <Grid container
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Grid item xs={9}>
                        <Typography variant="h4">
                          {data.city}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h4">
                          {data.cityTemperature + '°C'}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      sx={{
                      }}>
                      <Grid item xs={10}
                        sx={{
                          marginTop: '10px',
                        }}>
                        {data.weatherName === 'Rain' && (
                          <img
                            style={{
                              height: '100px',
                            }}
                            src={rain}
                            alt='Rainy weather' />
                        )}
                        {data.weatherName === 'Haze' && (
                          <img
                            style={{
                              height: '100px',
                            }}
                            src={haze}
                            alt='haze' />
                        )}
                        {data.weatherName === 'Clouds' && (
                          <img
                            style={{
                              height: '100px',
                            }}
                            src={cloud}
                            alt='cloud' />
                        )}
                        {data.weatherName === 'Mist' && (
                          <img
                            style={{
                              height: '100px',
                            }}
                            src={mist}
                            alt='mist' />
                        )}
                        {data.weatherName === 'Clear' && (
                          <img
                            style={{
                              height: '100px',
                            }}
                            src={clear}
                            alt='clear' />
                        )}
                        {data.weatherName === 'Thunderstorm' && (
                          <img
                            style={{
                              height: '100px',
                            }}
                            src={thunderstorm}
                            alt='thunderstorm' />
                        )}
                        {data.weatherName === 'Drizzle' && (
                          <img
                            style={{
                              height: '100px',
                            }}
                            src={drizzle}
                            alt='drizzle' />
                        )}
                        {data.weatherName === 'Snow' && (
                          <img
                            style={{
                              height: '100px',
                            }}
                            src={snow}
                            alt='snow' />
                        )}
                        {data.weatherName === 'Smoke' && (
                          <img
                            style={{
                              height: '100px',
                            }}
                            src={smoke}
                            alt='smoke' />
                        )}
                        {data.weatherName === 'Dust' && (
                          <img
                            style={{
                              height: '100px',
                            }}
                            src={dust}
                            alt='dust' />
                        )}
                        {data.weatherName === 'Fog' && (
                          <img
                            style={{
                              height: '100px',
                            }}
                            src={fog}
                            alt='fog' />
                        )}
                        {data.weatherName === 'Sand' && (
                          <img
                            style={{
                              height: '100px',
                            }}
                            src={sandstorm}
                            alt='sandstorm' />
                        )}
                        {data.weatherName === 'Squall' && (
                          <img
                            style={{
                              height: '100px',
                            }}
                            src={squall}
                            alt='squall' />
                        )}
                        {data.weatherName === 'Ash' && (
                          <img
                            style={{
                              height: '100px',
                            }}
                            src={ash}
                            alt='ash' />
                        )}
                        {data.weatherName === 'Tornado' && (
                          <img
                            style={{
                              height: '100px',
                            }}
                            src={tornado}
                            alt='tornado' />
                        )}
                      </Grid>
                      <Grid item xs={2}>
                        <Tooltip title='Delete'>
                          <Button
                            sx={{
                              marginTop: '80px',
                            }}
                            onClick={() => handleDelete(data.cityWeatherId, data.city)}>
                            <DeleteForeverIcon
                              sx={{
                                fontSize: '2rem',
                                color: 'text.primary',
                              }} />
                          </Button>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Card>))}
              </Carousel>
            ) :
            (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '150px',
                }}>
                <Card
                  sx={{
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: 4,
                  }}>
                  <Typography
                    variant='h6'
                    sx={{
                      color: 'text.primary',
                      fontWeight: '600',
                    }}
                  >
                    No Favourite Location Found
                  </Typography>
                </Card>
              </Box>
            )
          }
        </Box>
      </Box>
    </>
  );
};
