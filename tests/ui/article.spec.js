import { test, expect } from '@playwright/test';
import { RegisterPage, EditorPage, ArticlePage, CommentPage, MainPage } from '../../pages/index.js';
import { TestData } from '../../helpers/test-data.js';

test.describe('Действия со статьями', () => {
  let registerPage, editorPage, articlePage, commentPage, mainPage;
  let userData, articleData;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    editorPage = new EditorPage(page);
    articlePage = new ArticlePage(page);
    commentPage = new CommentPage(page);
    mainPage = new MainPage(page);
    
    await registerPage.navigate();
    userData = TestData.generateUser();
    await registerPage.registerNewUser(userData);
  });

  test('создание статьи', async () => {
    await mainPage.navigateToNewArticle();
    articleData = TestData.generateArticle();
    await editorPage.createNewArticle(articleData);
    
    await expect(articlePage.articleTitle).toHaveText(articleData.title);
    await expect(articlePage.articleBody).toContainText(articleData.body);
  });

  test('редактирование статьи', async () => {
    await mainPage.navigateToNewArticle();
    articleData = TestData.generateArticle();
    await editorPage.createNewArticle(articleData);
    
    await articlePage.clickEditArticle();
    await expect(editorPage.articleBodyInput).toBeVisible();
    
    const updatedContent = 'Обновлённое содержание ' + Date.now();
    await editorPage.updateArticleBody(updatedContent);
    
    await expect(articlePage.articleBody).toContainText(updatedContent);
  });

  test('удаление статьи', async () => {
    await mainPage.navigateToNewArticle();
    articleData = TestData.generateArticle();
    await editorPage.createNewArticle(articleData);
    
    await articlePage.deleteArticle();
    
    await mainPage.navigateToUserProfile(userData.username);
    await expect(mainPage.articlePreviews.filter({ hasText: articleData.title })).toBeHidden(); // Проверяем что статья не отображается
  });

  test('добавление и удаление комментария', async () => {
    await mainPage.navigateToNewArticle();
    articleData = TestData.generateArticle();
    await editorPage.createNewArticle(articleData);
    
    const commentText = TestData.generateComment();
    
    await commentPage.addComment(commentText);
    await expect(commentPage.commentByText(commentText)).toBeVisible(); // Используем локатор из конструктора
    
    await commentPage.deleteLastComment();
    await expect(commentPage.commentByText(commentText)).toBeHidden(); // Используем локатор из конструктора
  });
});
