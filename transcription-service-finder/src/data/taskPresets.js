export const TASK_PRESETS = [
  { id: 'all', title: 'Все сервисы', filters: {} },
  { id: 'dialogues', title: 'Диалоги по ролям', filters: { scenarios: ['dialogues'], features: ['speakerDiarization'] } },
  { id: 'fileProcessing', title: 'Обработка файла', filters: { channels: ['fileUpload'] } },
  { id: 'youtube', title: 'YouTube / видеокурс', filters: { scenarios: ['videoLessons', 'subtitles'], channels: ['publicUrlImport', 'videoLinks'] } },
  { id: 'meetings', title: 'Встречи и протоколы', filters: { scenarios: ['meetings'], features: ['meetingBot', 'aiSummary'] } },
  { id: 'affiliate', title: 'Заработок на партнёрке', filters: { commercial: ['affiliate'] } },
  { id: 'free', title: 'Бесплатный старт', filters: { commercial: ['freePlan'] } },
  { id: 'trusted', title: 'Только подтверждённые', filters: { verification: ['verified'] } }
]
