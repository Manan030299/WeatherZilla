import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import {onValue, ref, remove, update} from 'firebase/database';
import {database} from '../../Firebase';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {WeatherDescription} from './WeatherDescription';
import {toast} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import {Common} from '../../common/Common';
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
import {Dialog} from '@mui/material';

export const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [currentCity, setCurrentCity] = useState('');
  const [isFavourite, setIsFavourite] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onValue(ref(database, 'users/' + userData.uid + '/favourite/'), (snapshot) => {
      const data = Object.keys(snapshot.val() || {});
      setIsFavourite(data);
    });
  }, [userData]);

  useEffect(() => {
    const uid = localStorage.getItem('uid') || sessionStorage.getItem('uid');
    if (uid) {
      onValue(ref(database, 'users/' + uid), (snapshot) => {
        const data = snapshot.val() || {};
        setUserData(data);
      });
    }
    fetchCurrentCity();
  }, []);

  const fetchWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b81ee37f56432f86bb4d90ea9d72450e`;
    const response = await fetch(url);
    const data = await response.json();
    setWeatherData(data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const fetchCurrentCity = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          async (position) => {
            const {latitude, longitude} = position.coords;
            const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
            const geocodingResponse = await fetch(geocodingUrl);
            const geocodingData = await geocodingResponse.json();
            const city = geocodingData?.address?.state_district;
            if (city) {
              setWeatherData(city);
              setCurrentCity(city);
              fetchWeatherData(city);
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            }
          },
          (error) => {
            toast.error('Error getting current location:', error);
          },
      );
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData(search);
  };

  const handleFavourite = () => {
    if (isFavourite.includes(weatherData.id.toString())) {
      remove(ref(database, 'users/' + userData.uid + '/favourite/' + weatherData.id));
      toast.success(`${weatherData.name} has been removed from favourite locations.`);
    } else {
      const favouriteData = {
        [weatherData.id]: {
          city: weatherData.name,
          cityWeatherId: weatherData.id,
          cityTemperature: Math.round(weatherData.main.temp - 273.15),
          weatherName: weatherData.weather[0].main,
        },
      };

      const updatedFavorites = {
        ...userData.favourite,
        ...favouriteData,
      };

      update(ref(database, 'users/' + userData.uid), {
        ...userData,
        favourite: updatedFavorites,
      });
      toast.success(`${weatherData.name} has been added to favourite locations.`);
    }
  };

  const favouriteLocation = () => {
    setLoading1(true);
    setTimeout(() => {
      navigate('/favourite-locations');
      setLoading1(false);
    }, 2000);
  };

  return (
    <>
      {loading?
      (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'background.default',
          }}>
          <CircularProgress />
          <Typography
            variant='h6'
            sx={{
              marginTop: '10px',
              color: 'text.primary',
            }}
          >
            Loading...
          </Typography>
        </Box>
      ) :
      (
        <Box
          sx={{
            backgroundColor: 'background.default',
          }}
        >
          <Grid
            container
            sx={{
              minHeight: '100vh',
            }}
          >
            <Grid item xs={4}
              sx={{
                padding: '10px',
                backgroundColor: 'background.paper',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: '10px',
                }}
              >
                <form onSubmit={handleSearch}>
                  <TextField
                    variant="outlined"
                    label="Search for place..."
                    size="small"
                    name='city'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{
                      'width': '350px',
                    }}
                  />
                </form>
              </Box>
              {weatherData.name?
              (
                <Box
                  sx={{
                    marginTop: '30px',
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '10px',
                    }}>
                    <Typography
                      variant='h3'
                      sx={{
                        color: 'text.primary',
                      }}
                    >
                      {weatherData ? (weatherData.name) : (currentCity)}
                    </Typography>
                    <Checkbox
                      icon={
                        <FavoriteBorder
                          sx={{
                            fontSize: '2.5rem',
                            color: '#ff0000',
                          }}
                        />}
                      checkedIcon={<Favorite
                        sx={{
                          fontSize: '2.5rem',
                          color: '#ff0000',
                        }}
                      />}
                      checked={isFavourite.includes(weatherData.id.toString())? true : false}
                      onChange={handleFavourite}
                    />
                  </Box>
                  <Box
                    sx={{
                      textAlign: 'center',
                      marginTop: '0px',
                    }}>
                    {weatherData.weather[0].main === 'Rain' && (
                      <img
                        style={{
                          height: '200px',
                        }}
                        src={rain}
                        alt='Rainy weather' />
                    )}
                    {weatherData.weather[0].main === 'Haze' && (
                      <img
                        style={{
                          height: '200px',
                        }}
                        src={haze}
                        alt='haze' />
                    )}
                    {weatherData.weather[0].main === 'Clouds' && (
                      <img
                        style={{
                          height: '200px',
                        }}
                        src={cloud}
                        alt='cloud' />
                    )}
                    {weatherData.weather[0].main === 'Mist' && (
                      <img
                        style={{
                          height: '200px',
                        }}
                        src={mist}
                        alt='mist' />
                    )}
                    {weatherData.weather[0].main === 'Clear' && (
                      <img
                        style={{
                          height: '200px',
                        }}
                        src={clear}
                        alt='clear' />
                    )}
                    {weatherData.weather[0].main === 'Thunderstorm' && (
                      <img
                        style={{
                          height: '200px',
                        }}
                        src={thunderstorm}
                        alt='thunderstorm' />
                    )}
                    {weatherData.weather[0].main === 'Drizzle' && (
                      <img
                        style={{
                          height: '200px',
                        }}
                        src={drizzle}
                        alt='drizzle' />
                    )}
                    {weatherData.weather[0].main === 'Snow' && (
                      <img
                        style={{
                          height: '200px',
                        }}
                        src={snow}
                        alt='snow' />
                    )}
                    {weatherData.weather[0].main === 'Smoke' && (
                      <img
                        style={{
                          height: '200px',
                        }}
                        src={smoke}
                        alt='smoke' />
                    )}
                    {weatherData.weather[0].main === 'Dust' && (
                      <img
                        style={{
                          height: '200px',
                        }}
                        src={dust}
                        alt='dust' />
                    )}
                    {weatherData.weather[0].main === 'Fog' && (
                      <img
                        style={{
                          height: '200px',
                        }}
                        src={fog}
                        alt='fog' />
                    )}
                    {weatherData.weather[0].main === 'Sand' && (
                      <img
                        style={{
                          height: '200px',
                        }}
                        src={sandstorm}
                        alt='sandstorm' />
                    )}
                    {weatherData.weather[0].main === 'Squall' && (
                      <img
                        style={{
                          height: '200px',
                        }}
                        src={squall}
                        alt='squall' />
                    )}
                    {weatherData.weather[0].main === 'Ash' && (
                      <img
                        style={{
                          height: '200px',
                        }}
                        src={ash}
                        alt='ash' />
                    )}
                    {weatherData.weather[0].main === 'Tornado' && (
                      <img
                        style={{
                          height: '200px',
                        }}
                        src={tornado}
                        alt='tornado' />
                    )}
                    <Typography
                      variant='h2'
                      sx={{
                        color: 'text.primary',
                      }}
                    >
                      {(Math.round(weatherData.main.temp - 273.15) || '') + '°C'}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      textAlign: 'center',
                    }}>
                    <Typography
                      variant='h3'
                      sx={{
                        color: 'text.primary',
                      }}
                    >
                      {weatherData.weather[0].main}
                    </Typography>
                  </Box>
                </Box>
              ):
              (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '50px',
                }}>
                <Typography
                  variant='h6'
                  sx={{
                    color: 'text.primary',
                  }}
                >
                  No result found
                </Typography>
              </Box>
              )}
            </Grid>
            <Grid item xs={8}
              sx={{
                padding: '20px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                <Tooltip title='Favourite Locations'>
                  <Typography
                    variant='h6'
                    onClick={favouriteLocation}
                    sx={{
                      fontWeight: '600',
                      marginTop: '5px',
                      marginRight: '30px',
                      cursor: 'pointer',
                      color: 'primary.main',
                    }}
                  >
                    Favourite Locations
                  </Typography>
                </Tooltip>
                <Common />
              </Box>
              <Box
                sx={{
                  marginTop: '50px',
                }}>
                {weatherData.name?
                  (
                  <WeatherDescription
                    weatherData={weatherData}
                  />
                  ):
                  (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '200px',
                      }}>
                      <Card
                        sx={{
                          padding: '20px',
                          borderRadius: '10px',
                          boxShadow: 4,
                          width: '700px',
                        }}>
                        <Typography
                          variant='h5'
                          sx={{
                            color: 'text.primary',
                          }}
                        >
                          No Data Found
                        </Typography>
                        <Typography
                          variant='body1'
                          sx={{
                            color: 'text.primary',
                            marginTop: '10px',
                          }}
                        >
                          We&apos;re sorry, but we couldn&apos;t retrieve any weather data for the requested location. Please ensure that the location you entered is correct and try again later.
                        </Typography>
                      </Card>
                    </Box>
                  )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      )
      }
      <Dialog open={loading1}>
        <Box
          sx={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'background.default',
          }}>
          <CircularProgress />
          <Typography
            variant='h6'
            sx={{
              marginTop: '10px',
              color: 'text.primary',
            }}
          >
            Loading...
          </Typography>
        </Box>
      </Dialog>
    </>
  );
};
