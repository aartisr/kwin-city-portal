#!/usr/bin/env bash
set -euo pipefail

# One-command Android release tag helper.
# Usage: yarn release:android 1.2.3

VERSION="${1:-}"
if [[ -z "$VERSION" ]]; then
  echo "Usage: yarn release:android <version>"
  echo "Example: yarn release:android 1.2.3"
  exit 1
fi

if [[ ! "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Version must be semver like 1.2.3"
  exit 1
fi

TAG="v$VERSION"

git fetch --tags --quiet

if git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "Tag $TAG already exists."
  exit 1
fi

echo "Creating tag $TAG..."
git tag "$TAG"

echo "Pushing $TAG..."
git push origin "$TAG"

echo "Done. GitHub Actions will build signed APK/AAB and create a release for $TAG."
