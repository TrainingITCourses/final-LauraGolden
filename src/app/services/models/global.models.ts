import { Lanzamiento } from '../../interfaces/lanzamiento';
import { Estado } from '../../interfaces/estado';


export interface Global {
    lanzamientos: Lanzamiento[];
    estados: Estado[];
  }

  export const globalInitialState: Global = {
    lanzamientos: [],
    estados: [],
  };
