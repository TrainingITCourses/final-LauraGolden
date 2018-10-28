import { Agencia } from './agencia';

export interface Rocket {
    id: number;
    name: string;
    agencies: Agencia[];
    imagenURL: string;
}
