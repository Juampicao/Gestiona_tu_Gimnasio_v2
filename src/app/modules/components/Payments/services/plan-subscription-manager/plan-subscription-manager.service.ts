import { Injectable } from '@angular/core';
import { Observable, of, Subject, tap, throwError } from 'rxjs';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import {
  PLAN_SUBSCRIPTION_TIME_DEFAULT_1,
  PLAN_SUBSCRIPTION_TIME_DEFAULT_2,
} from 'src/app/modules/data/mockData/plan-subscription/PlanSubscriptionDefaultData';
import { PlanSubscription } from 'src/app/modules/Models/PlanSubscription/models/PlanSubscription';

@Injectable({
  providedIn: 'root',
})
export class PlanSubscriptionManagerService {
  private _refreshData$ = new Subject<void>();

  private _planSubscriptionList: PlanSubscription[] = [
    PLAN_SUBSCRIPTION_TIME_DEFAULT_1,
    PLAN_SUBSCRIPTION_TIME_DEFAULT_2,
  ];

  constructor(private _customLogger: MyCustomLogger) {}

  get refreshData$() {
    return this._refreshData$;
  }

  getAllPlanSubscription(): Observable<PlanSubscription[]> {
    try {
      let response = this._planSubscriptionList.slice();

      return of(response).pipe(
        tap(() => {
          this.refreshData$.next();
        })
      );
    } catch (error) {
      this._customLogger.logError('PlanSubscriptionManagerService', error);
      throw new Error(`${error}`);
    }
  }

  getPlanSubscriptionById(id: any): Observable<PlanSubscription> {
    try {
      const planSubscription = this._planSubscriptionList.find(
        (p) => p.id === id
      );

      if (planSubscription) {
        return of(planSubscription);
      } else {
        return throwError(`No se encontró un plan con el id ${id}`);
      }
    } catch (error) {
      this._customLogger.logError(
        'PlanSubscriptionManagerService, getPlanSubscriptionById',
        error,
        `id: ${id}`
      );
      return throwError(`${error}`);
    }
  }

  getPlanSubscriptionByName(name: string): Observable<PlanSubscription> {
    try {
      const planSubscription = this._planSubscriptionList.find(
        (p) => p.nombre === name
      );

      if (planSubscription) {
        return of(planSubscription);
      } else {
        return throwError(`No se encontró un plan con el nombre: ${name}`);
      }
    } catch (error) {
      this._customLogger.logError(
        'PlanSubscriptionManagerService, getPlanSubscriptionById',
        error,
        `nombre: ${name}`
      );
      return throwError(`${error}`);
    }
  }
}
