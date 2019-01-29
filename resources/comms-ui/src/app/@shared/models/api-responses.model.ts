export interface ApiResponse<T = any> {
	success?: boolean;
	error?: any;
	data?: T;
}
