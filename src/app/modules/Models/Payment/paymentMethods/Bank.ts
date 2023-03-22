import { IBankOptions } from '../interfaces/Interfaces';

export class Bank {
  private _nombreBanco: IBankOptions;
  private _numeroCuenta: string | number;
  private _otrosDatos: string | number;

  constructor(
    nombreBanco: IBankOptions,
    numeroCuenta: string | number,
    otrosDatos: string | number = ''
  ) {
    this._nombreBanco = nombreBanco;
    this._numeroCuenta = numeroCuenta;
    this._otrosDatos = otrosDatos;
  }

  public get nombreBanco(): IBankOptions {
    return this._nombreBanco;
  }

  public set nombreBanco(value: IBankOptions) {
    this._nombreBanco = value;
  }

  public get cuenta(): string | number {
    return this._numeroCuenta;
  }

  public set cuenta(value: string | number) {
    this._numeroCuenta = value;
  }

  public get otrosDatos(): string | number {
    return this._otrosDatos;
  }

  public set otrosDatos(value: string | number) {
    this._otrosDatos = value;
  }
}
