import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public loginForm: FormGroup;
  public forgotpasswordForm: FormGroup;
  isForgotPassword: boolean = true;
  userDetails: any;
  
  constructor(private fb: FormBuilder,
     private router: Router, 
    private authService: AuthService,
     private alertCtrl: AlertController) { 

    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(12), Validators.required])],
    });

    this.forgotpasswordForm = fb.group({
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
    })
  }

  ngOnInit() {
  }

  loginUser(){
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then(() =>{
      this.router.navigateByUrl('')
    }).catch(err=>{
      alert(err.message)
    })
  }

  forgotpassword() {
    this.isForgotPassword = false;
  }
  Cancel(){
    this.isForgotPassword = true;
  }
  reset() {
    this.authService.sendPasswordResetEmail(this.forgotpasswordForm.value.email)
    .then((success)=>{
      this.alertCtrl.create({
        // message: 'You can not order more than six',
        subHeader: 'Check your Email account',
        buttons: ['Ok']}).then(
        alert=> alert.present()
      );
      this.isForgotPassword=true;
    }).catch((error)=>{
      this.alertCtrl.create({
        // message: 'You can not order more than six',
        subHeader: 'Wrong Email',
        buttons: ['Ok']}).then(
        alert=> alert.present()
      );
    })  
  }
}
