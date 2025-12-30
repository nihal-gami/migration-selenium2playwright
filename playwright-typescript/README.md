# OrangeHRM Playwright TypeScript Test Automation

A modern, type-safe test automation framework for OrangeHRM using Playwright and TypeScript, following the Page Object Model (POM) pattern.

## 🚀 Features

- **TypeScript with Strict Mode** - Full type safety and modern JavaScript features
- **Playwright** - Fast, reliable end-to-end testing
- **Page Object Model** - Maintainable and scalable test architecture
- **Multi-Browser Support** - Test on Chromium, Firefox, and WebKit
- **CI/CD Ready** - GitHub Actions workflow included
- **Comprehensive Reporting** - HTML, JSON, and JUnit XML reports
- **Auto-Waiting** - Built-in element waiting reduces flakiness
- **Screenshots & Videos** - Automatic capture on test failures
- **Trace Viewer** - Debug tests with Playwright's trace viewer

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Git** (for cloning the repository)

## 📦 Installation

1. **Clone the repository** (if not already cloned):
   ```bash
   git clone <repository-url>
   cd orange-hrm/playwright-typescript
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install --with-deps
   ```

   Or install specific browsers:
   ```bash
   npx playwright install chromium
   npx playwright install firefox
   npx playwright install webkit
   ```

## ⚙️ Configuration

### Environment Variables

You can override configuration using environment variables:

```bash
export BASE_URL=https://opensource-demo.orangehrmlive.com/
export USERNAME=Admin
export PASSWORD=admin123
export BROWSER=chromium
```

### Configuration File

Edit `config/config.properties` to customize settings:

```properties
# Browser Configuration
browser=chromium

# Application URLs
base.url=https://opensource-demo.orangehrmlive.com/

# Test Credentials
username=Admin
password=admin123

# Timeouts
implicit.wait=10
explicit.wait=10
page.load.timeout=30
```

### Playwright Configuration

Edit `playwright.config.ts` to customize:
- Test directories
- Browser projects
- Timeouts
- Screenshot/video settings
- Reporter configuration

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Headed Mode (see browser)
```bash
npm run test:headed
```

### Run Tests in UI Mode (interactive)
```bash
npm run test:ui
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Run Specific Browser
```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

### Run Specific Test Suite
```bash
npm run test:login
npm run test:dashboard
npm run test:admin
```

### Run Specific Test File
```bash
npx playwright test tests/login.test.ts
```

### Run Tests Matching a Pattern
```bash
npx playwright test --grep "login"
```

### Run Tests in Parallel (default)
```bash
npx playwright test --workers=4
```

### Run Tests Sequentially
```bash
npx playwright test --workers=1
```

## 📊 Viewing Reports

### HTML Report
```bash
npm run test:report
```

This opens an interactive HTML report in your browser showing:
- Test results
- Screenshots on failure
- Videos on failure
- Trace files for debugging

### JSON Report
Test results are saved to `test-results/results.json`

### JUnit XML Report
Test results are saved to `test-results/junit.xml` (for CI/CD integration)

## 📁 Project Structure

```
playwright-typescript/
├── src/
│   ├── base/
│   │   └── base-page.ts          # Base page class with common methods
│   ├── pages/
│   │   ├── login-page.ts         # Login page object
│   │   ├── dashboard-page.ts    # Dashboard page object
│   │   ├── admin-page.ts        # Admin page object
│   │   └── pim-page.ts          # PIM page object
│   └── utils/
│       └── config.ts            # Configuration reader
├── tests/
│   ├── login.test.ts            # Login test suite
│   ├── dashboard.test.ts        # Dashboard test suite
│   └── admin.test.ts            # Admin page test suite
├── config/
│   └── config.properties        # Configuration file
├── .github/
│   └── workflows/
│       └── playwright.yml       # CI/CD workflow
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🏗️ Architecture

### Page Object Model (POM)

The framework follows the Page Object Model pattern:

- **BasePage** (`src/base/base-page.ts`): Common methods for all page objects
- **Page Objects** (`src/pages/`): Encapsulate page-specific logic and elements
- **Tests** (`tests/`): Test cases that use page objects

### Example: Creating a New Page Object

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/base-page';

export class MyPage extends BasePage {
  private readonly myElement: Locator;

  constructor(page: Page) {
    super(page);
    this.myElement = page.locator('selector');
  }

  async doSomething(): Promise<void> {
    await this.click(this.myElement);
  }
}
```

