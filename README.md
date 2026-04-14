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
