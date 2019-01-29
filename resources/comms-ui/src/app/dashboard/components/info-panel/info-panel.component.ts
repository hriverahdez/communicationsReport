import { Component, OnInit, Input } from '@angular/core';
import { InfoPanelConfig } from './info-panel-config';

@Component({
  selector: 'comms-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {

	@Input() config: InfoPanelConfig

  constructor() { }

  ngOnInit() {
  }

}
