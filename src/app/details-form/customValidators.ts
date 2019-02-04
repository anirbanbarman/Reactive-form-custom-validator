import { AbstractControl } from '@angular/forms';

export class CustomValidators {
    static emailDomainCheck(domainName) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const emailValue: string = control.value;
            const domain = emailValue.substring(emailValue.lastIndexOf('@') + 1);
            if (emailValue === '' || domain.toLowerCase() === domainName.toLowerCase()) {
                return null;
            } else {
                return { 'emailDomainCheck': true };
            }
        };
    }
    static ValidateUrl(control: AbstractControl) {
        if (control.value.startsWith('http') && control.value.includes('//')) {
           return null;
        }
       
        return { validUrl: true };
      }
}