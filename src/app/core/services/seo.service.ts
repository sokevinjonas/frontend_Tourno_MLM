import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

export interface SeoData {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private readonly DEFAULT_TITLE = 'G4MEPRO AFRICA (GPA) - L\'Elite du Gaming Africain';
  private readonly DEFAULT_DESCRIPTION = 'G4MEPRO AFRICA (GPA) est la plateforme de référence pour les tournois de jeux vidéo en Afrique. Rejoignez l\'élite et gagnez des prix.';
  private readonly DEFAULT_IMAGE = 'assets/images/og-banner.png';

  init() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe((data: any) => {
      const seoData: SeoData = data.seo || {};
      this.updateTags(seoData);
    });
  }

  updateTags(data: SeoData) {
    const title = data.title ? `${data.title} | G4MEPRO AFRICA` : this.DEFAULT_TITLE;
    const description = data.description || this.DEFAULT_DESCRIPTION;
    const image = data.image || this.DEFAULT_IMAGE;

    // Browser Title
    this.titleService.setTitle(title);

    // Standard Meta
    this.metaService.updateTag({ name: 'description', content: description });
    if (data.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: data.keywords });
    }

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:image', content: image });
    this.metaService.updateTag({ property: 'og:type', content: data.type || 'website' });

    // Twitter
    this.metaService.updateTag({ property: 'twitter:title', content: title });
    this.metaService.updateTag({ property: 'twitter:description', content: description });
    this.metaService.updateTag({ property: 'twitter:image', content: image });
  }
}
