export type ApiResponse<T = any> = {
  data: T;
  message: string;
  success: boolean;
  errors: { propName: string; message: string }[];
};
