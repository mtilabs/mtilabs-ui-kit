import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expectNoA11yViolations } from '../../test-helpers/a11y';
import { MtButton, MtButtonSize, MtButtonType, MtButtonVariant } from './button';

@Component({
  imports: [MtButton],
  template: `
    <mt-button
      [variant]="variant()"
      [size]="size()"
      [disabled]="disabled()"
      [loading]="loading()"
      [type]="type()"
      (click)="clicks = clicks + 1"
    >
      Save
    </mt-button>
  `,
})
class HostComponent {
  readonly variant = signal<MtButtonVariant>('primary');
  readonly size = signal<MtButtonSize>('md');
  readonly disabled = signal(false);
  readonly loading = signal(false);
  readonly type = signal<MtButtonType>('button');
  clicks = 0;
}

describe('MtButton', () => {
  let fixture: ComponentFixture<HostComponent>;
  let nativeButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    nativeButton = fixture.nativeElement.querySelector('button');
  });

  it('renders projected content', () => {
    expect(nativeButton.textContent?.trim()).toBe('Save');
  });

  it('defaults to variant="primary", size="md", type="button"', () => {
    expect(nativeButton.className).toContain('button--primary');
    expect(nativeButton.className).toContain('button--md');
    expect(nativeButton.type).toBe('button');
  });

  it('applies the requested variant and size classes', () => {
    fixture.componentInstance.variant.set('destructive');
    fixture.componentInstance.size.set('lg');
    fixture.detectChanges();

    expect(nativeButton.className).toContain('button--destructive');
    expect(nativeButton.className).toContain('button--lg');
  });

  it('reflects the type input onto the native button', () => {
    fixture.componentInstance.type.set('submit');
    fixture.detectChanges();

    expect(nativeButton.type).toBe('submit');
  });

  it('disables the native button and blocks clicks when disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    expect(nativeButton.disabled).toBe(true);

    nativeButton.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.clicks).toBe(0);
  });

  it('disables the button, sets aria-busy, and shows a spinner while loading', () => {
    fixture.componentInstance.loading.set(true);
    fixture.detectChanges();

    expect(nativeButton.disabled).toBe(true);
    expect(nativeButton.getAttribute('aria-busy')).toBe('true');
    expect(nativeButton.querySelector('.spinner')).not.toBeNull();

    nativeButton.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.clicks).toBe(0);
  });

  it('emits a click when enabled', () => {
    nativeButton.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.clicks).toBe(1);
  });

  it('has no accessibility violations', async () => {
    await expectNoA11yViolations(fixture.nativeElement);
  });

  it('has no accessibility violations while disabled', async () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    await expectNoA11yViolations(fixture.nativeElement);
  });
});
