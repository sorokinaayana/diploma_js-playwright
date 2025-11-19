import { RegisterPage, EditorPage, ArticlePage, CommentPage, MainPage, ProfilePage } from './index.js';

export class App {
  constructor(page) {
    this.page = page;
    this.register = new RegisterPage(page);
    this.editor = new EditorPage(page);
    this.article = new ArticlePage(page);
    this.comment = new CommentPage(page);
    this.main = new MainPage(page);
    this.profile = new ProfilePage(page);
  }
}
