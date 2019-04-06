import { CombinationItem } from './combinationItem';
/**
Almacena todas las combinaciones entre el alfabeto codificado y una distribución base. Sujeto a modificaciones del usuario.
*/
export class Combination {
    items: Array<CombinationItem>;
    baseDistributionName: string;
}
