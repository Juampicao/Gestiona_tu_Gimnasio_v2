import { Component, OnInit } from '@angular/core';
import { Helper } from 'src/app/core/services/helper/Helper';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { SUBSCRIPTOR_1_DEFAULT } from 'src/app/modules/data/mockData/subscriptor/SubscriptorDefaultData';
import { ISubscriptionStatus } from 'src/app/modules/Models/Subscriptor/.subscription/interface/ISubscriptionStatus';
import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';
import { ViewSubscriptorService } from '../services/view-subscriptor.service';

class VisualSubPlanSubscription {
  name: string;
  amount: number;
  status: ISubscriptionStatus;
  paymentExpirationDate: Date | null;

  constructor(subscriptor: Subscriptor) {
    this.name = subscriptor.getPlanSubscription().nombre;
    this.amount = subscriptor.getPlanSubscription().monto;
    this.status = subscriptor.getStatus();
    this.paymentExpirationDate = subscriptor
      .getPlanSubscription()
      .getPaymentExpiration();
  }

  getPaymentExpirationParsed() {
    if (this.paymentExpirationDate) {
      return Helper.ParseDate(this.paymentExpirationDate);
    } else {
      return 'Sin fecha.';
    }
  }
}
@Component({
  selector: 'app-view-sub-plan-subscription',
  templateUrl: './view-sub-plan-subscription.component.html',
  styleUrls: ['./view-sub-plan-subscription.component.css'],
})
export class ViewSubPlanSubscriptionComponent implements OnInit {
  public isLoading: boolean = true;

  plan: VisualSubPlanSubscription = new VisualSubPlanSubscription(
    SUBSCRIPTOR_1_DEFAULT
  );

  constructor(
    private _customLogger: MyCustomLogger,
    private _subscriptorViewService: ViewSubscriptorService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.isLoading = false;
  }
  /**
   * Recibir la informacion y recorrer.
   */
  getData() {
    try {
      const subscriptor = this._subscriptorViewService.getSubscriptor();
      this.plan = new VisualSubPlanSubscription(subscriptor);
    } catch (error) {
      this._customLogger.logError(
        'ViewSubPlanSubscriptionComponent, getData',
        error
      );
    }
  }
}
