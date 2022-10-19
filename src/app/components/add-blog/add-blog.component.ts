import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  blogForm !: FormGroup;
  actionBtn: string = "Save"
  id: any;
  editData: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: RestApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    })
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.apiService.findOneBlog(this.id).subscribe((data: any) => {
        this.editData = data;
        console.log(this.editData);
        this.actionBtn = "Update";
        this.blogForm.controls['title'].setValue(this.editData.title);
        this.blogForm.controls['body'].setValue(this.editData.body);
      });
    }

  }
  saveBlog() {

    if (this.editData === null || this.editData === undefined) {
      if (this.blogForm.valid) {
        this.apiService.addBlog(this.blogForm.value).subscribe({
          next: (res) => {
            alert("Post added successfully");
            this.blogForm.reset()
          },
          error: (err) => {
            alert("Error while adding the Post");
            this.blogForm.reset()
          }
        })
      }
    } else {
      if (this.blogForm.valid) {
        this.apiService.updateBlog(this.blogForm.value, this.editData.id).subscribe({
          next: (res) => {
            alert("Post Updated successfully");
            this.blogForm.reset()
          },
          error: (err) => {
            alert("Error while updating the Post");
            this.blogForm.reset()
          }
        })
      }
    }
    this.router.navigate(['/'])
  }

}
