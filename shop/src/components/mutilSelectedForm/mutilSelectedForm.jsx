import React, { useEffect, useState } from 'react';
import { randomString } from '../../heppler/stringUtils';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './index.css'; // Import your CSS file

function SelectComponent({ setIndustrySelected,arraySelect,selectedList, nameObject, setSelectedList,radioIndex }) {
  const [selected, setSelected] = useState(null);
  
  const handleChange = (e) => {

    const selectedOption = arraySelect.find(item => item[nameObject] === e.target.value);

    const moreInfoSelectedOption = {...selectedOption, indexSelected :radioIndex};
    

    if (e.target.name == '') {
      setSelected({...selectedOption, indexSelected :radioIndex});
      setIndustrySelected((pre)=> {
        return [...pre,selectedOption]
      })
      setSelectedList([...selectedList,moreInfoSelectedOption]);
    }else {
      setSelected({...selectedOption, indexSelected :e.target.name});
      setIndustrySelected((pre)=> {
        return [...pre,selectedOption]
      })
      const newSelectedList = selectedList.slice(0,parseInt(e.target.name));
      setSelectedList([...newSelectedList,moreInfoSelectedOption]);
    }    
    
    
  }
  if (!arraySelect) return null;

  return (
    <div className="select_wrapper">
      <div className='d-flex flex-column select_item_wrapper'>
        {arraySelect.map((item, index) => (
          <div key={index}>
            <input key={index} onClick={handleChange} id={item[nameObject]} name={selected? selected.indexSelected:''} type='radio' value={item[nameObject]} style={{ display: "none" }} />
            <label style={selected && selected[nameObject] == item[nameObject] ? { color: '#015ae9' } : {}} className={`select_item`} htmlFor={item[nameObject]}>{item[nameObject]}
              {(item?.subCategories.length) > 0 && <ChevronRightIcon />}
            </label>
          </div>
        ))}
      </div>
    </div>

  );
}

export default SelectComponent;