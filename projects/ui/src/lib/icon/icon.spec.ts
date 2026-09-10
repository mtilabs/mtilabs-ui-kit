import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expectNoA11yViolations } from '../../test-helpers/a11y';
import { MtIcon, MtIconSize } from './icon';

@Component({
  imports: [MtIcon],
  template: `
    <mt-icon [size]="size()" [label]="label()">
      <svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
    </mt-icon>
  `,
})
class HostComponent {
  readonly size = signal<MtIconSize>('md');
  readonly label = signal<string | null>(null);
}

describe('MtIcon', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    hostElement = fixture.nativeElement.querySelector('mt-icon');
  });

  it('projects the supplied SVG content', () => {
    expect(hostElement.querySelector('svg')).not.toBeNull();
  });

  it('is decorative (aria-hidden) by default and has no role', () => {
    expect(hostElement.getAttribute('aria-hidden')).toBe('true');
    expect(hostElement.hasAttribute('role')).toBe(false);
  });

  it('defaults to size="md"', () => {
    expect(hostElement.getAttribute('data-size')).toBe('md');
  });

  it('reflects the size input', () => {
    fixture.componentInstance.size.set('lg');
    fixture.detectChanges();

    expect(hostElement.getAttribute('data-size')).toBe('lg');
  });

  it('exposes role="img" and aria-label, and drops aria-hidden, when given a label', () => {
    fixture.componentInstance.label.set('Success');
    fixture.detectChanges();

    expect(hostElement.getAttribute('role')).toBe('img');
    expect(hostElement.getAttribute('aria-label')).toBe('Success');
    expect(hostElement.hasAttribute('aria-hidden')).toBe(false);
  });

  it('has no accessibility violations when decorative', async () => {
    await expectNoA11yViolations(fixture.nativeElement);
  });

  it('has no accessibility violations when labeled', async () => {
    fixture.componentInstance.label.set('Success');
    fixture.detectChanges();

    await expectNoA11yViolations(fixture.nativeElement);
  });
});
