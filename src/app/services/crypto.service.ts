import { Injectable } from '@angular/core';
import CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  setCrypto(password : string, name: string ) : string {
    const scripted = CryptoJS.AES.encrypt(password, name).toString();

    return scripted
  }

  decrypt(pass: string, name:  string): string{

    const decrypt = CryptoJS.AES.decrypt(pass, name).toString(CryptoJS.enc.Utf8);

    return decrypt;
  }


}
