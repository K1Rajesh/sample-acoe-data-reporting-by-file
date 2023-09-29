import { Injectable  } from "@angular/core"
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Observable, of} from 'rxjs';


import { environment } from '../../../../environments/environment';
import { LigDataRequestIModel, SAMPLE_LIG_DATA_REQUEST } from './../models/api/lig-data-request.model'
import { LigDataResponseIModel } from './../models/api/lig-data-reponse.model';





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

    public getLigData(payLoad?:LigDataRequestIModel):Observable<LigDataResponseIModel>{

        const dummyPayLoad  = SAMPLE_LIG_DATA_REQUEST
        //http://10.29.3.4:3003/saml-sp
        // return this.httpClient.post<any>("https://reportsdev.bpcl.co.in/pukipy/lig_data1",
        // {"email": "z_act_dev3@corp.bharatpetroleum.com", "month": "2023-08"})

        // return this.httpClient.post<any>("https://reportsdev.bpcl.co.in/pukipy/lig_data2",
        // {"email": "z_act_dev3@corp.bharatpetroleum.com",
        //  "month": "2023-08",
        // "user_persona":"lubes_personalvechileowner",
        // "Bi_Sales_Area":"Rourkela Lubes"})

        //   {"email": "z_act_dev3@corp.bharatpetroleum.com",
        //   "month": "2023-08",
        //  "user_persona": payLoad?.user_persona? payLoad.user_persona : "lubes_personalvechileowner",
        //  "Bi_Sales_Area":"Rourkela Lubes"}


        return this.httpClient.post<any>("http://10.29.2.4:8001/pukipy/lig_data22", payLoad )
    }



}