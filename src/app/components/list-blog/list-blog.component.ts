import { ViewBlogComponent } from './../view-blog/view-blog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css']
})
export class ListBlogComponent implements OnInit {
  displayedColumns: string[] = ['title', 'body', 'action'];
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private apiService: RestApiService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllPost()
  }
  ionViewWillEnter(){
    this.getAllPost()
  }
  deleteBlog(id: number) {
    this.apiService.deleteBlog(id).subscribe({
      next: (res) => {
        alert('Post Deleted successfully');
        this.getAllPost()
      },
      error: (err) => {
        alert("Error while deleting the Post");
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllPost() {
    this.apiService.getBlog().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error while fetching the data");
      }
    })
  }
  updateBlog(data: any) {
    this.router.navigate(['addPost', { id: data.id }])
  }
  viewBlog(data: any) {
    this.dialog.open(ViewBlogComponent, {
      data: data,
      width: '50%'
    })
  }
}
