import React, { useState } from 'react';

const MFAInput = ({ length, onChange }) => {

  const [values, setValues] = useState(Array(length).fill(''));

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === '') {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);
      onChange(newValues.join(''));
      // Chuyển focus đến ô tiếp theo nếu có giá trị nhập
      if (value && index < length - 1) {
        document.getElementById(`mfa-input-${index + 1}`).focus();
      }
      
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && values[index] === '' && index > 0) {
      document.getElementById(`mfa-input-${index - 1}`).focus();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {values.map((value, index) => (
        <input
          key={index}
          id={`mfa-input-${index}`}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{ width: '40px', height: '40px', textAlign: 'center', fontSize: '18px' }}
        />
      ))}
    </div>
  );
};

export default MFAInput;
