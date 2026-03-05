---
title: Validator Installation
description: How to install the SpecForge validator via npm, npx, or as a programmatic dependency.
---

The SpecForge validator (`@specforge/validator`) checks that your `.sf.json`, `.sf.yaml`, and `.sf.toon` files conform to the SpecForge Format schema. It validates structure, required fields, enum values, dependency graph integrity, and cross-references.

## Global Installation

Install globally to use the `specforge-validator` command anywhere:

```bash
npm install -g @specforge/validator
```

Verify the installation:

```bash
specforge-validator --version
```

## Using npx (No Installation)

Run the validator without installing it:

```bash
npx @specforge/validator validate my-project.sf.json
```

This downloads the latest version on each run. Suitable for one-off validation or CI environments where you want to always use the latest version.

## Local Project Dependency

Add it as a dev dependency to your project:

```bash
npm install --save-dev @specforge/validator
```

Then add a script to your `package.json`:

```json
{
  "scripts": {
    "validate:spec": "specforge-validator validate ./spec/project.sf.json"
  }
}
```

Run it with:

```bash
npm run validate:spec
```

## Programmatic Usage

Import the validator in your Node.js code for custom validation workflows:

```javascript
const { validate } = require('@specforge/validator');

const result = validate('./my-project.sf.json');

if (result.valid) {
  console.log('Specification is valid.');
} else {
  console.error('Validation errors:');
  result.errors.forEach(err => {
    console.error(`  ${err.path}: ${err.message}`);
  });
}
```

Or with ES modules:

```javascript
import { validate, convert } from '@specforge/validator';

const result = await validate('./my-project.sf.yaml');

if (!result.valid) {
  process.exit(1);
}
```

## Requirements

- **Node.js** 18 or later
- **npm** 9 or later (or any compatible package manager: yarn, pnpm)

## CI/CD Integration

Add validation to your CI pipeline to catch schema errors before they reach production. Example GitHub Actions step:

```yaml
- name: Validate SpecForge spec
  run: npx @specforge/validator validate ./spec/project.sf.json
```

The validator exits with code 0 on success and code 1 on failure, making it compatible with any CI system that checks exit codes.
