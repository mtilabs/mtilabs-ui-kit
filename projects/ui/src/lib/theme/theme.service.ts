import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';

/**
 * 'system' defers to the OS/browser's prefers-color-scheme via CSS alone
 * (no [data-theme] attribute is written); 'light'/'dark' force a theme
 * regardless of OS preference.
 */
export type MtTheme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'mtilabs-ui-theme';

/**
 * Runtime theme switching for @mtilabs/ui. Writes/removes a [data-theme]
 * attribute on the document root, which the token stylesheets
 * (styles/tokens/colors.dark.css, shadow.dark.css) key off of. Consumers
 * that never call setTheme() get the 'system' behavior for free purely
 * through CSS — this service is only needed for an in-app theme toggle.
 */
@Injectable({ providedIn: 'root' })
export class MtThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly themeSignal = signal<MtTheme>(this.readInitialTheme());

  /** The theme the consumer has explicitly requested. */
  readonly theme = this.themeSignal.asReadonly();

  constructor() {
    effect(() => this.applyTheme(this.themeSignal()));
  }

  setTheme(theme: MtTheme): void {
    this.themeSignal.set(theme);
    if (!this.isBrowser) {
      return;
    }
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable (private browsing, disabled cookies) — the
      // theme still applies for the current session via the signal/effect.
    }
  }

  private readInitialTheme(): MtTheme {
    if (!this.isBrowser) {
      return 'system';
    }
    try {
      const stored = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
      }
    } catch {
      // Ignore and fall through to the 'system' default.
    }
    return 'system';
  }

  private applyTheme(theme: MtTheme): void {
    if (!this.isBrowser) {
      return;
    }
    const root = this.document.documentElement;
    if (theme === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
  }
}
