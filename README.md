# math-operations-e2e

`math-operations-e2e` repository is dedicated to conducting comprehensive end-to-end (E2E) tests on the 'math-operations-dev' backend application. It is designed to be automatically triggered following the successful completion of unit tests in the parent repository, ensuring that new changes are verified in a scenario that closely emulates a production environment.

## Repository Directory Structure

```
- .github/workflows       # Contains GitHub Actions E2E testing workflows
- node_modules            # Node.js project dependencies
- src                     # Source code for E2E testing
  - app.js                # Main entry point for the E2E testing application
  - math.operations.js    # Contains the mathematical operations to be tested
- tests                   # E2E test scripts for the application
  - math.operations.e2e.test.js
- .gitignore              # Lists files and directories to ignore in the repository
- package-lock.json       # Auto-generated file to lock down dependency versions
- package.json            # Project metadata and dependency manifest
- README.md               # Documentation for the repository
```

## Workflow Activation

The E2E testing workflow, contained within `math_operations_e2e.yml`, is meticulously crafted to be initiated by a `repository_dispatch` event, sent from the `math-operations-dev` repository. The workflow includes steps to set up the testing environment, run the E2E tests.

Let's decipher the workflow file for the `math-operations-e2e` repository that defines the end-to-end (E2E) testing pipeline:

### Workflow Breakdown

1. **Workflow Trigger**:

    ```yaml
    on:
        repository_dispatch:
            types: [trigger-e2e-tests-event]
    ```

    This section sets the workflow to trigger on a `repository_dispatch` event specifically named `trigger-e2e-tests-event`. This event is dispatched by the parent repository, `math-operations-dev`, after the unit tests pass and the deployment step is echoed.

2. **E2E Tests Job**:

    ```yaml
    jobs:
        e2e-tests:
            runs-on: ubuntu-latest
    ```

    The job `e2e-tests` is configured to run on the latest version of Ubuntu available in GitHub Actions. This ensures that the E2E tests are executed in a clean and updated environment.

    - **Checkout Code**:

        ```yaml
        - name: Checkout E2E Test Repository Code
          uses: actions/checkout@v3
        ```

        This step uses the `actions/checkout@v3` action to clone the `math-operations-e2e` repository code into the GitHub Actions runner, making it available for subsequent steps.

    - **Set Up Node.js Environment**:

        ```yaml
        - name: Set Up Node.js Environment
          uses: actions/setup-node@v4
          with:
              node-version: "18"
        ```

        Here, the `actions/setup-node@v4` action is used to set up a Node.js environment with version 18, which is required for running Node.js applications and their tests.

    - **Install Dependencies**:

        ```yaml
        - name: Install E2E Testing Dependencies
          run: npm ci
        ```

        This command, `npm ci`, installs the dependencies defined in `package-lock.json`. It ensures a clean install of all the required packages for E2E testing, mirroring the exact versions as per the lock file.

    - **Execute E2E Tests**:

        ```yaml
        - name: Execute End-to-End Tests
          run: npm run test
        ```

        The actual E2E tests are executed with the `npm run test` command. This script is defined in `package.json` and is responsible for running the test suite that validates the application's entire flow from end to end.

    - **E2E Test Completion Notification**:
        ```yaml
        - name: E2E Test Completion Notification
          run: |
              echo "End-to-end testing has successfully completed. These tests validate the integrated functionality of the math operations backend in real-world scenarios, ensuring that the application performs as expected from start to finish."
        ```
        After the tests have completed, this step outputs a notification in the workflow logs. It serves as a confirmation that the E2E tests have run successfully, asserting that the application's workflow is functioning correctly in a simulated real-world environment.
