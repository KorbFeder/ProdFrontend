import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-secure-image',
  templateUrl: './secure-image.component.html',
  styleUrls: ['./secure-image.component.scss']
})
export class SecureImageComponent implements OnChanges {
  @Input()
  private src: string;

  @Input()
  private endpoint: string;

  private src$ = new BehaviorSubject(this.src);
  public dataUrl$ = this.src$.pipe(
    switchMap(url => this.loadImage(url, this.endpoint))
  );

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer) { }

  ngOnChanges() {
    this.src$.next(this.src);
  }


  private loadImage(url: string, endpoint: string) {
    const _url = endpoint + url;
    return this.http.get(_url, {responseType: 'blob'}).pipe(
      map(e => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e)))
    );
  }


}
