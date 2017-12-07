
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'routeParams'})

export class routeParamsPipe implements PipeTransform {
  transform(value: any) {
    var routeparams= value.split('/');
    return  routeparams[routeparams.length-1];
  }
}

