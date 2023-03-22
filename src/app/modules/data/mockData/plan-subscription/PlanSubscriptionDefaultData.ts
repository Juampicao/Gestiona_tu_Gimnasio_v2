import { ICalendarTypes } from 'src/app/modules/Models/PlanSubscription/interfaces/ICalendarTypes';
import { CalendarExpirationMethod } from 'src/app/modules/Models/PlanSubscription/models/CalendarExpirationMethod';
import { PlanSubscription } from 'src/app/modules/Models/PlanSubscription/models/PlanSubscription';

export const EXPIRATION_METHOD_TIME_PLAN_SUBSCRIPTION_DEFAULT =
  new CalendarExpirationMethod(ICalendarTypes.MENSUAL, 5, false);

export const EXPIRATION_METHOD_TIME_PLAN_SUBSCRIPTION_DEFAULT2 =
  new CalendarExpirationMethod(ICalendarTypes.MENSUAL, 5, false);

export const PLAN_SUBSCRIPTION_TIME_DEFAULT_1 = new PlanSubscription(
  'Plan Premium',
  9999,
  EXPIRATION_METHOD_TIME_PLAN_SUBSCRIPTION_DEFAULT
);

export const PLAN_SUBSCRIPTION_TIME_DEFAULT_2 = new PlanSubscription(
  'Plan Gold',
  5960,
  EXPIRATION_METHOD_TIME_PLAN_SUBSCRIPTION_DEFAULT2
);
