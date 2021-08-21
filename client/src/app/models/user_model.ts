export class User {
    first_name: string = "";
    last_name: string = "";
    email_adress: string = "";
    allow_camera: boolean = false;
    allow_online: boolean = false;
    allow_local: boolean = false;
    password!:number;
    isListView!:boolean;
    libraries:string[] = [];
}
