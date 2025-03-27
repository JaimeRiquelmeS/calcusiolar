import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useFormikContext } from 'formik';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface FormValues {
  monthlyConsumption: string;
  electricityRate: string;
  location: string;
  roofArea: string;
  roofAngle: string;
}

const ResultsDisplay: React.FC = () => {
  const { values } = useFormikContext<FormValues>();

  // Cálculos básicos
  const monthlyConsumption = parseFloat(values.monthlyConsumption);
  const electricityRate = parseFloat(values.electricityRate);
  const roofArea = parseFloat(values.roofArea);

  // Constantes para cálculos
  const PANEL_EFFICIENCY = 0.2; // 20% eficiencia
  const PANEL_AREA = 1.7; // metros cuadrados por panel
  const SOLAR_RADIATION = 5.5; // kWh/m²/día (promedio)
  const SYSTEM_LOSSES = 0.14; // 14% pérdidas del sistema
  const PANEL_COST = 250; // USD por panel
  const INSTALLATION_COST_MULTIPLIER = 1.3; // 30% costos adicionales

  // Cálculos
  const recommendedPanels = Math.ceil(monthlyConsumption / (30 * PANEL_EFFICIENCY * SOLAR_RADIATION * (1 - SYSTEM_LOSSES) * PANEL_AREA));
  const totalCost = recommendedPanels * PANEL_COST * INSTALLATION_COST_MULTIPLIER;
  const monthlySavings = monthlyConsumption * electricityRate;
  const annualSavings = monthlySavings * 12;
  const roi = (totalCost / annualSavings) * 12; // meses
  const co2Reduction = (monthlyConsumption * 0.4) * 12; // kg de CO2 por año

  // Datos para el gráfico de retorno de inversión
  const years = 5;
  const monthlyData = Array.from({ length: years * 12 }, (_, i) => {
    const investment = i === 0 ? -totalCost : 0;
    return investment + (monthlySavings * (i + 1));
  });

  const chartData = {
    labels: Array.from({ length: years * 12 }, (_, i) => `Mes ${i + 1}`),
    datasets: [
      {
        label: 'Retorno de Inversión ($)',
        data: monthlyData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Proyección de Retorno de Inversión',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Resultados del Análisis Solar
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Basado en tu consumo de {monthlyConsumption} kWh mensuales en {values.location}
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%', bgcolor: 'primary.light', color: 'primary.contrastText' }}>
            <Typography variant="h6" gutterBottom>
              Paneles Solares Necesarios
            </Typography>
            <Typography variant="h3" component="div">
              {recommendedPanels}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Paneles de alta eficiencia
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%', bgcolor: 'secondary.light', color: 'secondary.contrastText' }}>
            <Typography variant="h6" gutterBottom>
              Inversión Total Estimada
            </Typography>
            <Typography variant="h3" component="div">
              ${totalCost.toLocaleString()}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Incluye instalación y equipos
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              Ahorro Mensual
            </Typography>
            <Typography variant="h4" color="success.main">
              ${monthlySavings.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              En tu factura de electricidad
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              Tiempo de Recuperación
            </Typography>
            <Typography variant="h4" color="primary">
              {roi.toFixed(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Meses para recuperar la inversión
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              Reducción de CO₂
            </Typography>
            <Typography variant="h4" color="success.main">
              {co2Reduction.toFixed(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Kg por año
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ height: 400 }}>
              <Line options={chartOptions} data={chartData} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResultsDisplay; 