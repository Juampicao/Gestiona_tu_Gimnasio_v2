import { Injectable } from '@angular/core';
import { Observable, of, Subject, tap, throwError } from 'rxjs';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import {
  SUBSCRIPTOR_PAYMENT_DEFAULT_1,
  SUBSCRIPTOR_PAYMENT_DEFAULT_2,
  SUBSCRIPTOR_PAYMENT_DEFAULT_3,
} from 'src/app/modules/data/mockData/payment/subscriptor-payment/subscriptorPaymentDefaultData';
import { IPaymentStatus } from 'src/app/modules/Models/Payment/interfaces/Interfaces';
import { IPaymentMethod } from 'src/app/modules/Models/Payment/interfaces/IPaymentMethods';
import { SubscriptionSubscriptorPayment } from 'src/app/modules/Models/Payment/models/SubscriptionSubscriptorPayment';
import { Bank } from 'src/app/modules/Models/Payment/paymentMethods/Bank';
import { BankTransfer } from 'src/app/modules/Models/Payment/paymentMethods/BankTransfer';
import { CashMethod } from 'src/app/modules/Models/Payment/paymentMethods/CashMethod';
import { CreateNewPaymentSubscriptionData } from 'src/app/modules/Models/Payment/services/models/CreateNewPaymentSubscriptionData';
import { PlanSubscriptionManagerService } from '../plan-subscription-manager/plan-subscription-manager.service';

enum IBankOptions {
  BBVA = 'bbva',
  CIUDAD = 'ciudad',
  OTRO = '',
}

/**
 * Cuenta de banco donde se recibirán pagos. Es la propia de la empresa donde se registrá el balance de todas las transferencias enviadas aca.
 */
const BANK_BBVA_TO_RECIEVE_TRANSFER = new Bank(
  IBankOptions.BBVA,
  1111111,
  'Cuenta Oficial Campitos'
);

/**
 * IPaymentMethod
 * Ejemplo de transferencia del ciudad al BANK creado bbva "cuenta oficial campito".
 */
const PAYMENT_METHOD_BANK_CIUDAD = new BankTransfer(
  '2929292',
  IBankOptions.CIUDAD,
  BANK_BBVA_TO_RECIEVE_TRANSFER
);

@Injectable({
  providedIn: 'root',
})
export class PaymentManagerService {
  private _refreshData$ = new Subject<void>();
  private _paymentList: SubscriptionSubscriptorPayment[] = [
    SUBSCRIPTOR_PAYMENT_DEFAULT_1,
    SUBSCRIPTOR_PAYMENT_DEFAULT_2,
    SUBSCRIPTOR_PAYMENT_DEFAULT_3,
  ];

  // Lista metodos pago.
  private _listPaymentMethods: IPaymentMethod[] = [PAYMENT_METHOD_BANK_CIUDAD];
  private _listOwnBanks: Bank[] = [BANK_BBVA_TO_RECIEVE_TRANSFER];

  constructor(
    private _customLogger: MyCustomLogger,
    private _planSubscriptionService: PlanSubscriptionManagerService
  ) {}

  get refreshData$() {
    return this._refreshData$;
  }

  getAllPayments(): Observable<SubscriptionSubscriptorPayment[]> {
    try {
      let response = this._paymentList.slice();

      return of(response).pipe(
        tap(() => {
          this.refreshData$.next();
        })
      );
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  getPaymentById(id: any): Observable<SubscriptionSubscriptorPayment> {
    try {
      const payment = this._paymentList.find((p) => p.id === id);
      this._customLogger.logDebug(
        'PaymentManagerService, getPaymentById',
        'Todos los pagos:',
        this._paymentList
      );
      if (payment) {
        return of(payment).pipe(
          tap(() => {
            this.refreshData$.next();
          })
        );
      } else {
        return throwError(`No se encontró un pago con el id ${id}`);
      }
    } catch (error) {
      this._customLogger.logError('getPaymentById', error, `id: ${id}`);
      return throwError(`${error}`);
    }
  }

  // createPayment(
  //   payment: CreateNewPaymentSubscriptionData
  // ): Observable<SubscriptionSubscriptorPayment> {
  //   try {
  //     console.info('CreatePayment, 1°', payment);

  //     // let newPayment: SubscriptionSubscriptorPayment = payment;

  //     const newPayment =
  //       new CreatorPaymentSubscriptorService().CreateNewPaymentSubscription(
  //         payment.planSubscription,
  //         payment.subscriptorPagador,
  //         payment.creador,
  //         payment.fechaCreacion
  //       );

  //     // Agregar el nuevo pago a la lista.
  //     this._paymentList.push(newPayment);

  //     console.info('Creado correctamente el Payment 2°', newPayment);

  //     return of(newPayment);
  //   } catch (error) {
  //     this._customLogger.logError('createPayment', error);
  //     return throwError(`${error}`);
  //   }
  // }

  createPayment(payment: CreateNewPaymentSubscriptionData): Observable<any> {
    try {
      console.info('CreatePayment, 1°', payment);

      // const newPayment = new SubscriptionSubscriptorPayment(
      //   IPaymentStatus.COMPLETADO,
      //   1000,
      //   new Date(),
      //   SUBSCRIPTOR_1_DEFAULT,
      //   new Date(),
      //   PLAN_SUBSCRIPTION_TIME_DEFAULT_1,
      //   USER_1_DEFAULT,
      //   Helper.getFirstDayOfNextMonth(new Date())
      // );
      // newPayment.metodoPago = new CashMethod('1111');

      // const newPlan = this._planSubscriptionService.getPlanSubscriptionById(
      //   payment.planSubscription
      // );

      const newPayment = new SubscriptionSubscriptorPayment(
        IPaymentStatus.COMPLETADO,
        payment.planSubscription.monto,
        new Date(),
        payment.subscriptorPagador,
        new Date(),
        payment.planSubscription,
        payment.creador,
        new Date('2023 10 10')
      );
      newPayment.metodoPago = new CashMethod('1111');

      this._customLogger.logInfo(
        'newPaymentSubscription MANUAL,',
        `${JSON.stringify(newPayment, null, 2)}`
      );

      console.info('Creado correctamente el Payment 2°', newPayment);

      // Agregar el nuevo pago a la lista.
      this._paymentList.push(newPayment);

      return of(payment).pipe(
        tap(() => {
          this.refreshData$.next();
        })
      );
    } catch (error) {
      this._customLogger.logError('createPayment', error);
      return throwError(`${error}`);
    }
  }

  // - - - - - - - - - -  Lista metodos pago  - - - - - - - - - -
  getPaymentMethods(): IPaymentMethod[] {
    try {
      return this._listPaymentMethods;
    } catch (error) {
      this._customLogger.logError(
        'PaymentManagerService, getPaymentMethods',
        error
      );

      throw Error(`${error}`);
    }
  }

  getOwnBanks(): Bank[] {
    try {
      return this._listOwnBanks;
    } catch (error) {
      this._customLogger.logError(
        'PaymentManagerService, getOwnBanks()',
        error
      );
      throw Error(`${error}`);
    }
  }
}
