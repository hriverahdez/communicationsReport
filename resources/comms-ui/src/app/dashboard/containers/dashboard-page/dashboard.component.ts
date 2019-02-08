import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {
	InfoPanelConfig,
	InfoPanelIconColors
} from '../../components/info-panel/info-panel-config';
import { Observable } from 'rxjs';
import { CommunicationObjectiveGroupsAvailabilityTotals } from '../../../@core/models/stats.model';
import { DashboardSandbox } from '../../dashboard.sandbox';

declare var $: any;

@Component({
	selector: 'dashboard-cmp',
	moduleId: module.id,
	templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
	groupTotals$: Observable<CommunicationObjectiveGroupsAvailabilityTotals>;

	panels: InfoPanelConfig[] = [
		{
			key: 'GENERATION',
			iconColor: InfoPanelIconColors.warning,
			icon: 'ti-plug',
			mainText: '---',
			title: 'Generación',
			footer: {
				footerIcon: 'ti-calendar',
				footerText: 'Fecha: ---'
			}
		},
		{
			key: 'DISTRIBUTIONS',
			iconColor: InfoPanelIconColors.success,
			icon: 'ti-car',
			mainText: '---',
			title: 'Distribuciones',
			footer: {
				footerIcon: 'ti-calendar',
				footerText: 'Fecha: ---'
			}
		},
		{
			key: 'SUB_STATIONS',
			iconColor: InfoPanelIconColors.danger,
			icon: 'ti-pulse',
			mainText: '---',
			title: 'Sub estaciones',
			footer: {
				footerIcon: 'ti-calendar',
				footerText: 'Fecha: ---'
			}
		},
		{
			key: 'RENEWABLE_ENERGY',
			iconColor: InfoPanelIconColors.info,
			icon: 'ti-shine',
			mainText: '---',
			title: 'PSFV',
			footer: {
				footerIcon: 'ti-calendar',
				footerText: 'Fecha: ---'
			}
		}
	];

	constructor(private sandbox: DashboardSandbox) {}

	ngOnInit() {
		this.groupTotals$ = this.sandbox.groupAvailabilityTotals$;
		const sub$ = this.groupTotals$.subscribe(data => {
			console.log('data:::>', data);
			this.panels = this.panels.map(panel => {
				const footerText = `Último reporte: ${data.date}`;
				const mainText = `${data.summary[panel.key].percentage} %`;
				const { footer } = panel;

				sub$.unsubscribe();
				return { ...panel, mainText, footer: { ...footer, footerText } };
			});
		});

		//////////////

		//////////////

		// var dataPreferences = {
		// 	series: [[25, 30, 20, 25]]
		// };

		// var optionsPreferences = {
		// 	donut: true,
		// 	donutWidth: 40,
		// 	startAngle: 0,
		// 	total: 100,
		// 	showLabel: false,
		// 	axisX: {
		// 		showGrid: false
		// 	}
		// };

		// new Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

		// new Chartist.Pie('#chartPreferences', {
		// 	labels: ['62%', '32%', '6%'],
		// 	series: [62, 32, 6]
		// });
		this.buildDailyStatsChart();
		// this.buildMonthlyBehaviourChart();
	}

	buildMonthlyBehaviourChart() {
		const data = {
			labels: [
				'Ene',
				'Feb',
				'Mar',
				'Abr',
				'May',
				'Jun',
				'Jul',
				'Ago',
				'Sep',
				'Oct',
				'Nov',
				'Dic'
			],
			series: [
				[542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
				[542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
				[542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
				[542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
				[230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
			]
		};

		var options: Chartist.ILineChartOptions = {
			// seriesBarDistance: 10,
			plugins: Chartist.plugins.legend({
				className: 'crazyPink'
			}),
			axisX: {
				showGrid: false
			},
			height: '245px'
		};

		var responsiveOptions: any[] = [
			[
				'screen and (max-width: 640px)',
				{
					seriesBarDistance: 5,
					axisX: {
						labelInterpolationFnc: function(value) {
							return value[0];
						}
					}
				}
			]
		];

		new Chartist.Line('#chartActivity', data, options, responsiveOptions);
	}

	buildDailyStatsChart() {
		const dailyStatsData = {
			GENERATION: {
				TRUNKING: {
					total: 2,
					available: 1,
					percentage: 50
				},
				FM: {
					total: 1,
					available: 0,
					percentage: 0
				},
				INTERNAL_PHONE: {
					total: 1,
					available: 1,
					percentage: 100
				},
				EXTERNAL_PHONE: {
					total: 1,
					available: 1,
					percentage: 100
				},
				CELLPHONE: {
					total: 2,
					available: 1,
					percentage: 50
				}
			},
			SUB_STATIONS: {
				TRUNKING: {
					total: 0,
					available: 0,
					percentage: 0
				},
				FM: {
					total: 0,
					available: 0,
					percentage: 0
				},
				INTERNAL_PHONE: {
					total: 0,
					available: 0,
					percentage: 0
				},
				EXTERNAL_PHONE: {
					total: 0,
					available: 0,
					percentage: 0
				},
				CELLPHONE: {
					total: 0,
					available: 0,
					percentage: 0
				}
			},
			DISTRIBUTIONS: {
				TRUNKING: {
					total: 1,
					available: 0,
					percentage: 0
				},
				FM: {
					total: 0,
					available: 0,
					percentage: 0
				},
				INTERNAL_PHONE: {
					total: 0,
					available: 0,
					percentage: 0
				},
				EXTERNAL_PHONE: {
					total: 0,
					available: 0,
					percentage: 0
				},
				CELLPHONE: {
					total: 2,
					available: 1,
					percentage: 0
				}
			},
			RENEWABLE_ENERGY: {
				TRUNKING: {
					total: 0,
					available: 0,
					percentage: 0
				},
				FM: {
					total: 0,
					available: 0,
					percentage: 0
				},
				INTERNAL_PHONE: {
					total: 0,
					available: 0,
					percentage: 0
				},
				EXTERNAL_PHONE: {
					total: 0,
					available: 0,
					percentage: 0
				},
				CELLPHONE: {
					total: 2,
					available: 1,
					percentage: 0
				}
			}
		};

		let labels = [];
		const groups = Object.keys(dailyStatsData);
		const transformedData = groups.reduce((acc, groupKey) => {
			labels = Object.keys(dailyStatsData[groupKey]);
			labels.forEach(lk => {
				const { total: currTotal, available: currAvail } = dailyStatsData[
					groupKey
				][lk];
				if (acc[lk]) {
					const { total, available } = acc[lk];
					acc[lk].total = total + currTotal;
					acc[lk].available = available + currAvail;
				} else {
					acc[lk] = {
						total: currTotal,
						available: currAvail
					};
				}
			});
			return acc;
		}, []);

		console.log('series;::', transformedData);

		const totals = Object.keys(transformedData).map(k => {
			return transformedData[k].total;
		});

		const avails = Object.keys(transformedData).map(k => {
			return transformedData[k].available;
		});

		const data: Chartist.IChartistData = {
			labels,
			series: [totals, avails]
		};

		const options: Chartist.IBarChartOptions = {
			seriesBarDistance: 10
		};

		var responsiveOptions = [
			[
				'screen and (max-width: 640px)',
				{
					seriesBarDistance: 5,
					axisX: {
						labelInterpolationFnc: function(value) {
							return value[0];
						}
					}
				}
			]
		];

		new Chartist.Bar('#dailyStats', data, options);
	}
}
