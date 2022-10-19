import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'blog-application';

  
  constructor(
    // private dialog: MatDialog,
    private router: Router
  ) { }
  // openDialog() {
  //   const dialogRef = this.dialog.open(AddBlogComponent, {
  //     width: '30%'
  //   }).afterClosed().subscribe((res) => {
  //     if (res === 'save') {
  //       this.getAllPost()
  //     }
  //   });

  // }
  
  ngOnInit(): void {
  }


  
  
  
  
}
