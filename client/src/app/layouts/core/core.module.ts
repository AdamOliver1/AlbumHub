import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {FooterComponent} from '../../shared/layout-components/footer/footer.component';
import { CoreComponent } from './core.component';
import { MatDividerModule } from '@angular/material/divider';
@NgModule({
  declarations: [   
    
    
    CoreComponent 
  ],
  imports: [
    CommonModule,
    SharedModule
    
  ], 
  exports:[FooterComponent]
})
export class CoreModule { }
