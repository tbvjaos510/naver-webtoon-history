import { Paper, Typography } from "@material-ui/core";
import React, { memo } from "react";

interface Props {
  title: string;
}

const SettingSection: React.FC<Props> = props => {
  const { title } = props;
  return (
    <Paper>
      <Typography variant="h6">{title}</Typography>
    </Paper>
  );
};

export default memo(SettingSection);
