# Data and API

The public read-only API provides portal research context:

- `GET https://kwin-city.com/api/health`
- `GET https://kwin-city.com/api/masterplan`
- `GET https://kwin-city.com/api/valuation?district=<name>`
- `GET https://kwin-city.com/api/regulatory`

Read the [OpenAPI specification](https://kwin-city.com/openapi.json) and [machine-readable research guide](https://kwin-city.com/llms-full.txt).

These endpoints are not authoritative government records, title opinions, investment advice, or permission services.

## API operating expectations

The endpoints are read-only and intended for lightweight research integration. Consumers should cache responsibly, present the independent-research notice alongside consequential outputs, and avoid using API responses as a substitute for direct authority verification.

## Versioning and change control

The OpenAPI document is the interface contract. Breaking changes should increment the API version, document migration expectations, and retain a clear explanation of how a changed field affects research interpretation.
