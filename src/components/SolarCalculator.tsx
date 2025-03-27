import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  Button,
  useTheme,
  alpha,
  StepConnector,
  stepConnectorClasses,
  StepIconProps
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import PrintIcon from '@mui/icons-material/Print';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssessmentIcon from '@mui/icons-material/Assessment';

// Componentes de pasos
import ConsumptionForm from './steps/ConsumptionForm';
import LocationForm from './steps/LocationForm';
import ResultsDisplay from './steps/ResultsDisplay';

const steps = ['Consumo de Energía', 'Ubicación', 'Resultados'];

interface FormValues {
  monthlyConsumption: string;
  electricityRate: string;
  location: string;
  roofArea: string;
  roofAngle: string;
}

const initialValues: FormValues = {
  monthlyConsumption: '',
  electricityRate: '',
  location: '',
  roofArea: '',
  roofAngle: '',
};

const validationSchemas = [
  // Esquema de validación para el paso 1 (Consumo)
  Yup.object({
    monthlyConsumption: Yup.number()
      .required('El consumo mensual es requerido')
      .positive('Debe ser un número positivo'),
    electricityRate: Yup.number()
      .required('La tarifa eléctrica es requerida')
      .positive('Debe ser un número positivo'),
  }),
  // Esquema de validación para el paso 2 (Ubicación)
  Yup.object({
    location: Yup.string()
      .required('La ubicación es requerida'),
    roofArea: Yup.number()
      .required('El área del techo es requerida')
      .positive('Debe ser un número positivo'),
    roofAngle: Yup.number()
      .required('El ángulo del techo es requerido')
      .min(0, 'El ángulo debe ser entre 0 y 90 grados')
      .max(90, 'El ángulo debe ser entre 0 y 90 grados'),
  }),
];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(95deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(95deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: `linear-gradient(136deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: `linear-gradient(136deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  }),
}));

const ColorlibStepIcon = (props: StepIconProps) => {
  const icons: { [index: string]: React.ReactElement } = {
    1: <ElectricBoltIcon />,
    2: <LocationOnIcon />,
    3: <AssessmentIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed: props.completed || false, active: props.active || false }}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
};

const SolarCalculator: React.FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      if (activeStep < steps.length - 1) {
        // Validar solo los campos del paso actual
        await validationSchemas[activeStep].validate(values, { abortEarly: false });
        setActiveStep((prevStep) => prevStep + 1);
      }
    } catch (error) {
      console.error('Validation error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ConsumptionForm />;
      case 1:
        return <LocationForm />;
      case 2:
        return <ResultsDisplay />;
      default:
        return 'Paso desconocido';
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        py: 4,
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ 
          textAlign: 'center', 
          mb: 4,
          animation: 'fadeIn 1s ease-in'
        }}>
          <Box className="float-animation">
            <SolarPowerIcon 
              sx={{ 
                fontSize: 60, 
                color: theme.palette.primary.main,
                mb: 2,
              }} 
            />
          </Box>
          <Typography 
            variant="h3" 
            component="h1" 
            className="gradient-text"
            sx={{
              fontWeight: 'bold',
              mb: 2
            }}
          >
            Calculadora de Energía Solar
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            sx={{ 
              mb: 4,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Calcula el potencial de ahorro y beneficio ambiental de tu instalación solar
          </Typography>
        </Box>

        <Paper 
          elevation={8}
          sx={{ 
            p: 4, 
            borderRadius: 3,
            background: 'white',
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: `0 12px 48px ${alpha(theme.palette.primary.main, 0.2)}`,
            }
          }}
        >
          <Stepper 
            activeStep={activeStep} 
            alternativeLabel
            connector={<ColorlibConnector />}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 5, mb: 3 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchemas[activeStep]}
              onSubmit={handleSubmit}
              validateOnMount={false}
              validateOnChange={true}
              validateOnBlur={true}
            >
              {({ isSubmitting, submitForm }) => (
                <Form>
                  <Box sx={{ minHeight: '300px' }}>
                    {getStepContent(activeStep)}
                  </Box>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      mt: 4,
                      pt: 3,
                      borderTop: `1px solid ${theme.palette.divider}`
                    }}
                  >
                    <Button
                      variant="outlined"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      startIcon={<NavigateBeforeIcon />}
                      sx={{ 
                        px: 3,
                        '&:not(:disabled)': {
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          '&:hover': {
                            borderColor: theme.palette.primary.dark,
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                          }
                        }
                      }}
                    >
                      Atrás
                    </Button>
                    <Box>
                      {activeStep === steps.length - 1 ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => window.print()}
                          startIcon={<PrintIcon />}
                          className="pulse-animation"
                          sx={{ 
                            px: 4,
                            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                            boxShadow: `0 3px 5px 2px ${alpha(theme.palette.primary.main, 0.3)}`,
                            '&:hover': {
                              background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
                            }
                          }}
                        >
                          Imprimir Resultados
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={submitForm}
                          disabled={isSubmitting}
                          endIcon={<NavigateNextIcon />}
                          sx={{ 
                            px: 4,
                            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                            boxShadow: `0 3px 5px 2px ${alpha(theme.palette.primary.main, 0.3)}`,
                            '&:hover': {
                              background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
                            }
                          }}
                        >
                          Siguiente
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Paper>
      </Container>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default SolarCalculator; 