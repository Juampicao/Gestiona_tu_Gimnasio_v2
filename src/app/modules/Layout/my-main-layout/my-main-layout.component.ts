import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuItemNavBar } from 'src/app/core/modules/components/02-menu-navbar/my-menu-navbar/my-menu-navbar.component';
import { IOptionsButtons } from 'src/app/core/modules/components/09-buttons/my-floating-button/my-floating-button.component';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { ISubscriptionStatus } from '../../Models/Subscriptor/.subscription/interface/ISubscriptionStatus';
import {
  DataFormSubscriptor,
  FormCreateSubComponent,
} from '../../Subscriptors/components/forms/form-create-sub/form-create-sub.component';
import { FormFreezeSubComponent } from '../../Subscriptors/components/forms/form-freeze-sub/form-freeze-sub.component';
import { RegisterAccessSubscriptor } from '../../Subscriptors/components/register-access-subscriptor/model/RegisterAccessSubscriptor';
import { RegisterAccessSubscriptorComponent } from '../../Subscriptors/components/register-access-subscriptor/register-access-subscriptor.component';
import { navbarData } from './navbarData';

@Component({
  selector: 'app-my-main-layout',
  templateUrl: './my-main-layout.component.html',
  styleUrls: ['./my-main-layout.component.css'],
})
export class MyMainLayoutComponent implements OnInit {
  menuData: MenuItemNavBar[] = navbarData;

  optionButtons: IOptionsButtons[] = [
    {
      label: 'Registrar Access Error',
      function: this.onRegisterAccess.bind(this),
    },
    {
      label: 'Registrar Accesso Deuda',
      function: this.onRegisterAccess2.bind(this),
    },
    {
      label: 'Nuevo Suscriptor',
      function: this.onNewSubscriptor.bind(this),
    },

    // {
    //   label: 'Congelar Suscriptor',
    //   function: this.onFreezeSubscriptor.bind(this),
    // },
  ];
  constructor(
    private _customLogger: MyCustomLogger,
    // private _dialog: MyDialogService
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onRegisterAccess() {
    this._customLogger.logDebug('MyMainLayoutComponent', 'onRegisterAccess()');
    const dialogRef = this._dialog.open(RegisterAccessSubscriptorComponent, {
      data: new RegisterAccessSubscriptor(
        'Juan Perez',
        'https://example.com/images/juanperez.png',
        ISubscriptionStatus.ACTIVO,
        new Date('2023-06-09'),
        'Gold',
        1234,
        567
      ),
    });
    dialogRef;
  }

  onRegisterAccess2() {
    this._customLogger.logDebug('MyMainLayoutComponent', 'onRegisterAccess()');
    const dialogRef = this._dialog.open(RegisterAccessSubscriptorComponent, {
      data: new RegisterAccessSubscriptor(
        'Juan Perez',
        'https://example.com/images/juanperez.png',
        ISubscriptionStatus.DEUDA1,
        new Date('2022-06-09'),
        'Gold',
        1234,
        567
      ),
    });
    dialogRef;
  }

  onNewSubscriptor() {
    this._customLogger.logDebug(
      'MyMainLayoutComponent',
      'onNewSUbscriptrior()'
    );

    const dialogRef = this._dialog.open(FormCreateSubComponent, {
      data: new DataFormSubscriptor('to1t6xbgl3'),
    });
    dialogRef;
  }

  onFreezeSubscriptor() {
    this._customLogger.logDebug(
      'MyMainLayoutComponent',
      'onFreezeSubscriptor()'
    );

    const dialogRef = this._dialog.open(FormFreezeSubComponent);
    dialogRef;
  }
}
