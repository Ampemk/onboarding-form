import { useFormikContext } from "formik";
import InteriorReviewProcess from "./InteriorReviewProcess";
import ExteriorReviewProcess from "./ExteriorReviewProcess";
import { FormValues } from "../Home/HomeContainer";


function PermitReviewProcess() {
  const { values } = useFormikContext<FormValues>();

  if (values.workType === "Interior Work") {
    return <InteriorReviewProcess values={values.interiorAnswers} />;
  }
  return (
      <ExteriorReviewProcess values={values.exteriorAnswers} />
  );
}

export default PermitReviewProcess;
