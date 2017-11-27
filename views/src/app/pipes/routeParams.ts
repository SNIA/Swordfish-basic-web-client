/**
 * Created by Sravanthi on 5/3/2017.
 */
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'routeParams'})

export class routeParamsPipe implements PipeTransform {
  transform(value: any) {
    var routeparams= value.split('/');
    return  routeparams[routeparams.length-1];
  }
}

