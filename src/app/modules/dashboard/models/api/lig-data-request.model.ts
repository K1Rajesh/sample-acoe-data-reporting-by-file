import { MOCK_LIG_DATA_REQUEST } from './sample-lig-data-request.model'
export type LigDataRequestIModel = { 
    "user": {
        "email": string
      },
      "filters": LigDataFilterIModel
};

export interface LigDataFilterIModel {
  "month": string,
  "user_persona"? : string,
  "taluka"? : string,
  "sap_cc_number"? : string,
  "SALES_GROUP_NAME"? : string,
  "SALES_OFFICE_NAME"?: string,
  "state"?: string,
  "district"?: string,
  "PRODUCT_NAME"?: string,
  "PRODUCT_CODE"?: string,
  "PRODUCT_BRAND"?: string,
  [key: string]: string | undefined;
}


export const SAMPLE_LIG_DATA_REQUEST: LigDataRequestIModel = {
    "user": {
      "email": "abhisekdatta@corp.bharatpetroleum.com"
    },
    "filters": {
      "month": "2023-08",
      "user_persona": "lubes_personalvehicleowner",
      "taluka": "Kesinga",
      "sap_cc_number": "117606.0",
      "SALES_GROUP_NAME": "Rourkela Lubes"
    }
}