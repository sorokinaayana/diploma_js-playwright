FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx playwright install

# Установка Allure
RUN apt-get update && apt-get install -y default-jre curl
RUN curl -o allure-2.24.0.tgz -Ls https://github.com/allure-framework/allure2/releases/download/2.24.0/allure-2.24.0.tgz \
    && tar -zxvf allure-2.24.0.tgz -C /opt/ \
    && ln -s /opt/allure-2.24.0/bin/allure /usr/bin/allure

CMD ["npx", "playwright", "test", "--reporter=allure-playwright"]
