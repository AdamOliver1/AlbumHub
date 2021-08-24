import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layout-components/footer/footer.component';
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideBarComponent } from './layout-components/side-bar/side-bar.component';
import { HeaderComponent } from './layout-components/header/header.component';
import { WelcomeComponent } from './views/welcome-view/welcome.component';
import { DetailsComponent } from './views/details/details.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NewLibraryComponent } from './views/new-library/new-library.component';
import { CameraComponent } from './views/upload-images/camera/camera.component';
import { HeaderUploadImageComponent } from './layout-components/header-upload-image/header-upload-image.component';
import { LocalComponent } from './views/upload-images/local/local.component';
import { OnlineComponent } from './views/upload-images/online/online.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageDetailsComponent } from './views/upload-images/image-details/image-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LibraryComponent } from './views/library/library.component';
import { PrivateModeComponent } from './views/private-mode/private-mode.component';
import { ImageFullDisplayComponent } from './views/image-full-display/image-full-display.component';
import { ImageDialogService } from '../services/image-dialog-service/image-dialog.service';
import { ErrorPageComponent } from './views/error-page/error-page.component';
import { CustomErrorInterceptor } from '../services/error-handle/custom-error-interceptor';
import { EditCategoriesComponent } from './views/edit-categories/edit-categories.component';
import { AgmCoreModule } from '@agm/core';
import { AboutComponent } from './views/about/about.component';
import { SlideShowComponent } from './views/slide-show/slide-show.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { GoogleMapsComponent } from './views/google-maps/google-maps.component';;

const material = [
  MatSlideToggleModule,
  SlideshowModule,
  MatSelectModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatDividerModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatMenuModule,
  MatListModule,
  MatPaginatorModule,
  MatTableModule,
  MatCardModule,
  MatGridListModule,
  MatSidenavModule
]

@NgModule({
  declarations: [

    FooterComponent,
    SideBarComponent,
    HeaderComponent,
    WelcomeComponent,
    DetailsComponent,
    NewLibraryComponent,
    CameraComponent,
    HeaderUploadImageComponent,
    LocalComponent,
    OnlineComponent,
    ImageDetailsComponent,
    LibraryComponent,
    PrivateModeComponent,
    ImageFullDisplayComponent,
    ErrorPageComponent,
    EditCategoriesComponent,
    AboutComponent,
    SlideShowComponent,
    GoogleMapsComponent


  ],
  providers: [

    {
      provide: ErrorHandler,
      useClass: CustomErrorInterceptor
    },
    ImageDialogService

  ],
  imports: [
    material,
    AgmCoreModule.forRoot({ apiKey: '' }),
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    CommonModule,
    RouterModule,
    HttpClientModule
  ]
  , exports: [
    FooterComponent,
    HeaderComponent,
    material,
    CommonModule,
    RouterModule,
    HttpClientModule,
    SideBarComponent,
    WelcomeComponent,
    DetailsComponent,
    HeaderUploadImageComponent

  ]
})
export class SharedModule { }
