import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../services/db-service/db-service.service'
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

 
  constructor(private dbService: DbService) { }

 

  ngOnInit(): void {
    console.log("ngOnInit");
    
    this.dbService.isUserExict().then((data) => {
      console.log("daffta",data);
      // if (data) {
      //   let signup = document.getElementById('signup')
      //   signup?.classList.add('none');
      // }
    })
   
  }



}
