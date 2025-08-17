import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';

import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';
import { TestComponent } from './app/test.component';
import { BibleVerseComponent } from './app/bible-verse.component';

const routes = [
  { path: '', component: AppComponent },
  { path: 'test', component: TestComponent },
  { path: 'bible', component: BibleVerseComponent },
  { path: '**', redirectTo: '' }
];

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));