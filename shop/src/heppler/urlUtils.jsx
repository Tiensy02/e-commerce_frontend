/**
 * hàm thêm param vào url trong trường hợp muốn filter
 * @param {Object} params đối tượng chứa thông tin filter
 * @param {String} key đối số trong url query
 */
export const addFilterToUrl = (params, key = "filter") => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, JSON.stringify(params))
    window.history.replaceState({}, "", url);
}

/**
 * lấy đối tượng đang được filter
 * @param {String} key tên đối số trong url query
 * @returns {Object}
 */
export const getFilterFromUrl = (key = "filter") => {
    const url = new URL(window.location.href);
    const paramObject = url.searchParams.get(key)
    if (paramObject) {
        try {
            return JSON.parse(paramObject)
        } catch (error) {
            console.error('Error parsing filters from URL:', error);
            return null
        }
    }
    return null;
}