import { Component } from '@angular/core';
import { GifsService } from '../../services/gift.service';
import { Gif } from '../../interfaces/gift.interfaces'
@Component({
  selector: 'gift-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {


  //aqui mandaremos las card o gifs para que se vean en pantalla
  constructor(private gifSevice: GifsService){}

  get gifs(): Gif[]{
    return this.gifSevice.gifList;
  }

}
