import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class BaseHttpService {
    http = inject(HttpClient)
    apiUrl = "https://9tnw27iti6.execute-api.us-east-1.amazonaws.com/prod"
}