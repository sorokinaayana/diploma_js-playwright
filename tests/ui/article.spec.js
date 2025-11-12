import { test, expect } from '@playwright/test';
import { RegisterPage, EditorPage, ArticlePage, CommentPage, MainPage } from '../../pages/index.js';
import { TestData } from '../../helpers/test-data.js';
import { allure } from "allure-playwright";
import { CustomAssertions } from '../../helpers/custom-assertions.js';

test.describe('Действия со статьями', () => {
  let registerPage, editorPage, articlePage, commentPage, mainPage;
  let userData, articleData;

  test.beforeEach(async ({ page }) => {
    //  подготовка страниц
    registerPage = new RegisterPage(page);
    editorPage = new EditorPage(page);
    articlePage = new ArticlePage(page);
    commentPage = new CommentPage(page);
    mainPage = new MainPage(page);
    
    //  регистрация пользователя
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
    
   
    articleData = TestData.generateArticle();
    
 
    await mainPage.navigateToNewArticle();
    await editorPage.createNewArticle(articleData);
    
   
    await CustomAssertions.articleShouldHaveCorrectData(articlePage, articleData);
  });

  test('редактирование статьи', async () => {
    await allure.epic("UI Тесты");
    await allure.feature("Управление статьями");
    await allure.story("Редактирование существующей статьи");
    await allure.severity("high");
    await allure.tag("ui");
    await allure.tag("article");
    
 
    articleData = TestData.generateArticle();
    const updatedContent = 'Обновлённое содержание ' + Date.now();
    
    //  создаем статью
    await mainPage.navigateToNewArticle();
    await editorPage.createNewArticle(articleData);
    
    //  редактируем статью
    await articlePage.clickEditArticle();
    await editorPage.updateArticleBody(updatedContent);
    
   
    await CustomAssertions.articleBodyShouldContainText(articlePage, updatedContent);
  });

  test('удаление статьи', async () => {
    await allure.epic("UI Тесты");
    await allure.feature("Управление статьями");
    await allure.story("Удаление статьи");
    await allure.severity("high");
    await allure.tag("ui");
    await allure.tag("article");
    
   
    articleData = TestData.generateArticle();
    
    //создаем и удаляем статью
    await mainPage.navigateToNewArticle();
    await editorPage.createNewArticle(articleData);
    await articlePage.deleteArticle();
    await mainPage.navigateToUserProfile(userData.username);
    
   
    await CustomAssertions.articleShouldNotBeVisible(mainPage, articleData.title);
  });

  test('добавление и удаление комментария', async ({ page }) => {
    await allure.epic("UI Тесты");
    await allure.feature("Управление статьями");
    await allure.story("Работа с комментариями");
    await allure.severity("normal");
    await allure.tag("ui");
    await allure.tag("comment");
    
   
    articleData = TestData.generateArticle();
    const commentText = TestData.generateComment();
    
    //  создаем статью
    await mainPage.navigateToNewArticle();
    await editorPage.createNewArticle(articleData);
    
    // добавляем комментарий
    await commentPage.commentInput.fill(commentText);
    await commentPage.postCommentButton.click();
    
    //  проверяем комментарий
    await CustomAssertions.commentShouldBeVisible(commentPage, commentText);
    
    //  удаляем комментарий
    page.once('dialog', dialog => dialog.accept());
    await commentPage.deleteCommentButtons.last().click();
    
    //  проверяем удаление
    await CustomAssertions.commentShouldNotBeVisible(commentPage, commentText);
  });
});
