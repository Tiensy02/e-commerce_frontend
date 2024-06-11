/**
 * @description kiểm tra đối tượng có phải array hay không
 * @param {object} array 
 * @returns {boolean} 
 */
export const isArray = (array) => {
  return array != null && Array.isArray(array)
}
/**
 * kiểm tra 1 mảng có khả dụng hay không
 * @param {object} array 
 * @returns {boolean}
 */
export const isAliviableArray = (array) => {
  return isArray(array) && array.length > 0;
}

/**
 * chuyển 1 đối tượng lồng nhau thành 1 mảng lồng nhau
 * @param {Object} obj đối tượng lồng nhau
 * @returns Array
 */

export function convertToArray(obj) {
  const result = [];


  function traverse(node) {
    const newNode = {
      id: node.id,
      categoryName: node.categoryName,
      subCategories: []
    };

    node.subCategories?.forEach(child => {
      newNode.subCategories?.push(traverse(child));
    });

    return newNode;
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {

      result.push(traverse(obj[key]));
    }
  }

  return result;
}

// chuyển 1 đối tượng lồng nhau thành 1 mảng các thành phần
export function convertToArrayWithTargetName(obj, targetIndusName) {
  let isFind = false

  function traverse(node) {
    const newNode = {
      IndusName: node.IndusName,
      children: []
    };


    node?.children?.forEach(child => {
      if (node.IndusName === targetIndusName) {
        isFind = true
        return newNode
      } else {
        newNode?.children?.push(traverse(child));
      }
    });

    return newNode
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let result = traverse(obj[key])
      if (isFind) {
        return result
      }
    }
  }
}

export function flatObjectToArray(obj) {
  const result = [];


  function traverse(node) {
    const newNode = {
      IndusName: node.IndusName,
      children: []
    };
      node?.children?.forEach(child => {
        result.push(child)
        newNode.children.push(traverse(child));
      });

    return newNode;
  }

      result.push(traverse(obj));

      return result;
  }

export function flatAllArray(arr) {
  const result = [];

  function traverse(node) {
    const newNode = {
      IndusName: node.IndusName,
      children: []
    };

    node?.children?.forEach(child => {
      result.push(child)
      newNode.children.push(traverse(child));
    });

    return newNode;
  }

  arr.forEach(item => {
    result.push(traverse(item));
  });

  return result;
}


