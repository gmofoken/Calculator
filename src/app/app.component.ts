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
  }

  Memory(){
    this.SideText = this.MemoryText;
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
    this.getResult(this.mainDisplayText + input + this.memory, true);
  }

  MemoryStore(){
    this.memory = this.subDisplayText;
    var appendElement = '<div>'+ this.memory  + '</div>' ;
    this.MemoryText = appendElement + this.MemoryText;
    this.Memory();
  }

  getAnswer() {
    this.getResult(this.mainDisplayText);
  }

  setMemory(){
    this.memory = this.apiResult;
    this.Memory();
  }

  populateHistory(){
    var appendElement = '<div>'+ this.mainDisplayText+' <br/> =' + this.apiResult  + '</div>' ;
    this.HistoryText += appendElement;
    this.History();
  }

  getResult(param : string, isMem : boolean = false) {
    const params = new HttpParams().append('input', param);

    if (param){

        this.httpClient.get<string>('https://localhost:44338/Calculator/calculate', { params: params }).subscribe({
          next: (res: any)=>{
            
              
            this.apiResult = res;
            this.subDisplayText = res;

            if (isMem)
              this.setMemory();
            else
             this.populateHistory();
          },
          error: (err: any)=>{
            this.apiResult  = err;
          }
        });

      
    }
    
  }
}
