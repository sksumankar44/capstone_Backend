require("dotenv").config();
const CryptoJS = require("crypto-js");

const CRYPTO_KEY = process.env.CRYPTO_KEY;

function decryptedObj(data) {
  console.log("data to decrypt:" + data);
  try {
    const decryptedData = CryptoJS.AES.decrypt(data.decode, CRYPTO_KEY);
    const plaintext = decryptedData.toString(CryptoJS.enc.Utf8);
    return JSON.parse(plaintext);
  } catch (err) {
    console.error("Error during decryption:", err);
    throw err;
  }
}

function encryptedObj(data) {
  console.log("data to encrypt:" + data);
  const respObj = JSON.stringify(data);
  const encryptedData = CryptoJS.AES.encrypt(respObj, CRYPTO_KEY).toString();
  return encryptedData;
}

module.exports = {
  encryptedObj,
  decryptedObj,
};
