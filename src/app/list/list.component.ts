import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import { employee } from '../employee.model';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  allEmployeeget:employee[]=[]
  searchkey:string=""

 constructor(private api:AdminapiService){}

//  lifecycle hook - call just after the components is created and construted is called

ngOnInit(): void {
  this.allEmployee()
}
allEmployee(){
  this.api.getAllEmployeeApi().subscribe({
    next:(res:any)=>{

      this.allEmployeeget = res

      console.log(this.allEmployeeget);
      
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}

removeemployee(id:any){
  this.api.deleteEmployeeApi(id).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.allEmployee()
      
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}

sortid(){
  this.allEmployeeget.sort((a:any,b:any)=>a.id-b.id)

}

sortname(){
  this.allEmployeeget.sort((a:any,b:any)=>a.name.localeCompare(b.name))
}

generatepdf(){
  const pdf=new jsPDF()

  let head=[['Id','Employee name','Email','Status']]

  let body:any=[]
  this.allEmployeeget.forEach((item)=>{
    body.push([item.id,item.name,item.email,item.status])
  })

  pdf.setFontSize(16)

  pdf.text('Employee Details',10,10)
  autoTable(pdf,{head,body})

  pdf.save('employee.pdf')
}


}
