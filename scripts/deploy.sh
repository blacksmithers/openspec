#!/bin/bash
set -euo pipefail

# Cloudflare Pages deployment is handled via CI/CD.
# This script builds the site locally for preview.

echo "Building site..."
cd "$(dirname "$0")/../site"
npm run build

echo "Build complete. Output in site/dist/"
echo "Deploy to Cloudflare Pages via git push to main."
echo "Site will be live at https://schema.specforge.tech"
