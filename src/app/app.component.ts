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
  operand1: number;
  operand2: number;
  operator = '';
  calculationString = '';
  // This string  denotes the operation being performed
  answered = false;
  //  flag to check whether the solution has been processed
  operatorSet = false;

  constructor(private httpClient: HttpClient) { }

  pressKey(key: string) {
    if (key === '/' || key === 'x' || key === '-' || key === '+') {
      const lastKey = this.mainDisplayText[this.mainDisplayText.length - 1];
      if (lastKey === '/' || lastKey === 'x' || lastKey === '-' || lastKey === '+') {
        this.operatorSet = true;
      }
      if ((this.operatorSet) || (this.mainDisplayText === '')) {
        return;
      }
      this.operand1 = parseFloat(this.mainDisplayText);
      this.operator = key;
      this.operatorSet = true;
    }
    if (this.mainDisplayText.length === 10) {
      return;
    }
    this.mainDisplayText += key;
  }
  allClear() {
    this.mainDisplayText = '';
    this.subDisplayText = '';
    this.operatorSet = false;
  }


  testInput = (input: string) => {
    // document.getElementById("problemWithInputMessage").innerHTML="";
    var regexNumbers = /[0-9]+$/;                       //Regular Expression for the numbers
    var regexSigns = new RegExp(/[\+\-\/\*]+$/g);       //Regular Expression for the Special Signs

    if (input.match(regexSigns) || input.match(regexNumbers)) {  //checking for Numbers and the Special allowed signs
      return true;
    }
    else {
      // document.getElementById("problemWithInputMessage").innerHTML="You can only input numbers and the following signs + - * /";
      input = input.substring(0, input.length - 1); //Deleting the last symbol if it is not allowed
      // document.calculator.answer.value = x;
      return false;
    }
    return false;
  }

  async getAnswer() {


    this.calculationString = this.mainDisplayText;
    console.log(this.mainDisplayText);
    
    this.getResult().subscribe((res: any) => console.log(res));
    


    // alert(this.testInput(this.calculationString));


    // var settings = {
    //   "url": "https://localhost:44338/Calculator/calculate?input=pi%2B5%2A5%2B5%2A3-5%2A5-5%2A3",
    //   "method": "GET",
    //   "timeout": 0,
    //   "headers": {
    //     "Content-Type": "application/json"
    //   },
    //   "data": JSON.stringify([
    //     "1227073"
    //   ]),
    // };

    // $.ajax(settings).done(function (response) {
    //   console.log(response);
    // });

    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // requestOptions : RequestInfo  = {
    //   method: "GET",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow"
    // };

    // fetch("https://localhost:44338/Calculator/calculate?input=pi%2B5%2A5%2B5%2A3-5%2A5-5%2A3", {method: "GET", headers: myHeaders, redirect: })
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.error(error));


    // this.operand2 = parseFloat(this.mainDisplayText.split(this.operator)[1]);
    // if (this.operator === '/') {
    //   this.subDisplayText = this.mainDisplayText;
    //   this.mainDisplayText = (this.operand1 / this.operand2).toString();
    //   this.subDisplayText = this.calculationString;
    //   if (this.mainDisplayText.length > 9) {
    //     this.mainDisplayText = this.mainDisplayText.substr(0, 9);
    //   }
    // } else if (this.operator === 'x') {
    //   this.subDisplayText = this.mainDisplayText;
    //   this.mainDisplayText = (this.operand1 * this.operand2).toString();
    //   this.subDisplayText = this.calculationString;
    //   if (this.mainDisplayText.length > 9) {
    //     this.mainDisplayText = 'ERROR';
    //     this.subDisplayText = 'Range Exceeded';
    //   }
    // } else if (this.operator === '-') {
    //   this.subDisplayText = this.mainDisplayText;
    //   this.mainDisplayText = (this.operand1 - this.operand2).toString();
    //   this.subDisplayText = this.calculationString;
    // } else if (this.operator === '+') {
    //   this.subDisplayText = this.mainDisplayText;
    //   this.mainDisplayText = (this.operand1 + this.operand2).toString();
    //   this.subDisplayText = this.calculationString;
    //   if (this.mainDisplayText.length > 9) {
    //     this.mainDisplayText = 'ERROR';
    //     this.subDisplayText = 'Range Exceeded';
    //   }
    // } else {
    //   this.subDisplayText = 'ERROR: Invalid Operation';
    // }
    this.answered = true;
  }

  getResult():Observable<any> {
    // const headers = new HttpHeaders().append('Access-Control-Allow-Origin', ' https://localhost:44338');
    const params = new HttpParams().append('input', this.mainDisplayText);
    console.log(params);
    
    return this.httpClient.get<any>('https://localhost:44338/Calculator/calculate', {  params: params }).pipe(
      map((data: any) =>
      {
          return data;
      }),
      catchError(() =>
      {
          return throwError('GoalGuidedProductSelection response is null');
      })
  );
    // this.httpClient.get('https://localhost:44338/Calculator/calculate', {  params: params }).subscribe({
    //   next: (res: any)=>{
    //     console.log(res);
    //   },
    //   error: (err: any)=>{
    //     console.log('Error Occured!!!');        
    //     console.log(err);
    //   }
    // });



    //     let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // let params = new URLSearchParams();
    // params.append("input", 'pi%2B5%2A5%2B5%2A3-5%2A5-5%2A3')

    //     this.httpClient.get('https://localhost:44338/Calculator/calculate', options: {headers: headers, params: params}).subscribe(res => {
    //       console.log(res);
    //     });  
  }
}
