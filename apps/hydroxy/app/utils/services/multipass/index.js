import CryptoJS from 'crypto-js';

//

export class Multipass {
  _encryptionKey = new Object();
  _signingKey = new Object();

  //

  constructor(secret) {
    if (!secret) throw new Error('Pass Multipass token');

    const digest = CryptoJS.SHA256(secret);

    this._encryptionKey = CryptoJS.lib.WordArray.create(
      digest.words.slice(0, 16 / 4),
    );

    this._signingKey = CryptoJS.lib.WordArray.create(
      digest.words.slice(16 / 4, 16 / 2),
    );
  }

  //

  generateToken(customerData) {
    customerData.created_at = new Date().toISOString();

    const encrypted = this._encrypt(JSON.stringify(customerData));
    const signature = this._sign(encrypted);

    const token = encrypted.concat(signature);
    let token64 = token.toString(CryptoJS.enc.Base64);

    token64 = token64.replace(/\+/g, '-').replace(/\//g, '_');

    return token64;
  }

  getURL(domain, customerData) {
    const token = this.generateToken(customerData);

    if (!domain || !token) return;

    return 'https://' + domain + '/account/login/multipass/' + token;
  }

  _sign(encrypted) {
    return CryptoJS.HmacSHA256(encrypted, this._signingKey);
  }

  _encrypt(customerText) {
    const iv = CryptoJS.lib.WordArray.random(16);

    const cipher = CryptoJS.AES.encrypt(customerText, this._encryptionKey, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return iv.concat(cipher.ciphertext);
  }
}
