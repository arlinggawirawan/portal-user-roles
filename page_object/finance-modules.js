import { Selector } from "testcafe";

export function urlFinanceModules() {
    const fixturePageFinance = fixture`Finance Page`
                    .page`https://portal-dev.getplus-app.net/finance`;
    return { fixturePageFinance };
}

const financeSelector = Selector('.mantine-NavLink-label');
const financeMenuSelector = Selector('.mantine-Title-root');

export function financeObject() {
    const merchantsMenu = financeSelector.withText('Merchants');
    const bankAccountMenu = financeSelector.withText('Bank Account');
    const invoicesMenu = financeSelector.withText('Invoices');
    const paymentsMenu = financeSelector.withText('Payments');
    return { merchantsMenu, bankAccountMenu, invoicesMenu, paymentsMenu };
}

export function merchantsObject() {
    const merchantTitle = financeMenuSelector.withText('Merchant List');
    return { merchantTitle };
}

export function bankAccountObject() {
    const bankAccountTitle = financeMenuSelector.withText('Bank Account');
    return { bankAccountTitle };
}