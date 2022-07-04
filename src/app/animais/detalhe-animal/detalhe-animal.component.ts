import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Animal } from '../animais';
import { AnimaisService } from '../animais.service';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.scss'],
})
export class DetalheAnimalComponent implements OnInit {
  animalID!: number;
  animal$!: Observable<Animal>;
  // activated route to fetch the params id
  constructor(
    private animaisService: AnimaisService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // get animal id
    this.animalID = this.activatedRoute.snapshot.params['id'];
    // search for animal id for the animal details
    this.animal$ = this.animaisService.buscaPorID(this.animalID);
  }

  curtir() {
    this.animaisService.curtir(this.animalID).subscribe((like) => {
      if (like) {
        this.animal$ = this.animaisService.buscaPorID(this.animalID);
      }
    });
  }

  excluir() {
    this.animaisService.excluiAnimal(this.animalID).subscribe({
      next: () => {
        this.router.navigate(['/animais/']);
      },
      error: (error) => console.log(error),
    });
  }
}
