import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputPageComponent } from './input-page/input-page.component';
import { PlanListComponent } from './plan-list/plan-list.component';

const routes: Routes = [{
  path: '',
  component:PlanListComponent
},
{
  path: 'input',
  component:InputPageComponent
},
{
  path: 'plans',
  component:PlanListComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
