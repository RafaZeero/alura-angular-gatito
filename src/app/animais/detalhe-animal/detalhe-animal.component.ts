import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get animal id
    this.animalID = this.activatedRoute.snapshot.params['id'];
    // search for animal id for the animal details
    this.animal$ = this.animaisService.buscaPorID(this.animalID);
  }
}
