import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit {

  public jwtAccessToken: string | null | undefined;
  public productRefId: string | null | undefined;
  public countryISOCode: string | null | undefined;
  public isProductOwner: boolean = false;
  public CustomerClientId: any;
  public includeAdminPlans: boolean = true;
  public packagedata: any = [];
  public redirectURL: string;

  constructor(private router: Router, private http: HttpClient) {
    this.redirectURL = environment.redirectUri;
  }

  ngOnInit(): void {
    this.checkAuthorization();
    this.initailizevaiablesFromLocalstorage();
    this.loadPackages();
  }
  initailizevaiablesFromLocalstorage() {
    this.jwtAccessToken = localStorage.getItem("saaslogicJwtToken");
    this.productRefId = localStorage.getItem("productRefId");
    this.countryISOCode = localStorage.getItem("countryISOCode");  
  }
  checkAuthorization() {
    if (localStorage.getItem("saaslogicJwtToken") == undefined || localStorage.getItem("saaslogicJwtToken") == null)
    this.router.navigate(['input']);    
  if (localStorage.getItem("productRefId") == undefined || localStorage.getItem("productRefId") == null)
    this.router.navigate(['input']);   
  if (localStorage.getItem("countryISOCode") == undefined || localStorage.getItem("countryISOCode") == null)
    this.router.navigate(['input']);
  if (localStorage.getItem("accessKeyId") == null)
    this.router.navigate(['input']);
    if (localStorage.getItem("secretKey") == null)
    this.router.navigate(['input']);  
  }
  loadPackages() {
    this.isProductOwner = true;
    const headers = {
      'Authorization':
        'Bearer ' + this.jwtAccessToken, 'Accept': 'application/json'
    };
    let APIUri: any = environment.externalAPIUri + "products/" + this.productRefId + "/plans/?countryISOCode=" + this.countryISOCode;
    if (this.CustomerClientId) {
      APIUri = APIUri + "&customerId=" + this.CustomerClientId;
    }
    if (this.includeAdminPlans != null) {
      APIUri = APIUri + "&includeAdminPlans=" + this.includeAdminPlans;
    }
    this.http.get(APIUri, { headers }).subscribe(response => {
      this.packagedata = response;
    });
  }

  public onTrialSubscribeClick(planId: any, frequencyName: any) {
    const headers = {
      'Authorization': 'Bearer ' + this.jwtAccessToken,
      'Accept': 'application/json'
    };
    const body = {
      accessKey: localStorage.getItem("accessKeyId"),
      secretKey: localStorage.getItem("secretKey"),
      packageRefId: planId,
      frequencyName: frequencyName,
      isTrialSubscription: true,
      redirectUri: this.redirectURL,
      countryISOCode: this.countryISOCode
    };
    this.http.post(environment.externalAPIUri + 'subscription/url', body, { headers, responseType: 'text' }).subscribe((data: any) => {
      window.location.href = data;
    },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            console.log("Error while getting url");
            return;
          }
          this.router.navigate(['input']);
        }
        console.log("Error while getting url , please try again later");
      }
    );
  }

  public onSubscribeClick(planId: any, frequencyName: any) {


    const headers = {
      'Authorization': 'Bearer ' + this.jwtAccessToken,
      'Accept': 'application/json'
    };
    const body = {
      accessKey: localStorage.getItem("accessKeyId"),
      secretKey: localStorage.getItem("secretKey"),
      packageRefId: planId,
      frequencyName: frequencyName,
      isTrialSubscription: false,
      redirectUri: this.redirectURL,
      countryISOCode : this.countryISOCode
    };
    this.http.post(environment.externalAPIUri + 'subscription/url', body, { headers, responseType: 'text' }).subscribe((data: any) => {
      console.log(data);
      window.location.href = data;
    },
      (err :any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
           console.log("package api call, Error");
           return;
          }
          this.router.navigate(['input']);
        }
        console.log("Error while calling api , please try again later");
      }
    );
  }


  

}
