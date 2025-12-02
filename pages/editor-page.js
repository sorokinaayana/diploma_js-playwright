import { BasePage } from './base-page.js';

export class EditorPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.articleTitleInput = page.getByPlaceholder('Article Title');
    this.articleAboutInput = page.getByPlaceholder("What's this article about?");
    this.articleBodyInput = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsInput = page.getByPlaceholder('Enter tags');
    
    this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });
  }

  async createNewArticle(articleData) {
    await this.articleTitleInput.fill(articleData.title);
    await this.articleAboutInput.fill(articleData.description);
    await this.articleBodyInput.fill(articleData.body);
    
    if (articleData.tags && articleData.tags.length > 0) {
      await this.tagsInput.fill(articleData.tags.join(','));
    }
    
    await this.publishArticleButton.click(); //
  }

  async updateArticleBody(newBody) {
    await this.articleBodyInput.fill(newBody);
    await this.publishArticleButton.click();
  }
}