### Example: Writing a Test

```typescript
import { test, expect } from '@playwright/test';
import { MyPage } from '../src/pages/my-page';

test.describe('My Feature Tests', () => {
  test('should do something', async ({ page }) => {
    const myPage = new MyPage(page);
    await myPage.doSomething();
    await expect(myPage.isDisplayed()).resolves.toBe(true);
  });
});
```

## 🔧 Development

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

### Code Formatting
Consider using Prettier or ESLint auto-fix for consistent formatting.

## 🚀 CI/CD

### GitHub Actions

The project includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) that:
- Runs tests on push and pull requests
- Tests on multiple browsers (Chromium, Firefox, WebKit)
- Uploads test reports as artifacts
- Supports environment variables for configuration

### Setting Up Secrets

In your GitHub repository, add these secrets (optional):
- `BASE_URL` - Application base URL
- `USERNAME` - Test username
- `PASSWORD` - Test password

## 🐛 Debugging

### Debug Mode
```bash
npm run test:debug
```

### Trace Viewer
Traces are automatically collected on retry. View them:
```bash
npx playwright show-trace trace.zip
```

### Screenshots & Videos
Automatically captured on test failures in:
- `test-results/` directory

### Console Logs
View browser console logs:
```typescript
page.on('console', msg => console.log('Browser:', msg.text()));
```

## 📝 Best Practices

1. **Use Semantic Locators**: Prefer `getByRole()`, `getByText()`, `getByPlaceholder()` over XPath
2. **Page Object Model**: Keep page logic in page objects, not in tests
3. **Async/Await**: Always use `await` for async operations
4. **Descriptive Test Names**: Use clear, descriptive test names
5. **Independent Tests**: Each test should be independent and not rely on others
6. **Wait Strategies**: Let Playwright's auto-waiting handle element visibility
7. **Error Handling**: Use try-catch for expected error scenarios
8. **Configuration**: Use environment variables for different environments

## 🧩 Selector Strategies

### Preferred (in order):
1. **Semantic Locators**: `getByRole()`, `getByText()`, `getByPlaceholder()`
2. **CSS Selectors**: `locator('.class-name')`
3. **XPath**: `locator('xpath=//div[@class="example"]')` (use sparingly)

### Examples:
```typescript
// Good - Semantic
page.getByRole('button', { name: 'Submit' })
page.getByPlaceholder('Username')
page.getByText('Dashboard')

// Good - CSS
page.locator('.submit-button')
page.locator('#username')

// Acceptable - XPath (when semantic not available)
page.locator('xpath=//div[@data-testid="custom"]')
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is part of the OrangeHRM test automation suite.

## 🆘 Troubleshooting

### Tests Fail with "Browser not installed"
```bash
npx playwright install --with-deps
```

### TypeScript Errors
```bash
npm run type-check
```

### Tests Timing Out
- Check network connectivity
- Verify the application URL is correct
- Increase timeout in `playwright.config.ts`

### Element Not Found
- Verify selector is correct
- Check if element is in an iframe
- Ensure element is visible (Playwright auto-waits)

## 📞 Support

For issues or questions:
1. Check the [Playwright Documentation](https://playwright.dev/)
2. Review the [Migration Log](MIGRATION_LOG.md) for migration details
3. Check existing GitHub issues

---

**Happy Testing! 🎉**


