import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

function OTCReviewPlans({
  submissionRequirments, title
}: {
  submissionRequirments: Array<string>, title: string;
}) {
  return (
    <Box>
      <Typography variant="subtitle1" align="center" fontWeight={700}>{title}</Typography>
      <List color="#f5ffef">
        {submissionRequirments.map((subText,index)=>{
          return(
            <ListItem key={index}>
            <ListItemText primary={subText} />
          </ListItem>
          )
        })}

      </List>
    </Box>
  );
}
export default OTCReviewPlans;
