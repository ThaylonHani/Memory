import { Injectable } from '@angular/core';
import CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  setCrypto(password : string, name: string ) : string {
    const encrypt = CryptoJS.AES.encrypt(password, name).toString();

    return encrypt
  }

  decrypt(pass: string, name:  string): string{

    const decrypt = CryptoJS.AES.decrypt(pass, name).toString(CryptoJS.enc.Utf8);

    return decrypt;
  }

  confirmCrypto(encrypt : string, decrypt : string, name : string): boolean {
    const newEncrypt = this.decrypt(encrypt, name);
    const userDecrypt = decrypt;
    if (newEncrypt === userDecrypt) {
      return true;
    } else {
      return false;
    }
  }

}
