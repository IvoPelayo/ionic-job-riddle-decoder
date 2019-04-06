import { MAX_LENGTH_VALIDATOR } from '@angular/forms/src/directives/validators';
/**
Objeto que representa la distribución de probabilidad de cada lenguaje.
*/
export class Distribution {
    @MAX_LENGTH_VALIDATOR(28)
    orderedDistribution: string;
    
    name:string;   
}
