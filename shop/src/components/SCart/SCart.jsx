import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './index.css'
import { converToMoney } from '../../heppler/stringUtils';

export default function SCart({image,name,subTitle,price,discount,sold}) {
  return (

    <Card  className='cart-wrapper position-relative'>
      <div>
        <CardMedia
          component="img"
          height={180}
          image={image}
          alt={name}
        />
        <CardContent sx={{padding:'8px'}}>
          <p className='two-line-text cart-info'>
            {subTitle}
          </p>
        </CardContent>
      </div>
      <div className='cart-detail'>
        <p className='cart-price'>{converToMoney(price)}</p> 
        <p className='text-secondary '><em className='cart-info-secondary'>{`Đã bán ${sold}`}</em></p>
      </div>
      <div className='discount'>{discount + "%"}</div>
    </Card>
  );
}
