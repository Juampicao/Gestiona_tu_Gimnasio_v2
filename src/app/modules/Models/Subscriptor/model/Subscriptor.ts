import { Helper } from 'src/app/core/services/helper/Helper';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { IPaymentStatus } from '../../Payment/interfaces/Interfaces';
import { SubscriptionSubscriptorPayment } from '../../Payment/models/SubscriptionSubscriptorPayment';
import { CreateNewPaymentSubscriptionData } from '../../Payment/services/models/CreateNewPaymentSubscriptionData';
import { PlanSubscription } from '../../PlanSubscription/models/PlanSubscription';
import { Rutine } from '../../Rutine/models/Rutine';
import { PersonalInformation } from '../.personal-information/model/PersonalInformation';
import { IRegisterAccessNotes } from '../.subscription/interface/IRegisterAccessNotes';
import { ISubscription } from '../.subscription/interface/ISubscription';
import { ISubscriptionStatus } from '../.subscription/interface/ISubscriptionStatus';
import { FreezeSuscriptionData } from '../.subscription/model/FreezeSuscriptionData';
import { ErrorNoTieneAcceso } from '../error/ErrorNoTieneAcceso';
import { ISubscriptor } from '../interfaces/ISubscriptor';

// Todo, ¿Donde iria esto?
const customLogger = new MyCustomLogger();
// const creatorPaymentService = new CreatorPaymentSubscriptorService(); // Todo ahora descomentar

export class Subscriptor implements ISubscriptor {
  private _id: any;
  private _personalInformation: PersonalInformation;
  private _subscription: ISubscription;
  private _rutine: Rutine;
  private _creator: any; // Todo agregar.. En los test, los default, todo.
  private _registerNumber: number; // Todo agregar metodo

  /**
   * @param personalInformation
   * @param subscription
   * @param rutine
   * @param creator
   */
  constructor(
    personalInformation: PersonalInformation,
    subscription: ISubscription,
    rutine: Rutine,
    creator: any
  ) {
    this._personalInformation = personalInformation;
    this._subscription = subscription;
    this._rutine = rutine;
    this._id = Helper.generateId();
    this._registerNumber = Helper.generateRandomNumber();
  }

  getRegisterNumber(): number {
    return this._registerNumber;
  }
  public get id(): any {
    return this._id;
  }
  public set id(value: any) {
    this._id = value;
  }

  //? - - - - - - - - - - Expiration - - - - - - - - - -

  getPersonalInformation(): PersonalInformation {
    return this._personalInformation;
  }

  public get personalInformation(): PersonalInformation {
    return this._personalInformation;
  }

  public set personalInformation(value: PersonalInformation) {
    this._personalInformation = value;
  }

  public get subscription(): ISubscription {
    return this._subscription;
  }

  public set subscription(value: ISubscription) {
    this._subscription = value;
  }

  isSubscriptionActive(): boolean {
    return this._subscription.isPlanActive();
  }
  //? - - - - - - - - - - Status - - - - - - - - - -

  getStatus(): ISubscriptionStatus {
    return this._subscription.getStatus();
  }

  updateStatusManual(newStatus: ISubscriptionStatus): ISubscriptionStatus {
    return this._subscription.updateStatusManual(newStatus);
  }

  getCondition(): string {
    try {
      return this._subscription.getCondition();
    } catch (error) {
      customLogger.logError('Subscriptor on getCondition', error);
      throw new Error(`{error}`);
    }
  }

  //? - - - - - - - - - - Register Access - - - - - - - - - -

  registerAccess(): boolean {
    try {
      return this._subscription.registerAccess();
    } catch (error) {
      // throw new ErrorNoTieneAcceso(
      //   `No puede registrar un acceso. Subscripción con status ${this.getStatus()}`
      // );
      throw new ErrorNoTieneAcceso(`${error}`);
    }
  }

  getNotesRegisterAccess(): IRegisterAccessNotes[] {
    return this._subscription.getNotesRegisterAccess();
  }
  //? - - - - - - - - - - Expiration - - - - - - - - - -

  getExpiration() {
    return this._subscription.getExpiration();
  }

  getDateExpiration(): Date {
    return this._subscription.getExpirationDate();
  }

  getAmountUsesExpiration(): number {
    return this._subscription.getAmountUsesExpiration();
  }

