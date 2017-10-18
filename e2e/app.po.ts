import { browser, by, element } from 'protractor';

export class JiraTimeTrackerDesktopPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('jtt-root h1')).getText();
  }
}
