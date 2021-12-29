import { FacilityModel } from "./facility.model";

export interface CarModel {
    ID: number;
    APPROVAL_STATUS: string;
    UPD_SEQ: number;
    AMND_STATE: string;
    APPLICATION_CODE: string;
    APPLICATION_DESC: string;
    DEPT_ID: number;
    CUSTOMER_ID: number;
    SUBMIT_AMOUNT: number;
    SUBMIT_DATE: Date;
    SUBMIT_ID: number;
    APPROVAL_DATE: Date;
    APPROVAL_ID: number;
    REVIEW_DATE: Date;
    STATUS: string;
    SID: number;
    CURRENCY_ID: number;
    CREDIT_CONTRACT_NUMBER: string;
    CREDIT_CONTRACT_DATE: Date;
    CURRENT_STAGE_ID: number;
    APPROVAL_PROCESS_ID: number;
    REGION_ID: number;
    EXT_REFERENCE: string;
    PROCESS_STATUS: string;
    SYS_TRAN_ID: number;
    AUDIT_DATE: Date;
    AUDIT_OPERATION: string;
    NEW_CUSTOMER: number;
    AUDIT_FIELDS: string;
    RELATED_APPLICATION_ID: number;
    APPROVAL_LEVEL: string;
    IS_COMMITMENT: number;
    SLA_CODE_1: string;
    SLA_CODE_2: string;
    SLA_CODE_3: string;
    ADD_INFO_1: string;
    ADD_INFO_2: string;
    ADD_INFO_3: string;
    SC_APPROVAL_LEVEL: string;

    ListFacility: FacilityModel[];
}

