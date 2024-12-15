import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProblemService {
  private apiUrl = 'http://localhost:8000/api/problems/';

  constructor(private http: HttpClient) {}

  getProblems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProblemDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  getTestCases(problemId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${problemId}/test-cases/`);
  }
  runCode(code: string, languageId: number, stdin: string) {
    const payload = {
      source_code: code,
      language_id: languageId,
      stdin: stdin,
    };
    return this.http.post<any>('http://localhost:8000/api/run-code/', payload);
  }
  
}
