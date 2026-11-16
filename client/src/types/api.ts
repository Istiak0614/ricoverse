// client/src/types/api.ts
// Mirrors the server response shape in docs/api-contract.md.
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiErrorSource {
  path: string;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errorSources: ApiErrorSource[];
}
