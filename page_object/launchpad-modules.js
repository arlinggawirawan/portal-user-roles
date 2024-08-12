import { Selector } from "testcafe";

export function urlLaunchpad() {
    const fixturePageLaunchpad = fixture`Launchpad Page`
                        .page`https://portal-dev.getplus-app.net/launch`;
    return { fixturePageLaunchpad };
}

export function launchpadObject() {
    const financeModules = Selector('.mantine-Text-root.mantine-Title-root.mantine-1v0b3hs').withText('Finance');
    const scanReceiptModules = Selector('.mantine-Text-root.mantine-Title-root.mantine-1v0b3hs').withText('In App Scan');
    const surveyModules = Selector('.mantine-Text-root.mantine-Title-root.mantine-1v0b3hs').withText('Survey');
    const merchantModules = Selector('.mantine-Text-root.mantine-Title-root.mantine-1v0b3hs').withText('Merchant');

    return { financeModules, scanReceiptModules, surveyModules, merchantModules };
}