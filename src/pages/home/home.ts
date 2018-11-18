import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('file') file;

  myFromGroup: FormGroup;
  imageViewer: any;
  isImageViewer: boolean = false;

  constructor(public navCtrl: NavController, 
              private formBuilder:FormBuilder,
              private httpClient: HttpClient) { }

  ngOnInit() {
    this.myFromGroup = this.formBuilder.group({
      user: 'cuongdq',
      pass: '123',
      fileload: ''
    });
  }

  onSubmit() {
    console.log(this.myFromGroup.value);

    /* var formData: FormData = new FormData();

    formData.append("hovaten","Ten va ho");
    formData.append("pass","khong ro");
    formData.append("file_upload","khong ro");


    this.httpClient.post('/form',formData)
    .toPromise()
    .then(data=>console.log(data)); */

  }


  fileChange(event){

    /* const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    } */

    //console.log(event);
    //console.log(JSON.stringify(event));
    
    if (event.target && event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      //ham nhan ket qua doc du lieu file
      reader.onload = (event: any) => {
        this.imageViewer = event.target.result;
        this.isImageViewer = true;
      }
      //thuc hien doc file nhu la lay tu url
      reader.readAsDataURL(event.target.files[0]);
      //sau khi doc xong thi ket qua tra ve 
      //tren event.target.result tren ham onload o tren
    }
  }

  //Goi nut lenh lay file nhu doi tuong file cua he thong
  addFiles() {
    //console.log("click file");
    console.log(this.file);
    //this.file.nativeElement;
  }

  resetImage(){
    this.isImageViewer = false;
    console.log("bam nut reset");
    
  }
}
