
# Portal user roles automation

This automation to automate validation for development user roles in each specific roles group




## Appendix

This automation base on Node.js and using automation framework testcafe


## Installation

First make sure Node.js was installed. to check Node.js was installed it can be check on your local repository

```bash
  node --version
```

You need the npm command-line utility to install TestCafe from the NPM repository or run an ad hoc installation of TestCafe.

Most Node.js installers include the npm command-line utility out of the box. Make sure that your setup includes an up-to-date version﻿ of npm:

```bash
  npm --version
```
```bash
  npm install -g npm@latest
```
```bash
  curl -qL https://www.npmjs.com/install.sh | sh
```

## Install TestCafe from npm
### System-wide installation
Run the following command to install the testcafe package system-wide:
```bash
  npm install -g testcafe
```
### Local Installation
Run the following command to install TestCafe into your current working directory and save it to the dependencies list.
```bash
  npm install --save-dev testcafe
```
## Run the test
Ad hoc installation tools allow you to run rarely used packages without adding them to your project dependencies. Most TestCafe users should only resort to this measure if no other installation method is feasible.

Use the npx﻿ utility to run TestCafe without a permanent installation.
```bash
 npx testcafe chrome test.js
```

## Related

For more information about documentation: installion, test structure, element selector, test action, assertion, you can visit below link

[Testcafe documentation](https://testcafe.io/documentation/402635/guides/overview/getting-started)

