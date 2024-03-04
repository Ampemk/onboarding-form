import OTCReviewPlans from "../Reviews/OTCReviewPlans";

function ExteriorReviewProcess({
  values,
}: {
  values: Array<string>;
}) {

  if (values.includes("Garage door replacement")|| values.includes("Work on exterior doors")) {
    return (
        
      <OTCReviewPlans
        title={"Over-the-Counter Submission Process"}
        submissionRequirments={[
          "A building permit is required",
          "Include plan sets",
          "Submit application for OTC review.",
        ]}
      />
    );
  } else if (values.includes("Re-roofing")) {
    return(
    <OTCReviewPlans
      title={"Over-the-Counter Submission Process"}
      submissionRequirments={[
        "A building permit is required",
        "Submit application for OTC review.",
      ]}
    />
    )
  } else if (values.includes("Other")){

    return(
      <OTCReviewPlans
      title={"In-House Review Process"}
        submissionRequirments={["A building permit is required.","Include plan sets","Submit application for in-house review"]}
      />
    )

  }

  return (
    <OTCReviewPlans
    title={"No Permit"}
      submissionRequirments={["Nothing is required! You're set to build."]}
    />
  );
}

export default ExteriorReviewProcess;
