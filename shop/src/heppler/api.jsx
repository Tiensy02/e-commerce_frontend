import { getLoggedIn, logout, setLoggedIn, setLoggedInUser } from './authUtils';
import { toast } from 'react-toastify';
import { isString } from 'lodash';
/**
 * @description formatParams: hàm chuyển đổi object Param thành chuỗi query string để thêm vào url
 * 
 * @param {Object} params đối tượng chứa thông tin về các param cần thêm vào url
 * @returns String      
 */
const formatParams = (params) =>
  Object.keys(params)
    .map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    })
    .join('&');


const getAccessToken = () => {
  return getLoggedIn().access_token;
}


/**
 * 
 * @returns {int} thời gian sống của token (ms)
 */

const getExpireTime = () => {
  const time = getLoggedIn().expires_in;
  if (time != null && time != "") {
    return time;
  }
  else return null;
}

/**
 * @returns {long} timestamp tại thời điểm tạo token
 */

const getCreateTime = () => {
  const time = getLoggedIn().create_time;
  if (time != null && time != "") {
    return time;
  }
  else return null;
}

/**
 * @description isTokenExpired: hàm kiểm tra xem token đã hết hạn chưa
 * 
 * @returns Boolean      
 */

const isTokenExpired = () => {
  const timeExpire = getExpireTime();
  const timeCreate = getCreateTime();
  if (timeExpire == null || timeCreate == null) return true;
  const currentTime = new Date().getTime();
  return currentTime > timeExpire + timeCreate;
}



const fetchJSON = async (url, option = {}, params = {}, callback = () => { }, showToast = true) => {
  if (isTokenExpired()) {
    toast.error("Đã hết phiên làm việc")
    logout();
    //
    return
  }

  return fetchJSONNoToken(url, option, params, callback, showToast)

}


const fetchJSONNoToken = async (url, option = {}, params = {}, callback = () => { }, showToast = true) => {
  let newUrl = url

  try {
    if (params != null) {
      newUrl = new URL(url);

      newUrl.search = new URLSearchParams(params).toString();
    }
  } catch (error) {
    console.error('Error parsing URL:', url);
    return;
  }
  try {
    const response = await fetch(newUrl, option);
    if (!response.status == 200) {
      if (response.status > 500) {
        const errorMess = response.statusText == 503 ? "" : "Server error";
        throw new Error(errorMess)
      }
      if (response.status > 400) {
        throw await response.json();
      }

    }
    return response.json();
  } catch (error) {
    const message = (() => {
      if (error?.message == null || !isString(error.message)) {
        return 'Có lỗi xảy ra.';
      }
      return error.message;
    })();

    if (message === 'Unauthorized') {
      logout();
      return;
    }

    if (message) {
      showToast && toast.error(message);
    }

    throw error;
  }

}

const fetchText = async (url, option = {}, params = {}, callback = () => { }, showToast = false) => {
  const newUrl = new URL(url);
  if (params != null) {
    newUrl.search = new URLSearchParams(params).toString();
  }
  try {
    const response = await fetch(newUrl, option);
    console.log(response);
    
    if (response.status != 200) {
      if (response.status > 500) {
        const errorMess = response.statusText == 503 ? "" : "Server error";
        throw new Error(errorMess)
      }
      if (response.status >= 400) {
        throw await response.text();
      }

    }
    return response.text();
  } catch (error) {
    const message = (() => {
      if (error?.message == null || !isString(error.message)) {
        return 'Có lỗi xảy ra.';
      }
      return error.message;
    })();

    if (message === 'Unauthorized') {
      logout();
      return;
    }

    if (message) {
      showToast && toast.error(message);
    }

    throw error;
  }
}

export { fetchJSON, fetchJSONNoToken, formatParams, getAccessToken, getCreateTime, getExpireTime, isTokenExpired, fetchText }
