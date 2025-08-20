import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitatService } from './citat.service';

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

  constructor(
    private router: Router,
    private citatService: CitatService
  ) { }

  ngOnInit(): void {
    // Här är ändringen för att visa citat för alla.
    // Vi tar bort token-kontrollen så att alla kan se citaten när komponenten laddas.
    this.loadCitatFromApi();
  }

  loadCitatFromApi(): void {
    this.citatService.getCitat().subscribe({
      next: (data: Citat[]) => {
        this.citatLista = data;
      },
      error: (err) => {
        console.error('Kunde inte ladda citat från API:', err);
      }
    });
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

    this.citatService.addCitat({ text: this.nyttCitat }).subscribe({
      next: () => {
        this.nyttCitat = '';
        this.loadCitatFromApi();
      },
      error: (err) => {
        console.error('Kunde inte lägga till citat:', err);
      }
    });
  }

  deleteCitat(id: number): void {
    this.citatService.deleteCitat(id).subscribe({
      next: () => {
        this.loadCitatFromApi();
      },
      error: (err) => {
        console.error('Kunde inte radera citat:', err);
      }
    });
  }
}

