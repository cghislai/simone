import { SimonePage } from './app.po';

describe('simone App', function() {
  let page: SimonePage;

  beforeEach(() => {
    page = new SimonePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
