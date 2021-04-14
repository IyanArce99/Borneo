import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactoComponent } from './components/contacto/contacto.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { SubmitComponent } from './components/submit/submit.component';
import { ListComponent } from './components/views/list/list.component';
import { SingleComponent } from './components/views/single/single.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'submit', component: SubmitComponent },
  { path: 'view/office', component: SingleComponent },
  { path: 'view/list', component: ListComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
