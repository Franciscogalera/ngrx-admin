import { Pipe, PipeTransform } from '@angular/core';
import { analytics } from 'firebase';
import { IngresoEgreso } from '../model/ingreso-egreso.model';

@Pipe({
  name: 'ordenar'
})
export class OrdenarPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.sort((a, b) => {
      if (a.tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
