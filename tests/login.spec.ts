import { test, expect } from '@playwright/test';

test('Login to OrangeHRM and verify dashboard', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  // Enter username
  const usernameInput = page.locator('input[name="username"]');
  await usernameInput.fill('Admin');

  // Enter password
  const passwordInput = page.locator('input[name="password"]');
  await passwordInput.fill('admin123');

  // Click the login button
  const loginButton = page.locator('button[type="submit"]');
  await loginButton.click();

  // Wait for navigation to complete and dashboard to load
  await page.waitForLoadState('networkidle');

  // Verify user is logged in by checking the URL changed to dashboard
  await expect(page).toHaveURL(/.*\/dashboard\/index/);

  // Wait for dashboard content to be visible
  await page.waitForTimeout(2000);

  // Verify dashboard is displayed by checking for common elements
  // Check for the main content area
  const mainContent = page.locator('main, [role="main"], .oxd-layout');
  await expect(mainContent).toBeVisible({ timeout: 10000 });

  // Alternative verification: Check if the page title contains expected content
  const pageTitle = await page.title();
  console.log(`✓ Page title: ${pageTitle}`);
  console.log('✓ User successfully logged in and dashboard is displayed');
});
