import {createTheme, ThemeProvider} from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import'./tooltip.css'
export default function CustomTooltip({
    labelTooltip = '',
    dataTooltip = '',
    titleTooltip = '',
    size = 18,
    isRequire = false,
  }) {
    const theme = createTheme({
      overrides: {
        MuiTooltip: {
            styleOverrides:{
                root: {
                    maxWidth: '800px',
                    fontSize: '14px',
                    color: 'white',
                    padding: '8px',
                    backgroundColor: '#00115b',
                    pointerEvents: 'auto',
                  },
            }
          
        },
      },
    });
  
    return (
      <span className="custom-tooltip">
        <span className="custom-tooltip__label">
          {labelTooltip}
          {isRequire ? <span className="custom-tooltip__require"> *</span> : null}
          <span className="custom-tooltip__title">
            {
              <ThemeProvider theme={theme}>
                <Tooltip placement="top" arrow title={titleTooltip}>
                  <i>
                    <InfoOutlinedIcon color="info" />
                  </i>
                </Tooltip>
              </ThemeProvider>
            }
          </span>
        </span>
        <span className="custom-tooltip__data">{dataTooltip}</span>
      </span>
    );
  }