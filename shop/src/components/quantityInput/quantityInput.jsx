import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';


import './index.css';

const QuantityInput = ({ decreaseText = 'Decrease quantity', increaseText = 'Increase quantity', initValue = 1, updateQuantity }) => {
  const [quantity, setQuantity] = useState(initValue);
  const [isChange, setIsChange] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const changeQuantity = (change) => {
    setIsChange(true)
    let newQuantity = Number(quantity);

    if (isNaN(newQuantity)) newQuantity = 1;

    newQuantity += change;

    newQuantity = Math.max(newQuantity, 0);

    setQuantity(newQuantity);
  };

  return (
    <div className='d-flex column-gap-5'>
      <div className='data-quantity'>
        <button className='sub' type="button" title={decreaseText} onClick={() => changeQuantity(-1)}>
          {decreaseText}
        </button>
        <input type="number" name="quantity" pattern="[0-9]+" value={quantity} readOnly />
        <button className='add' type="button" title={increaseText} onClick={() => changeQuantity(1)}>
          {increaseText}
        </button>
      </div>
      {isChange &&
        <LoadingButton
        loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant='outlined'
          onClick={()=> {
            setIsLoading(true)
            updateQuantity(quantity).then((value) => {
              setIsLoading(false)
              setIsChange(false)
            })
          }}
        >
          Lưu
        </LoadingButton>
      }
    </div>
  );
};

export default QuantityInput;