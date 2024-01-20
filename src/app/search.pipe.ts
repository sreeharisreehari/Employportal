import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  // first arguement should be the item which have to be transformed
  // second based on the transformation should be done

  transform(allEmployeeget: any[], searchkey:string): any[] {
  const result:any=[]

  if(!allEmployeeget || searchkey===""){
    return allEmployeeget
  }
  allEmployeeget.forEach((item:any)=>{

   if(item.name.trim().toLowerCase().includes(searchkey.trim().toLowerCase())){
    result.push(item)
   }
   
  })
    return result;
  }

}
