import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ThemeService } from './service/theme.service';
import { TitleService } from './service/title.service';
import { DomainService } from './service/domain.service';
import { LoaderService } from './service/loader/data-loader.service';

class MockThemeService {
  initTheme() {}
}

class MockTitleService {
  titleInfo$ = of({
    dimension: 'Test Title',
    level: '1',
  });
}

class MockDomainService {
  domains = [{ id: 'security', name: 'Security', metaFile: 'security/meta.yaml' }];
  activeDomain$ = of({ id: 'security', name: 'Security', metaFile: 'security/meta.yaml' });
  async load() {
    return this.domains[0];
  }
  getMetaFilePath() {
    return 'assets/YAML/security/meta.yaml';
  }
  switchDomain() {}
}

class MockLoaderService {
  setMetaFile() {}
  async load() {
    return {};
  }
}

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatButtonToggleModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: ThemeService, useClass: MockThemeService },
        { provide: TitleService, useClass: MockTitleService },
        { provide: DomainService, useClass: MockDomainService },
        { provide: LoaderService, useClass: MockLoaderService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});
