import { Component, OnInit } from '@angular/core';
import { NewsApiService } from './news-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchstring = '';
  currentSource='techcrunch';
  mArticles: Array<any>;
  mSources: Array<any>;
  fArticles: Array<any>;

  constructor(private newsapi: NewsApiService) {
    console.log('app component constructor called');
  }

  ngOnInit() {
    //load articles
    this.newsapi.initArticles().subscribe(data => this.mArticles = data['articles']);
    //load news sources
    this.newsapi.initSources().subscribe(data => this.mSources = data['sources']);
    
  }

  searchArticles(source: string) {
    console.log("selected source is: " + source);
    this.currentSource = source;
    this.newsapi.getArticlesByID(source).subscribe(data => this.mArticles = data['articles']);
  }

  

  filterArticles(searchstring:string) {
    
    this.newsapi.getArticlesByID(this.currentSource).subscribe(data => this.fArticles = data['articles']);
    this.mArticles = this.fArticles.filter(function(article) {
      if(article.description.toLowerCase().includes(searchstring) ||article.title.toLowerCase().includes(searchstring))
      {
       return true;
      }
    })
  }

}
