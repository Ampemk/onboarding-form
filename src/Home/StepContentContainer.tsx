import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { FormValues } from "./HomeContainer";

const typeOfWork = ["Exterior Work", "Interior Work"];
const areaWorkQuestionResponseInterior = [
  {
    questions: {
      question: "What interior work are you doing?",
      answerOptions: [
        "New bathroom",
        "Bathroom remodel",
        "New laundry room",
        "Other",
      ],
    },
  },
];

const areaWorkQuestionResponseExterior = [
  {
    questions: {
      question: "What exterior work are you doing?",
      answerOptions: [
        "Garage door replacement",
        "Work on exterior doors",
        "Re-roofing",
        "Building fences less than 6 feet.",
        "Other",
      ],
    },
  },
];

type StepContentContainerType = {
  handleNext: () => void;
  handleBack: () => void;
  stepType: string;
};

function StepContentContainer(stepContent: StepContentContainerType) {

  const [residentailWorkType, setResidentialWorkType] = useState<string>()
  const { setFieldValue, values } = useFormikContext<FormValues>();

  const handleWorkType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResidentialWorkType(e.target.value)
    setFieldValue("workType", e.target.value);
    stepContent.handleNext();
  }

  //fetch questions from the database here
  useEffect(()=>{

  },[residentailWorkType])

  const _renderFormComponents = (stepContent: StepContentContainerType) => {

    switch (stepContent.stepType) {
      case "workType":
        return (
          <Box component={"div"}>
            <Typography align="center" variant="h6">
              What residential work are you doing?
            </Typography>

            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <RadioGroup
                aria-labelledby="demo-error-radios"
                name="workType"
                onChange={handleWorkType}
              >
                {typeOfWork.map((workType: string, index: number) => {
                  return (
                    <FormControlLabel
                      value={workType}
                      control={<Radio />}
                      label={workType}
                      key={index}
                    />
                  );
                })}
              </RadioGroup>
            </Box>
          </Box>
        );
      case "areaType":
        if (values.workType === "Interior Work") {
          return (
            <FormGroup>
              {areaWorkQuestionResponseInterior.map((workQuestion, index) => {
                return (
                  <Box key={index}>
                    <Typography variant="body1">
                      {workQuestion.questions.question}
                    </Typography>
                    {workQuestion.questions.answerOptions.map(
                      (options: string, index: number) => {
                        return (
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="workTypeAnswers"
                                value={options}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFieldValue("interiorAnswers", [
                                      ...values.interiorAnswers,
                                      options,
                                    ]);
                                  } else {
                                    setFieldValue(
                                      "interiorAnswers",
                                      values.interiorAnswers?.filter(
                                        (option) => option !== options
                                      )
                                    );
                                  }
                                }}
                              />
                            }
                            label={options}
                            name="workTypeAnswers"
                          />
                        );
                      }
                    )}
                  </Box>
                );
              })}
            </FormGroup>
          );
        } else {
          return (
            <FormGroup>
              {areaWorkQuestionResponseExterior.map(
                (workArea, index) => {
                  return (
                    <Box key={index}>
                      <Typography variant="body1">
                        {workArea.questions.question}
                      </Typography>
                      {workArea.questions.answerOptions.map(
                        (options: string) => {
                          return (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="exteriorWork"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setFieldValue("exteriorAnswers", [
                                        ...values.exteriorAnswers,
                                        options,
                                      ]);
                                    } else {
                                      setFieldValue(
                                        "exteriorAnswers",
                                        values.exteriorAnswers?.filter(
                                          (option) => option !== options
                                        )
                                      );
                                    }
                                  }}
                                />
                              }
                              label={options}
                              name="areaTypeAnswers"
                            />
                          );
                        }
                      )}
                    </Box>
                  );
                }
              )}
            </FormGroup>
          );
        }
      default:
        return <div>Default Container</div>;
    }
  };

  return <>{_renderFormComponents(stepContent)}</>;
}

export default StepContentContainer;
