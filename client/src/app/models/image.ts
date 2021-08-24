import { Library } from "./library";
import { LocationCoords } from "./locationCoords";

export class ImageDetails {
    imgSrc:string;
    fileName:string;
    caption:string;
    categories:string[];
    isFavorite:boolean;
    inPrivateMode!:boolean;
    library:Library;
    location:LocationCoords;
}