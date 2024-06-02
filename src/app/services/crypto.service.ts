import { Injectable } from '@angular/core';
import CryptoJS from "crypto-js";
@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  setCrypto(password : string, name: string ) : string {
    const scripted = CryptoJS.HmacSHA256(password, name).toString();

    return scripted
  }



}
