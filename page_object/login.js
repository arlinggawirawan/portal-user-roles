import { Selector } from "testcafe";

export function urlLogin() {
    const fixturePageLogin = fixture`Login Page`
                    .page`https://portal-dev.getplus-app.net/login`;
    return { fixturePageLogin };
}

export function loginObject() {
    const usernameInput = Selector('.mantine-Input-input');
    const passwordInput = Selector('.mantine-PasswordInput-innerInput');
    const loginButton = Selector('.mantine-Button-label');

    return { usernameInput, passwordInput, loginButton};
}