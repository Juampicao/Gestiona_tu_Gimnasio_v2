import { Component, OnInit } from '@angular/core';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';
import { ViewSubscriptorService } from '../services/view-subscriptor.service';
import { PaymentVisualSubscriptor } from './model/PaymentVisualSubscriptor';

@Component({
  selector: 'app-view-sub-payments',
  templateUrl: './view-sub-payments.component.html',
  styleUrls: ['./view-sub-payments.component.css'],
})
export class ViewSubPaymentsComponent implements OnInit {
  // paymentVisual!: PaymentVisual; // !Dara error por que esta en payments
  paymentVisual!: PaymentVisualSubscriptor;
  subscriptor!: Subscriptor;
  isLoading: boolean = true;

  headArrayPayments = [
    { Head: 'Estado', FieldName: 'estado' },
    { Head: 'Id', FieldName: 'id' },
    { Head: 'Monto', FieldName: 'monto' },
    { Head: 'Pagador', FieldName: 'pagadorNombre' },
    { Head: 'Aclaracion', FieldName: 'tipoPago' },
    { Head: 'Metodo', FieldName: 'metodoPago' },
    { Head: 'Fecha Pago', FieldName: 'fechaPagoParsed' },
    { Head: 'Plan', FieldName: 'planSuscripcionName' },
    { Head: 'ID', FieldName: 'id' },
    { Head: 'Action', FieldName: '' }, // Activando esta fila aparecen las funciones.
  ];

  // Lista pagos.
  paymentsList: any[] = [];

  constructor(
    private _subscriptorViewService: ViewSubscriptorService,
    private _customLogger: MyCustomLogger,
    private _clientNotification: MyClientNotificationService
  ) // private _paymentManagerService: PaymentManagerService
  {}

  ngOnInit(): void {
    this.getSubscriptor();
    // this.getData();
    // this.getPayments();
  }

  ngAfterViewInit() {
    this.isLoading = false;
  }

  async getSubscriptor() {
    try {
      this.subscriptor = await this._subscriptorViewService.getSubscriptor();
    } catch (error) {
      this._customLogger.logError(
        'ViewSubPaymentsComponent, getSubscriptor',
        error
      );
      this._clientNotification.openNotification(
        `No se encuentra el suscriptor`,
        'error'
      );
      throw new Error(`${error}`);
    }
  }

  getPayments() {}
}
// getPayments() {
//   try {
//     const filter = new PaymentFilter();
// filter.pagador = this.subscriptor;
// const subscriptionPayments =
//   this._paymentManagerService.getPaymentsByFilter(filter);
// .pipe(
//   map((data: Payment[]) => {
//     this._customLogger.logInfo(
//       'ViewSubPaymentsComponent',
//       'getPayments()',
//       data
//     );
// this.paymentList = data.map((payment: Payment) => {
//   return new PaymentVisualSubscriptor(payment);
// });
//   })
// )
// .subscribe((error) => {
//   this._customLogger.logError(
//     'ViewSubPaymentsComponent, getPayments()',
//     error
//   );
//   throw new Error(`${error}`);
// });
//   } catch (error) {
//     this._customLogger.logError('ViewSubPaymentsComponent, getData', error);
//     this._clientNotification.openNotification(
//       `No hay pagos con estos filtros`,
//       'error'
//     );
//     throw new Error(`${error}`);
//   }
// }

/**
 * Recibir la informacion y recorrer.
 */
// async getData() {
//   try {
//     const filter = new PaymentFilter();
//     // filter.pagador = this.subscriptor;
//     // filter.montoSince = 0;
//     // filter.montoUntil = 5999;
//     const subscriptionPayments =
//       this._paymentManagerService.getPaymentsByFilter(filter);

//     this.paymentVisual = new PaymentVisualSubscriptor(
//       subscriptionPayments[0]
//     );
//     this._customLogger.logInfo(
//       'ViewSubPayments, getData()',
//       '',
//       subscriptionPayments
//     );
//   } catch (error) {
//     this._customLogger.logError('ViewSubPaymentsComponent, getData', error);
//     this._clientNotification.openNotification(
//       `No hay pagos con estos filtros`,
//       'error'
//     );
//     throw new Error(`${error}`);
//   }
// }
