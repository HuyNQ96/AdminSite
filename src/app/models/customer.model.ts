// 
export interface CustomerCategoryModel {
  ID: number;
  CUST_CAT_CODE?: string;
  CUST_CAT_NAME?: string;
  CUST_CAT_FULL_NAME?: string;
}

export interface CustomerModel {
  ID: number;
  CUSTOMER_NUMBER?: string;
  CUSTOMER_NAME?: string;
  CUSTOMER_IDENTITY?: string;
  CUSTOMER_CIF?: string;
  CUSTOMER_CAT?: string;
  CUSTOMER_DEPT?: string;
  CUSTOMER_EX?: string;
}