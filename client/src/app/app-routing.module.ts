import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoreComponent} from './layouts/core/core.component';
import {WelcomeComponent} from './shared/views/welcome-view/welcome.component';
import {DetailsComponent} from './shared/views/details/details.component';
import {NewLibraryComponent} from './shared/views/new-library/new-library.component';
import {CameraComponent} from './shared/views/upload-images/camera/camera.component';
import {LocalComponent} from './shared/views/upload-images/local/local.component';
import {OnlineComponent} from './shared/views/upload-images/online/online.component';
import {UploadImageComponent} from './layouts/upload-image/upload-image.component';
import {LibraryComponent} from './shared/views/library/library.component';
import { PrivateModeComponent } from './shared/views/private-mode/private-mode.component';
const routes: Routes = [
  {path:'',component:CoreComponent,children:[
  {path:'',component:WelcomeComponent},
  {path:'details',component:DetailsComponent},
  {path:'new-library',component:NewLibraryComponent},
  {path:'library',component:LibraryComponent},
  {path:'private',component:PrivateModeComponent},
  {path:'upload-image',component:UploadImageComponent,children:[
    {path:'camera',component:CameraComponent},
    {path:'local',component:LocalComponent},
    {path:'online',component:OnlineComponent}
  ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
