import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';
import { ChildActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Surjith Cryptocurrency Tracker | Home Page';
  /**
   * constructor 
   * 
   * Checks for the current route url assigns the dynamic title, description and other meta tag related contents to its respective page.
   * Purpose of performing this is to improve the search cards UI in Facebook and Twitter and also in other medias.
   * 
   * @param {Router} router 
   * @param {Meta} metaService 
   * @param {Title} titleService 
   * @param {@Inject(PlactForm_ID)} platformId 
   * @param {MatSnackBar} _snackBarService
   */
  constructor(
    public router: Router,
    private metaService: Meta,
    private titleService: Title,
    private _snackBarService:MatSnackBar,
    @Inject(PLATFORM_ID) private platformId
  ) {

    this._snackBarService.open("Welcome to Surjith's Assignment",'close',{
      duration:3000,
      panelClass: ['success']

    })
    this.router.events
      .pipe(filter(event => event instanceof ChildActivationEnd))
      .subscribe(event => {

        let snapshot = (event as ChildActivationEnd).snapshot;
        while (snapshot.firstChild !== null) {
          snapshot = snapshot.firstChild;
        }
        this.titleService.setTitle(snapshot.data.title || this.title);

        this.setMetaData(snapshot.data)


      });

  }
  /**
   * onInit
   */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      //write localstorage functions

    }
  }
  /**
   * setMetaData
   * 
   * This method is called on every route change to assign the respective meta contents to its respective pages.
   * @param data 
   */
  setMetaData(data) {
    this.metaService.updateTag({ name: 'keywords', content: data.keywords }, 'name="keywords"');
    this.metaService.updateTag({ name: 'description', content: data.description }, 'name="description"');
    this.metaService.updateTag({ name: 'twitter:title', content: data.title }, 'name="twitter:title"');
    this.metaService.updateTag({ name: 'twitter:text:title', content: data.title }, 'name="twitter:text:title"');
    this.metaService.updateTag({ name: 'twitter:description', content: data.description }, 'name="twitter:description"');
    this.metaService.updateTag({ name: 'twitter:image', content: data.image }, 'name="twitter:image"');
    this.metaService.updateTag({ name: 'twitter:image:alt', content: data.title }, 'name="twitter:image:alt"');
    this.metaService.updateTag({ name: 'twitter:url', content: data.url }, 'name="twitter:url"');

    this.metaService.updateTag({ property: 'og:title', content: data.title }, 'property="og:title"');
    this.metaService.updateTag({ property: 'og:url', content: data.url }, 'property="og:url"');
    this.metaService.updateTag({ property: 'og:image', content: data.image }, 'property="og:image"');
    this.metaService.updateTag({ property: 'og:image:alt', content: data.title }, 'property="og:image:alt"');
    this.metaService.updateTag({ property: 'og:description', content: data.description }, 'property="og:description"');

  }

}