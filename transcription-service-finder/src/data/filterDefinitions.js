export const FILTER_DEFINITIONS = [
  { key: 'scenarios', title: 'Задачи', options: [['dialogues','Диалоги / интервью'],['meetings','Встречи / созвоны'],['videoLessons','Видеоуроки'],['subtitles','Субтитры'],['summaries','Саммари / конспект'],['longFiles','Длинные файлы'],['api','API / интеграции'],['humanReview','Точная ручная расшифровка']] },
  { key: 'channels', title: 'Каналы работы', options: [['browser','Браузер'],['fileUpload','Загрузка файлов'],['publicUrlImport','Импорт по ссылке'],['videoLinks','Ссылки на видео'],['cloudLinks','Облачные ссылки'],['meetingIntegrations','Интеграции встреч'],['telegram','Telegram'],['chrome','Chrome-расширение'],['mobile','Мобильное приложение'],['desktop','Desktop-приложение']] },
  { key: 'features', title: 'Функции', options: [['speakerDiarization','Разделение спикеров'],['timestamps','Таймкоды'],['aiSummary','AI-саммари'],['translation','Перевод'],['meetingBot','Бот для встреч'],['bulkUpload','Массовая загрузка'],['teamWorkspace','Командная работа']] },
  { key: 'exports', title: 'Экспорт', options: [['docx','DOCX'],['srt','SRT'],['vtt','VTT'],['txt','TXT'],['json','JSON/API']] },
  { key: 'commercial', title: 'Коммерция', options: [['freePlan','Есть бесплатный тариф'],['recurringFree','Лимит возобновляется'],['paidIndividual','Есть тариф для физлица'],['affiliate','Есть партнёрка'],['highAffiliate','Сильная партнёрка 30%+'],['cheapStart','Бюджетный старт']] },
  { key: 'verification', title: 'Статус данных', options: [['verified','Подтверждено'],['conflict','Есть конфликт'],['needsReview','Нужна проверка'],['notForRussian','Не рекомендовать для русского']] }
]

export const FILTER_LABEL_MAP = Object.fromEntries(
  FILTER_DEFINITIONS.flatMap((cat) => cat.options.map(([value, label]) => [value, label]))
)
