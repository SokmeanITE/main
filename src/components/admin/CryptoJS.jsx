// src/utils/crypto.js
import CryptoJS from 'crypto-js';
  const secretKey = 'yourSecretKey';

export const encryptId = (id) => {
  const encryptedId = CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
  return encryptedId;
};



export const decryptData = (id) => {
  try {
    const decryptedData = CryptoJS.AES.decrypt(id, secretKey).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};



