import { MNPanelPage } from './app.po';

describe('mnpanel App', () => {
  let page: MNPanelPage;

  beforeEach(() => {
    page = new MNPanelPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
