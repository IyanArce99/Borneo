import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Componentes
import { InicioComponent } from './components/inicio/inicio.component';
import { FooterComponent } from './components/globales/footer/footer.component';
import { MenuComponent } from './components/globales/menu/menu.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { HowitworksComponent } from './components/globales/howitworks/howitworks.component';
import { SingleComponent } from './components/views/single/single.component';
import { ListComponent } from './components/views/list/list.component';
import { SubmitComponent } from './components/submit/submit.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    FooterComponent,
    MenuComponent,
    ContactoComponent,
    NosotrosComponent,
    HowitworksComponent,
    SingleComponent,
    ListComponent,
    SubmitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
