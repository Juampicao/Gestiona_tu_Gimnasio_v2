import { Component, OnInit } from '@angular/core';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { ISubscriptionStatusObject } from '../../services/status-manager/interface/ISubscriptionStatusObject';
import { StatusManagerService } from '../../services/status-manager/status-manager.service';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css'],
})
export class StatusListComponent implements OnInit {
  headArray = [
    { Head: 'status', FieldName: 'register' },
    { Head: 'Nombre', FieldName: 'name' },
    { Head: 'Action', FieldName: '' }, // Activando esta fila aparecen las funciones.
  ];

  list: any[] = [];

  constructor(
    private _customLogger: MyCustomLogger,
    private _statusManagerService: StatusManagerService,
    private _clientNotificacion: MyClientNotificationService
  ) {}

  ngOnInit(): void {}

  getData() {
    const response: ISubscriptionStatusObject[] =
      this._statusManagerService.getSubscriptionStatusObjects();
  }
}
