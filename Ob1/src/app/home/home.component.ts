import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, count, interval,Observable, timeout } from 'rxjs';
import { map,filter } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  private firstObsSubscription:Subscription

  constructor() { }

  ngOnInit() {
    /*this.firstObsSubscription = interval(1000).subscribe(count =>{//reloop every 1000ms count+1every 1000ms
      console.log(count); 
    })*/
    const customIntervalObservable = Observable.create(observer=>{
      let count=0;
      setInterval(() => {
        observer.next(count);
        if(count === 2){
          observer.complete();//stop observer
        }
        if(count > 3){
          observer.error(new Error('Count is greater than 3!'));//error console
          
        }
        count++;
      },1000);
    });

    

    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => {
      return +data > 0;//skip round 1
    }),map((data:Number)=>{
      return "Round : " + (+data + 1);
    })).subscribe(data =>{
      console.log(data);
    },error =>{
      console.log(error);
      alert(error.message);
    },() => {
      console.log('Completed!');
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe(); //stop&clear subscription when change page
  }

}
