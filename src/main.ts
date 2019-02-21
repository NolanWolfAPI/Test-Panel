import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (!/localhost/.test(document.location.host)){ //environment.production
  enableProdMode();
}


platformBrowserDynamic().bootstrapModule(AppModule);
