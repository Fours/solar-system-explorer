# Deploying

The site is a static build (`dist/`) hosted on **S3 behind CloudFront**:

- **Bucket:** `kylewillett.com`, objects under the `solar-system/` prefix
  (`s3://kylewillett.com/solar-system/`)
- **Region:** `us-east-1`
- **Served at a subdomain root** (e.g. `solar-system.kylewillett.com`). CloudFront's
  **Origin Path** is set to `/solar-system`, so the app sees itself at `/` —
  that's why Vite's `base` stays the default `/` and no path rewriting is needed.
- Bucket stays **private**; CloudFront reads it via an **Origin Access Control (OAC)**.

## One-time setup

1. **Install & configure the AWS CLI** with credentials that can deploy:
   ```bash
   aws configure
   ```
   The credentials need `s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket` on the
   bucket, and `cloudfront:CreateInvalidation` on the distribution. A least-privilege
   policy is in [`deploy/iam-policy.json`](deploy/iam-policy.json) — see
   [IAM permissions](#iam-permissions) below.

2. **Provide your CloudFront distribution ID.** Copy the example config and fill it in
   (the real file is gitignored, so the ID never gets committed):
   ```bash
   cp scripts/deploy.config.local.example scripts/deploy.config.local
   # edit scripts/deploy.config.local and set CLOUDFRONT_DISTRIBUTION_ID
   ```
   Or export it in your shell instead:
   ```bash
   export CLOUDFRONT_DISTRIBUTION_ID=EXXXXXXXXXXXXX
   ```

## Deploy

```bash
npm run deploy
```

That runs [`scripts/deploy.sh`](scripts/deploy.sh), which:

1. **Builds** the site (`npm run build` → `dist/`).
2. **Syncs `dist/assets/`** (Vite's content-hashed bundles) with a 1-year immutable
   cache; `--delete` prunes old bundles.
3. **Syncs the rest of `dist/`** (files copied from `public/`, like `planets/*.png`)
   with a 1-day cache, since those filenames aren't hashed.
4. **Uploads `index.html`** with `Cache-Control: no-cache` so new deploys are picked
   up immediately.
5. **Invalidates CloudFront** (`/*`) so edge caches serve the new files.

## Config overrides

The script reads these from the environment or `scripts/deploy.config.local`:

| Variable | Default | Purpose |
| --- | --- | --- |
| `CLOUDFRONT_DISTRIBUTION_ID` | *(required)* | Distribution to invalidate |
| `DEPLOY_BUCKET` | `kylewillett.com` | Target bucket |
| `DEPLOY_PREFIX` | `solar-system` | Key prefix within the bucket |
| `DEPLOY_REGION` | `us-east-1` | Bucket region |

## IAM permissions

Give the deploying identity only what the script needs. For a human deploying from
a laptop, **IAM Identity Center (SSO)** is preferred; a dedicated, tightly scoped IAM
user with rotated keys also works.

- `s3:ListBucket` on `kylewillett.com`, limited to the `solar-system/` prefix
- `s3:PutObject` / `s3:DeleteObject` under `solar-system/*`
- `cloudfront:CreateInvalidation` on the one distribution

If `s3 sync` ever reports a permission error, add `s3:GetObject` on
`arn:aws:s3:::kylewillett.com/solar-system/*`.

**Tip:** use a named profile, e.g. `aws configure --profile solar-deploy`, then
`AWS_PROFILE=solar-deploy npm run deploy`.

## Notes

- **If you serve the site under a URL path** (e.g. `kylewillett.com/solar-system/`
  instead of a subdomain root), set `base: '/solar-system/'` in
  `vite.config.ts` and rebuild — otherwise assets will 404.
