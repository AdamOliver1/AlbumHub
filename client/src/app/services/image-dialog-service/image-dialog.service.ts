import { Injectable } from '@angular/core';
import {ImageDetailsComponent} from '../../shared/views/upload-images/image-details/image-details.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ErrorPageComponent } from 'src/app/shared/views/error-page/error-page.component';
import { EditCategoriesComponent } from 'src/app/shared/views/edit-categories/edit-categories.component';
import { GoogleMapsComponent } from 'src/app/shared/views/google-maps/google-maps.component';

@Injectable()
export class ImageDialogService {

  constructor(private dialog: MatDialog) { }
  
  openGoogleMapsDialog(location:any): Observable<any> {
    return this.openImageDialog(GoogleMapsComponent,location,true);
  }

  openCategoriesDialog(): Observable<any> {
    return this.openImageDialog(EditCategoriesComponent);
  }

  openSaveImageDialog(src:string): Observable<any> {
    return this.openImageDialog(ImageDetailsComponent,{ imgSrc:src });
  }

  openUpdateImageDialog(img:any): Observable<any> {   
  return this.openImageDialog(ImageDetailsComponent,img);
  }

  openErrorPageDialog(err:any): Observable<any> {   
    const dialogRef = this.dialog.open(ErrorPageComponent , {   
      disableClose:false,   
      data: err
    });
    dialogRef.disableClose = false;
    return dialogRef.afterClosed();
    }

  openImageDialog(component:any,data:any = null,isSmaller:boolean = false): Observable<any> {
    const dialogRef = this.dialog.open(component , {    
      width: isSmaller ? '60%': '80%',  
      height : isSmaller ? '60%': '90%',
      data: data
    });
    return dialogRef.afterClosed();
  }
}
