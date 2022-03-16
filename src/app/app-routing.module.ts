import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestChildComponent } from './test-child.component';
import { TestComponent } from './test.component';
@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'test', component: TestComponent },
      { path: 'testChild', component: TestChildComponent },
    ]),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
