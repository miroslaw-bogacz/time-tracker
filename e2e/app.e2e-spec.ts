import { JiraTimeTrackerDesktopPage } from './app.po';

describe('jira-time-tracker-desktop App', () => {
  let page: JiraTimeTrackerDesktopPage;

  beforeEach(() => {
    page = new JiraTimeTrackerDesktopPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to jtt!!'))
      .then(done, done.fail);
  });
});
