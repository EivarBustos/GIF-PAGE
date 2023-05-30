
import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../../services/gift.service';

@Component({
  selector: 'gifs-search-box',
  template: `
            <h5 >Buscar: </h5>
            <input type="text"
            class="form-control"
            placeholder="Buscar gifs ..."
            (keyup.enter)="searchTag() "
            #txtTagInput>
  `
})
// tagInput puedo poner elnombre que quiera y sirve para mostrar en herramientas
// CUANDO PONEMOS EL ! AFIRMAMOS QUE SIEMPRE EXISTIRA ALGUN VALOR
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  tagInput!:ElementRef<HTMLInputElement>

  //Lo importo de gift.service.ts
  constructor(private gifsService: GifsService){}


  searchTag(){
    const newTag=this.tagInput.nativeElement.value
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value='';


  }

}
