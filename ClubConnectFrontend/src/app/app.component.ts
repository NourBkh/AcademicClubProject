import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom } from 'rxjs/operators';
// import { TranslateService } from '@ngx-translate/core';
import {getMessaging, getToken,  Messaging} from 'firebase/messaging'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map(v => v[1]),
  );
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService) {
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
   //this.requestPermission();
   console.log("yes, we're starting token retrieval");
  const messaging: Messaging = getMessaging();
  getToken(messaging, { vapidKey: environment.firebase.vpaidkey })
    .then((currentToken: string) => {
      if (currentToken) {
        console.log("Token retrieved successfully:");
        console.log(currentToken);
      } else {
        console.log("Token retrieval succeeded but did not return a token.");
      }
    })
    .catch((error: any) => {
      if (error.code === 'messaging/permission-blocked') {
        console.log("Permission for notifications was denied.");
      } else {
        console.error("An error occurred while retrieving the token:", error);
      }
    });
  }


  
  requestPermission(){
    const messaging =getMessaging();
    getToken(messaging,{vapidKey:environment.firebase.vpaidkey}).then(
      (currentToken)=>{
        if(currentToken){
           console.log("yes we have token");
           console.log(currentToken);
        }else{
          console.log("we have a problem");
        }
      }
    )
  }

}
