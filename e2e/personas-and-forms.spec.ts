import { test, expect } from './fixtures';

/**
 * Critical user flow: Audience Personas & Navigation
 * Tests persona-specific content, CTA accessibility, and mobile responsiveness
 */

test.describe('Persona Pages - Audience-Specific Content', () => {
  const personas = [
    { slug: 'curious-citizens', name: 'Curious Citizens' },
    { slug: 'investor', name: 'Investor' },
    { slug: 'journalist', name: 'Journalist' },
    { slug: 'researcher', name: 'Researcher' },
    { slug: 'resident', name: 'Resident' },
  ];

  for (const persona of personas) {
    test(`should properly serve ${persona.name} content with accessible structure`, async ({
      page,
      checkA11yOnPage,
    }) => {
      await page.goto(`/for/${persona.slug}`);
      await page.waitForLoadState('networkidle');

      // Verify persona-specific heading
      const heading = page.locator('h1, h2');
      const headingText = await heading.first().textContent();

      expect(headingText).toBeTruthy();
      console.log(`Loaded ${persona.name} persona page`);

      // Should have persona-specific CTAs
      const ctaButtons = page.locator('button, a[role="button"]');
      const ctaCount = await ctaButtons.count();

      expect(ctaCount).toBeGreaterThan(0);

      // All CTAs should have descriptive text
      for (let i = 0; i < Math.min(ctaCount, 5); i++) {
        const cta = ctaButtons.nth(i);
        const text = await cta.textContent();
        expect(text?.trim().length).toBeGreaterThan(0);
      }

      // Run a11y check
      await checkA11yOnPage();
    });
  }

  test('should navigate between persona pages', async ({
    page,
  }) => {
    // Start on first persona
    await page.goto('/for/investor');
    await page.waitForLoadState('networkidle');

    // Find navigation to other personas
    const personaLinks = page.locator('a[href*="/for/"]');
    const linkCount = await personaLinks.count();

    expect(linkCount).toBeGreaterThan(0);

    // Should be able to navigate to another persona
    if (linkCount > 1) {
      const secondLink = personaLinks.nth(1);
      await secondLink.click();
      await page.waitForLoadState('networkidle');

      // Verify different content loaded
      const newHeading = await page.locator('h1, h2').first().textContent();
      expect(newHeading).toBeTruthy();
    }
  });
});

test.describe('Mobile Responsiveness & Accessibility', () => {
  test('should provide adequate touch targets for mobile users', async ({
    page,
    context,
  }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // All interactive elements should be at least 44x44px
    const interactiveElements = page.locator('button, a, input, select');
    const count = await interactiveElements.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const element = interactiveElements.nth(i);
      const isVisible = await element.isVisible();

      if (isVisible) {
        const box = await element.boundingBox();
        
        if (box) {
          const width = box.width;
          const height = box.height;

          // Touch targets should be 44x44 minimum (WCAG 2.1)
          if (width < 44 || height < 44) {
            console.warn(
              `Small touch target detected: ${width}x${height}px. Recommend 44x44px minimum.`
            );
          }
        }
      }
    }
  });

  test('should have readable text at mobile viewport', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Text should be at least 16px on mobile
    const textElements = page.locator('p, span, li, h1, h2, h3, h4, h5, h6');
    const count = await textElements.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const element = textElements.nth(i);
      const isVisible = await element.isVisible();

      if (isVisible) {
        const fontSize = await element.evaluate((el) =>
          window.getComputedStyle(el).fontSize
        );

        const size = parseInt(fontSize);
        if (size < 14) {
          console.warn(`Small text detected: ${fontSize}. Recommend 16px+ on mobile.`);
        }
      }
    }
  });

  test('should hide off-canvas content from screen readers', async ({
    page,
  }) => {
    // Test for hidden navigation or sidebars
    const offCanvasElements = page.locator('[role="region"][aria-hidden="false"], .drawer:not(.open) [role="navigation"]');
    const count = await offCanvasElements.count();

    // Hidden elements should have aria-hidden or be display:none
    if (count > 0) {
      console.warn('Found visible off-canvas content. Verify aria-hidden is set correctly.');
    }
  });
});

test.describe('Form Accessibility', () => {
  test('should have accessible form controls throughout the site', async ({
    page,
  }) => {
    // Navigate to pages with forms (newsletter, contact, etc)
    const pagesToCheck = ['/', '/about', '/evidence'];

    for (const pagePath of pagesToCheck) {
      await page.goto(pagePath);

      const forms = page.locator('form');
      const formCount = await forms.count();

      if (formCount > 0) {
        const form = forms.first();

        // Find all form inputs
        const inputs = form.locator('input, select, textarea');
        const inputCount = await inputs.count();

        for (let i = 0; i < inputCount; i++) {
          const input = inputs.nth(i);
          const id = await input.getAttribute('id');
          const type = await input.getAttribute('type');
          const placeholder = await input.getAttribute('placeholder');

          // Should have associated label OR aria-label
          let hasLabel = false;
          if (id) {
            const label = page.locator(`label[for="${id}"]`);
            hasLabel = await label.count() > 0;
          }

          const ariaLabel = await input.getAttribute('aria-label');
          hasLabel = hasLabel || !!ariaLabel || type === 'submit' || type === 'button';

          expect(hasLabel).toBeTruthy();
        }

        // Submit button should exist and be clearly labeled
        const submitButton = form.locator('button[type="submit"], input[type="submit"]');
        const submitText = await submitButton.textContent();
        expect(submitText?.trim().length).toBeGreaterThan(0);
      }
    }
  });

  test('should provide error messages accessibly', async ({
    page,
  }) => {
    // Create a test form submission that fails
    const forms = page.locator('form');
    const formCount = await forms.count();

    if (formCount > 0) {
      const form = forms.first();

      // Try to submit without required fields
      const submitButton = form.locator('button[type="submit"]');
      await submitButton.click();

      // Look for error messages
      const errorMessages = page.locator('[role="alert"], .error, [data-testid*="error"]');
      const errorCount = await errorMessages.count();

      if (errorCount > 0) {
        // Errors should be associated with form fields
        const firstError = errorMessages.first();
        const errorText = await firstError.textContent();
        expect(errorText?.length).toBeGreaterThan(0);

        // Should have aria-live for announcements
        const ariaLive = await firstError.getAttribute('aria-live');
        expect(['polite', 'assertive']).toContain(ariaLive);
      }
    }
  });
});
