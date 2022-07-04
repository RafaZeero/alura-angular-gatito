import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AnimaisService } from '../animais.service';

@Component({
  selector: 'app-novo-animal',
  templateUrl: './novo-animal.component.html',
  styleUrls: ['./novo-animal.component.scss'],
})
export class NovoAnimalComponent implements OnInit {
  formularioAnimal!: FormGroup;
  file!: File;
  preview!: string;
  percentualConcluido = 0;

  constructor(
    private animaisService: AnimaisService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formularioAnimal = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: true,
    });
  }

  upload() {
    const allowComments =
      this.formularioAnimal.get('allowComments')?.value ?? false;
    const description = this.formularioAnimal.get('description')?.value ?? '';

    this.animaisService
      .upload(description, allowComments, this.file)
      .pipe(finalize(() => this.router.navigate(['animais'])))
      .subscribe({
        next: (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            const total = event.total ?? 1;
            this.percentualConcluido = Math.round(100 * (event.loaded / total));
          }
        },
        error: (error) => console.log(error),
      });
  }

  gravaArquivo(arquivo: any): void {
    // fetch uploaded file
    const [file] = arquivo?.files;

    // assign uploaded file to component file
    this.file = file;

    // load preview
    const reader = new FileReader();
    reader.onload = (event: any) => (this.preview = event.target.result);
    reader.readAsDataURL(file);
  }
}
