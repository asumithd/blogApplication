import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() backBtn: Boolean = false

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  gotoPage(backBtn: any) {
    if (backBtn) {
      this.router.navigate(['/'])
    } else {
      this.router.navigate(['/addPost'])
    }
  }
}
