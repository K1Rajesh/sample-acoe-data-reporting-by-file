import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';

export interface FiterControlIModel {
    filterControl : FormControl;
    filterOptionsAll: Array<string>;
    filterOptionsCurrent$: Observable<string[]>;
    filtersSelected:Array<string>

}