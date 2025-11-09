import { BasePage } from './base-page.js';

export class ArticlePage extends BasePage {
  constructor(page) {
    super(page);
    this.articleTitle = page.locator('h1');
    this.articleBody = page.locator('.article-content p').first();
    this.editArticleButton = page.getByRole('link', { name: 'Edit Article' }).first();
    this.deleteArticleButton = page.getByRole('button', { name: 'Delete Article' }).first();
  }

  async clickEditArticle() {
    await this.editArticleButton.click();
  }

  async deleteArticle() {
    this.page.once('dialog', dialog => dialog.accept());
    await this.deleteArticleButton.click();
  }
}