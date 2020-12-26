import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'highlightSearch'
})
export class HighlightSearchPipe implements PipeTransform {
    constructor(private Sanitizer:DomSanitizer){

    }

  transform(value: string, search: string): string {
    // Ensure numeric values are converted to strings
    return this.Sanitizer.sanitize(SecurityContext.HTML,value.replace(new RegExp('(?![^&;]+;)(?!<[^<>]*)(' + search + ')(?![^<>]*>)(?![^&;]+;)', 'gi'), '<strong class="highlight">$&</strong>'));
  }

}