import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gitprofile';

  constructor(private http:HttpClient,private snack:MatSnackBar){}

  username:any;
  response:any;

isloading = false;
errormsg = false;
imgcard = false;

search()
{
  if(!this.username)
  {
    this.snack.open("Enter User Name","Ok",{duration:2000,verticalPosition:'top',horizontalPosition:"right"});
    return;
  }

  this.errormsg = false;
  this.isloading = true;
  
  const localData=localStorage.getItem(this.username);
  if(localData)
  {
    
    this.response=JSON.parse(localData);
    this.isloading = false;
    this.errormsg = false;
    this.imgcard = true;
    
    
  }
  else
  {
  console.log(this.username);
  this.http.get( " https://api.github.com/users/" + this.username+'?access_token=8c76d6c09facaf4a63cfa09b69d71deccbce5a1b').subscribe(userDetail =>{
    this.response =userDetail;
    console.log(this.response);
    localStorage.setItem(this.username,JSON.stringify(this.response));
    this.isloading = false;
    this.imgcard = true;
    this.errormsg = false;
  
  },errormsg =>{
    this.isloading = false;
    this.imgcard = false;
    this.errormsg = true;
    this.snack.open("Invalid UserName","Ok",{duration:2000,verticalPosition:'top',horizontalPosition:"right"});
    
  });

}
}
}