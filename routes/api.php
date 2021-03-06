<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {

		Route::resource('communication_objective', 'CommunicationObjectiveController');
		Route::resource('communication_way', 'CommunicationWayController');

		Route::prefix('communication_report')->group(function () {
			Route::get('latest', 'CommunicationReportController@latestReports');
		});

		Route::resource('report_requests', 'CommunicationReportRequestController');

		Route::prefix('report_requests')->group(function () {
			Route::post('{id}/accept', 'CommunicationReportRequestController@acceptRequest');
			Route::post('{id}/reject', 'CommunicationReportRequestController@rejectRequest');
		});
		
		Route::prefix('stats')->group(function () {
			Route::get('daily', 'StatsController@getDailyStats');
			Route::get('groupTotals', 'StatsController@getGroupsTotalAvailability');
		});

		Route::resource('communication_report', 'CommunicationReportController');

});
