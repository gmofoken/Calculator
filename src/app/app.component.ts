import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculator';
  subDisplayText = '';
  mainDisplayText = '';
  operator = '';
  calculationString = '';
  memory = '';
  apiResult = '';
  HistoryText = '';
  MemoryText = '';
  SideText = '';
  
  constructor(private httpClient: HttpClient) { 
    this.History();
  }

  pressKey(key: string) {
    this.mainDisplayText += key;
  }

  History(){
      this.SideText = this.HistoryText;
      console.log(this.SideText);
  }

  Memory(){
    this.SideText = this.MemoryText;
    console.log(this.SideText);
  }

  allClear() {
    this.mainDisplayText = '';
    this.subDisplayText = '';
  }
  MemoryRecall(){
    this.mainDisplayText = this.memory;
    this.subDisplayText = this.memory;
  }

  async memoryArithmetic(input: string){
    console.log(this.memory);
    console.log(input);
    console.log(this.mainDisplayText);
    this.getResult(this.memory + input + this.mainDisplayText);


    this.memory = this.apiResult;
  }

  MemoryStore(){
    this.memory = this.subDisplayText;
    var appendElement = '<div>'+ this.memory  + '</div>' ;
    this.MemoryText = appendElement + this.MemoryText;
    this.Memory();
  }

  async getAnswer() {
    this.subDisplayText = await this.getResult(this.mainDisplayText);

    alert(this.subDisplayText);

    var appendElement = '<div>'+ this.mainDisplayText+' <br/> =' + this.subDisplayText  + '</div>' ;
    this.HistoryText += appendElement;
  }

  getResult(param : string) {
    const headers = new HttpHeaders().append('Access-Control-Allow-Origin', '*');
    const params = new HttpParams().append('input', param);

    console.log(param);

    if (param){

        this.httpClient.get('https://localhost:44338/Calculator/calculate', { params: params }).subscribe({
          next: (res: any)=>{
            this.apiResult = res;
          },
          error: (err: any)=>{
            this.apiResult  = err;
          }
        });

      
    }
    return this.apiResult ;
    
  }
}
