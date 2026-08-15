export const SOURCE_HOST_POLICIES = Object.freeze({
  'news.google.com': 'discovery',
  'www.bing.com': 'discovery',
  'rbi.org.in': 'directInstitutional',
  'www.thehindu.com': 'directPublisher',
  'timesofindia.indiatimes.com': 'directPublisher',
});

export const OFFICIAL_QUERY_DOMAINS = Object.freeze([
  'investkarnataka.co.in',
  'kiadb.karnataka.gov.in',
  'kla.kar.nic.in',
  'karnataka.gov.in',
  'industry.karnataka.gov.in',
  'kppp.karnataka.gov.in',
  'bengalururural.nic.in',
]);

function extractFeedUrls(xml) {
  if (typeof xml !== 'string') throw new Error('The source registry must be XML text.');
  return [...xml.matchAll(/\bxmlUrl\s*=\s*"([^"]+)"/g)].map((match) =>
    match[1].replaceAll('&amp;', '&'),
  );
}

function parseTrustedUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`Invalid source URL blocked: ${value}`);
  }
  if (url.protocol !== 'https:') throw new Error(`Non-HTTPS source blocked: ${value}`);
  if (url.username || url.password) throw new Error(`Credential-bearing source URL blocked: ${value}`);
  if (url.port && url.port !== '443') throw new Error(`Non-standard source port blocked: ${value}`);
  if (url.hash) throw new Error(`Fragment-bearing source URL blocked: ${value}`);
  return url;
}

function isOfficialDiscovery(url, policy) {
  if (policy !== 'discovery') return false;
  const query = (url.searchParams.get('q') ?? '').toLowerCase();
  return OFFICIAL_QUERY_DOMAINS.some((domain) => {
    const escaped = domain.replaceAll('.', '\\.');
    return new RegExp(`(?:^|\\s|\\()site:${escaped}(?:$|\\s|\\))`, 'i').test(query);
  });
}

export function verifySourceRegistry(xml) {
  const values = extractFeedUrls(xml);
  if (!values.length) throw new Error('The source registry contains no feeds.');

  const seen = new Set();
  const unknownHosts = new Set();
  const duplicateUrls = new Set();
  const inventory = { directInstitutional: 0, directPublisher: 0, officialDiscovery: 0, discovery: 0 };

  for (const value of values) {
    const url = parseTrustedUrl(value);
    const hostname = url.hostname.toLowerCase();
    const policy = SOURCE_HOST_POLICIES[hostname];
    if (!policy) unknownHosts.add(hostname);

    const canonical = url.toString();
    if (seen.has(canonical)) duplicateUrls.add(canonical);
    seen.add(canonical);

    if (isOfficialDiscovery(url, policy)) inventory.officialDiscovery += 1;
    else if (policy) inventory[policy] += 1;
  }

  if (unknownHosts.size) throw new Error(`Unreviewed source hosts: ${[...unknownHosts].sort().join(', ')}`);
  if (duplicateUrls.size) throw new Error(`Duplicate source URLs: ${[...duplicateUrls].sort().join(', ')}`);
  if (!inventory.directInstitutional && !inventory.officialDiscovery) {
    throw new Error('At least one direct or source-filtered institutional signal is required.');
  }

  return {
    status: 'healthy',
    sourceCount: values.length,
    inventory,
    policy: 'Discovery feeds are monitoring signals only; direct sources retain provenance priority.',
  };
}
