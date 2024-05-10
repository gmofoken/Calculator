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
  
  constructor(private httpClient: HttpClient) { }

  pressKey(key: string) {
    this.mainDisplayText += key;
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
    console.log(this.memory);
  }

  MemoryStore(){
    this.memory = this.subDisplayText;
  }

  async getAnswer() {
    console.log(this.getResult(this.mainDisplayText));
    this.subDisplayText = this.apiResult;
  }

  getResult(param : string) {
    const headers = new HttpHeaders().append('Access-Control-Allow-Origin', '*');
    const params = new HttpParams().append('input', param);

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
