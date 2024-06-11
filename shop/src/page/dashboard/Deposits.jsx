import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Số dư</Title>
      <Typography component="p" variant="h4">
        1.102.201
      </Typography>
      <Typography sx={{marginBottom:"18px", marginTop:"8px"}} component="p" variant="body2">
        24/05/2024
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Xem thêm
        </Link>
      </div>
    </React.Fragment>
  );
}
