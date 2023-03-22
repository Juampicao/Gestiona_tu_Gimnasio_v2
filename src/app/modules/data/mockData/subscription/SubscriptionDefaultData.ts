import { CalendarExpirationSubscription } from 'src/app/modules/Models/Subscriptor/.subscription/expiration/model/CalendarExpirationSubscription';
import { Subscription } from 'src/app/modules/Models/Subscriptor/.subscription/Subscription';
import {
  PLAN_SUBSCRIPTION_TIME_DEFAULT_1,
  PLAN_SUBSCRIPTION_TIME_DEFAULT_2,
} from '../plan-subscription/PlanSubscriptionDefaultData';

// Todo no deberia pasarle el plan a calendar..
export const CALENDAR_SUBSCRIPTION_DEFAULT_1 =
  new CalendarExpirationSubscription(
    PLAN_SUBSCRIPTION_TIME_DEFAULT_1,
    new Date()
  );

// 1
export const SUBSCRIPTION_TIME_DEFAULT_1 = new Subscription(
  PLAN_SUBSCRIPTION_TIME_DEFAULT_1,
  CALENDAR_SUBSCRIPTION_DEFAULT_1
);

// 2
export const SUBSCRIPTION_TIME_DEFAULT_2 = new Subscription(
  PLAN_SUBSCRIPTION_TIME_DEFAULT_1,
  CALENDAR_SUBSCRIPTION_DEFAULT_1
);

// 3
export const SUBSCRIPTION_TIME_DEFAULT_3 = new Subscription(
  PLAN_SUBSCRIPTION_TIME_DEFAULT_2,
  CALENDAR_SUBSCRIPTION_DEFAULT_1
);

// 4 (Crear desde el front)
export const SUBSCRIPTION_TIME_DEFAULT_4 = new Subscription(
  PLAN_SUBSCRIPTION_TIME_DEFAULT_2,
  CALENDAR_SUBSCRIPTION_DEFAULT_1
);

// 5 (Crear desde el front)
export const SUBSCRIPTION_TIME_DEFAULT_5 = new Subscription(
  PLAN_SUBSCRIPTION_TIME_DEFAULT_1,
  CALENDAR_SUBSCRIPTION_DEFAULT_1
);
