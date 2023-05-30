import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Gif, SearchResponseByQuicktype } from '../interfaces/gift.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {
  //gifList es el que va a tener todas las listas de nuestros gif
  public gifList:Gif[]=[];
   GIPHY_API_KEY = 'gzWjW8niNBjPc3tQ3YV2PDNfoHFke7JS';
  private _tagsHistory: string[]=[];
  private apikey:       string= this.GIPHY_API_KEY;
  private serviceUrl:   string='https://api.giphy.com/v1/gifs'


  constructor(private http: HttpClient ) {
    this.localLoadStorage();

  }

  get tagsHistory(){
    return [...this._tagsHistory]
  }
  //Organizar de tal modo que no se repitan en el historial
  private organizeHistory(tag:string){
    //se pasa a minuscula
    tag.toLowerCase();
    //si el nuevo tag ya se encuentra en el historial se elimina y se inserta al inicio
    if(this.tagsHistory.includes(tag)){
      this._tagsHistory= this._tagsHistory.filter((oldTag)=>oldTag !==tag)
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory=this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }
  //guardar en local storage

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  //cargar desde el localstorage
  private localLoadStorage():void{
    if(!localStorage.getItem('history'))return;

    this._tagsHistory= JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length===0) return;
    this.searchTag(this._tagsHistory[0])

  }

  //Buscar los valores que la persona este solicitando
  async searchTag(tag:string):Promise<void>{
    if(tag.length===0) return ;
    this.organizeHistory(tag)
    const params = new HttpParams()
    .set('api_key', this.apikey)
    .set('limit', '10')
    .set('q', tag)

    this.http.get<SearchResponseByQuicktype>(`${this.serviceUrl}/search`, { params })

    .subscribe(resp=>  {
     this.gifList=resp.data;
     console.log({gifs: this.gifList})
    })

  //###ESTA ES UNA FORMA PERO NO ES MUY USADA
  // async searchTag(tag:string):Promise<void>{ esto va en el serachTag
  //  const resp= await  fetch('https://api.giphy.com/v1/gifs/search?api_key=dGMJW12nlHSz46O3sy81BZFryoPshmUk&q=valoran&limit=10')
  //  const data= await resp.json();
  //  console.log(data)




  }




}
