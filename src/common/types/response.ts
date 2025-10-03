
//* *//
export interface IResponse {
  success: boolean;
  message?: string;
  timestamp: string;
  path: string;
  data?: any;
  paginator?: any;
}