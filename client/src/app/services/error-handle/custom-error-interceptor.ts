import { ErrorHandler, Injectable } from "@angular/core";
import { ImageDialogService } from "../image-dialog-service/image-dialog.service";

@Injectable()
export class CustomErrorInterceptor implements ErrorHandler {
    constructor(  
      private dialogService: ImageDialogService   
    ) { }

    handleError(error: any) {
      console.log("error",error);  
        // show a friendly message
        this.dialogService.openErrorPageDialog("An Error Has Been Detected" +  error?.message);
    }
}