import { SampleLigDashboardSnippetData } from './sample-lig-dashboard-data.model'

export interface LigDashboardDataModel    {
    "product_code": string // "7211251",
    "qrcode_status": string // "REDEEMED",
    "mobile_no": string //"6000028845",
    "product_name":string //"MAK 4T SCOOTECH NXT 800 ML Case",
    "sap_cc_number": string //"",
    "NAME": string //"",
    "txn_count": number //"1",
    "txn_amount": number //"40.0",
    "pincode": string //"785001",
    "state": string  //"ASSAM",
    "region": string //"",
    "taluka": string //"Jorhat",
    "district": string //"Jorhat",
    "user_persona": string //"lubes_mechanic",
    "SALES_OFFICE_NAME": string  //"",
    "SALES_OFFICE_CODE": string //"",
    "STATE_NAME": string //"",
    "REGION_NAME": string //"",
    "SALES_GROUP_NAME": string //"",
    "PRODUCT_NAME": string //"MAK 4T SCOOTECH NXT 800 ML Case",
    "PRODUCT_CODE": string //"7211251",
    "PRODUCT_BRAND": string //"SCOOTECH N",
    "date": string //"2023-08",
    "sap_cc_number_cp": string //""
    [key:string] : string | number
}

export const LigDashboardAllHeaders =
[
 "product_code",
 "qrcode_status",
 "mobile_no",
 "product_name",
 "sap_cc_number",
 "NAME",
 "txn_count",
 "txn_amount",
 "pincode",
 "state",
 "region",
 "taluka",
 "district",
 "user_persona",
 "SALES_OFFICE_NAME",
 "SALES_OFFICE_CODE",
 "STATE_NAME",
 "REGION_NAME",
 "SALES_GROUP_NAME",
 "PRODUCT_NAME",
 "PRODUCT_CODE",
 "PRODUCT_BRAND",
 "date",
 "sap_cc_number_cp"
]

export const LigDashboardTableViewHeaders =
[
    "region",
    "SALES_OFFICE_NAME",
    "SALES_GROUP_NAME",
    "sap_cc_number",
    "NAME",
    "user_persona",
    "mobile_no",
    "PRODUCT_CODE",
    "PRODUCT_NAME",
    "pincode",
    "taluka",
    "district",
    "state",
    "txn_count",
    "txn_amount",
]
//LigDashboardDataModelHeaders
export const LigDashboardTableHeaders = LigDashboardTableViewHeaders;

export const LigDashboardTableHeadersApiMapping: Map<string,string> = new Map([
    ['region','BI Region'],
    ['SALES_OFFICE_NAME','BI Territory'],
    ['SALES_GROUP_NAME','BI Sales Area'], 
    ['sap_cc_number','Channel Partner'], 
    ['NAME','BU Primary customer name'],
    ['user_persona','LIG User Persona'],
    ['mobile_no','LIG Mobile number'],
    ['PRODUCT_CODE','LIG Product Code'], 
    ['PRODUCT_NAME','LIG Product Name' ],
    ['pincode','LIG PinCode' ],
    ['taluka','LIG Taluka'],
    ['district','LIG District' ],
    ['state','LIG State' ],
    ['txn_count','Coupon count'],
    ['txn_amount','Coupon amount' ]
])


const x =
[
    "region",
    "SALES_OFFICE_NAME",
    "SALES_GROUP_NAME",
    "sap_cc_number",
    "NAME",
    "user_persona",
    "mobile_no",
    "PRODUCT_CODE",
    "PRODUCT_NAME",
    "pincode",
    "taluka",
    "district",
    "state",
    "txn_count",
    "txn_amount",
]

