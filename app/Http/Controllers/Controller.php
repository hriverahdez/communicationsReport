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

		public function errorResponse($message = null, $status = 500, \Exception $e = null) {

			if ( env('APP_ENV') == 'dev' && !is_null( $e ) ) {
				$errorContent = $e;
			}
			else {
				$errorContent = is_null( $message ) ? 'There was an error in the server' : $message;
			}

			return response()->json([
				'error' => $errorContent
			], $status);
		}
}
