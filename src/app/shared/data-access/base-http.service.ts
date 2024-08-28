import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class BaseHttpService {
    http = inject(HttpClient)
    apiUrl = "https://5cs7gjy54k.execute-api.us-east-1.amazonaws.com/prod"
}