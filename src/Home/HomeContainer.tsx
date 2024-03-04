import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Toolbar,
  Typography,
} from "@mui/material";
import StepContentContainer from "./StepContentContainer";
import { FormikProvider, useFormik } from "formik";
import PermitReviewProcess from "../Permits/PermitReviewProcess";

const steps = [
  { value: "workType", label: "Interior or Exterior" },
  { value: "areaType", label: "Area" },
];

export interface FormValues {
  workType: string;
  areaType: string;
  exteriorAnswers: string[];
  interiorAnswers: string[];
}

function HomeContainer() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      workType: "",
      areaType: "",
      exteriorAnswers: [],
      interiorAnswers: [],
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar component="nav">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { sm: "block" } }}
            >
              PermitFlow
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        component={"main"}
        paddingTop={20}
        display={"flex"}
        justifyContent={"center"}
      >
        <Box sx={{ maxWidth: 800 }}>
          <Typography variant="h4" padding={2}>
            Let's determine if you need a permit to start work.{" "}
          </Typography>
          <Divider />
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <FormikProvider value={formik}>
                    <StepContentContainer
                      stepType={step.value}
                      handleNext={handleNext}
                      handleBack={handleBack}
                    />
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                      variant="text"
                    >
                      Back
                    </Button>
                    {index === steps.length - 1 && (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Submit
                      </Button>
                    )}
                  </FormikProvider>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <FormikProvider value={formik}>
                <PermitReviewProcess />
              </FormikProvider>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default HomeContainer;
