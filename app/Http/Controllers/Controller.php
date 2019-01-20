<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
		use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

		public function successResponse($data, $status = 200) {
			return response()->json([
				'success' => true,
				'data' => $data
			], $status);
		}

		public function notFoundResponse() {
			return response()->json([
				'error' => 'resource not found'
			], 404);
		}

		public function errorResponse(\Exception $e = null) {
			$errorContent = env('APP_ENV') == 'dev' ?
				$e :
				'There was an error in the server';

			return response()->json([
				'error' => $errorContent
			], 404);
		}
}
