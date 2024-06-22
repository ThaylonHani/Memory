import { Injectable } from '@angular/core';
import CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  setCipher(password : string, name: string ) : string {
    const encrypt = CryptoJS.AES.encrypt(password, name).toString();

    return encrypt
  }

  decipher(pass: string, name:  string): string{

    const decrypt = CryptoJS.AES.decrypt(pass, name).toString(CryptoJS.enc.Utf8);

    return decrypt;
  }

  confirmCipher(encrypt : string, decrypt : string, name : string): boolean {
    const newEncrypt = this.decipher(encrypt, name);
    const userDecrypt = decrypt;
    if (newEncrypt === userDecrypt) {
      return true;
    } else {
      return false;
    }
  }

  setSha256(password: string): string {
    const hash = CryptoJS.SHA256(password);
    return hash.toString(CryptoJS.enc.Hex);
  }

}
