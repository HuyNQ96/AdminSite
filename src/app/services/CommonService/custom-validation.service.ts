import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {
  // Check Input truyền vào là kiểu số
  numberValidator(control: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (!control.value) {
          resolve(null);
        }
        const regex = new RegExp('^[0-9]*$');
        const valid = regex.test(control.value);
        if (!valid) {
          resolve({ invalidNumber: true });
        }
        else {
          resolve(null);
        }
      }, 500);
    });
  }

  // Check Input truyền vào là kiểu chữ
  stringValidator() {
    return (control: AbstractControl): null | undefined => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('/^[A-Za-z]+$/');
      const valid = regex.test(control.value);
      if (!valid) {
        control.setErrors({ invalidString: true });
      } else {
        control.setErrors(null);
      }
      return null;
    }
  }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        control.setErrors(null);
        return { invalidPassword: null };
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      if (valid) {
        control.setErrors(null);
        return { invalidPassword: null };
      }
      else
        return { invalidPassword: true };
    };
  }


  userNameValidator(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.validateUserName(userControl.value)) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  validateUserName(userName: string) {

    /* A static array is used to validate the availability of user names.
    *  Ideally it should be a service call to the server to search the value from a database.
    */

    const UserList = ['ankit', 'admin', 'user', 'superuser'];
    return (UserList.indexOf(userName) > -1);
  }
}
