import { Component, OnInit } from '@angular/core';
import { 
  FormGroup,
  FormControl, 
  ValidatorFn, 
  AbstractControl, 
  ValidationErrors,
  // Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PickerController } from '@ionic/angular';
import { range } from 'lodash';
import dayjs from 'dayjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
})
export class SignupPage implements OnInit {
  validatePasswords = (mainPasswordControl: AbstractControl): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      if (mainPasswordControl.value !== control.value){
        return {
          password: "Passwords doesn't match"
        };
      } else {
        return null;
      }
    }
  }

  email = new FormControl('');
  password = new FormControl('');
  gender = new FormControl('')

  formGroup = new FormGroup({
    email: this.email,
    password: this.password,
    confirmPass: new FormControl('', this.validatePasswords(this.password)),
    gender: this.gender
  });

  confirmPass = this.formGroup.get('confirmPass')

  constructor(private http: HttpClient, private pickerCtrl: PickerController) {}

  dayjs = dayjs;
 
  isShowPasswords = false;
  
  checkbox(){
    this.isShowPasswords = !this.isShowPasswords;
  }

  // birthday date picking
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  year = new Date().getFullYear();
  daysRange = range(1, 32);
  yearsOptions = range(this.year, 1919).map(x => ({ text: x.toString(), value: x }));
  date?: Date | string = "Select Date";

  async datePicker(){
    const date = await this.pickerCtrl.create({
      columns: [
        {
          name: 'month',
          options: this.months.map(x => ({ text: x, value: x.toLowerCase() })),
          columnWidth: '300px',
          selectedIndex: new Date().getMonth()
        },
        {
          name: 'day',
          options: this.daysRange.map(x => ({ text: x.toString(), value: x })),
          selectedIndex: this.daysRange.filter(x => x === new Date().getDate())[0] - 1
        },
        {
          name: 'year',
          options: this.yearsOptions
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: value => {
            const { day, year, month } = value
            this.date = dayjs(new Date(
              year.value,
              this.months.indexOf(month.text),
              day.value
            )).format("MMM DD, YYYY");
          },
        },
      ],
    });
    await date.present();
  }

  signupUser(){
    this.http.post("https://web.b3.network/kiko/api/v1/signup", JSON.stringify({})).subscribe(() => {})
  }

  ngOnInit(): void {
  }
}
