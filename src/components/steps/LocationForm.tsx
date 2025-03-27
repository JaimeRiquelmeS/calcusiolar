import React from 'react';
import { Box, TextField, Typography, Grid, InputAdornment, useTheme, Paper, alpha } from '@mui/material';
import { useFormikContext } from 'formik';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import StraightenIcon from '@mui/icons-material/Straighten';

interface FormValues {
  location: string;
  roofArea: string;
  roofAngle: string;
}

const LocationForm: React.FC = () => {
  const theme = useTheme();
  const { values, errors, touched, handleChange, handleBlur } = useFormikContext<FormValues>();

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <HomeIcon 
          sx={{ 
            fontSize: 40, 
            color: theme.palette.primary.main,
            mb: 2 
          }} 
        />
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Información de la Ubicación
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Proporciona los detalles de tu ubicación y las características de tu techo para un cálculo más preciso.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`
              }
            }}
          >
            <Typography variant="subtitle1" gutterBottom fontWeight="500">
              Ciudad
            </Typography>
            <TextField
              fullWidth
              id="location"
              name="location"
              placeholder="Ej: Ciudad de México"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.location && Boolean(errors.location)}
              helperText={touched.location && errors.location}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon color="action" />
                  </InputAdornment>
                ),
                sx: {
                  '& input': {
                    fontSize: '1.1rem',
                    padding: '12px'
                  }
                }
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              La ubicación nos ayuda a calcular la radiación solar disponible
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`
              }
            }}
          >
            <Typography variant="subtitle1" gutterBottom fontWeight="500">
              Área del Techo
            </Typography>
            <TextField
              fullWidth
              id="roofArea"
              name="roofArea"
              placeholder="Ej: 100"
              value={values.roofArea}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.roofArea && Boolean(errors.roofArea)}
              helperText={touched.roofArea && errors.roofArea}
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SquareFootIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography color="text.secondary">m²</Typography>
                  </InputAdornment>
                ),
                sx: {
                  '& input': {
                    fontSize: '1.1rem',
                    padding: '12px'
                  }
                }
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Área total disponible para la instalación de paneles
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`
              }
            }}
          >
            <Typography variant="subtitle1" gutterBottom fontWeight="500">
              Inclinación del Techo
            </Typography>
            <TextField
              fullWidth
              id="roofAngle"
              name="roofAngle"
              placeholder="Ej: 30"
              value={values.roofAngle}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.roofAngle && Boolean(errors.roofAngle)}
              helperText={touched.roofAngle && errors.roofAngle}
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StraightenIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography color="text.secondary">°</Typography>
                  </InputAdornment>
                ),
                sx: {
                  '& input': {
                    fontSize: '1.1rem',
                    padding: '12px'
                  }
                }
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Ángulo de inclinación respecto a la horizontal
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper
        elevation={0}
        sx={{ 
          mt: 4, 
          p: 2, 
          bgcolor: alpha(theme.palette.info.main, 0.1),
          borderRadius: 2
        }}
      >
        <Typography variant="body2" color="info.main">
          💡 Tip: La inclinación óptima del techo varía según tu ubicación geográfica. 
          En general, se recomienda un ángulo similar a la latitud de tu ubicación.
        </Typography>
      </Paper>
    </Box>
  );
};

export default LocationForm; 