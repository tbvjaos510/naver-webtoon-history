import { grey } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00c853",
      contrastText: "#fafafa"
    },
    text: {
      primary: "#fafafa",
      secondary: grey[800]
    }
  },
  typography: {
    h6: {
      fontWeight: "bold"
    },
    subtitle2: {
      color: grey[400],
      fontWeight: "bolder"
    }
  }
});

export default theme;
