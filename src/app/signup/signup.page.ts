import { Component//, OnInit 
} from '@angular/core';
import { 
  FormGroup,
  FormControl, 
  ValidatorFn, 
  AbstractControl, 
  ValidationErrors,
  FormBuilder
  // Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PickerController } from '@ionic/angular';
import { range } from 'lodash';
import dayjs from 'dayjs';
import { API_URL } from '../constants';

interface SignupForm {
  [key: string]: FormControl<string>;
}

interface DateNumbers {
  [key: string]: number;
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
})
export class SignupPage {//implements OnInit {
  // validator
  validatePasswords = (mainPasswordControl: AbstractControl): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      if (mainPasswordControl.value !== control.value){
        return {
          password: "Passwords doesn't match"
        };
      } else {
        return null;
      }
    };
  }

  // form controls
  email = new FormControl('', { nonNullable: true });
  password = new FormControl('', { nonNullable: true });

  // form group
  formGroup = new FormGroup<SignupForm>({
    email: this.email,
    password: this.password,
    confirmPass: new FormControl('', { nonNullable: true }),
    gender: new FormControl('', { nonNullable: true })
  });

  // confirm pass control from form group
  confirmPass = this.formGroup.get('confirmPass')

  constructor(
    private http: HttpClient, 
    private pickerCtrl: PickerController,
    private fb: FormBuilder
  ) {
    this.formGroup.get("confirmPass")?.setValidators(this.validatePasswords(this.password));
  }

  // dayjs object
  dayjs = dayjs;
 
  // boolean value
  isShowPasswords = false;
  
  checkbox(){
    this.isShowPasswords = !this.isShowPasswords;
  }

  // birthday date picking
  months: string[] = [
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
  daysRange: number[] = range(1, 32);
  yearsRange: number[] = range(this.year, 1919);
  yearsOptions = this.yearsRange.map(x => ({ text: x.toString(), value: x }));
  date?: Date | string = "Select Date";
  chosenDate: Partial<DateNumbers> = {
    month: new Date().getMonth(),
    day: this.daysRange.filter(x => x === new Date().getDate())[0] - 1,
    year: 0
  };

  async datePicker(){
    console.log(this.chosenDate);
    const date = await this.pickerCtrl.create({
      columns: [
        {
          name: 'month',
          options: this.months.map(x => ({ text: x, value: x.toLowerCase() })),
          selectedIndex: this.chosenDate.month
        },
        {
          name: 'day',
          options: this.daysRange.map(x => ({ text: x.toString(), value: x })),
          selectedIndex: this.chosenDate.day
        },
        {
          name: 'year',
          options: this.yearsOptions,
          selectedIndex: this.chosenDate.year
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
            const { day, year, month } = value;
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
    const data = (await date.onDidDismiss()).data;
    if (data) {
      const { month, day, year } = data;
      this.chosenDate = {
        month: this.months.indexOf(month.text),
        day: day.value - 1,
        year: this.yearsRange.indexOf(year.value)
      };
    }
  }

  signupUser(){
    this.http.post(`${API_URL}/v1/signup`, JSON.stringify({})).subscribe(() => {});
  }

  /*
  ngOnInit(): void {
  
  }
  */
}
