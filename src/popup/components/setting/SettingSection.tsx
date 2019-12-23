import { Box, Paper, Typography } from "@material-ui/core";
import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

const SettingSection: React.FC<Props> = props => {
  const { title, children } = props;
  return (
    <Paper>
      <Box padding={2}>
        <Typography variant="subtitle1" color="textSecondary">
          {title}
        </Typography>
        <Box paddingTop={2}>{children}</Box>
      </Box>
    </Paper>
  );
};

export default SettingSection;
