import { Component } from '@angular/core';
import '@cds/core/icon/register.js';
import { ClarityIcons, vmBugIcon, checkIcon } from '@cds/core/icon';

ClarityIcons.addIcons(vmBugIcon, checkIcon);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'short-url-ui';
}
