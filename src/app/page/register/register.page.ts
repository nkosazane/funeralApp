import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  register: FormGroup;
  name: any;
  username: any;

  constructor(private fb: FormBuilder, private angularfire: AngularFirestore,
    private authService: AuthService, private afAuth: AngularFireAuth,
    private router: Router) { 

      this.register =  fb.group({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        password: new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required
        ])),
        name: new FormControl('', Validators.compose([
          Validators.minLength(3),
          Validators.required
        ])),
        gender: new FormControl('', Validators.compose([
          Validators.required
        ])),
        age: new FormControl('', Validators.compose([
          Validators.minLength(1),
          Validators.required
        ])),
      })
    }

  ngOnInit() {
  }

  registerUser(){
    this.authService.signup(this.register.value.email, this.register.value.password).then((value) =>{
      localStorage.setItem('userid', this.afAuth.auth.currentUser.uid)

      this.angularfire.collection('users').doc(this.afAuth.auth.currentUser.uid).set({
        displayName: this.register.value.name,
        email: this.register.value.email,
        age: this.register.value.age,
        gender: this.register.value.gender,
        userid: this.afAuth.auth.currentUser.uid,
      }).then(() => {
        this.router.navigateByUrl('login');
      }).catch(err =>{
        alert(err.message)
      })
      this.afAuth.auth.currentUser.updateProfile({
        displayName: this.register.value.name,
      })
    });
  }

}
