import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeDto } from 'src/app/employeeDto';
import { Employee } from '../../employee'
import { HttpService } from '../../http.service';

// let data: any = {
//   "employee": [
//     {
//       "name": "krutika vilas bhadane",
//       "gender": "female",
//       "departMent": [
//         "HR", "engineering"
//       ],
//       "salary": "30000",
//       "startDate": "1 Jan 2020",
//       "notes": "",
//       "id": 1604589551457,
//       "profileUrl": "../assets/profile-images/Ellipse 4.png"
//     }
//   ]
// }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employeeCount: number = 0;
  employeeList: EmployeeDto[] = [];


  constructor(private httpService: HttpService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit():void{
    this.httpService.getEmployeeData().subscribe(response => {
      this.employeeList = response.data
      console.log("employee list ------",this.employeeList);
      
      this.employeeCount = this.employeeList.length
    })
    

      
      // console.log("data1..........",data1);
      // this.employeeList.push(data1);
      // this.httpService.getData().subscribe(employee=>{
      // this.employeeList.push(employee);
      // console.log("eployeelist",this.employeeList);
      // this.employeeCount = this.employeeList.length
      
    // })
    // console.log("eployeelist",this.employeeList);
  }
  updateEmployee(employee: EmployeeDto){
    console.log("id-------",employee);
    console.log("emp---",employee.employee_id);
    this.router.navigate(['editEmployee', employee.employee_id]);
  }

  deleteEmployee(employee: EmployeeDto){
    console.log("id-------",employee);
    console.log("emp---",employee.employee_id);
    this.httpService.deleteEmployee(employee.employee_id).subscribe( data => {
      console.log(data);
      this.httpService.getEmployeeData().subscribe(response => {
        this.employeeList = response.data;
        this.employeeCount = this.employeeList.length;
      })  
    })
  }

  addUrl = "../assets/icons/add-24px.svg"
}
