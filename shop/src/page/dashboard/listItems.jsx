import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

import Box from '@mui/material/Box';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
/**
 * 
 * @param {Object} itemDashBoard {
 * data: [{label: ""},...]
 * secondaryText:"",
 * primarytext
 * } 
 * @returns 
 */
export function OrderManager({itemDashBoard}) {
  const [open, setOpen] = React.useState(true);
  return (
    <Box
>
  <ListItemButton
    alignItems="flex-start"
    onClick={() => setOpen(!open)}
    sx={{
      px: 3,
      pt: 2.5,
      pb: open ? 0 : 2.5,
      '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
    }}
  >
    <ListItemText
      primary={itemDashBoard.primaryText}
      primaryTypographyProps={{
        fontSize: 15,
        fontWeight: 'medium',
        lineHeight: '20px',
        mb: '2px',
      }}
      secondary={itemDashBoard.secondaryText}
      secondaryTypographyProps={{
        noWrap: true,
        fontSize: 12,
        lineHeight: '16px',
        color: open ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.6)',
      }}
      sx={{ my: 0 }}
    />
    <KeyboardArrowDown
      sx={{
        mr: -1,
        opacity: 0,
        transform: open ? 'rotate(-180deg)' : 'rotate(0)',
        transition: '0.2s',
      }}
    />
  </ListItemButton>
  {open &&
    itemDashBoard.data.map((item) => (
      <ListItemButton
        key={item.label}
        sx={{ marginLeft:"16px", minHeight: 32, color:"rgba(0,0,0,0.76)" }}
      >
        <ListItemText
          primary={item.label}
          primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
        />
      </ListItemButton>
    ))}
</Box>
  )
}
