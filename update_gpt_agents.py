import gspread
from oauth2client.service_account import ServiceAccountCredentials

# ====== 1. Настройка доступа ======
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
client = gspread.authorize(creds)

# ====== 2. Таблица и вкладка ======
spreadsheet = client.open_by_key("1TdwzEQRNG_1sKWV6yW5liD32ar0ex63p-_Z061crUMA")
sheet = spreadsheet.worksheet("Агенты MacTime")

# ====== 3. Агент для добавления ======
new_agent = {
    "Agent Name": "MacTime Visual Coordinator",
    "Role": "Управление визуальными запросами, проверка доступа к DALL·E",
    "Platform": "Custom GPT",
    "Connected": "GPT, Google Sheets",
    "Tools": "Vision, DALL·E, Sheets",
    "Example": "Создай баннер для товара MacBook Air",
    "Prompt": "Проверь доступ к DALL·E. Если недоступен — сформируй prompt. Если доступен — создай изображение.",
    "Notes": "Работает совместно с Prompt Architect. Может делегировать создание."
}

# ====== 4. Чтение существующих данных ======
existing_rows = sheet.get_all_records()
agent_names = [row["Agent Name"] for row in existing_rows]

# ====== 5. Добавить, если такого нет ======
if new_agent["Agent Name"] not in agent_names:
    row_number = len(existing_rows) + 2  # +2 потому что есть заголовки
    row_data = [
        row_number - 1,
        new_agent["Agent Name"],
        new_agent["Role"],
        new_agent["Platform"],
        new_agent["Connected"],
        new_agent["Tools"],
        new_agent["Example"],
        new_agent["Prompt"],
        new_agent["Notes"],
    ]
    sheet.append_row(row_data)
    print(f"✅ Агент '{new_agent['Agent Name']}' добавлен в таблицу.")
else:
    print(f"⚠️ Агент '{new_agent['Agent Name']}' уже есть в таблице.")
