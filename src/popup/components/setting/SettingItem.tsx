import { Box, Typography } from "@material-ui/core";
import React from "react";

interface Props {
  name: string;
  children: React.ReactNode;
}

const SettingItem: React.FC<Props> = props => {
  const { name, children } = props;

  return (
    <Box>
      <Typography variant="subtitle2" color="textSecondary">
        {name}
      </Typography>
      <Box paddingTop={1}>{children}</Box>
    </Box>
  );
};

export default SettingItem;
