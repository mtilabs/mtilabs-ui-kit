import type { Preview } from '@storybook/angular-vite';
import '../styles/index.css';
import './preview.css';

const THEME_ATTRIBUTE = 'data-theme';

function applyTheme(theme: string): void {
  const root = document.documentElement;
  if (theme === 'system') {
    root.removeAttribute(THEME_ATTRIBUTE);
  } else {
    root.setAttribute(THEME_ATTRIBUTE, theme);
  }
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // Fail CI (via the vitest addon) on accessibility violations rather than
    // only surfacing them in the Storybook UI.
    a11y: {
      test: 'error',
    },

    backgrounds: {
      disable: true,
    },
  },

  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'system', title: 'System' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: 'light',
  },

  decorators: [
    (story, context) => {
      applyTheme(context.globals['theme'] ?? 'light');
      return story();
    },
  ],
};

export default preview;
