# E2E test for My Store with using TS + PlayWright

---

## About

This is a pet project designed for end-to-end (E2E) testing using TypeScript and Playwright. This repository includes a suite of automated tests aimed at validating the most critical user workflows on the [My Store](https://teststore.automationtesting.co.uk/index.php).

---

### Used by

#### [Fixtures](https://playwright.dev/docs/test-fixtures#introduction)

Fixtures — used to establish the environment for each test, giving the test everything it needs and nothing else. Test fixtures are isolated between tests. Cleanup after each test

#### [Parameterize tests](https://playwright.dev/docs/test-parameterize#parameterized-tests)

Parameterize tests are used to run the same test logic multiple times with different input values. This approach enhances the efficiency, maintainability, and comprehensiveness of testing by reducing code duplication and ensuring broader test coverage.

#### [POM](https://playwright.dev/docs/pom)

Page objects simplify authoring by creating a higher-level API which suits app and simplify maintenance by capturing element selectors in one place and create reusable code to avoid repetition.

#### Compositions for working with complex Page objects

#### [Parallel tests --workers=3](https://playwright.dev/docs/test-parallel)

#### [globalSetup](https://playwright.dev/docs/test-global-setup-teardown#option-2-configure-globalsetup-and-globalteardown)

Global setup in my project authenticates once and reuses authentication state in tests.

#### [Decorator @step](https://playwright.dev/docs/api/class-test#test-step)

Each call to the decorated method will show up as a step in the report.

#### [Configured playwright config](https://playwright.dev/docs/test-configuration)

#### [Configured ESLint config](https://eslint.org/docs/latest/use/configure/)

---

## Setup

- User needs node.js and npm in their machine
- tsconfig is set for node12 by default [https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping]

### Installation

- `npm i` to install all

### How to run tests?

- `npx playwright test` - Running all tests
- `npx playwright test cart.test.ts` - Running a single test file
- `npx playwright test search/item/catt` - Run a set of test files
- `npx playwright test item search` - Run files that have item or search in the file name
- `npx playwright test -g "STORE-001"` - Run the tests which contain STORE-001 in title
- `npx playwright test -g "STORE-001" --repeat-each=10` - Run the test with the title and repeat it 10 times
- `npx playwright test -g "STORE-001" --repeat-each=10 --workers=3` - Run the test with the title and repeat it 10 times, set 3 workers

### How to run Codegen?

- `npx playwright codegen https://teststore.automationtesting.co.uk/index.php` - to run codegen

## Useful links

- `https://playwright.dev/` - Playwright-test documentation
- `https://trace.playwright.dev/` - Trace viewer

## Playwright TestCases

- Open Folder _tests_ and start writing testcases
- Use only Typescript for your testcase
- Use existing page objects, if need more - create it by following the current structure
- A testcase should look like below

```typescript
test.describe(`${testObjectFunctionalName}`, () => {
  test('STORE-988: User able to logout', async () => {
  // test steps
  });
  ...
```

## .vscode

- This project comes with some recommended extensions and settings
- settings will be auto applied
- To use recommended extensions, install them using Extensions icon on the left dock

## Used tools

- [microsoft/playwright](https://github.com/microsoft/playwright) - Playwright-test repo
- [faker](https://fakerjs.dev/) - Repo for generating test data
