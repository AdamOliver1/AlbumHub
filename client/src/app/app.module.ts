import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CoreModule} from './layouts/core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadImageComponent } from './layouts/upload-image/upload-image.component';
import { CommonModule } from '@angular/common';
import {ImageDialogServiceService} from './services/image-dialog-service/image-dialog-service.service';
@NgModule({
  declarations: [
    AppComponent,
    UploadImageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ], 
  providers: [ImageDialogServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
