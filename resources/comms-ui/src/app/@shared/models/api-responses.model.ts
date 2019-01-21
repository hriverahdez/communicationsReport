export interface ApiSuccessResponse<T = any | null> {
	success: boolean;
	data: T;
}

export interface ApiErrorResponse {
	error: any;
}
