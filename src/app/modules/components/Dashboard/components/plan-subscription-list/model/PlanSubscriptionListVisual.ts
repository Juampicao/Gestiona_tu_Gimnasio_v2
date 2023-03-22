import { Helper } from 'src/app/core/services/helper/Helper';
import { PlanSubscription } from 'src/app/modules/Models/PlanSubscription/models/PlanSubscription';

export class PlanSubscriptionListVisual {
  public monto: number;
  public nombre: string;
  public expirationDate: Date | any;
  public paymentExpirationDate: Date | any;
  public id: any;

  constructor(private plan: PlanSubscription) {
    // this.fechaPagoParsed = this.parseDate(this._fechaPago);
    this.monto = plan.monto;
    this.nombre = plan.nombre;
    this.expirationDate = this.expirationDateParse(plan.getExpirationDate());
    this.paymentExpirationDate = this.expirationDateParse(
      plan.getPaymentExpiration()
    );
    this.id = plan.id;
  }

  private expirationDateParse(date: any): any {
    return Helper.ParseDate(date);
  }
}
