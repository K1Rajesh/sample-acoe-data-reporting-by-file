import { Injectable  } from "@angular/core"
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { environment } from '../../../../environments/environment';
import { Observable, of} from 'rxjs';




@Injectable({
    providedIn:'root'
})
export class LigDataService{
    httpOptions = {};
    constructor(private httpClient:HttpClient){
        this. httpOptions = {
            headers: new HttpHeaders({
                'Content-Type' :'application/json'
            })  
        } 
    }

    public getLigData():Observable<any>{
        //http://10.29.3.4:3003/saml-sp
        return this.httpClient.get<any>("http://10.29.2.4:8000/lpg_data4")
    }



}