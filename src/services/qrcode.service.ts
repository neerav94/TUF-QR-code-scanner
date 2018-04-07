import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class QrcodeService {

    constructor( private http: Http ) {}

    // get all tokens
    getToken() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('https://thehackers.azurewebsites.net/all-data', {headers: headers})
        .map(res => res.json());
    }

    setStatus(tokenId) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('https://thehackers.azurewebsites.net/update-status?tokenId='+tokenId, {headers: headers})
        .map(res => res.json());
    }
}