import { BasePage } from './base-page.js';
import { TestData } from '../helpers/test-data.js';  

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
    
    await this.publishButton.click();
    await this.page.waitForURL(/\/article\//);
    
    return articleData;
  }

  async createNewArticleWithGeneratedData() {
    const articleData = TestData.generateArticle();
    return await this.createNewArticle(articleData);
  }

  async updateArticleBody(newBody) {
    await this.articleBodyInput.fill(newBody);
    await this.updateButton.click();
    await this.page.waitForURL(/\/article\//);
  }
}