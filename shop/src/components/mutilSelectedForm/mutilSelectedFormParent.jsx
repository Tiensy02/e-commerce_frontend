import { useEffect, useState } from "react";
import SelectComponent from "./mutilSelectedForm";
import './index.css';   
export default function MutilSelectedFormParent({obj,init,attributeName, setValueSelecteted,setIndustrySelected}) {

    const [selectedList, setSelectedList] = useState([])
    useEffect(()=> {
        let value = ""
        selectedList.forEach((elem)=> {
            value = value + ", "+elem.categoryName 
        })
        setIndustrySelected(selectedList)
        setValueSelecteted(value)
    },[selectedList])

    return (
        <div className="d-flex mutil_selected_form">
                <SelectComponent setIndustrySelected={setIndustrySelected} radioIndex={selectedList.length} selectedList={selectedList} obj={obj} arraySelect={init} nameObject={attributeName} setSelectedList={setSelectedList} />

        {selectedList.length>0 && selectedList.map((item, index) => (
            <div key={index}>
                <SelectComponent setIndustrySelected={setIndustrySelected} radioIndex={selectedList.length} selectedList={selectedList} obj={obj} key={index} arraySelect={item.subCategories} nameObject={attributeName} setSelectedList={setSelectedList} />
            </div>
        ))}
       
        </div>
    )
}