# Accessibility Fixes - Phase 2

## Identified Issues & Fixes

### 1. Header Navigation - Dropdown ARIA attributes
**Issue**: Dropdown menus lack aria-expanded, aria-haspopup attributes  
**Impact**: Screen reader users don't know menu state
**Fix**: Add ARIA attributes to menu buttons

### 2. Focus Management
**Issue**: No visible focus indicator on interactive elements
**Impact**: Keyboard users can't see where focus is
**Fix**: Add focus styles with outline or box-shadow

### 3. Form Labels
**Issue**: Some form inputs may not have associated labels
**Impact**: Screen reader users can't find form field purposes
**Fix**: Ensure all inputs have `<label>` with `htmlFor` attribute

### 4. Image Alt Text
**Issue**: Icon SVGs and images may lack alt text
**Impact**: Screen reader users miss context
**Fix**: Add aria-label to SVGs, alt to img elements

### 5. Semantic HTML
**Issue**: Custom styled buttons used instead of native elements
**Impact**: Reduced keyboard support and screen reader reliability
**Fix**: Use native elements where possible

### 6. Color Contrast
**Issue**: Some text colors may have insufficient contrast
**Impact**: Low vision users can't read content
**Fix**: Verify 4.5:1 contrast ratio for normal text

### 7. Keyboard Navigation
**Issue**: Some components may not be keyboard accessible
**Impact**: Keyboard-only users can't access features
**Fix**: Ensure all interactive elements are focusable and keyboard operable

### 8. Skip to Content Link
**Issue**: No skip link to main content
**Impact**: Keyboard users must tab through navigation
**Fix**: Add hidden skip link at start of page

## Priority Fixes

### High Priority (Critical)
- [ ] Add aria-expanded/aria-haspopup to menu buttons
- [ ] Add aria-label to icon-only buttons
- [ ] Ensure form labels are associated with inputs
- [ ] Add focus styles to interactive elements

### Medium Priority (Important)
- [ ] Add skip link component
- [ ] Verify color contrast on text
- [ ] Test keyboard navigation
- [ ] Add ARIA roles to custom components

### Low Priority (Nice to have)
- [ ] Optimize heading hierarchy
- [ ] Add ARIA live regions for dynamic content
- [ ] Enhance error messages with aria-live

## Testing Checklist

- [ ] Run Playwright tests: `npm run e2e`
- [ ] Check axe scan: `npm run a11y:audit`
- [ ] Test keyboard navigation (Tab, Shift+Tab, Enter, Escape)
- [ ] Test with screen reader (VoiceOver, NVDA, JAWS)
- [ ] Check focus indicators are visible
- [ ] Verify form submissions work with keyboard only
- [ ] Test on mobile (touch targets, responsiveness)
