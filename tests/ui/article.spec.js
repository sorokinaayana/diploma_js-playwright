import { test, expect } from '@playwright/test';
import { RegisterPage, EditorPage, ArticlePage, CommentPage, MainPage } from '../../pages/index.js';
import { TestData } from '../../helpers/test-data.js';
import { allure } from "allure-playwright";

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
    await allure.epic("UI Тесты");
    await allure.feature("Управление статьями");
    await allure.story("Создание новой статьи");
    await allure.severity("critical");
    await allure.tag("ui");
    await allure.tag("article");
    
    await mainPage.navigateToNewArticle();
    articleData = TestData.generateArticle();
    await editorPage.createNewArticle(articleData);
    
    await expect(articlePage.articleTitle).toHaveText(articleData.title);
    await expect(articlePage.articleBody).toContainText(articleData.body);
  });

  test('редактирование статьи', async () => {
    await allure.epic("UI Тесты");
    await allure.feature("Управление статьями");
    await allure.story("Редактирование существующей статьи");
    await allure.severity("high");
    await allure.tag("ui");
    await allure.tag("article");
    
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
    await allure.epic("UI Тесты");
    await allure.feature("Управление статьями");
    await allure.story("Удаление статьи");
    await allure.severity("high");
    await allure.tag("ui");
    await allure.tag("article");
    
    await mainPage.navigateToNewArticle();
    articleData = TestData.generateArticle();
    await editorPage.createNewArticle(articleData);
    
    await articlePage.deleteArticle();
    
    await mainPage.navigateToUserProfile(userData.username);
    expect(await mainPage.isArticleVisible(articleData.title)).toBeFalsy();
  });

  test('добавление и удаление комментария', async () => {
    await allure.epic("UI Тесты");
    await allure.feature("Управление статьями");
    await allure.story("Работа с комментариями");
    await allure.severity("normal");
    await allure.tag("ui");
    await allure.tag("comment");
    
    await mainPage.navigateToNewArticle();
    articleData = TestData.generateArticle();
    await editorPage.createNewArticle(articleData);
    
    const commentText = TestData.generateComment();
    
    await commentPage.addComment(commentText);
    expect(await commentPage.isCommentVisible(commentText)).toBeTruthy();
    
    await commentPage.deleteLastComment();
    expect(await commentPage.isCommentVisible(commentText)).toBeFalsy();
  });
});
