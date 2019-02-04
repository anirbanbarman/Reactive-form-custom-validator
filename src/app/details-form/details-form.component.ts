import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray
} from "@angular/forms";
import { CustomValidators } from './customValidators';


@Component({
  selector: "app-details-form",
  templateUrl: "./details-form.component.html",
  styleUrls: ["./details-form.component.scss"]
})
export class DetailsFormComponent implements OnInit {
  details: string;
  detailsform_fb: FormGroup;
  details_fb: string;
  

  constructor(private fb: FormBuilder) {}
  detailsFormErrors = {
   
  };
  formValidationMessages = {
    Email: {
      required: " Email is required.",
      minlength: " Email must be greater than 3 characters.",
      maxlength: " Email must be less than 15 characters.",
      emailDomainCheck: 'Email domian should be anirban.com'
    },
    
  
  };
  ngOnInit() {
    this.detailsform_fb = this.fb.group({
      Email: [
        "",
        [Validators.required, Validators.minLength(3),
           Validators.maxLength(15),
           CustomValidators.emailDomainCheck("anirban")]
      ]
      
    });
    this.detailsform_fb.valueChanges.subscribe(data => {
      this.validationErrors(this.detailsform_fb);
    });
  }
  validationErrors(group: FormGroup ): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.detailsFormErrors[key] = "";
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)
      ) {
        const messages = this.formValidationMessages[key];
    
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.detailsFormErrors[key] += messages[errorKey] + " ";
          
          }
        }
      }
      
    
      if (abstractControl instanceof FormGroup) {
        this.validationErrors(abstractControl);
      } 
      if (abstractControl instanceof FormArray) {
        for (const control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            this.validationErrors(control);
          }
        }
      }
     
       
      
    });
  }
 
  

  showDetails_fb() {
    
    console.log(this.detailsform_fb.controls)

  }
 
}
