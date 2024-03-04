import OTCReviewPlans from "../Reviews/OTCReviewPlans";

function InteriorReviewProcess({
  values,     
}: {
  values: Array<string>;
}) {


  if (values?.includes("New bathroom") || values?.includes("New laundry room")) {
    return (
      <OTCReviewPlans
        title={"Over-the-Counter Submission Process"}
        submissionRequirments={[
          "A building permit is required",
          "Include plan sets",
        ]}
      />
    );
  }

  return (
    <OTCReviewPlans
      title={"Over-the-Counter Submission Process"}
      submissionRequirments={["A building permit is required"]}
    />
  );
}

export default InteriorReviewProcess;
