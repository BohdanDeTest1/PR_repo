# FROM mcr.microsoft.com/playwright:v1.48.2-noble
# WORKDIR /playwright-tests
# COPY ./tests ./tests
# RUN npm install
# CMD ["npx", "playwright", "test","tests/homework-28/api/garage1.spec.ts", "tests/homework-28/api/carsCreationPos.spec.ts","tests/homework-28/api/allCarsCreationDeletingPos.spec.ts","tests/homework-28/api/carUpdatePos.spec.ts","--project=chromium"]
FROM mcr.microsoft.com/playwright:v1.48.2-noble

WORKDIR /playwright-tests

# Копіюємо package.json і package-lock.json для встановлення залежностей
COPY package.json package-lock.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо всі файли тестів
COPY . .

CMD ["npx", "playwright", "test", "tests/homework-28/api/garage1.spec.ts", "tests/homework-28/api/carsCreationPos.spec.ts", "tests/homework-28/api/allCarsCreationDeletingPos.spec.ts", "--project=chromium"]
