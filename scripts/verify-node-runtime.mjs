const [major = 0, minor = 0] = process.versions.node.split('.').map(Number);

const supported = (major === 20 && minor >= 19) || (major === 22 && minor >= 12);

if (!supported) {
  console.error(
    `[node-runtime] Node ${process.version} is unsupported for this repository's jsdom test environment. ` +
      'Use Node 20.19+ (the version in .nvmrc) or Node 22.12+.',
  );
  process.exit(1);
}

console.log(`[node-runtime] Node ${process.version} is supported.`);
