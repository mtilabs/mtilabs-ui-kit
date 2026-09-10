import { TestBed } from '@angular/core/testing';
import { MtThemeService } from './theme.service';

describe('MtThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    TestBed.configureTestingModule({});
  });

  it('defaults to "system" and writes no [data-theme] attribute', () => {
    const service = TestBed.inject(MtThemeService);
    TestBed.tick();

    expect(service.theme()).toBe('system');
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });

  it('setTheme("dark") sets [data-theme="dark"] on the document root', () => {
    const service = TestBed.inject(MtThemeService);

    service.setTheme('dark');
    TestBed.tick();

    expect(service.theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('setTheme("light") sets [data-theme="light"] on the document root', () => {
    const service = TestBed.inject(MtThemeService);

    service.setTheme('light');
    TestBed.tick();

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('setTheme("system") removes the [data-theme] attribute again', () => {
    const service = TestBed.inject(MtThemeService);

    service.setTheme('dark');
    TestBed.tick();
    service.setTheme('system');
    TestBed.tick();

    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });

  it('persists the chosen theme to localStorage', () => {
    const service = TestBed.inject(MtThemeService);

    service.setTheme('dark');

    expect(localStorage.getItem('mtilabs-ui-theme')).toBe('dark');
  });

  it('restores a previously persisted theme on next construction', () => {
    localStorage.setItem('mtilabs-ui-theme', 'dark');

    const service = TestBed.inject(MtThemeService);
    TestBed.tick();

    expect(service.theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('ignores a garbage-collected/invalid stored value and falls back to "system"', () => {
    localStorage.setItem('mtilabs-ui-theme', 'not-a-real-theme');

    const service = TestBed.inject(MtThemeService);

    expect(service.theme()).toBe('system');
  });
});
