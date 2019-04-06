import { MAX_LENGTH_VALIDATOR } from '@angular/forms/src/directives/validators';
/**
Elemento singular "a => b" de una colección de cominaciones. Relación entre letras de Distributiones.
*/
export class CombinationItem {
    @MAX_LENGTH_VALIDATOR(1)
    oLetter: string;

    @MAX_LENGTH_VALIDATOR(1)
    rLetter?: string;
    
    lock: boolean;
}
