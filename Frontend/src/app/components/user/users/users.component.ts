import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserInterface } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';
import {AddUserComponent} from '../add-user/add-user.component'
import {EditUserComponent} from '../edit-user/edit-user.component'

import { UserService } from '../user.service';

export interface Services {
  _id: string;
  nombre: string;
  costo: number;
  precio: number;
  detalle: string;
  _v: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'avatar','name' ,'role','permissions','actions'];
  dataSource: UserInterface[] = [];
  isButtonVisible = true;
  

  constructor(private dialog: MatDialog , private  userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    const user  =JSON.parse(localStorage.getItem('user')!);
    if(user.roles == 'Administrador'){
      this.isButtonVisible = true;
      this.userService.getUsers().subscribe((x: any) => {
        this.dataSource = x;
        this.dataSource.map((e) => {
          e.permissions =  e.permissions.map((p) => {
            var perm = this.userService.permisos.find((f) => f.value == p);
            p =  perm?perm.text:'';
            return p
          })
     
        
        })
      })
    }else{
      this.displayedColumns.forEach((element,index)=>{
        if(element=="permissions") this.displayedColumns.splice(index,1);
     });
      this.userService.getUser(user.id).subscribe((x:any) =>{
        this.isButtonVisible = false;

        this.dataSource = [x];
        x.permissions.map((p:any) =>{
          var perm = this.userService.permisos.find((f) => f.value == p);
          p =  perm?perm.text:'';
          return p
        });
      })
    }

    
    
  }

  openAddServiceModal() {
    
    const dialogRef =  this.dialog.open(AddUserComponent,{
      height: '80%',
      width: '600px',
    });

    dialogRef.componentInstance.closeAddUserModal.subscribe((z) => {
      if(z === 'CLOSE_ADD_USER_MODAL'){
        dialogRef.close();
        this.getUsers();
      }
    })

  }
  
  
  editUser(id: string){
    const dialogRefEdit =  this.dialog.open(EditUserComponent,{
      height: '80%',
      width: '600px',
    });

    dialogRefEdit.componentInstance._id = id;

    dialogRefEdit.componentInstance.closeEditUserModal.subscribe((z) => {
      if(z === 'CLOSE_EDIT_USER_MODAL'){
        dialogRefEdit.close();
        this.getUsers();
      }
    })

  }

  deleteUser(id: string){

    Swal.fire({
      title: 'Estas seguro de eliminar el usuario?',
      showCancelButton: true,
      cancelButtonColor:'#1C92DE',
      confirmButtonColor:'#E22020',
      confirmButtonText: 'Eliminar',
      icon:'warning'
    }).then((result) => {
      if (result.isConfirmed) {

        this.userService.deleteUser(id).subscribe((x) => {
          if(x.deletedCount == 1){
            Swal.fire({
              title: 'Success!',
              text:  "Se elimino correctamente el usuario",
              icon: 'success',
              confirmButtonText: 'OK'
            })

            this.getUsers();
          }
        })
        
      } 
    })


    
  }

  arrayTo(array: []){
    return array.toString()
  }


}

