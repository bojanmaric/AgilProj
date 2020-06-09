import { Component, OnInit } from '@angular/core';
import { EmailsService } from 'src/app/servisi/emails.service';
import { Poruka } from 'src/app/model/Poruka';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(private emailService: EmailsService, private snackBar: MatSnackBar) { }

  poruke: Array<Poruka[]> = new Array<Poruka[]>();
  opened = false;


  ngOnInit(): void {
    this.loadPoruke();

  }
  loadPoruke() {
    this.emailService.getPoruke().subscribe(
      res => {
        this.poruke = res['poruke'];
       
      }, err => {
        console.log(err);
      }
    )

  }
  brisiPoruku(poruka) {
    console.log(poruka._id)
    this.emailService.brisiPoruku(poruka._id).subscribe(
      res => {
        if (res['success'] === true) {
          this.loadPoruke();
          this.snackBar.open('Uspesno obrisano', 'Uredu', { duration: 1500 })
        }
        else {
          this.snackBar.open('Greska prilikom brisanja', 'Uredu', { duration: 1500 })

        }
      }, err => {

        this.snackBar.open('Greska prilikom brisanja', 'Uredu', { duration: 1500 })


      }
    );
  }

}
