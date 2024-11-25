FROM mcr.microsoft.com/playwright:v1.48.2-noble
WORKDIR /playwright-tests
COPY ./tests ./tests
RUN npm install
CMD ["npx", "playwright", "test",
"tests/homework-28/api/garage1.spec.ts", 
"tests/homework-28/api/carsCreationPos.spec.ts",
"tests/homework-28/api/allCarsCreationDeletingPos.spec.ts", "--project=ui-tests"]