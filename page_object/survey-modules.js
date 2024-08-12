import { Selector } from "testcafe";

export function urlSurveyModules() {
    const fixtureSurvey = fixture`Survey page`
                        .page`https://portal-dev.getplus-app.net/survey`;
    return { fixtureSurvey };
}

export function surveyListObject() {
    const surveyListMenu = Selector('span.mantine-Text-root.mantine-NavLink-label.mantine-egzyyu');
    const surveyListTitle = Selector('h4.mantine-Text-root.mantine-Title-root.mantine-8c2ii0');
    const newDefaultSurveyButton = Selector('.mantine-Button-label').withText('New Default Survey');
    const newSegmentedSurveyButton = Selector('.mantine-Button-label').withText('New Segmented Survey');
    const switchStatusButton = Selector('.mantine-Switch-thumb');
    return { surveyListMenu, surveyListTitle, newDefaultSurveyButton, newSegmentedSurveyButton, switchStatusButton };
}