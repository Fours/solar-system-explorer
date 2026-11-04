#!/usr/bin/env bash
#
# Build the site and deploy it to S3 + invalidate CloudFront.
#
# Hosting model: private S3 bucket behind CloudFront (OAC). The site is served
# at a subdomain root; CloudFront's Origin Path points at the
# "solar-system" prefix, so Vite's base stays "/" and no path
# rewriting is needed in the app.
#
# Config can be overridden with environment variables, or by creating a
# gitignored scripts/deploy.config.local (see DEPLOY.md). At minimum you must
# provide CLOUDFRONT_DISTRIBUTION_ID.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# Load gitignored local overrides (e.g. CLOUDFRONT_DISTRIBUTION_ID) if present.
if [ -f "$SCRIPT_DIR/deploy.config.local" ]; then
  # shellcheck disable=SC1091
  source "$SCRIPT_DIR/deploy.config.local"
fi

# ---- Config (env / config-file overrides win) ------------------------------
BUCKET="${DEPLOY_BUCKET:-kylewillett.com}"
PREFIX="${DEPLOY_PREFIX:-solar-system}"
REGION="${DEPLOY_REGION:-us-east-1}"

# ---- Preconditions ---------------------------------------------------------
command -v aws >/dev/null 2>&1 || {
  echo "error: aws CLI not found. Install and configure it (aws configure)." >&2
  exit 1
}

: "${CLOUDFRONT_DISTRIBUTION_ID:?Set CLOUDFRONT_DISTRIBUTION_ID (env var or scripts/deploy.config.local)}"

DEST="s3://${BUCKET}/${PREFIX}"

cd "$ROOT_DIR"

# ---- Build -----------------------------------------------------------------
echo "==> Building (npm run build)..."
npm run build

# ---- Upload ----------------------------------------------------------------
# 1) Vite's bundled assets (dist/assets/): content-hashed filenames, so they
#    can be cached forever. --delete prunes old bundles.
echo "==> Syncing hashed assets to ${DEST}/assets/ (immutable, 1y cache)..."
aws s3 sync dist/assets/ "${DEST}/assets/" \
  --exclude "*.DS_Store" \
  --region "$REGION" \
  --delete \
  --cache-control "public, max-age=31536000, immutable"

# 2) Files copied from public/ (e.g. planets/*.png): names are NOT hashed, so
#    use a moderate cache. CloudFront is invalidated below, so edges refresh
#    immediately; browsers pick up changes within a day.
echo "==> Syncing public files to ${DEST}/ (1d cache)..."
aws s3 sync dist/ "${DEST}/" \
  --region "$REGION" \
  --delete \
  --exclude "assets/*" \
  --exclude "index.html" \
  --exclude "*.DS_Store" \
  --cache-control "public, max-age=86400"

# 3) index.html: no caching, so a new deploy is picked up immediately.
echo "==> Uploading index.html (no-cache)..."
aws s3 cp dist/index.html "${DEST}/index.html" \
  --region "$REGION" \
  --cache-control "no-cache" \
  --content-type "text/html"

# ---- Invalidate CloudFront -------------------------------------------------
# Viewers hit the subdomain root, so the viewer-facing paths are "/*".
echo "==> Invalidating CloudFront (${CLOUDFRONT_DISTRIBUTION_ID})..."
aws cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
  --paths "/*" \
  --query 'Invalidation.{Id:Id,Status:Status}' \
  --output table

echo "==> Done. New version will be live once the invalidation completes (usually <1 min)."