  //? - - - - - - - - - - Update Expiration - - - - - - - - - -

  updateManualExpiration(motivo: string, newExpiration: Date): Date {
    return this._subscription.updateExpirationDateManual(motivo, newExpiration);
  }

  // Todo descomentar
  // updateExpirationAfterDeletePayment(
  //   expirationDeleteMethod: ExpirationDeleteMethod
  // ): Date {
  //   if (
  //     expirationDeleteMethod.expirationType ===
  //     IUpdateExpirationAfterDeletePayment.LASTPAYMENT
  //   ) {
  //     return this.updateExpirationByLastPayment();
  //   }

  //   if (!expirationDeleteMethod.newDate) {
  //     throw new Error('La nueva fecha de expiración no puede ser nula');
  //   }

  //   return this.updateManualExpiration(
  //     'Actualización Manual Por eliminación de pago.',
  //     expirationDeleteMethod.newDate
  //   );
  // }

  // Todo descomentar

  // updateExpirationByLastPayment(): Date {
  //   const lastPayment = this.getLastSubscriptionPaymentCompleted();
  //   const newDate = lastPayment.getNewExpirationToUpdate();
  //   if (lastPayment.estado !== IPaymentStatus.COMPLETADO) {
  //     throw new Error(
  //       'No puede actualizar la expiración desde un pago que no esta completado'
  //     );
  //   }

  //   return this._subscription.updateExpirationByLastPayment(newDate);
  // }

  getNotesExpiration(): string[] {
    return this._subscription.getNotesExpiration();
  }
  //? - - - - - - - - - - Payments - - - - - - - - - -
  // Todo ahora descomentar

  createPaymentSubscription(
    createNewPaymentSubscriptionData: CreateNewPaymentSubscriptionData
  ): SubscriptionSubscriptorPayment {
    let newPayment: SubscriptionSubscriptorPayment;

    try {
      // Separo los parametros
      const planSubscription =
        createNewPaymentSubscriptionData.planSubscription;
      const subscriptorPagador =
        createNewPaymentSubscriptionData.subscriptorPagador;
      const creador = createNewPaymentSubscriptionData.creador;
      const date = createNewPaymentSubscriptionData.fechaCreacion;

      // Agrego atributos concretos al pago que no cambian de afuera.
      const estado = IPaymentStatus.PENDIENTE;
      const monto = planSubscription.monto;
      const expiracionPago = planSubscription.getPaymentExpiration();
      const newSubscriptionExpiredOnComplete =
        planSubscription.getExpirationDate();

      // Todo ahora esto da error por dependencias.
      // const newPaymentSubscription = new SubscriptionSubscriptorPayment(
      //   estado,
      //   monto,
      //   date,
      //   subscriptorPagador,
      //   expiracionPago,
      //   planSubscription,
      //   creador,
      //   newSubscriptionExpiredOnComplete
      // );

      // customLogger.logDebug(
      //   'Subscriptor,createPaymentSubscription ',
      //   'newPaymentSubscription:',
      //   newPaymentSubscription
      // );
      // return newPaymentSubscription;

      // Todo hacer con servicio CreateNewPaymentSubscription.
      // try {
      //   const response: SubscriptionSubscriptorPayment =
      //     creatorPaymentService.CreateNewPaymentSubscription(
      //       planSubscription,
      //       subscriptorPagador,
      //       creador,
      //       date
      //     );

      //   if (response) {
      //     return response;
      //   }
      // } catch (error) {
      //   throw new Error(`${error}`);
      // }

      throw new Error(
        'Hubo un problema al crear un pago desde el subscriptor.'
      );
    } catch (error) {
      customLogger.logError('Subscriptor, createPaymentSubscription', error);
      throw new Error(`${error}`);
    }
  }

  // Todo descomentar.
  // getAllPayments(): Payment[] {
  //   throw new Error('Function not implemented.');
  // }

  // Todo descomentar.
  // deletePaymentSubscriptionAndUpdateExpiration(
  //   payment: SubscriptionSubscriptorPayment
  // ) {
  //   throw new Error('Method not implemented.');
  // }

