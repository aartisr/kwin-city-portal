# API Reference

The KWIN City Portal exposes one internal API route that acts as a secure, cached proxy to the OpenCity CKAN data platform.

---

## Contents

1. [Overview](#1-overview)
2. [`GET /api/opencity`](#2-get-apiopencity)
3. [CKAN Data Source](#3-ckan-data-source)
4. [Caching Strategy](#4-caching-strategy)
5. [Error Handling](#5-error-handling)
6. [Security Considerations](#6-security-considerations)
7. [Adding a New Dataset](#7-adding-a-new-dataset)

---

## 1. Overview

**Route file:** `app/api/opencity/route.ts`  
**Method:** `GET`  
**Base URL (dev):** `http://localhost:3000/api/opencity`  
**Base URL (prod):** `https://kwin-city.com/api/opencity`

This API route:
- Accepts a `dataset` slug and optional parameters
- Discovers the correct CKAN resource ID via `package_show`
- Fetches records from `datastore_search`
- Returns the CKAN response directly to the browser
- Caches upstream fetches for **1 hour** using Next.js ISR

No authentication is required — all data is from OpenCity's publicly accessible CKAN API.

---

## 2. `GET /api/opencity`

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `dataset` | `string` | Yes | — | CKAN package/dataset slug (e.g., `bengaluru-aviation-traffic`) |
| `resource_id` | `string` | No | Auto-discovered | Specific CKAN resource UUID. If omitted, the API discovers the first `datastore_active` resource. |
| `limit` | `number` | No | `100` | Maximum records to return. Capped at `1000`. |

### Example Requests

```bash
# Get the first 100 rows of the aviation traffic dataset
GET /api/opencity?dataset=bengaluru-aviation-traffic

# Get 50 rows
GET /api/opencity?dataset=karnataka-annual-rainfall&limit=50

# Use a known resource ID directly (skips the package_show lookup)
GET /api/opencity?dataset=bengaluru-lakes&resource_id=abc123-def456-...&limit=200
```

### Successful Response

Returns the raw CKAN `datastore_search` response. The shape follows the standard CKAN API v3 format:

```json
{
  "help": "https://data.opencity.in/api/3/action/help_show?name=datastore_search",
  "success": true,
  "result": {
    "resource_id": "abc123-...",
    "fields": [
      { "id": "Year", "type": "text" },
      { "id": "Passengers", "type": "numeric" }
    ],
    "records": [
      { "Year": "2023", "Passengers": 37200000 },
      ...
    ],
    "total": 12,
    "_links": { ... }
  }
}
```

### Error Response

```json
{
  "error": "Dataset not found",
  "detail": "No datastore-active resource found for package: unknown-slug"
}
```

Status codes:
| Code | Meaning |
|------|---------|
| `200` | Success |
| `400` | Missing required `dataset` parameter |
| `404` | Dataset or resource not found in CKAN |
| `502` | Upstream OpenCity API returned an error |
| `500` | Internal server error |

---

## 3. CKAN Data Source

All data comes from **OpenCity** ([data.opencity.in](https://data.opencity.in)), which publishes open government datasets from Karnataka and Bengaluru city agencies.

### Registered Datasets

The following dataset slugs are pre-registered in `KWIN_EVIDENCE_SOURCES` and used in `DataInsightsHub`:

| Slug | Title | Publisher |
|------|-------|-----------|
| `bengaluru-aviation-traffic` | Bengaluru Aviation Traffic | AAI via OpenCity |
| `economic-survey-karnataka` | Economic Survey Karnataka 2025–26 | GoK via OpenCity |
| `strr-documents` | Satellite Town Ring Road Documents | BDA via OpenCity |
| `bda-irr-documents` | BDA Intermediate Ring Road Documents | BDA via OpenCity |
| `karnataka-annual-rainfall` | Karnataka Annual Rainfall by District | KSNDMC via OpenCity |
| `taluk-groundwater-depth` | Taluk-wise Groundwater Depth | CGWB via OpenCity |
| `bengaluru-lakes` | Bengaluru Lakes & Maintainers | BBMP via OpenCity |

### Resource Discovery

When no `resource_id` is supplied, the API calls:

```
GET https://data.opencity.in/api/3/action/package_show?id={dataset}
```

It then finds the first resource where `datastore_active === true`. If no datastore-active resource exists, it falls back to the first CSV resource.

---

## 4. Caching Strategy

All upstream `fetch()` calls use Next.js's extended fetch caching:

```ts
fetch(url, { next: { revalidate: 3600 } })
```

This means:
- Each unique URL is cached at the edge/CDN layer for **1 hour** (3600 seconds).
- Subsequent requests within that window get the cached response instantly.
- After 1 hour, the next request triggers a background revalidation.

**Implications for the Data Insights page:**
- Charts rendered on first load may be up to 1 hour stale.
- This is acceptable because all datasets are historical or slowly-updating government data.
- If you need fresh data immediately for development, do `npm run clean:next` to bust the cache.

---

## 5. Error Handling

The route never exposes raw exception messages or stack traces to the browser. All errors are caught and normalized:

```ts
// Internal structure (not exposed)
try {
  // ... fetch and process
} catch (err) {
  return NextResponse.json(
    { error: 'Internal server error', detail: 'Unable to reach OpenCity API' },
    { status: 500 }
  );
}
```

**Never** add `console.log(err)` to this route in production — it would expose upstream error messages in server logs that could hint at internal URLs.

---

## 6. Security Considerations

| Concern | Mitigation |
|---------|-----------|
| **SSRF** | The route only calls a single hardcoded base URL (`data.opencity.in`). The `dataset` param is used only as a URL path segment after URL-encoding, and the base domain is never user-controlled. |
| **Parameter injection** | `dataset` and `resource_id` are passed as query string values to the upstream API, never interpolated into shell commands or SQL. |
| **Response size** | `limit` is server-side capped at 1000 to prevent very large responses from causing memory pressure. |
| **Content-Type spoofing** | `X-Content-Type-Options: nosniff` is set globally in `next.config.js`. |
| **Framing** | `X-Frame-Options: DENY` is set globally — prevents clickjacking. |
| **Credentials** | No API keys or authentication tokens are required or used. All OpenCity endpoints are public. |

---

## 7. Adding a New Dataset

1. **Find the dataset slug on OpenCity.**  
   Navigate to [data.opencity.in](https://data.opencity.in), find the dataset, and copy the slug from the URL (the last path segment).

2. **Add it to `KWIN_EVIDENCE_SOURCES` in `app/data/constants.ts`.**  
   Fill in all fields: `id`, `title`, `publisher`, `scope`, `url`, `status`, `summary`, `supports`, `cannotProve`.

3. **Add it to `KWIN_SOURCE_REGISTRY`.**  
   Assign the next sequential label (e.g., `S10`), set the `status`, and add a brief `note`.

4. **Add it to the relevant source group constant.**  
   e.g., if it supports a sustainability claim, add its key to `SUSTAINABILITY_SOURCE_IDS`.

5. **Test the API route locally.**
   ```bash
   curl 'http://localhost:3000/api/opencity?dataset=your-new-slug&limit=5'
   ```
   Verify the response shape matches the Recharts data expectations in `DataInsightsHub`.

6. **Add a `ClaimMapping` entry** for each new claim supported by this dataset.
