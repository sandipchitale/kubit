import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'entries'})
export class KubitEntriesPipe implements PipeTransform {
    transform(value: any, args?: any[]): any[] {
        return (value ? Object.entries(value) : []);
    }
}