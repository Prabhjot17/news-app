import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  api_key = 'fc8e98b1afcf4a65a0f684da2acd9585';
  constructor(private http:HttpClient) { }

  // Prepare our left-side menu with some news resources.
  initSources()
  {
    return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey='+this.api_key);
  }

  //Retrieves the first articles from TechCrunch once the application gets started.
  initArticles()
  {
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey='+this.api_key);
  }

  // Bring some articles for the passing parameter.
   getArticlesByID(source: String)
   {
    return this.http.get('https://newsapi.org/v2/top-headlines?sources='+source+'&apiKey='+this.api_key);
   }
}
