import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsenseCodingChallengeApiService {
  constructor(private httpClient: HttpClient) { }

  public getHealth(): Observable<string> {
    return this.httpClient.get(environment.apiUrl + '/health', { responseType: 'text' });
  }
}
