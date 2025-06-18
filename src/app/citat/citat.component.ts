import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Citat {
  id: number;
  text: string;
}

@Component({
  selector: 'app-citat',
  templateUrl: './citat.component.html',
  styleUrls: ['./citat.component.css']
})
export class CitatComponent implements OnInit {
  citatLista: Citat[] = [];
  nyttCitat: string = '';
  maxCitat: number = 5;

  constructor(private router: Router) { }

  ngOnInit(): void {

    const token = localStorage.getItem('jwtToken');
    if (!token) {
      alert('Du måste vara inloggad för att se dina favoritcitat.');
      this.router.navigate(['/login']);
      return;
    }
    this.loadCitat();
  }

  loadCitat(): void {
    const storedCitat = localStorage.getItem('minaCitat');
    if (storedCitat) {
      this.citatLista = JSON.parse(storedCitat);
    }
  }

  addCitat(): void {
    if (this.nyttCitat.trim() === '') {
      return;
    }

    if (this.citatLista.length >= this.maxCitat) {
      alert(`Du kan inte lägga till fler än ${this.maxCitat} citat.`);
      this.nyttCitat = '';
      return;
    }

    const newId = this.citatLista.length > 0 ? Math.max(...this.citatLista.map(c => c.id)) + 1 : 1;
    const newCitat: Citat = {
      id: newId,
      text: this.nyttCitat.trim()
    };

    this.citatLista.push(newCitat);
    localStorage.setItem('minaCitat', JSON.stringify(this.citatLista));
    this.nyttCitat = '';
  }

  deleteCitat(id: number): void {
    this.citatLista = this.citatLista.filter(citat => citat.id !== id);
    localStorage.setItem('minaCitat', JSON.stringify(this.citatLista));
  }
}


