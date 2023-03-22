import { Helper } from 'src/app/core/services/helper/Helper';
import {
  IPaymentStatus,
  IPaymentTypes,
  IPaymetMethodType,
} from 'src/app/modules/Models/Payment/interfaces/Interfaces';

export class PaymentList {
  private _fechaPago: any | null;
  public fechaPagoParsed: any | null;

  constructor(
    public estado: IPaymentStatus,
    public monto: number,
    public pagador: any,
    public tipoPago: IPaymentTypes,
    public metodoPago: IPaymetMethodType,
    public fechaPago: Date | null,
    public planSuscripcion: any,
    public id: any
  ) {
    this.fechaPagoParsed = this.parseDate(this._fechaPago);
  }

  parseDate(fechaPago: Date | null): any {
    if (fechaPago) {
      return Helper.ParseDate(fechaPago);
    } else {
      return 'Pending';
    }
  }
}
