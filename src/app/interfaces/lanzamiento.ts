import { Mision } from './mision';
import { Rocket } from './rocket';


export interface Lanzamiento {
    id: number;
    name: string;
    status: number;
    missions: Mision[];
    windowstart: Date;
    isostart: Date;
    rocket: Rocket[];
}