  // Todo descomentar.
  // Todo. Esto esta bien? ¿COmo hago para seleccionar una base?
  // getLastSubscriptionPaymentCompleted(): SubscriptionSubscriptorPayment {
  //   const paymentManager = ServiceInjectorPayment.selectService('original');
  //   const result =
  //     paymentManager.getLastPaymentSubscriptionCompletedBySubscriptorId(
  //       this._id
  //     );
  //   return result;
  // }

  //? - - - - - - - - - - Plan Subsription - - - - - - - - - -

  getPlanSubscription(): PlanSubscription {
    return this._subscription.getPlanSubscription();
  }

  //? - - - - - - - - - -  Rutine - - - - - - - - - -
  getRutine(): Rutine {
    return this._rutine;
  }

  //?- - - - - - - - - - - - -  - - - Freezed - - - - - - - - - - - - -  - - -
  isFreezed(): boolean {
    return this._subscription.isFreezed();
  }

  updateFreezeDate(freezeData: FreezeSuscriptionData): FreezeSuscriptionData {
    try {
      return this._subscription.updateFreezeDate(freezeData);
    } catch (error) {
      customLogger.logError(
        'Subscriptor on UpdateFreezeDate. Revisar la fecha',
        error
      );
      // Todo no muestra bien el error
      throw new Error(`${error}`);
      // throw new Error(`Revisa la fecha`);
    }
  }

  getFreezeData(): FreezeSuscriptionData[] | null {
    try {
      return this._subscription.getFreezeData();
    } catch (error) {
      customLogger.logError('Subscriptor on getFreezeData', error);
      throw new Error(`{error}`);
    }
  }

  getLastFreezeData(): FreezeSuscriptionData | null {
    try {
      return this._subscription.getLastFreezeData();
    } catch (error) {
      customLogger.logError('Subscriptor on getLastFreezeData', error);
      throw new Error(`{error}`);
    }
  }

  getDateFinishFreezed(): Date | null {
    try {
      return this._subscription.getDateFinishFreezed();
    } catch (error) {
      customLogger.logError('Subscriptor on getDateFinishFreezed', error);
      throw new Error(`{error}`);
    }
  }

  //?- - - - - - - - - - - - -  - - - Creator - - - - - - - - - - - - -  - - -

  getCreator() {
    return this._creator;
  }
}

// import { Helper } from 'src/app/core/services/helper/Helper';
// import { Rutine } from '../../Rutine/models/Rutine';
// import { PersonalInformation } from '../.personal-information/model/PersonalInformation';
// import { ISubscription } from '../.subscription/interface/ISubscription';
// import { ISubscriptionStatus } from '../.subscription/interface/ISubscriptionStatus';

// export class Subscriptor {
//   private _id: any;
//   private _personalInformation: PersonalInformation;
//   private _subscription: ISubscription;
//   private _rutine: Rutine | null;
//   //   private _creator: User; // Todo agregar.. En los test, los default, todo.
//   private _registerNumber: number;

//   /**
//    * @param personalInformation
//    * @param subscription
//    * @param rutine
//    */
//   constructor(
//     personalInformation: PersonalInformation,
//     subscription: ISubscription,
//     rutine: Rutine | null = null
//   ) {
//     this._personalInformation = personalInformation;
//     this._subscription = subscription;
//     this._rutine = rutine;
//     this._id = Helper.generateId();
//     this._registerNumber = Helper.generateRandomNumber();
//   }

//   // Id
//   public get id(): any {
//     return this._id;
//   }
//   public set id(value: any) {
//     this._id = value;
//   }

//   //? - - - - - - - - - - Main Getters  - - - - - - - - - -

//   public get personalInformation(): PersonalInformation {
//     return this._personalInformation;
//   }

//   public set personalInformation(value: PersonalInformation) {
//     this._personalInformation = value;
//   }

//   public get subscription(): ISubscription {
//     return this._subscription;
//   }

//   public set subscription(value: ISubscription) {
//     this._subscription = value;
//   }

//   getRegisterNumber(): number {
//     return this._registerNumber;
//   }

//   //? - - - - - - - - - - Status - - - - - - - - - -

//   getStatus(): ISubscriptionStatus {
//     return this._subscription.getStatus();
//   }

//   //? - - - - - - - - - -  Rutine - - - - - - - - - -
//   getRutine(): Rutine | null {
//     return this._rutine;
//   }
// }
