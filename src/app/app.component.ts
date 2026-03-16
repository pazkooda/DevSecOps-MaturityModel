import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService } from './service/theme.service';
import { TitleService } from './service/title.service';
import { DomainService, Domain } from './service/domain.service';
import { LoaderService } from './service/loader/data-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = '';
  defaultTitle = '';
  subtitle = '';
  menuIsOpen: boolean = true;
  sidenavWidth: string = '250px';

  domains: Domain[] = [];
  activeDomainId: string = '';

  private destroy$ = new Subject<void>();

  constructor(
    private themeService: ThemeService,
    private titleService: TitleService,
    private domainService: DomainService,
    private loaderService: LoaderService
  ) {
    this.themeService.initTheme();
  }

  async ngOnInit(): Promise<void> {
    let menuState: string | null = localStorage.getItem('state.menuIsOpen');
    if (menuState === 'false') {
      setTimeout(() => {
        this.menuIsOpen = false;
        this.sidenavWidth = '0px';
      }, 600);
    } else {
      this.sidenavWidth = '250px';
    }

    this.titleService.titleInfo$.pipe(takeUntil(this.destroy$)).subscribe(titleInfo => {
      this.title = titleInfo?.dimension || '';
      this.subtitle = titleInfo?.level ? 'Level ' + titleInfo?.level : '';
    });

    // Load domains and set initial meta file
    const initial = await this.domainService.load();
    this.domains = this.domainService.domains;
    this.activeDomainId = initial.id;
    this.loaderService.setMetaFile(this.domainService.getMetaFilePath());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleMenu(): void {
    this.menuIsOpen = !this.menuIsOpen;
    this.sidenavWidth = this.menuIsOpen ? '250px' : '0px';
    localStorage.setItem('state.menuIsOpen', this.menuIsOpen.toString());
  }

  onDomainChange(domainId: string): void {
    this.domainService.switchDomain(domainId);
    this.activeDomainId = domainId;
    this.loaderService.setMetaFile(this.domainService.getMetaFilePath());
    // Full reload to ensure all pages pick up the new DataStore
    window.location.href = '/';
  }
}
