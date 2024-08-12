import { urlLogin, loginObject } from "../page_object/login";
import { launchpadObject } from "../page_object/launchpad-modules";
import { financeObject, merchantsObject, bankAccountObject } from "../page_object/finance-modules";
import userCredentials from "../credentials/user-roles";

const { usernameInput, passwordInput, loginButton } = loginObject();
const { fixturePageLogin } = urlLogin();

fixturePageLogin`Verify Finance Modules`
    .beforeEach(async max => {
        await max.maximizeWindow();
    });

userCredentials.forEach((credentials, index) => {
    test(`Verify Finance Modules - User Access ${index + 1} (${credentials.username}, ${credentials.role})`, async t => {
        const { username, password, role } = credentials;
        const { financeModules } = launchpadObject();
        const { merchantsMenu, bankAccountMenu } = financeObject();
        const { merchantTitle } = merchantsObject();
        const { bankAccountTitle } = bankAccountObject();

        await t
            .typeText(usernameInput, username)
            .typeText(passwordInput, password)
            .click(loginButton)
            .wait(1000)
        
        let assertionFailed = false;

        if (role === 'super-admin') {
            // Assertion for Merchant Menu
            try {
                await t
                    .click(financeModules)
                    .click(merchantsMenu)
                    .expect(merchantTitle.exists).ok(`Merchant title is visible`);
                    console.log(`Open merchant menu assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
                } catch (error) {
                    console.error(`Open merchant menu assertion failed for User ${index + 1} (${credentials.username}, ${credentials.role}): ${error}`);
                    assertionFailed = true
            }

            // Assertion for Bank Account Menu
            try {
                await t
                    .click(bankAccountMenu)
                    .expect(bankAccountTitle.exists).ok('Bank Account title is visible');
                    console.log(`Open bank account menu assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
                } catch (error) {
                    console.error(`Open bank account menu assertion failed for User ${index + 1} (${credentials.username}, ${credentials.role}): ${error}`);
                    assertionFailed = true;
            }
        }
        else {
            console.log('Role is not super-admin or finance related user, skipping the test');
            assertionFailed = false;
        }

        if (assertionFailed) {
            throw new Error(`One or more assertions failed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
        }
    });
});
