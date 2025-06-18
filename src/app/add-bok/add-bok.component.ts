import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Bok {
  title: string;
  author: string;
  publicationDate: string;
}
@Component({
  selector: 'app-add-bok',
  templateUrl: './add-bok.component.html',
  styleUrls: ['./add-bok.component.css']
})
export class AddBokComponent implements OnInit {

  newBok: Bok = {
    title: '',
    author: '',
    publicationDate: ''
  };

  constructor(
    private router: Router,
    private http: HttpClient
   ) {}

  ngOnInit(): void {

  }

  onSubmit(form: NgForm): void {

    if (form.valid) {
      const token = localStorage.getItem( 'token');
      if (!token){
        console.error('Token saknas. Användaren måste logga in.');
        return;
      }
      const headers = new HttpHeaders({
        'Authorization':`Bearer ${token}`
      });

    console.log('Försöker spara ny bok:', this.newBok);
    this.http.post('http://localhost:7219/api/Boks', this.newBok, {headers}).subscribe({
      next: (response) => {
        console.log('Bok sparad framgångsrikt!', response);
        this.router.navigate(['/boks']);
      },
      error: (error) => {
        console.error('Fel vid sparning av bok:', error);

      }
    });
  } else {
    console.warn('Formuläret är ogiltigt. Vänligen fyll i alla obligatoriska fält.');
  }
}

  oncancel(): void {

    console.log('Avbryter tillägg av bok.');
    this.router.navigate(['/boks']);

  }

}








