import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expectNoA11yViolations } from '../../test-helpers/a11y';
import { MtSmokeCard } from './smoke.component';

describe('MtSmokeCard (pipeline smoke test)', () => {
  let fixture: ComponentFixture<MtSmokeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MtSmokeCard],
    }).compileComponents();

    fixture = TestBed.createComponent(MtSmokeCard);
    fixture.detectChanges();
  });

  it('renders', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('Pipeline smoke test');
  });

  it('has no accessibility violations', async () => {
    await expectNoA11yViolations(fixture.nativeElement);
  });
});
