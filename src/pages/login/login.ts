import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  //public files: Set<File> = new Set();

  myFromGroup: FormGroup;
  isImageViewer: boolean = false;

  public resourceImages: {imageViewer: any,file:any, name: string }[] = [];
  
  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient) { }

  ngOnInit() {
    this.myFromGroup = this.formBuilder.group({
      user: 'cuongdq',
      pass: '123',
      fileload: ''
    });
  }

  fileChange(event) {

    if (event.target && event.target.files) {
      //dua vao mang file
      const files: { [key: string]: File } = event.target.files;
      for (let key in files) { //index, length, item
        if (!isNaN(parseInt(key))) {
          //chi khoa index thoi
          //this.files.add(files[key]);
          //doc danh sach file vao image source view ra
          let reader = new FileReader();
          reader.readAsDataURL(files[key]);
          reader.onload = (kq: any) => {
            this.resourceImages.push(
                          {
                          imageViewer: kq.target.result, //ket qua doc file ra binary
                          file:files[key], //doi tuong file goc
                          name:files[key].name //ten file upload len
                          }
                          );
            this.isImageViewer = true;
          }
        }
      }//
      
    }
  }


  deleteImage(evt){
    //console.log(evt);
    //loc doi tuong xoa bo no di
    this.resourceImages = this.resourceImages.filter((value,index,arr)=>{
      //loc doi tuong khong co
      return value!=evt;
    });
  }


  
  shareImage(evt){
    var formData: FormData = new FormData();
    var valueUser = this.myFromGroup.get('user').value;
    formData.append("anhle", valueUser);
    formData.append("key",  this.myFromGroup.get('pass').value);
    formData.append('file2Upload', evt.file, evt.name);
    //gui xong thi remove

    this.httpClient.post('/file_upload', formData)
      .toPromise()
      .then(data => {
        console.log(data);
        //neu thanh cong thi xoa anh
        this.resourceImages = this.resourceImages.filter((value,index,arr)=>{
          return value!=evt;
        });

      })
      .catch(err => {
        console.log(err);
        //neu loi thi thong bao cho nguoi dung biet
      }
    );
    ;

    
  }

  onSubmit() {
   
    var formData: FormData = new FormData();
    //lay gia tri cua form ve khi da submit

    formData.append("hovaten",this.myFromGroup.get('user').value);
    formData.append("pass",this.myFromGroup.get('pass').value);
    var i=0;
    this.resourceImages.forEach(fileObj => {
      //console.log(fileObj.name);
      formData.append('file2Upload'+i++, fileObj.file, fileObj.name);
      //gui tung file hoac tat ca cac file
    });

    this.httpClient.post('/file_upload', formData)
      .toPromise()
      .then(data => console.log(data))
      .catch(err => console.log(err));
    ;

  }
}
