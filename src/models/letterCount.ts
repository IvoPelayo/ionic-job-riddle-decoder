import { MAX_LENGTH_VALIDATOR } from '@angular/forms/src/directives/validators';
/**
Repositorio para almacenar repeticiones de un caracter en una cadena. (Elemento secundario)
*/
export class LetterCount {
    @MAX_LENGTH_VALIDATOR(1)
    char: string;

    count: number;
}