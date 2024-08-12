import { Selector } from "testcafe";

export function urlScanReceiptModules() {
    const fixturePageScanReceipt = fixture`Scan Receipt Page`
                    .page`https://portal-dev.getplus-app.net/in-app-scan`;
    return { fixturePageScanReceipt };
}

const scanReceiptSelector = Selector('.mantine-NavLink-label');
const scanReceiptMenuSelector = Selector('.mantine-Title-root');
const detailScanReceiptSelector = Selector('tr.mantine-134spwq');
const listButtonSelector = Selector('.mantine-Button-label');

export function scanReceiptObject() {
    const manualValidation = scanReceiptSelector.withText('Manual validation');
    const rejectCandidate = scanReceiptSelector.withText('Reject candidate');
    const issuingInProgress = scanReceiptSelector.withText('Issuing in progress');
    const historyMenu = scanReceiptSelector.withText('History');
    const archiveMenu = scanReceiptSelector.withText('Archive');
    const adminHistory = scanReceiptSelector.withText('Admin history');
    const settingsMenu = scanReceiptSelector.withText('Setting');
    const settingsAdminGroup = scanReceiptMenuSelector.withText('Admin Group');
    const nextPage = Selector('.mantine-Group-root > button:nth-child(9)');
    return { manualValidation, rejectCandidate, issuingInProgress, historyMenu, archiveMenu, adminHistory, settingsMenu, settingsAdminGroup, nextPage };
}

export function titleScanReceiptMenu() {
    const pendingReceiptTitle = scanReceiptMenuSelector.withText('Pending Receipt');
    const historyTitle = scanReceiptMenuSelector.withText('History');
    const archiveTitle = scanReceiptMenuSelector.withText('List Archive by Year');
    const adminHistoryTitle = scanReceiptMenuSelector.withText('Admin History');
    const settingTitle = scanReceiptMenuSelector.withText('Settings');
    return { pendingReceiptTitle, historyTitle, archiveTitle, adminHistoryTitle, settingTitle };
}

export function buttonDetailPending() {
    const assignToSpvButton = listButtonSelector.withText('Assign to SPV');
    const rejectButton = listButtonSelector.withText('Reject');
    const approveButton = listButtonSelector.withText('Approve');
    const issuingInProgressDetail = Selector('img.mantine-1lfto87').withAttribute('src', '/in-app-scan/assets/new-tab-24b1ec61.svg');
    const historyButtonEdit = listButtonSelector.withText('Edit');
    const historyButtonCancel = listButtonSelector.withText('Cancel');
    const settingsButtonReset = listButtonSelector.withText('Reset change');
    const settingsButtonSave = listButtonSelector.withText('Save');
    return { assignToSpvButton, rejectButton, approveButton, issuingInProgressDetail, historyButtonEdit, historyButtonCancel, settingsButtonReset, settingsButtonSave };
}

export default detailScanReceiptSelector;

