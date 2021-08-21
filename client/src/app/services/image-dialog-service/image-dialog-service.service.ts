import { Injectable } from '@angular/core';
import {ImageDetailsComponent} from '../../shared/views/upload-images/image-details/image-details.component';
import {MatDialogModule, MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PrivateModeComponent } from 'src/app/shared/views/private-mode/private-mode.component';
import { ErrorPageComponent } from 'src/app/shared/views/error-page/error-page.component';
@Injectable()
export class ImageDialogServiceService {

  constructor(private dialog: MatDialog) { }
  
  openSaveImageDialog(src:string): Observable<any> {
    return this.openImageDialog({ imgSrc:src });
  }

  openUpdateImageDialog(img:any): Observable<any> {   
  return this.openImageDialog(img);
  }

  openErrorPageDialog(err:any): Observable<any> {   
    const dialogRef = this.dialog.open(ErrorPageComponent , {   
      disableClose:false,   
      data: err
    });
    dialogRef.disableClose = false;
    return dialogRef.afterClosed();
    }

  openImageDialog(data:any): Observable<any> {

    const dialogRef = this.dialog.open(ImageDetailsComponent , {    
      width: '100%',
      minHeight: 'calc(100vh - 90px)',
      height : '100%',
      data: data
    });
    return dialogRef.afterClosed();
  }

  
}
