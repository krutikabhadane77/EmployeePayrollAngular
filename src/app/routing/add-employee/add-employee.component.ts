import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Employee } from 'src/app/employee';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employeeForm!: FormGroup;


  departments: Array<any> = [
    { id: 1, name: "HR", value: "HR", checked: false },
    { id: 2, name: "Sales", value: "Sales", checked: false },
    { id: 3, name: "Finance", value: "Finance", checked: false },
    { id: 4, name: "Engineer", value: "Engineer", checked: false },
    { id: 5, name: "Other", value: "Other", checked: false }
  ]
 


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,private httpService: HttpService) {
    this.employeeForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required,
      Validators.maxLength(30),
      Validators.minLength(3)]),
      profilePic: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      department: new FormArray([], Validators.required),
      salary: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required)
    })
  }


  ngOnInit(): void {
  }


  onDepartmentChange(event: any) {
    const departmentValue = event.source.value
    const selectedDepartment = event.checked
    const departmentArray: FormArray = this.employeeForm.get('department') as FormArray;


    if (selectedDepartment) {
      departmentArray.push(new FormControl(departmentValue));
    } else {
      const index = departmentArray.controls.findIndex(x => x.value === departmentValue);
      departmentArray.removeAt(index);
    }
  }

  salary: number = 400000;
  updateSetting(event: any) {
    this.salary = event.value;
  }


  formatLabel(value: number) {
    return value.toString();
  }
  get formControls() {
    return this.employeeForm.controls
  }


  public myError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName)
  }


  get fullName(): FormControl {
    return this.employeeForm.get('name') as FormControl
  }

  public employee: Employee = new Employee();

  submitForm(){
    console.log(this.employeeForm.value)
       if(this.employeeForm.valid){
        let formatedDate= moment(this.employeeForm.get('startDate')?.value).format('DD MM YYYY');
        console.log("date",formatedDate);
        
        
      let newEmployee: Employee = {
        name: this.employeeForm.get('name')?.value,
        department: this.employeeForm.get('department')?.value,
        profilePic: this.employeeForm.get('profilePic')?.value,
        gender: this.employeeForm.get('gender')?.value,
        salary: this.employeeForm.get('salary')?.value,
        startDate: formatedDate,
        note: this.employeeForm.get('note')?.value
      }
      this.httpService.addEmployeeData(newEmployee).subscribe(response => {
            console.log(response)
          })
          console.log("new employee ",newEmployee);
          
    this.router.navigate([''])
    
   }
  }



  resetForm() {
    this.employeeForm.reset()
  }


}
