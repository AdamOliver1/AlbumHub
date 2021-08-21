import { ErrorHandler, Injectable } from "@angular/core";
import { ImageDialogServiceService } from "../image-dialog-service/image-dialog-service.service";

@Injectable()
export class CustomErrorInterceptor implements ErrorHandler {
    constructor(
        //   private loggerService: LoggerService,
        private dialogService: ImageDialogServiceService,
        
    ) { }

    handleError(error: any) {
      
        // next show a friendly message
        this.dialogService.openErrorPageDialog("An Error Has Been Detected");

    }
}