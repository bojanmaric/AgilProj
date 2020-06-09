import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/model/Shop';
import { EmailsService } from 'src/app/servisi/emails.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-porudzbine',
  templateUrl: './porudzbine.component.html',
  styleUrls: ['./porudzbine.component.css']
})
export class PorudzbineComponent implements OnInit {

  constructor(private emailService: EmailsService, private snackBar: MatSnackBar) { }

  porudzbine: Array<Shop[]> = new Array<Shop[]>();

  ngOnInit(): void {
    this.loadPorudz()

  }

  loadPorudz() {
    this.emailService.getPorudzbine().subscribe(res => {
      this.porudzbine = res['porudzbenice'];
     
    }, err => {
      console.log(err)
    }
    )
  }

  brisiPorudzbinu(porudzbina) {

    this.emailService.brisiPorudzbinu(porudzbina._id).subscribe(
      res => {
        if (res['success'] === true) {
          this.loadPorudz();
          this.snackBar.open('Uspesno obrisano', 'Uredu', { duration: 1500 })
        }
        else {
          this.snackBar.open('Greska prilikom brisanja', 'Uredu', { duration: 1500 })        }
      }, err => {
        this.snackBar.open('Greska prilikom brisanja', 'Uredu', { duration: 1500 })
      }
    )
  }

}
