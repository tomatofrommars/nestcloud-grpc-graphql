import { Observable } from 'rxjs';
import {GetSchoolRequest, GetSchoolResponse, RenameResponse, School} from './schroll.interface';

export interface SchoolService {
    get(data: GetSchoolRequest): Observable<GetSchoolResponse>;

    rename(data: School): Observable<RenameResponse>;
}
