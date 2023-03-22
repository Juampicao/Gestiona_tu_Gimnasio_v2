import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ISelectOption } from 'src/app/core/modules/components/05-form-reutilizable/my-input/my-input.component';
import { MyConfirmComponent } from 'src/app/core/modules/components/11-confirm-reutilizable/my-confirm/my-confirm.component';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { DataFormSubscriptor } from 'src/app/modules/Subscriptors/components/forms/form-create-sub/form-create-sub.component';
import { IForms } from 'src/app/modules/Subscriptors/components/forms/interfaces/IForms';
import { SubscriptorManagerService } from 'src/app/modules/Subscriptors/services/subscriptor-manager/subscriptor-manager.service';

export class PlanSubscriptionFormValues {
  constructor(
    public name: any,
    public monto: number | undefined,
    public expiracion: any,
    public expiredTime: any,
    public diasParaVencerPago: number,
    public calendarioOParticular: any
  ) {}
}

@Component({
  selector: 'app-form-create-plan-subscription',
  templateUrl: './form-create-plan-subscription.component.html',
  styleUrls: ['./form-create-plan-subscription.component.css'],
})
export class FormCreatePlanSubscriptionComponent implements OnInit, IForms {
  isLoading: boolean = true;
  form: FormGroup<any> = new FormGroup({});
  defaultValues: PlanSubscriptionFormValues = {
    name: 'Plan Gold',
    monto: 5960,
    expiracion: 'tiempo',
    expiredTime: 'quincenal',
    diasParaVencerPago: 10,
    calendarioOParticular: true,
  };

  initialValues: PlanSubscriptionFormValues = {
    name: '',
    monto: 0,
    expiracion: 'tiempo',
    expiredTime: 'mensual',
    diasParaVencerPago: 0,
    calendarioOParticular: '',
  };

  // Tipo expiracion
  selectedOptionExpiracion!: ISelectOption;
  expiracionOptions: ISelectOption[] = [
    {
      value: 'tiempo',
      label: 'Tiempo ',
    },
    {
      value: 'cantidad',
      label: 'Cantidad ',
    },
  ];

  // Recurrencia
  selectedOptionExpiredtime!: ISelectOption;
  selectOptions: ISelectOption[] = [
    {
      value: 'mensual',
      label: 'Mensual ',
    },
    {
      value: 'quincenal',
      label: 'Quincenal ',
    },
    {
      value: 'trimestral',
      label: 'Trimestral ',
    },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DataFormSubscriptor,
    public dialogRef: MatDialogRef<FormCreatePlanSubscriptionComponent>,
    private _customLogger: MyCustomLogger,
    private _clientNotification: MyClientNotificationService,
    private _subscriptorManagerService: SubscriptorManagerService,
    private _dialog: MatDialog,
    private _location: Location
  ) {
    this._customLogger.logDebug('Data id', JSON.stringify(data));
  }

  ngOnInit(): void {
    try {
      //  this.getData();
      this.createForm();
      this.isLoading = false;
      this.form.setValue(this.initialValues);
      // // Escuchar cambios en el campo de "pagador"
      // this.form.get('expiracion')?.valueChanges.subscribe((value) => {
      //   if (value && value.trim() !== '') {
      //     // this.getSubscriptorById(value);
      //   }
      // });
    } catch (error) {
      this._customLogger.logError('FormCreateSubscriptor, ngOnInit()', error);
      this._clientNotification.openNotification(
        'Error al Cargar el formulario de pago',
        'error'
      );
    }
  }

  ngAfterViewInit(): void {}

  createForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      monto: new FormControl('', [Validators.required]),
      expiracion: new FormControl('', [Validators.required]),
      expiredTime: new FormControl('', [Validators.required]),
      diasParaVencerPago: new FormControl('', [Validators.required]),
      calendarioOParticular: new FormControl('', [Validators.required]),

      // amountUses: new FormControl('', [Validators.required]),
    });
  }

  async onSubmit(): Promise<void> {
    try {
      this._customLogger.logDebug(
        'FormCreatePaymentComponent',
        'Form:',
        this.form.value
      );

      if (await this.confirmForm(JSON.stringify(this.form.value, null, 2))) {
        // Separo los values del form
        const name = this.form.controls['name'].value;
        const monto = this.form.controls['monto'].value;
        const expiracion = this.form.controls['expiracion'].value;
        const expiredTime = this.form.controls['expiredTime'].value;
        const diasParaVencerPago =
          this.form.controls['diasParaVencerPago'].value;

        const notification = this._clientNotification.openNotification(
          'Exito al crear un plan de suscripcion',
          'success'
        );

        // Reseteo el form
        this.resetForm();

        this.goBack();
      }
    } catch (error) {
      this._customLogger.logError('FormCreatePaymentComponent, form', error);
      this._clientNotification.openNotification('Hubo un error!', 'error');
    }
  }

  initEditForm() {
    this.form.setValue(this.initialValues);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onDefaultData() {
    this.form.setValue(this.defaultValues);
  }

  resetForm(): void {
    this.form.reset();
  }

  async confirmForm(data?: string): Promise<boolean> {
    const dialogRef = this._dialog.open(MyConfirmComponent, {
      data: data ? data : 'Confirmar el plan',
    });

    const response = await dialogRef.afterClosed().toPromise();

    return response;
  }

  goBack(): void {
    this._location.back();
  }
}
