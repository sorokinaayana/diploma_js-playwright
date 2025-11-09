import { BasePage } from './base-page.js';

export class EditorPage extends BasePage {
  constructor(page) {
    super(page);
    this.articleTitleInput = page.locator('input').first();
    this.articleAboutInput = page.locator('input').nth(1);
    this.articleBodyInput = page.locator('textarea').first();
    this.tagsInput = page.locator('input').last();
    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    this.updateButton = page.getByRole('button', { name: 'Update Article' });
  }

  async createNewArticle(articleData) {
    await this.articleTitleInput.fill(articleData.title);
    await this.articleAboutInput.fill(articleData.description);
    await this.articleBodyInput.fill(articleData.body);
    
    await this.tagsInput.fill(articleData.tags[0]);
    await this.tagsInput.press('Enter');
    
    // Добавляем ожидание перед кликом
    await this.publishButton.waitFor({ state: 'visible' });
    await this.publishButton.click();
    
    // Ждем загрузки страницы статьи
    await this.page.waitForURL(/\/article\//);
  }

  async updateArticleBody(newBody) {
    await this.articleBodyInput.fill(newBody);
    await this.updateButton.waitFor({ state: 'visible' });
    await this.updateButton.click();
    
    // Ждем загрузки обновленной статьи
    await this.page.waitForURL(/\/article\//);
  }
}
