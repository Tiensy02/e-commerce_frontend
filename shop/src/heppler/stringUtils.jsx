function randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


function converToMoney(value) {
    const number = parseFloat(value);

    // Kiểm tra xem kết quả sau khi chuyển có phải là một số hợp lệ không
    if (!isNaN(number)) {
        // Trả về số nếu là một số hợp lệ
        return "đ" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    } else {
        // Trả về null nếu không phải là một số hợp lệ
        return null;
    }
};

    function isNumber(value) {
        return typeof value === 'number' && !isNaN(value);
      }
export { randomString , converToMoney,isNumber};
