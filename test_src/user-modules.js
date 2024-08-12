import { loginObject, urlLogin } from "../page_object/login";
import { launchpadObject } from "../page_object/launchpad-modules";
import userCredentials from "../credentials/user-roles";

const { usernameInput, passwordInput, loginButton } = loginObject();
const { fixturePageLogin } = urlLogin();
  
fixturePageLogin`Login User Access Modules`
    .beforeEach(async max => {
        await max.maximizeWindow();
    });
    
userCredentials.forEach((credentials, index) => {
    test(`Verify Launchpad - User Access ${index + 1} (${credentials.username}, ${credentials.role})`, async t => {
        const { username, password, role } = credentials;
        const { financeModules, surveyModules, scanReceiptModules, merchantModules } = launchpadObject();
    
        await t
            .typeText(usernameInput, username)
            .typeText(passwordInput, password)
            .click(loginButton)
            .wait(1000);
    
        let assertionFailed = false;
    
        if (role === 'super-admin') {
            try {
                await t
                    .wait(1000)
                    .expect(financeModules.exists).ok(`Finance modules appear`);
                    console.log(`Finance modules assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
                } catch (error) {
                    console.error(`Finance modules assertion failed for User ${index + 1} (${credentials.username}, ${credentials.role}): ${error}`);
                    assertionFailed = true
            }
    
            try {
                await t
                    .wait(1000)
                    .expect(scanReceiptModules.exists).ok(`Scan receipt modules appear`);
                    console.log(`Scan receipt modules assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
                } catch (error) {
                    console.error(`Scan receipt modules assertion failed for User ${index + 1} (${credentials.username}, ${credentials.role}): ${error}`);
                    assertionFailed = true;
            }
    
            try {
                await t
                    .wait(1000)
                    .expect(surveyModules.exists).ok(`Survey modules appear`);
                    console.log(`Survey modules assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
                } catch (error) {
                    console.error(`Survey modules assertion failed for User ${index + 1} (${credentials.username}, ${credentials.role}): ${error}`);
                    assertionFailed = true;
            }
    
            try {
                await t
                    .wait(1000)
                    .expect(merchantModules.exists).ok(`Merchant modules appear`);
                    console.log(`Merchant modules assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
                } catch (error) {
                    console.error(`Merchant modules assertion failed for User ${index + 1} (${credentials.username}, ${credentials.role}): ${error}`);
                    assertionFailed = true;
            }
    
            if (assertionFailed) {
                throw new Error(`One or more assertions failed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
            }
        } 
        else if (role === 'admin-sr') {
            try {
                await t
                    .wait(1000)
                    .expect(financeModules.exists).notOk(`Finance modules should not appear`);
                    console.log(`Finance modules assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
                } catch (error) {
                    console.error(`Finance modules assertion failed for User ${index + 1} (${credentials.username}, ${credentials.role}): ${error}`);
                    assertionFailed = true
            }
    
            try {
                await t
                    .wait(1000)
                    .expect(scanReceiptModules.exists).ok(`Scan receipt modules appear`);
                    console.log(`Scan receipt modules assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
                } catch (error) {
                    console.error(`Scan receipt modules assertion failed for User ${index + 1} (${credentials.username}, ${credentials.role}): ${error}`);
                    assertionFailed = true;
            }
    
            try {
                await t
                    .wait(1000)
                    .expect(surveyModules.exists).notOk(`Survey modules should not appear`);
                    console.log(`Survey modules assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
                } catch (error) {
                    console.error(`Survey modules assertion failed for User ${index + 1} (${credentials.username}, ${credentials.role}): ${error}`);
                    assertionFailed = true;
            }
    
            try {
                await t
                    .wait(1000)
                    .expect(merchantModules.exists).notOk(`Merchant modules should appear`);
                    console.log(`Merchant modules assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
                } catch (error) {
                    console.error(`Merchant modules assertion failed for User ${index + 1} (${credentials.username}, ${credentials.role}): ${error}`);
                    assertionFailed = true;
            }
    
            if (assertionFailed) {
                throw new Error(`One or more assertions failed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
            }
        }   
    });
});