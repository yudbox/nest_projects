FROM node:14-alpine
#указываем где будет хранится контейнер
WORKDIR /opt/app
# ADD это функция копирования берем package.json проекта и копируем в корень /opt/app/package.json
ADD package.json package.json
# устанавливем зависимости
RUN npm install

# далее копируем все файлы(.) проекта в корень (.) /opt/app
ADD . .
# это понятно
RUN npm run build
# эта команда удалит все пакеты из node_modules которые не нужны на production
RUN npm prune --production
# запускаем команду в терминале контейнера node dist/main.js
CMD [ "node", "./dist/main.js" ]

