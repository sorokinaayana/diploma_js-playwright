import { test, expect } from '@playwright/test';
import { RegisterPage, EditorPage, ArticlePage, CommentPage, MainPage } from '../../pages/index.js';
import { TestData } from '../../helpers/test-data.js';

test.describe('Действия со статьями', () => {
  let registerPage, editorPage, articlePage, commentPage, mainPage;
  let userData, articleData;

  test.beforeEach(async ({ page }) => {
    // Инициализация Page Objects
    registerPage = new RegisterPage(page);
    editorPage = new EditorPage(page);
    articlePage = new ArticlePage(page);
    commentPage = new CommentPage(page);
    mainPage = new MainPage(page);
    
    // Регистрация нового пользователя перед каждым тестом
    await registerPage.navigate();
    userData = TestData.generateUser();
    await registerPage.registerNewUser(userData);
  });

  test('создание статьи', async () => {
    await mainPage.navigateToNewArticle();
    articleData = await editorPage.createNewArticleWithGeneratedData();
    
    await expect(articlePage.articleTitle).toHaveText(articleData.title);
    await expect(articlePage.articleBody).toContainText(articleData.body);
  });

  test('редактирование статьи', async () => {
    await mainPage.navigateToNewArticle();
    articleData = await editorPage.createNewArticleWithGeneratedData();
    
    await articlePage.clickEditArticle();
    await expect(editorPage.articleBodyInput).toBeVisible();
    
    const updatedContent = 'Обновлённое содержание ' + Date.now();
    await editorPage.updateArticleBody(updatedContent);
    
    await expect(articlePage.articleBody).toContainText(updatedContent);
  });

  test('удаление статьи', async () => {
    await mainPage.navigateToNewArticle();
    articleData = await editorPage.createNewArticleWithGeneratedData();
    
    await articlePage.deleteArticle();
    
    await mainPage.navigateToUserProfile(userData.username);
    expect(await mainPage.isArticleVisible(articleData.title)).toBeFalsy();
  });

  test('добавление и удаление комментария', async () => {
    await mainPage.navigateToNewArticle();
    articleData = await editorPage.createNewArticleWithGeneratedData();
    
    const commentText = TestData.generateComment();
    
    await commentPage.addComment(commentText);
    expect(await commentPage.isCommentVisible(commentText)).toBeTruthy();
    
    await commentPage.deleteLastComment();
    expect(await commentPage.isCommentVisible(commentText)).toBeFalsy();
  });
});