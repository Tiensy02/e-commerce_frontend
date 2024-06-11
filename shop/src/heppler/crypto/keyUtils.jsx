import CryptoJS, { AES } from 'crypto-js'
import { Buffer } from 'buffer';
import { fetchJSONNoToken, fetchText } from '../api';
import { CRYPTO_API } from '../setting/apiConstant';

/**
 * @returns {String} secretKey phù hợp với AES
 */
export function generateKey() {
    const key = CryptoJS.lib.WordArray.random(32);
    const iv = CryptoJS.lib.WordArray.random(16);
    
    const secretKey = {
        key:CryptoJS.enc.Hex.stringify(key),
        iv :CryptoJS.enc.Hex.stringify(iv)
      }

    return secretKey;
}

/**
 * mã hoá dữ liệu bằng thuật toán RSA
 * @param {Object} dataToEncrypt dữ liệu cần mã hoá
 * @param {String} publicKey public key
 * @returns {String} dữ liệu đã mã hoá thành String
 */
export async function encryptDataRSA (dataToEncrypt , publicKey) {
    const dataEncode = getMessageEncoding(dataToEncrypt)
    const keyEncode = await importKey(publicKey)
    const encryptData = await encryptKey(dataEncode, keyEncode)
    return encryptData
}

function getMessageEncoding(data) {
    let enc = new TextEncoder();
    return enc.encode(data);
}

export async function getPublicKey() {
    const option = {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
        }
    }
    const response = await fetchText(CRYPTO_API.GET_PUBLIC_KEY,option)
    return response
}
/**
 * 
 * @param {String} data secertkey đã được mã hóa bằng public key
 * @returns 
 */
export async function postSecretKey(data) {
    const option = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: data
    }
    const response = await fetch (CRYPTO_API.POST_SECECT_KEY,option)
    return response
}
/**
 * hàm mã hóa thông tin bằng AES
 * @param {String} data thông tin cần mã hóa
 * @returns String thông tin đã được mã hóa
 */
export function encryptDataAES(data) {
    const keyCrypto = JSON.parse(sessionStorage.getItem("secretKey"));
    const key = CryptoJS.enc.Hex.parse(keyCrypto.key)
    const iv = CryptoJS.enc.Hex.parse(keyCrypto.iv)

    const encrypted = AES.encrypt(data, key,{
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: iv 
      });

    return encrypted.toString();
}
/**
 * 
 * @param {String} data mess bị mã hóa
 * @returns chuỗi đã được 
 */
export function decryptDataAES(data) {
    const keyCrypto = JSON.parse(sessionStorage.getItem("secretKey"));
    const key = CryptoJS.enc.Hex.parse(keyCrypto.key)
    const iv = CryptoJS.enc.Hex.parse(keyCrypto.iv)

    const decrypted = AES.decrypt(data, key,{
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: iv 
      });

    return decrypted.toString(CryptoJS.enc.Utf8);
}
/**
 * gọi 1 api với phương thức POST và dữ liệu được mã hóa bằng AES
 * @param {Object} data đối tượng được gửi đi
 * @param {String} url api
 * @returns thông tin được trả về từ api
 */

export async function postDataEncrypt(data, url) {
    const dataEncrypt = encryptDataAES(JSON.stringify(data))
    const options = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            "Encryption":"true"
        },
        body: dataEncrypt
    } 

    const response = await fetch(url,options)
    let responseDataEncrypted = await response.text()


    if (responseDataEncrypted.startsWith('"') && responseDataEncrypted.endsWith('"')) {
        responseDataEncrypted = responseDataEncrypted.slice(1, -1)
    } 

    

    const responseData = decryptDataAES(responseDataEncrypted)

    return JSON.parse(responseData)
}


async function importKey (publicKey) {
    // test(pemEncodedKey)
    const binaryStr = atob(publicKey);
    // Convert the binary string to an ArrayBuffer
    const buff = str2ab(binaryStr);

    // Function to convert a binary string to an ArrayBuffer
    

    const key = await crypto.subtle.importKey(
        "spki",
        buff,
        { name: "RSA-OAEP" , hash: "SHA-256"},
        true,
        ["encrypt"]
    );
    return key;
}


async function encryptKey (data, key) {
    const encryptedData = await crypto.subtle.encrypt(
        {
            name: "RSA-OAEP",
        },
        key,
        data
    );

    const result = Buffer.from(encryptedData)
    return result.toString('base64')
}

function str2ab(str) {
    const buffer = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
    buffer[i] = str.charCodeAt(i);
    }
    return buffer;
}