import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { YamlService } from './yaml-loader/yaml-loader.service';

export interface Domain {
  id: string;
  name: string;
  metaFile: string;
}

interface DomainsConfig {
  domains: Domain[];
  defaultDomain: string;
}

const DOMAINS_FILE = 'assets/YAML/domains.yaml';
const STORAGE_KEY = 'activeDomainId';

@Injectable({ providedIn: 'root' })
export class DomainService {
  private _domains: Domain[] = [];
  private _activeDomain$ = new BehaviorSubject<Domain | null>(null);
  private _loaded = false;

  readonly activeDomain$ = this._activeDomain$.asObservable();

  constructor(private yamlService: YamlService) {}

  get domains(): Domain[] {
    return this._domains;
  }

  get activeDomain(): Domain | null {
    return this._activeDomain$.value;
  }

  async load(): Promise<Domain> {
    if (!this._loaded) {
      const config: DomainsConfig = await this.yamlService.loadYaml(DOMAINS_FILE);
      this._domains = config.domains;
      const storedId = localStorage.getItem(STORAGE_KEY);
      const initial =
        this._domains.find(d => d.id === storedId) ||
        this._domains.find(d => d.id === config.defaultDomain) ||
        this._domains[0];
      this._activeDomain$.next(initial);
      this._loaded = true;
    }
    return this._activeDomain$.value!;
  }

  switchDomain(id: string): Domain | null {
    const domain = this._domains.find(d => d.id === id);
    if (domain && domain.id !== this._activeDomain$.value?.id) {
      localStorage.setItem(STORAGE_KEY, domain.id);
      this._activeDomain$.next(domain);
      return domain;
    }
    return this._activeDomain$.value;
  }

  getMetaFilePath(): string {
    const domain = this._activeDomain$.value;
    return domain ? `assets/YAML/${domain.metaFile}` : 'assets/YAML/security/meta.yaml';
  }
}
