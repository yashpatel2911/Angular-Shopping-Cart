import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sample-forms',
  templateUrl: './sample-forms.component.html',
  styleUrls: ['./sample-forms.component.css']
})
export class SampleFormsComponent implements OnInit {

  email: string = ''
  password: string = ''

  constructor(private formBuilder: FormBuilder) {}

  userPassword = this.formBuilder.group({
    email: '',
    password: '',
  })

  onSubmit(data: any): void{
    console.log(data)
    this.email = data.email
    this.password = data.password
  }

  ngOnInit(): void {
  }

  
}
