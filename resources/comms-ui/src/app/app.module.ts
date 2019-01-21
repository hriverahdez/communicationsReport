import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { UserComponent } from './user/user.component';
import { TableComponent } from './table/table.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { CoreModule } from './@core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CommunicationsModule } from './communications/communications.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		AppComponent,
		UserComponent,
		TableComponent,
		TypographyComponent,
		IconsComponent,
		NotificationsComponent,
		UpgradeComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(AppRoutes),
		HttpClientModule,
		CoreModule,
		DashboardModule,
		CommunicationsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
