import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { IPaymentStatus } from 'src/app/modules/Models/Payment/interfaces/Interfaces';
import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';
import { StatusManagerService } from '../../services/status-manager/status-manager.service';
import { SubscriptorManagerService } from '../../services/subscriptor-manager/subscriptor-manager.service';
import { RegisterAccessSubscriptor } from './model/RegisterAccessSubscriptor';

@Component({
  selector: 'app-register-access-subscriptor',
  templateUrl: './register-access-subscriptor.component.html',
  styleUrls: ['./register-access-subscriptor.component.css'],
})
export class RegisterAccessSubscriptorComponent {
  suscriptor!: RegisterAccessSubscriptor;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _customLogger: MyCustomLogger,
    private _statusManagerService: StatusManagerService,
    private _router: Router,
    private _clientNotificacion: MyClientNotificationService,
    public _dialog: MatDialogRef<RegisterAccessSubscriptorComponent>,
    private _subscriptorManagerService: SubscriptorManagerService
  ) {
    this.suscriptor = data;
    this._customLogger.logDebug(
      'RegisterAccessSubscriptorComponent',
      'Data:',
      this.data
    );
  }

  /**
   * @returns Final IPAymentStatus, from the ISubscriptionStatus of the subscriptor.
   */
  statusFinal(): IPaymentStatus {
    const statusFinal =
      this._statusManagerService.getIPaymentStatusOfISubscriptionStatus(
        this.suscriptor.status
      );
    return statusFinal;
  }

  /**
   * @returns className color of status
   */
  statusColor() {
    return this._statusManagerService.statusColor(this.suscriptor.status);
  }

  /**
   * @returns mensaje a mostrar para este estado
   */
  statusMessage() {
    return this._statusManagerService.statusMessage(this.suscriptor.status);
  }
  /**
   *
   * @returns Fecha Parseada para mostrar.
   */
  statusDate() {
    return this._statusManagerService.statusDate(this.suscriptor.dateExpired);
  }

  /**
   * @returns Dias que faltan para vencer o dias que ya vencio.
   */
  daysToExpired() {
    return this._statusManagerService.daysToExpired(
      this.suscriptor.dateExpired
    );
  }

  onViewInformation() {
    this._customLogger.logDebug(
      'RegisterAccessSubscriptorComponent',
      'onViewInformation(). Suscriptor:',
      this.suscriptor
    );
    this._router.navigate(['/suscriptores/' + this.suscriptor.id]);
    this._dialog.close();
  }

  getData(): Observable<Subscriptor> {
    try {
      return this._subscriptorManagerService.getSubscriptorById(
        this.suscriptor.id
      );
    } catch (error) {
      this._customLogger.logError('RegisterAccessm getData()', error);
      throw new Error(`${error}`);
    }
  }

  async onRegisterAccess() {
    let subscriptorFinal = null;
    try {
      subscriptorFinal = await this.getData().toPromise();
      if (subscriptorFinal) {
        subscriptorFinal.registerAccess();
      }

      this._clientNotificacion.openNotification(
        'Acceso registrado correctamente!',
        'success'
      );

      this._clientNotificacion.openNotification(
        'Acceso registrado correctamente!',
        'success'
      );

      this._customLogger.logDebug(
        'RegisterAccessSubscriptorComponent',
        'onRegisterAccess(). Registrando Acceso del suscriptor:',
        subscriptorFinal
      );
    } catch (error) {
      this._customLogger.logError(
        'RegisterAccessSubscriptorComponent',
        error,
        `onRegisterAccess(). Registrando Acceso del suscriptor: ${this.suscriptor}`
      );
      this._clientNotificacion.openNotification(
        'Error al registrar un acceso',
        'error'
      );
    }

    this.onClose();
  }

  onClose() {
    this._dialog.close();
  }
}
