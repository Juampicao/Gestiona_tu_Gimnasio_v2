import { PlanSubscription } from '../../../PlanSubscription/models/PlanSubscription';
import { Subscriptor } from '../../../Subscriptor/model/Subscriptor';

export class CreateNewPaymentSubscriptionData {
  constructor(
    public planSubscription: PlanSubscription,
    public subscriptorPagador: Subscriptor,
    public creador: any,
    public fechaCreacion: Date = new Date()
  ) {}
}
