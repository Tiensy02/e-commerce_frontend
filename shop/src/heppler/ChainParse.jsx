/**
 * hàm thực hiện lấy giá trị của 1 thuộc tính lồng nhau trong 1 object bằng cách truyền vào mảng tên các thuộc tính dẫn tới giá trị muốn lấy
 * @param {Object} obj 1 đối tượng gồm các thuộc tính lồng nhau
 * @param {Array<String>} attrArr mảng chứa tên các thuộc tính dẫn đến giá trị cần lấy
 * @param {Object} defaultValue object  trả về nếu không tìm thấy giá trị
 * @returns Object
 */
const chainParse = (obj, attrArr, defaultValue = null) => {
    if (!obj || typeof obj != 'object') {
      return defaultValue;
    }
  
    let cloneObj = Object.assign({}, obj);
  
    for (let i = 0; i < attrArr.length; i++) {
      cloneObj = cloneObj[attrArr[i]];
      if (typeof cloneObj == 'undefined' || cloneObj === null || cloneObj === '') return defaultValue;
    }
  
    return cloneObj;
  };
  
  export default chainParse;
  