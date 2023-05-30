import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gift.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent  implements OnInit{

@Input()
public gif!:Gif;


//siempre se debe proporcionar
ngOnInit(): void {
  if (!this.gif) throw new Error('Gif propety is required');
}

}
