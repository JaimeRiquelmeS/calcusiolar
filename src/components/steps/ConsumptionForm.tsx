import React from 'react';
import { Box, TextField, Typography, Grid, InputAdornment, useTheme, Paper, alpha } from '@mui/material';
import { useFormikContext } from 'formik';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface FormValues {
  monthlyConsumption: string;
  electricityRate: string;
}

const ConsumptionForm: React.FC = () => {
  const theme = useTheme();
  const { values, errors, touched, handleChange, handleBlur } = useFormikContext<FormValues>();

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <ElectricMeterIcon 
          sx={{ 
            fontSize: 40, 
            color: theme.palette.primary.main,
            mb: 2 
          }} 
        />
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Información de Consumo Eléctrico
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Por favor, ingresa tu consumo mensual promedio de electricidad y la tarifa que pagas actualmente.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
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
              Consumo Mensual
            </Typography>
            <TextField
              fullWidth
              id="monthlyConsumption"
              name="monthlyConsumption"
              placeholder="Ej: 300"
              value={values.monthlyConsumption}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.monthlyConsumption && Boolean(errors.monthlyConsumption)}
              helperText={touched.monthlyConsumption && errors.monthlyConsumption}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography color="text.secondary">kWh</Typography>
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
              Ingresa el consumo promedio mensual que aparece en tu factura
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
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
              Tarifa Eléctrica
            </Typography>
            <TextField
              fullWidth
              id="electricityRate"
              name="electricityRate"
              placeholder="Ej: 0.12"
              value={values.electricityRate}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.electricityRate && Boolean(errors.electricityRate)}
              helperText={touched.electricityRate && errors.electricityRate}
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography color="text.secondary">por kWh</Typography>
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
              Ingresa el costo por kilowatt-hora de tu tarifa actual
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
          💡 Tip: Puedes encontrar esta información en tu última factura de electricidad. 
          El consumo suele aparecer en kWh y la tarifa en precio por kWh.
        </Typography>
      </Paper>
    </Box>
  );
};

export default ConsumptionForm; 