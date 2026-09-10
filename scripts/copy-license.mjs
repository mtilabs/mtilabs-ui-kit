// ng-packagr refuses to read assets from outside the project root, so the
// canonical root LICENSE gets mirrored into projects/ui/ before each build.
// Don't edit projects/ui/LICENSE directly — it's regenerated and gitignored.
import { copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));

copyFileSync(join(repoRoot, 'LICENSE'), join(repoRoot, 'projects/ui/LICENSE'));
