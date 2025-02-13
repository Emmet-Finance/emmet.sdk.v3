import { Address } from "@ton/core";

export function isValidEvmAddress(tested: string){
    const pattern = /^[0x]{0,2}[0-9a-fA-F]{0,40}$/;
    return pattern.test(tested);
}

export function isValidTonAddress(tested: string) {
    try {
      Address.parse(tested);
      return true;
    } catch (e) {
      return false;
    }
  }