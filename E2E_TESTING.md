# E2E Testing & Accessibility Guide

## Running E2E Tests

### Interactive mode (UI)
```bash
npm run e2e:ui
```

### Headless (CI/CD)
```bash
npm run e2e
```

### Debug mode
```bash
npm run e2e:debug
```

### Run specific test file
```bash
npm run e2e -- e2e/homepage.spec.ts
```

### Run tests matching pattern
```bash
npm run e2e -- --grep "accessibility"
```

## Accessibility Auditing

### Run a11y audit with HTML report
```bash
npm run a11y:audit
```

### Generate accessibility report
```bash
npm run a11y:report
```

## Test Structure

- **e2e/fixtures.ts** - Custom test fixtures with a11y support
- **e2e/utils.ts** - Reusable utilities (keyboard nav, contrast checking, etc.)
- **e2e/homepage.spec.ts** - Navigation & basic accessibility 
- **e2e/data-insights.spec.ts** - Charts, visualizations, interactivity
- **e2e/evidence.spec.ts** - Search, filtering, source attribution
- **e2e/personas-and-forms.spec.ts** - Audience pages, forms, mobile responsiveness
- **e2e/performance-wcag.spec.ts** - Performance, WCAG 2.1 compliance

## Key Test Coverage

### Accessibility (WCAG 2.1 AA)
- ✅ Keyboard navigation and focus management
- ✅ Screen reader compatibility (semantic HTML, ARIA)
- ✅ Color contrast ratios (4.5:1 minimum)
- ✅ Form label associations
- ✅ Image alt text
- ✅ Heading hierarchy (h1, h2, h3...)
- ✅ Interactive element touch targets (44x44px minimum)
- ✅ Mobile responsive text sizing

### Functional
- ✅ Page navigation flows
- ✅ Data filtering and search
- ✅ Form submissions and error handling
- ✅ External link handling (target="_blank", rel="noopener")
- ✅ Dynamic content updates

### Performance
- ✅ Page load time < 5s
- ✅ Cumulative Layout Shift (CLS)
- ✅ Core Web Vitals (LCP, FID/INP)
- ✅ Resource loading fallbacks

## Continuous Integration

Tests run on:
- Chromium (desktop)
- Firefox (desktop)
- WebKit/Safari (desktop)
- Chrome mobile (Android 375x667)
- Safari mobile (iPhone 12)

Reports available in:
- `test-results/index.html` - Full HTML report
- `test-results/results.json` - JSON results for CI parsing
- `test-results/junit.xml` - JUnit format for CI systems

## Quick Fixes

Common accessibility issues and fixes:

### Missing form labels
```tsx
// ❌ Bad
<input type="email" placeholder="Email" />

// ✅ Good
<label htmlFor="email">Email:</label>
<input id="email" type="email" placeholder="Email" />
```

### Missing alt text
```tsx
// ❌ Bad
<img src="chart.png" />

// ✅ Good
<img src="chart.png" alt="Growth chart showing 25% increase in Q3" />
```

### Non-semantic buttons
```tsx
// ❌ Bad
<div onClick={handleClick} role="button">Click me</div>

// ✅ Good
<button onClick={handleClick}>Click me</button>
```

### Poor color contrast
```tsx
// ❌ Bad - gray #999 on white background (2.5:1 contrast)
<span style={{ color: '#999' }}>Low contrast text</span>

// ✅ Good - gray #666 on white background (5.5:1 contrast)
<span style={{ color: '#666' }}>Better contrast text</span>
```

### Missing focus indicators
```css
/* ✅ Good */
button:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* ✅ Also good with box-shadow */
button:focus {
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.5);
}
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Axe DevTools](https://www.deque.com/axe/devtools/)
- [Playwright API](https://playwright.dev/docs/api/class-page)
- [WebAIM - Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [MDN - ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)

## Next Steps

1. ✅ Run initial test suite: `npm run e2e`
2. ✅ Check a11y report: `npm run a11y:audit`
3. ⏳ Fix identified issues (see "Quick Fixes" above)
4. ⏳ Enable tests in CI/CD pipeline
5. ⏳ Establish baseline metrics for performance
