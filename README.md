# Playwright Test Store
Store which we will test
- [automationtesting.co.uk](https://teststore.automationtesting.co.uk/index.php)


## Basic Setup

- User needs node.js and npm in their machine
- tsconfig is set for node12 by default [https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping]

## Installation

- `npm i` to install all

## How to run tests?

- `npx playwright test` - Running all tests
- `npx playwright test some.test.ts` - Running a single test file
- `npx playwright test tests/NavigationTests/ContentOperationTeam` - Run a set of test files
- `npx playwright test landing login` - Run files that have landing or login in the file name
- `npx playwright test -g "STORE-001"` - Run the tests which contain STORE-001 in title
- `npx playwright test -g "STORE-001" --repeat-each=10` - Run the test with the title and repeat it 10 times
- `npx playwright test -g "STORE-001" --repeat-each=10 --workers=3` - Run the test with the title and repeat it 10 times, set 3 workers

## How to run Codegen?

- `npx playwright codegen https://mqa-q-035.sitecorecontenthub-staging.cloud/en-us` - to run codegen

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

## Update snapshots

- you need to have installed Docker
- in powershell terminal

```Powershell
docker run --rm --network host -v ${pwd}:/work/ -w /work/ -it mcr.microsoft.com/playwright:v1.30.0-focal /bin/bash
npm install
npx playwright test --update-snapshots
```

version of playwright image could be changed during time, and it depends on playwright version
