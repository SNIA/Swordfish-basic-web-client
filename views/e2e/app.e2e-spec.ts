import { SravanthiPage } from './app.po';

describe('sravanthi App', () => {
  let page: SravanthiPage;

  beforeEach(() => {
    page = new SravanthiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
