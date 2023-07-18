import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import sunrise from '../../assets/images/icons/sunrise.png';
import sunset from '../../assets/images/icons/sunset.png';
import wind from '../../assets/images/icons/wind.png';
import humidity from '../../assets/images/icons/humidity.png';
import visibility from '../../assets/images/icons/visibility.png';
import clouds from '../../assets/images/icons/clouds.svg';
import airpressure from '../../assets/images/icons/airPressure.png';

export const WeatherDescription = (props) => {
  const {weatherData} = props;
  return (
    <>
      <Grid
        container
        gap={3}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px',
        }}>
        <Grid>
          <Card
            sx={{
              padding: '20px',
              borderRadius: '10px',
              boxShadow: 3,
              width: '200px',
              minHeight: '180px',
            }}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: '500',
              }}>
                Humidity
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

              }}>
              <img
                style={{
                  height: '70px',
                  width: '70px',
                  marginTop: '15px',
                }}
                src={humidity}
                alt='humidity'
              />
              <Typography
                variant='h4'
                sx={{
                  marginTop: '15px',
                  textAlign: 'center',
                }}>
                {weatherData.main.humidity} %
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid>
          <Card
            sx={{
              padding: '20px',
              borderRadius: '10px',
              boxShadow: 3,
              width: '200px',
              minHeight: '180px',
            }}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: '500',
              }}>
                Wind Status
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <img
                style={{
                  height: '70px',
                  width: '70px',
                  marginTop: '15px',
                }}
                src={wind}
                alt='wind'
              />
              <Typography
                variant='h4'
                sx={{
                  marginTop: '15px',
                  textAlign: 'center',
                }}>
                {(weatherData.wind.speed * 3.6).toFixed(1)|| ''} km/h
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid>
          <Card
            sx={{
              padding: '20px',
              borderRadius: '10px',
              boxShadow: 3,
              width: '200px',
              minHeight: '180px',
            }}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: '500',
              }}>
                Sunrise & Sunset
            </Typography>
            <Box
              sx={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Box
                sx={{
                  display: 'flex',
                  marginBottom: '10px',
                }}>
                <img
                  style={{
                    height: '50px',
                  }}
                  src={sunrise}
                  alt='sunrise'
                />
                <Typography
                  variant='h4'
                  sx={{
                    marginTop: '13px',
                    marginLeft: '12px',
                  }}>
                  {new Date( weatherData.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                }}>
                <img
                  style={{
                    height: '50px',
                  }}
                  src={sunset}
                  alt='sunset'
                />
                <Typography
                  variant='h4'
                  sx={{
                    marginTop: '13px',
                    marginLeft: '12px',
                  }}>
                  {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid>
          <Card
            sx={{
              padding: '20px',
              borderRadius: '10px',
              boxShadow: 3,
              width: '200px',
              minHeight: '180px',
            }}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: '500',
              }}>
                Visibility
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <img
                style={{
                  height: '55px',
                  width: '55px',
                  marginTop: '20px',
                }}
                src={visibility}
                alt='visibility'
              />
              <Typography
                variant='h4'
                sx={{
                  marginTop: '25px',
                  textAlign: 'center',
                }}>
                {(weatherData.visibility/1000).toFixed(1) + 'km'}
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid>
          <Card
            sx={{
              padding: '20px',
              borderRadius: '10px',
              boxShadow: 3,
              width: '200px',
              minHeight: '180px',
            }}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: '500',
              }}>
                Clouds
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <img
                style={{
                  height: '70px',
                  width: '70px',
                  marginTop: '15px',
                }}
                src={clouds}
                alt='clouds'
              />
              <Typography
                variant='h4'
                sx={{
                  marginTop: '15px',
                  textAlign: 'center',
                }}>
                {weatherData.clouds.all} %
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid>
          <Card
            sx={{
              padding: '20px',
              borderRadius: '10px',
              boxShadow: 3,
              width: '200px',
              minHeight: '180px',
            }}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: '500',
              }}>
                Air Pressure
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <img
                style={{
                  height: '60px',
                  width: '60px',
                  marginTop: '20px',
                }}
                src={airpressure}
                alt='airpressure'
              />
              <Typography
                variant='h4'
                sx={{
                  marginTop: '20px',
                  textAlign: 'center',
                }}>
                {weatherData.main.pressure} hPa
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};


WeatherDescription.propTypes = {
  weatherData: PropTypes.any.isRequired,
};
