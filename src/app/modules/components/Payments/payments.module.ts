import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../../Shared/shared.module';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscriptorsModule } from '../../Subscriptors/subscriptors.module';
import { FormCreatePaymentComponent } from './components/forms/form-create-payment/form-create-payment.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { ViewPaymentComponent } from './components/view-payment/view-payment.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';

@NgModule({
  declarations: [
    PaymentsComponent,
    FormCreatePaymentComponent,
    PaymentListComponent,
    ViewPaymentComponent,
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    CoreModule,
    SharedModule,
    SubscriptorsModule,
  ],
  providers: [
    // Todo, deberia ir aca?
    // CreatorPaymentSubscriptorService,
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
  ],
})
export class PaymentsModule {}
