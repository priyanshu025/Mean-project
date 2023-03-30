import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-resume-upload',
  templateUrl: './resume-upload.component.html',
  styleUrls: ['./resume-upload.component.scss']
})
export class ResumeUploadComponent implements OnInit {

  fileName='';
  @Output() uploadResume=new EventEmitter<File>();
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  onFileSelected(event:any) {

    const file:File = event.target.files[0];

    if (file) {

        this.uploadResume.emit(file);
        this.fileName = file.name;

        // const formData = new FormData();

        // formData.append("resume", file);
        // formData.append("email","priyanshu1@gmail.com");
        // formData.append("password","12345678");
        // formData.append("username","priyanshu");
        // //console.log(file);
        // formData.forEach(val=>{
        //   console.log(val);
        // })

        // const upload$ = this.http.post("/api/thumbnail-upload", formData);

        // upload$.subscribe();
    }
}

}
