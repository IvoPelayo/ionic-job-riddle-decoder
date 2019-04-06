import { MAX_LENGTH_VALIDATOR } from '@angular/forms/src/directives/validators';
/**
Movimiento realizado por el usuario.Se utiliza para retornar al paso anterior de ser necesario
*/
export class Move {
    @MAX_LENGTH_VALIDATOR(1)
    changedLetter?: string;
    changedIndex?: number;

    @MAX_LENGTH_VALIDATOR(1)
    replacedLetter?: string;
    replacedIndex?: number;
}