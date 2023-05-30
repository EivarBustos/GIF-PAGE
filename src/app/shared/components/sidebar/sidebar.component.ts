import { Component } from '@angular/core';
import { GifsService } from 'src/app/gitf/services/gift.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private giftService: GifsService){}

  get tags():string[]{
    return this.giftService.tagsHistory;
  }

  searchTag(tag:string){
    this.giftService.searchTag(tag);
  }

}
