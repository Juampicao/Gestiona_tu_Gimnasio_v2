import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { ISubscriptionStatus } from 'src/app/modules/Models/Subscriptor/.subscription/interface/ISubscriptionStatus';
import { ISubscriptionStatusObject } from 'src/app/modules/Subscriptors/services/status-manager/interface/ISubscriptionStatusObject';
import { StatusManagerService } from 'src/app/modules/Subscriptors/services/status-manager/status-manager.service';

import { ICondition } from '../../../Models/Subscriptor/.subscription/interface/IConditions';
import {
  DataFormStatus,
  FormStatusComponent,
} from '../forms/form-status/form-status.component';
@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css'],
})
export class StatusListComponent implements OnInit {
  isLoading: boolean = true;
  headArrayStatusList = [
    { Head: 'Estado', FieldName: 'status' },
    { Head: 'Condicion', FieldName: 'condition' },
    { Head: 'Mensaje', FieldName: 'message' },
    { Head: 'Action', FieldName: '' }, // Activando esta fila aparecen las funciones.
  ];

  statusList: any[] = [
    {
      status: 'deuda1',
      condition: 'Habilitado',
      message: 'debe 1 pago',
    },
    {
      status: 'deuda2',
      condition: 'Inhabilitado',
      message: 'debe 2 pagos',
    },
    {
      status: 'pendiente',
      condition: 'Inhabilitado',
      message: 'No tiene suscripcion',
    },
    {
      status: 'activo',
      condition: 'Habilitado',
      message: 'Puede pasar!',
    },
  ];

  conditionOptions: ICondition[] = [
    ICondition.HABILITADO,
    ICondition.INHABILITADO,
  ];

  constructor(
    private _customLogger: MyCustomLogger,
    private _statusManagerService: StatusManagerService,
    private _clientNotificacion: MyClientNotificationService,
    private _dialog: Dialog
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
  }

  getData() {
    const response: ISubscriptionStatusObject[] =
      this._statusManagerService.getSubscriptionStatusObjects();
  }

  onViewStatus(item: any) {
    return this._clientNotificacion.functionNotImplemented();
  }

  onEditStatus(item: any) {
    console.info(item);
    // const dialogRef = this._dialog.open(FormStatusComponent, {
    //   data: `al suscriptor ${item}`,
    // });
    const dataFormStatus = new DataFormStatus(
      ISubscriptionStatus.ACTIVO,
      ICondition.HABILITADO,
      'Mensaje de prueba'
    );
    const dialogRef = this._dialog.open(FormStatusComponent, {
      data: dataFormStatus,
    });
  }

  onDeleteStatus(item: any) {
    return this._clientNotificacion.functionNotImplemented();
  }
}
