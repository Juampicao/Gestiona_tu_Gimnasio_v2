import { Observable } from 'rxjs';
import { PersonalInformation } from 'src/app/modules/Models/Subscriptor/.personal-information/model/PersonalInformation';
import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';

export interface ISubscriptorManagerService {
  getSubscriptorById(id: any): Observable<Subscriptor>;

  getAllSubscriptors(): Observable<Subscriptor[]>;

  pruebaError(): Observable<any>;

  createSubscriptor(
    personalInformation: PersonalInformation
  ): Observable<Subscriptor>;
  getAllSubscriptors(): Observable<Subscriptor[]>;

  deleteSubscriptorById(id: any): Observable<any>;

  editSubscriptor(subscriptor: Subscriptor): Observable<Subscriptor>;
}
