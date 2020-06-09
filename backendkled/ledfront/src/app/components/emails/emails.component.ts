import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { EmailsService } from 'src/app/servisi/emails.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit {

  constructor(private fb:FormBuilder,private emailService:EmailsService, private snackBar:MatSnackBar) { }
  showSpiner=false;
  pokazi=false;
  ngOnInit(): void {
  }

  spiner=false;
  emailForm=this.fb.group({

    imePosiljaoca:['',[Validators.required]],
    emailPosiljaoca:['',[Validators.email,Validators.required]],
    kontaktPosiljaoca:[''],
    datum:[Date.now()],
    sadrzaj:['',[Validators.required]]

  });

  sendMail(){
    if(this.emailForm.valid){
      this.pokazi=true;

      this.emailService.sendMail(this.emailForm.value).subscribe(res=>{
        this.pokazi=false;
        //console.log(res);
        if(res['success']==true){
          this.snackBar.open('Uspesno ste poslali poruku',"Uredu")
        }else{
          this.snackBar.open('Greska prilikom slanja',"Uredu")

        }
      }, error=>{
        this.pokazi=false;
        this.snackBar.open('Greska prilikom slanja na serveru',"Uredu")
        

      })
    }else{
      this.snackBar.open('Niste dobro popunili neophodna polja','Uredu')
    }

  }
  


}
