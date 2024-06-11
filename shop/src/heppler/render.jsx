import _ from 'lodash';
/**
 * @param {Object} obj đối tượng nhận được khi gọi api với pageable
 * @returns đối tượng chứa những trường mong muốn
 */
const converFromPageable = (obj) => {
    const result = {}
    result.data = obj.content
    result.pageCurrent = obj.number
    result.totalElements = obj.totalElements
    result.totalPages = obj.totalPages
    return result;
}  

function mergeOrders(orders) {  
    const mergedOrders = {};
  
    orders.forEach(order => {
      const productId = order.productId;
  
      if (!mergedOrders[productId]) {
        mergedOrders[productId] = {
          ...order,
          order: [order.order],
          id:[order.id]
        };
      } else {
        mergedOrders[productId].quantity += order.quantity;
        mergedOrders[productId].id.push(order.id);
        mergedOrders[productId].order.push(order.order);
      }
    });
  
    return Object.values(mergedOrders);
  }
export {converFromPageable, mergeOrders}
