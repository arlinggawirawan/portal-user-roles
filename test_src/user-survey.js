import { urlLogin, loginObject } from "../page_object/login";
import { surveyListObject } from "../page_object/survey-modules";
import { launchpadObject } from "../page_object/launchpad-modules";
import userCredentials from "../credentials/user-roles";

const { usernameInput, passwordInput, loginButton } = loginObject();
const { fixturePageLogin } = urlLogin();

fixturePageLogin`Verify Survey Modules`
    .beforeEach(async max => {
        await max.maximizeWindow();
    });

userCredentials.forEach((credentials, index) => {
    test(`Verify Survey Modules - User Access ${index + 1} (${credentials.username}, ${credentials.role})`, async t => {
        const { username, password, role } = credentials;
        const { surveyListMenu, surveyListTitle, newDefaultSurveyButton, newSegmentedSurveyButton, switchStatusButton } = surveyListObject();
        const { surveyModules } = launchpadObject();

        await t
            .typeText(usernameInput, username)
            .typeText(passwordInput, password)
            .click(loginButton)
            .wait(1000);
    
        let assertionFailed = false;

        if (role === 'super-admin') {
            try {
                await t
                    .click(surveyModules)
                    .click(surveyListMenu)
                    .expect(surveyListTitle.exists).ok(`Survey list title visible`);
                    console.log(`Open survey list menu assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
                
                await t
                    .expect(newDefaultSurveyButton.exists && newSegmentedSurveyButton.exists && switchStatusButton.exists).ok(`All button should appear`);
                    console.log(`Add survey button in survey list assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);

                } catch (error) {
                    console.error(`Add survey button in survey list menu assertion failed for User ${index + 1} (${credentials.username}, ${credentials.role}): ${error}`);
                    assertionFailed = true;
            }
        } else {
            console.log('Role is not super-admin or survey modules related user, skipping the test');
            assertionFailed = true;
        }

        if (assertionFailed) {
            throw new Error(`One or more assertions failed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
        }
    });
});

