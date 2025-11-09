import { BasePage } from './base-page.js';

export class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.userProfileLink = page.getByRole('link');
    this.articlePreviews = page.locator('.article-preview');
  }

  async navigateToNewArticle() {
    await this.newArticleLink.click();
  }

  async navigateToUserProfile(username) {
    await this.userProfileLink.filter({ hasText: username }).first().click();
  }

  async isArticleVisible(title) {
    const article = this.articlePreviews.filter({ hasText: title });
    return await article.isVisible();
  }
}