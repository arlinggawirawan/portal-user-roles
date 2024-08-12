import { urlLogin, loginObject } from "../page_object/login";
import detailScanReceiptSelector, { scanReceiptObject, titleScanReceiptMenu, buttonDetailPending } from "../page_object/scanreceipt-modules";
import { launchpadObject } from "../page_object/launchpad-modules";
import userCredentials from "../credentials/user-roles";

const { usernameInput, passwordInput, loginButton } = loginObject();
const { fixturePageLogin } = urlLogin();

fixturePageLogin`Verify Scan Receipt Modules`
    .beforeEach(async max => {
        await max.maximizeWindow();
    });

userCredentials.forEach((credentials, index) => {
    test(`Verify Scan Receipt Modules - User Access ${index + 1} (${credentials.username}, ${credentials.role})`, async t => {
        const { username, password, role } = credentials;
        const { scanReceiptModules } = launchpadObject();
        const { manualValidation, rejectCandidate, issuingInProgress, historyMenu, settingsMenu, settingsAdminGroup, nextPage } = scanReceiptObject();
        const { pendingReceiptTitle, historyTitle } =  titleScanReceiptMenu();
        const { assignToSpvButton, rejectButton, approveButton, issuingInProgressDetail, historyButtonCancel, historyButtonEdit,
                settingsButtonReset, settingsButtonSave } = buttonDetailPending();
    
        await t
            .typeText(usernameInput, username)
            .typeText(passwordInput, password)
            .click(loginButton)
            .wait(1000);
    
        let assertionFailed = false;

        async function pagination() {
            let elementFound = false;
            
            while (!elementFound) {
                if (await detailScanReceiptSelector.withText('Rejected').exists) {
                    elementFound = true;
                    await t
                        .click(detailScanReceiptSelector.withText('Rejected'))
                        .wait(2000)
                        .expect(historyButtonEdit.exists).ok(`Button edit is visible`).click(historyButtonEdit)
                        .expect(assignToSpvButton.exists && historyButtonCancel.exists && approveButton.exists).ok(`All button validation should appear`);
                    console.log(`Button validation in history passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
            }   else {
                    if (await nextPage.exists) {
                        await t
                            .click(nextPage)
                            .wait(2000);
                    } else {
                        console.log('Next page button not found or no more pages to navigate');
                        break;
                }
            }
        }    
    }

        if (role === 'super-admin') {
            try {
                await t
                    .click(scanReceiptModules)
                    .click(manualValidation)
                    .expect(pendingReceiptTitle.exists).ok(`Pending Receipt title page is visible`);
                    console.log(`Open manual validation menu assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
                
                await t
                    .click(detailScanReceiptSelector)
                    .wait(2000)
                    .expect(assignToSpvButton.exists && rejectButton.exists && approveButton.exists).ok(`All button validation should appear`);
                    console.log(`Button validation in manual pending assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
                
                await t
                    .click(rejectCandidate)
                    .click(detailScanReceiptSelector)
                    .wait(2000)
                    .expect(assignToSpvButton.exists && rejectButton.exists && approveButton.exists).ok(`All button validation should appear`);
                    console.log(`Button validation in reject candidate assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
                
                await t
                    .click(issuingInProgress)
                    .click(issuingInProgressDetail)
                    .wait(2000)
                    .expect(assignToSpvButton.exists && rejectButton.exists && approveButton.exists).ok(`All button validation should appear`);
                    console.log(`Button validation in issuing assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);

                await t
                    .click(historyMenu)
                    .expect(historyTitle.exists).ok(`History title page is visible`);
                    console.log(`Open history menu assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
                
                await pagination();
                    
                await t
                    .click(settingsMenu)
                    .click(settingsAdminGroup)
                    .wait(2000)
                    .expect(settingsButtonReset.exists && settingsButtonSave.exists).ok(`Button reset and save is visible`);
                    console.log(`Button validation in settings passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);

                } catch (error) {
                    console.error(`Open manual validation menu assertion failed for User ${index + 1} (${credentials.username}, ${credentials.role}): ${error}`);
                    assertionFailed = true;
            }
        }

        else if (role === 'admin-sr') {
            try {
                await t
                    .click(scanReceiptModules)
                    .click(manualValidation)
                    .expect(pendingReceiptTitle.exists).ok(`Pending Receipt title page is visible`);
                    console.log(`Open manual validation menu assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);

                await t
                    .click(detailScanReceiptSelector)
                    .wait(2000)
                    .expect(assignToSpvButton.exists && rejectButton.exists && approveButton.exists).ok(`All button validation should appear`);
                    console.log(`Button validation in manual pending assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
                
                await t
                    .click(rejectCandidate)
                    .click(detailScanReceiptSelector)
                    .wait(2000)
                    .expect(assignToSpvButton.exists && rejectButton.exists && approveButton.exists).ok(`All button validation should appear`);
                    console.log(`Button validation in reject candidate assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
                
                await t
                    .click(issuingInProgress)
                    .click(issuingInProgressDetail)
                    .wait(2000)
                    .expect(assignToSpvButton.exists && rejectButton.exists && approveButton.exists).ok(`All button validation should appear`);
                    console.log(`Button validation in issuing assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);

                await t
                    .click(historyMenu)
                    .expect(historyTitle.exists).ok(`History title page is visible`);
                    console.log(`Open history menu assertion passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
                
                await pagination();
                
                await t
                    .click(settingsMenu)
                    .click(settingsAdminGroup)
                    .wait(2000)
                    .expect(settingsButtonReset.exists && settingsButtonSave.exists).ok(`Button reset and save is visible`);
                    console.log(`Button validation in settings passed for User ${index + 1} (${credentials.username}, ${credentials.role})`);

                } catch (error) {
                    console.error(`Open manual validation menu assertion failed for User ${index + 1} (${credentials.username}, ${credentials.role}): ${error}`);
                    assertionFailed = true;
            }
        }
        
        else {
            console.log('Role is not super-admin or scan receipt related user, skipping the test');
            assertionFailed = true;
        }

        if (assertionFailed) {
            throw new Error(`One or more assertions failed for User ${index + 1} (${credentials.username}, ${credentials.role})`);
        }
    });
});

