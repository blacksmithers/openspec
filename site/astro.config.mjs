import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://schema.specforge.tech',
  integrations: [
    starlight({
      title: 'SpecForge Format',
      description: 'The open specification format for AI agent orchestration.',
      social: {
        github: 'https://github.com/solutionsforge/specforge-schema',
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Overview', slug: 'index' },
            { label: 'Quickstart', slug: 'spec/overview' },
          ],
        },
        {
          label: 'Format Reference',
          items: [
            { label: 'Project', slug: 'spec/project' },
            { label: 'Specification', slug: 'spec/specification' },
            { label: 'Epic', slug: 'spec/epic' },
            { label: 'Ticket', slug: 'spec/ticket' },
            { label: 'Blueprint', slug: 'spec/blueprint' },
            { label: 'Dependencies', slug: 'spec/dependencies' },
            { label: 'Patterns', slug: 'spec/patterns' },
            { label: 'Versioning', slug: 'spec/versioning' },
          ],
        },
        {
          label: 'File Formats',
          items: [
            { label: 'JSON (.sf.json)', slug: 'formats/json' },
            { label: 'YAML (.sf.yaml)', slug: 'formats/yaml' },
            { label: 'TOON (.sf.toon)', slug: 'formats/toon' },
          ],
        },
        {
          label: 'Validator',
          items: [
            { label: 'Installation', slug: 'validator/installation' },
            { label: 'Usage', slug: 'validator/usage' },
          ],
        },
        { label: 'Changelog', slug: 'changelog' },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
  ],
});
