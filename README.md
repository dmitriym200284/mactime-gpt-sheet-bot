# MacTime GPT Sheet Bot

🤖 Генератор контента из Google Sheets с помощью OpenAI API (GPT-4)

## 📦 Что делает

- Читает задачи из таблицы Google Sheets
- Отправляет запросы в GPT API
- Возвращает сгенерированный текст в таблицу

## 🛠️ Установка

```bash
pip install gspread oauth2client openai
```

## 🌐 Посадочная страница

Есть 2 страницы:
- `index.html` (основная)
- `landing.html` (альтернативный URL)

### Как открыть терминал в папке проекта

**Вариант 1 (VS Code, самый удобный):**
1. Откройте папку проекта в VS Code.
2. Нажмите **Terminal → New Terminal**.
3. Терминал откроется уже в папке проекта.

**Вариант 2 (macOS / Linux):**
```bash
cd /путь/к/mactime-gpt-sheet-bot
```

**Вариант 3 (Windows PowerShell):**
```powershell
cd C:\путь\к\mactime-gpt-sheet-bot
```

Проверка, что вы в нужной папке:
```bash
pwd
# или в Windows:
# cd
```

### Как запустить (самый простой способ)

1. Открой терминал в папке проекта.
2. Выполни:

```bash
./run_preview.sh
```

3. Открой в браузере:
- `http://localhost:8000`
- `http://localhost:8000/landing.html`

### Если нужно выбрать другой порт

```bash
PORT=8080 ./run_preview.sh
```

### Альтернативный ручной запуск

```bash
python3 preview_server.py
```


## 🚀 Запуск сайта на GitHub Pages

1. Запушьте репозиторий на GitHub.
2. В репозитории откройте **Settings → Pages**.
3. В поле **Source** выберите **GitHub Actions**.
4. Запушьте изменения в ветку `main`, `master` или `work` (или запустите workflow вручную в **Actions**).
5. После успешного workflow сайт будет доступен по адресу:
   - `https://<ваш-логин>.github.io/<имя-репозитория>/`

> В репозитории уже добавлен workflow `.github/workflows/deploy-pages.yml`, который публикует статический сайт автоматически.
