import { Payment } from './models/Payment';
import { IPaymentManager } from './services/interfaces/IPaymentManager';
import { PaymentManager } from './services/PaymentManager';

export interface PropsSelectServiceInjector {
  type: 'original' | 'mock';
}

export interface PropsSelectDatabaseInjector {
  type: 'objetos' | 'json';
}

export class ServiceInjectorPayment {
  private static _service: IPaymentManager;
  private static _paymentList: Payment[] = [];

  /**
   * Funcion interna de testing: Levanto una instancia. Inyeccion de dependencias.
   * @returns service
   * @param service: PropsSelectServiceInjector = "original" || "mock"
   */
  static selectService(
    service: PropsSelectServiceInjector['type'] = 'original'
  ): IPaymentManager {
    if (service === 'original') {
      return new PaymentManager(this._paymentList);
    } else if (service === 'mock') {
      if (!this._service) {
        this._service = new PaymentManager(this._paymentList);
      }

      return this._service;
    } else {
      return new PaymentManager(this._paymentList);
    }
  }
}
