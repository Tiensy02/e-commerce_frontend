import './form.css';
import CustomTooltip from '../Tooltip';
import chainParse from '../../heppler/ChainParse';
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import get from 'lodash/get';

export const Title = ({ name, title, validation, isTooltip = false, titleTooltip }) => (
  <span className="form__fields--row__label">
    {isTooltip ? (
      <span className="form__fields--row__label--tooltip">
        {isTooltip && (
          <CustomTooltip
            isRequire={chainParse(validation, ['required'])}
            labelTooltip={title}
            titleTooltip={titleTooltip}
            size={14}
          />
        )}
      </span>
    ) : (
      <span htmlFor={name}>
        {title}
        {chainParse(validation, ['required']) ? <span className="form__fields--row__label--required">*</span> : null}
      </span>
    )}
  </span>
);
const FormInput = ({
  title,
  name,
  validation = {},
  register,
  errors,
  displayType = 'col',
  placeholder,
  isTooltip,
  size = 'medium',
  titleTooltip,
  label,
  isPassword,
  row,
  showPassword,
  handleClickShowPassword,
}) => {
  return (
    <div className={`form-control-input ${displayType === 'col' ? 'display-field__col' : 'display-field__row'}`}>
      {(isTooltip || displayType=='row') && <Title title={title} name={name} validation={validation} isTooltip={isTooltip} titleTooltip={titleTooltip} />}
      <div style={{flex:1}} >
        <TextField
        type={isPassword ? (showPassword ? "text" : "password") : "text"}
          label={displayType!='row' ? label:''}
          placeholder={placeholder}
          size={size}
          fullWidth
          multiline={row!=null}
          rows={row}
          {...register}
          error={get(errors, name) != null}
          helperText={get(errors, name)?.message}
          InputProps={isPassword ? {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          } :{}}
        />
      </div>
    </div>
  );
}
const FormSelect = ({
  title,
  name,
  validation = {},
  register,
  errors,
  displayType = 'col',
  isTooltip,
  titleTooltip,
  label,
  valueForm, // là value được lấy từ hàm watch của useForm,, Ví dụ const value = watch(name);
  selectOptions, // 1 mảng các đối tượng có {value, label}
}) => {
  return (
    <div className={`form-control-input ${displayType === 'col' ? 'display-field__col' : 'display-field__row'}`}>
      {(isTooltip || displayType=='row') && <Title title={title} name={name} validation={validation} isTooltip={isTooltip} titleTooltip={titleTooltip} />}
      <div style={{flex:1}} >
      <FormControl sx={{width:'100%'}} error= {get(errors,name) != null}>
        <InputLabel id="demo-simple-select-error-label">{label}</InputLabel>
        <Select
          label={label}
          value={valueForm}
          {...register}
          renderValue={(value) => value}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {selectOptions.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{get(errors,name)?.message}</FormHelperText>
      </FormControl>
      </div>
    </div>
  );
}
const FormNumber = ({
  title,
  name,
  placeholder,
  validation = {},
  register,
  errors,
  displayType = 'col',
  isTooltip,
  titleTooltip,
  label,
  moreInfo
}) => {
  return (
<div className={`form-control-input ${displayType === 'col' ? 'display-field__col' : 'display-field__row'}`}>
      {(isTooltip || displayType=='row') && <Title title={title} name={name} validation={validation} isTooltip={isTooltip} titleTooltip={titleTooltip} />}
      <div style={{flex:1}} >
        <TextField
        type='number'
          label={displayType!='row' ? label:''}
          placeholder={placeholder}
          fullWidth
          {...register}
          error={get(errors, name) != null}
          helperText={get(errors, name)?.message}
          InputProps={{
            endAdornment: <InputAdornment position="end">| {moreInfo}</InputAdornment>,
          
          }}
        />
      </div>
    </div>
  )
  
}
export { FormInput, FormSelect,FormNumber };