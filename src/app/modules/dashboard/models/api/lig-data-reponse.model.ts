export type LigDataResponseIModel = {
    "aggregatedData"?: AggregateDataIModel,
    "data"?: Array<DataIModel>,
    "filters"?: FilterIModel,
    "recordCount"?:number,
    "success"?: boolean,
    "errorMessage"?:string,
}

export type  AggregateDataIModel =  {
    "txn_amount": number,
    "txn_count": number
}

export type  FilterIModel =  {
    "biSalesArea": Array<string>,
    "biTerritory": Array<string>,
    "channelPartner": Array<string>,
    "ligDistrict": Array<string>,
    "ligProductBrand": Array<string>,
    "ligProductCode": Array<string>,
    "ligProductName": Array<string>,
    "ligState": Array<string>,
    "ligTaluka": Array<string>,
    "ligUserPersona": Array<string>,
}

export interface DataIModel    {
    "product_code": string,
    "qrcode_status": string,
    "mobile_no": string,
    "product_name":string,
    "sap_cc_number": string,
    "NAME": string,
    "txn_count": number,
    "txn_amount": number,
    "pincode": string,
    "state": string,
    "region": string,
    "taluka": string,
    "district": string,
    "user_persona": string,
    "SALES_OFFICE_NAME": string,
    "SALES_OFFICE_CODE": string,
    "STATE_NAME": string,
    "REGION_NAME": string,
    "SALES_GROUP_NAME": string,
    "PRODUCT_NAME": string,
    "PRODUCT_CODE": string,
    "PRODUCT_BRAND": string,
    "date": string,
    "sap_cc_number_cp": string,
    [key:string] : string  | number
}
