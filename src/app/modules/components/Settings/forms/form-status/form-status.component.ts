import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { ICondition } from 'src/app/modules/Models/Subscriptor/.subscription/interface/IConditions';
import { ISubscriptionStatus } from 'src/app/modules/Models/Subscriptor/.subscription/interface/ISubscriptionStatus';
import { IForms } from 'src/app/modules/Subscriptors/components/forms/interfaces/IForms';

export class DataFormStatus {
  constructor(
    public status: ISubscriptionStatus,
    public condition: ICondition,
    public message: string
  ) {}
}

@Component({
  selector: 'app-form-status',
  templateUrl: './form-status.component.html',
  styleUrls: ['./form-status.component.css'],
})
export class FormStatusComponent implements OnInit, IForms {
  isLoading: boolean = true;
  message: any = '';
  defaultValues: any = {
    status: ISubscriptionStatus.ACTIVO,
    condition: ICondition.HABILITADO,
    message: 'Puede pasar',
  };

  initialValues: any = {
    status: ISubscriptionStatus.ACTIVO,
    condition: ICondition.HABILITADO,
    message: 'Puede pasar',
  };

  form!: FormGroup<any>;

  conditionOptions: ICondition[] = [
    ICondition.HABILITADO,
    ICondition.INHABILITADO,
  ];

  // public inputData: DataFormStatus,
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _customLogger: MyCustomLogger,
    public dialogRef: MatDialogRef<FormStatusComponent>,
    private _clientNotification: MyClientNotificationService,
    private _location: Location
  ) {
    console.log('Datos recibidos:', data);
  }

  ngOnInit(): void {
    this.createForm();
    console.info('message:', this.message);
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }
  createForm(): void {
    this.form = new FormGroup({
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      condition: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]), // Todo no dejar poner una fecha invalida directamente.
    });
  }
  initEditForm(): void {
    this.form.setValue(this.initialValues);
  }

  onSubmit() {
    try {
      this._customLogger.logDebug('MyForm', 'Form:', this.form.value);
      this._clientNotification.openNotification('Creado con éxito!', 'success');
      // this.onClose();
    } catch (error) {
      this._customLogger.logError('MyForm', error, this.form.value);
      this._clientNotification.openNotification('Hubo un error!', 'error');
    }
  }

  onDefaultData(): void {
    this.form.setValue(this.initialValues);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  resetForm(): void {
    this.form.reset();
  }

  goBack(): void {
    this._location.back();
  }
}
