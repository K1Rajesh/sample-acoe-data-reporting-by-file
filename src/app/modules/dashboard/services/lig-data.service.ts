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
        // return this.httpClient.post<any>("https://reportsdev.bpcl.co.in/pukipy/lig_data1",
        // {"email": "z_act_dev3@corp.bharatpetroleum.com", "month": "2023-08"})

        return this.httpClient.post<any>("https://reportsdev.bpcl.co.in/pukipy/lig_data2",
        {"email": "z_act_dev3@corp.bharatpetroleum.com",
         "month": "2023-08",
        "user_persona":"lubes_personalvechileowner",
        "Bi_Sales_Area":"Rourkela Lubes"})
    }



}