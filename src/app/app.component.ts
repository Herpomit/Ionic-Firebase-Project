import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {
  uye = this.servis.AktifUyeBilgi
  constructor(
    public servis: DataService,
    public router: Router
  ) { }
  ngOnInit(): void {
  }
  OturumKapat() {
    this.servis.OturumKapat().then(() => {
      this.router.navigate(['login']);
    });
  }
}