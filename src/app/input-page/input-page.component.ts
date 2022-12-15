import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-input-page',
  templateUrl: './input-page.component.html',
  styleUrls: ['./input-page.component.scss']
})
export class InputPageComponent implements OnInit {

  public clientid: any ;
  public productid: any ;
  public productRefId: any  ;
  public accessKeyId: any;
  public secretKey: any;
  public countryISOCode: any;
  productForm = new FormGroup({
    productid: new FormControl(null, [Validators.required]),
    clientid: new FormControl(null, [Validators.required]),
    productRefId: new FormControl(null, [Validators.required]),
    accessKeyId: new FormControl(null, [Validators.required]),
    secretKey: new FormControl(null, [Validators.required]),
    countryISOCode: new FormControl(null, [Validators.required]),
  });
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadValuesFromLocalStorage();
  }
  public gotoPackages() {
    this.router.navigate(['/packages'], { queryParams: { 'clientid': this.clientid, 'productid': this.productid, 'productRefId': this.productRefId, 'accessKeyId': this.accessKeyId, 'secretKey': this.secretKey } })
  }
  public frequencywise() {
    this.router.navigate(['/frequency-wise'], { queryParams: { 'clientid': this.clientid, 'productid': this.productid, 'productRefId': this.productRefId, 'accessKeyId': this.accessKeyId, 'secretKey': this.secretKey } })
  }
  public packagewise() {
    console.log(this.clientid)
    console.log(this.productid)
    this.router.navigate(['/package-wise'], { queryParams: { clientid: this.clientid, productid: this.productid, 'productRefId': this.productRefId, 'accessKeyId': this.accessKeyId, 'secretKey': this.secretKey } })
  }
  public goback() {
    this.router.navigate([''])
  }

  public loadValuesFromLocalStorage() {
    if (localStorage.getItem("productid") != null)
      this.productid = localStorage.getItem("productid");
    if (localStorage.getItem("clientid") != null)
      this.clientid = localStorage.getItem("clientid");
    if (localStorage.getItem("productRefId") != null)
      this.productRefId = localStorage.getItem("productRefId");
    if (localStorage.getItem("accessKeyId") != null)
      this.accessKeyId = localStorage.getItem("accessKeyId");
    if (localStorage.getItem("secretKey") != null)
      this.secretKey = localStorage.getItem("secretKey");
    if (localStorage.getItem("countryISOCode") != null)
      this.countryISOCode = localStorage.getItem("countryISOCode");
  }

  public assignvalues() {
    localStorage.setItem("productid", this.productid);
    localStorage.setItem("clientid", this.clientid);
    localStorage.setItem("productRefId", this.productRefId);
    localStorage.setItem("accessKeyId", this.accessKeyId);
    localStorage.setItem("secretKey", this.secretKey);
    localStorage.setItem("countryISOCode", this.countryISOCode);
    this.loadJwtToken();
  }

  public loadJwtToken() {

    const headers = {
      // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdW1lc2gudGNAZ21haWwuY29tIiwibGFzdE5hbWUiOiJ0YyIsImNsaWVudElkIjo5LCJwcm9kdWN0SWQiOjIsInJvbGVzIjpbXSwiaXNzIjoidXNlcm1nbXQtYXBpIiwidXNlck5hbWUiOiJzdW1lc2gudGNAZ21haWwuY29tIiwidXNlcklkIjozOCwiZmlyc3ROYW1lIjoic3VtZXNoIiwibmJmIjoxNjYwNzIxOTgzLCJleHAiOjE2NjA4MDgzODMsImlhdCI6MTY2MDcyMTk4M30.6rA4V3Z_rxi7g4MEzffW7E1yKgxgZ7Eec_bq2lhK6Qo',
      'Accept': 'application/json'
    };
    this.http.get(environment.externalAPIUri + "accesskey/" + this.accessKeyId + "/secretkey/" + this.secretKey + "/token", { headers, responseType: 'text' }).subscribe((data: any) => {
      localStorage.setItem("saaslogicJwtToken", data);
      this.router.navigate(['/plans'],);
    },
      err => {
        console.log("Error");
      }
    );





    // const body = { accessKey: this.accessKeyId, secretKey: this.secretKey };
    // this.http.post(environment.portalAPIUri + 'authentication/access-token-by-api-key-and-secret', body, { headers, responseType: 'text' }).subscribe((data: any) => {
    //   localStorage.setItem("saaslogicJwtToken", data);
    //   this.router.navigate(['/plans'],);

    // },
    //   err => {
    //     console.log("Error");
    //   }
    // );
  }

}
