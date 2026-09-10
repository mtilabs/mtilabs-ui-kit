import axe, { type ImpactValue, type Result } from 'axe-core';

/**
 * Shared accessibility assertion for component specs. Runs axe-core against
 * a rendered fixture element and fails with a readable summary of every
 * violation (rule, impact, and the offending selector) rather than axe's raw
 * JSON dump.
 *
 * Usage in a component spec:
 *
 *   const fixture = TestBed.createComponent(MtButton);
 *   fixture.detectChanges();
 *   await expectNoA11yViolations(fixture.nativeElement);
 */
export async function expectNoA11yViolations(element: Element): Promise<void> {
  const results = await axe.run(element);

  if (results.violations.length > 0) {
    throw new Error(formatViolations(results.violations));
  }
}

function formatViolations(violations: Result[]): string {
  const lines = violations.map((violation) => {
    const targets = violation.nodes.map((node) => node.target.join(' ')).join(', ');
    const impact: ImpactValue | null = violation.impact ?? null;
    return `- [${impact ?? 'unknown'}] ${violation.id}: ${violation.help} (${targets})\n  ${violation.helpUrl}`;
  });

  return `Found ${violations.length} accessibility violation(s):\n${lines.join('\n')}`;
}
