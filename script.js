'use strict';

const CONFIG = {
  playerName: 'Никита',
  currentAge: 24,
  destinationAge: 25,
  gameTitle: 'Пункт пропуска №25',
  gameSubtitle: 'Таможенная декларация на въезд в следующий год жизни'
};

// ─── GAME DATA ────────────────────────────────────────────────────────────────

const IDENTITY_QUESTIONS = [
  {
    id: 'q1',
    text: 'Что является настоящим признаком взросления?',
    options: [
      {
        id: 'a', text: 'Всегда точно знать, чего хочешь.',
        correct: false,
        reaction: 'ОТВЕТ НЕ ПОДТВЕРЖДЁН. Подобное заявление обычно делают либо очень юные люди, либо люди, продающие курсы по достижению успеха за три недели.'
      },
      {
        id: 'b', text: 'Перестать ошибаться.',
        correct: false,
        reaction: 'ДАННЫЕ НЕ СОВПАЛИ. В базе не обнаружено ни одного взрослого человека, окончательно переставшего ошибаться.'
      },
      {
        id: 'c', text: 'Начать понимать, что важные решения требуют времени, но бесконечно прятаться за размышлениями тоже не выйдет.',
        correct: true,
        reaction: 'ЛИЧНОСТЬ ЧАСТИЧНО ПОДТВЕРЖДЕНА. Обнаружено реалистичное отношение к жизни без признаков капитуляции.'
      },
      {
        id: 'd', text: 'Купить органайзер и три дня им пользоваться.',
        correct: false,
        reaction: 'ОТВЕТ ПРИЗНАН ЭМОЦИОНАЛЬНО ДОСТОВЕРНЫМ, НО ЮРИДИЧЕСКИ НЕДОСТАТОЧНЫМ.'
      }
    ]
  },
  {
    id: 'q2',
    text: 'Что делать с ошибками прошлого?',
    options: [
      {
        id: 'a', text: 'Периодически пересматривать их ночью для поддержания моральной формы.',
        correct: false,
        reaction: 'ОТКАЗАНО. Регулярное самонаказание не зарегистрировано как способ улучшения будущего.'
      },
      {
        id: 'b', text: 'Сделать выводы, изменить то, что можно изменить, и прекратить носить прошлое как удостоверение личности.',
        correct: true,
        reaction: 'ОТВЕТ ПРИНЯТ. Зацикливание на прошлом к провозу не рекомендуется. Выводы допускаются без ограничений.'
      },
      {
        id: 'c', text: 'Забыть абсолютно всё и повторить с энтузиазмом.',
        correct: false,
        reaction: 'ПРОЦЕДУРА ОТКЛОНЕНА. Это не освобождение от прошлого, а оформление повторного въезда той же проблемы.'
      },
      {
        id: 'd', text: 'Объяснить себе, что виноваты исключительно обстоятельства и ретроградный Меркурий.',
        correct: false,
        reaction: 'ПОДДЕЛКА ДОКУМЕНТОВ. Астрономические объекты не принимаются в качестве персональных поручителей.'
      }
    ]
  },
  {
    id: 'q3',
    text: 'Как определить направление движения в жизни?',
    options: [
      {
        id: 'a', text: 'Подождать, пока кто-нибудь уверенный объяснит, как правильно.',
        correct: false,
        reaction: 'ОТКЛОНЕНО. Уверенный тон окружающих не является официальным подтверждением правильного маршрута.'
      },
      {
        id: 'b', text: 'Выбрать первое попавшееся, лишь бы не думать.',
        correct: false,
        reaction: 'НЕ РЕКОМЕНДОВАНО. Скорость движения не компенсирует движение в случайную сторону.'
      },
      {
        id: 'c', text: 'Интересоваться миром, узнавать разные области, задавать себе неудобные вопросы и действовать, когда решение действительно станет своим.',
        correct: true,
        reaction: 'ПРОВЕРКА ЗАВЕРШЕНА. Объект способен размышлять, не теряя способности двигаться дальше.'
      },
      {
        id: 'd', text: 'Делать вид, что вопрос сформулирован недостаточно конкретно.',
        correct: false,
        reaction: 'МАНЁВР РАСПОЗНАН. Интеллектуальное уклонение от ответа не отменяет необходимость выбрать маршрут.'
      }
    ]
  }
];

const BAGGAGE_ITEMS = [
  {
    id: 'sarcasm',
    name: 'Сарказм',
    options: {
      future: {
        allowed: true,
        stamp: 'approved',
        stampLabel: 'РАЗРЕШЕНО',
        reaction: 'РАЗРЕШЕНО К ПРОВОЗУ. Является встроенной системой защиты от абсурда. Превышение нормы обнаружено, но признано функциональным.'
      },
      recycle: {
        allowed: false,
        reaction: 'ПЕРЕРАБОТКА НЕВОЗМОЖНА. Объект давно встроен в операционную систему владельца и используется ежедневно.'
      },
      past: {
        allowed: false,
        reaction: 'ОТКАЗ НЕ ПРИНЯТ. Объект интегрирован в личность Никиты и демонтажу не подлежит.'
      }
    }
  },
  {
    id: 'caution',
    name: 'Осторожность',
    options: {
      future: {
        allowed: true,
        stamp: 'approved',
        stampLabel: 'РАЗРЕШЕНО',
        reaction: 'РАЗРЕШЕНО К ПРОВОЗУ. Полезный инструмент. Позволяет видеть последствия до того, как они начинают дорого стоить.'
      },
      recycle: {
        allowed: false,
        reaction: 'НЕ ТРЕБУЕТ ПЕРЕРАБОТКИ. Исправная осторожность не является дефектом и должна сопровождать владельца дальше.'
      },
      past: {
        allowed: false,
        reaction: 'НЕ РЕКОМЕНДУЕТСЯ. Смелость без осторожности часто маскируется под глупость с хорошим пиаром.'
      }
    }
  },
  {
    id: 'fear_as_caution',
    name: 'Страх пробовать новое под видом разумной осторожности',
    options: {
      future: {
        allowed: false,
        reaction: 'ОТКАЗАНО ВО ВВОЗЕ. Документы поддельные. Это не благоразумие, а страх в деловом костюме.'
      },
      recycle: {
        allowed: false,
        reaction: 'ПЕРЕРАБОТКА НЕ ТРЕБУЕТСЯ. Из этого объекта достаточно извлечь разоблачение: он больше не имеет права называться осторожностью.'
      },
      past: {
        allowed: true,
        stamp: 'confiscated',
        stampLabel: 'КОНФИСКОВАНО',
        reaction: 'КОНФИСКОВАНО. Попытка провезти страх под документами осторожности раскрыта. Настоящая осторожность помогает двигаться. Этот объект только блокирует проход.'
      }
    }
  },
  {
    id: 'past_mistakes',
    name: 'Ошибки прошлого',
    options: {
      future: {
        allowed: false,
        reaction: 'ПРЕВЫШЕН ДОПУСТИМЫЙ ВЕС. Везти с собой ошибки целиком бессмысленно. В багаж допускаются только выводы.'
      },
      recycle: {
        allowed: true,
        stamp: 'recycled',
        stampLabel: 'ПЕРЕРАБОТАНО В ОПЫТ',
        reaction: 'НАПРАВЛЕНО НА ПЕРЕРАБОТКУ. Сами ошибки в багаж не допускаются: слишком тяжёлые и неудобные в переноске. Извлечены понимание последствий, способность меняться и чуть более точный выбор в будущем.'
      },
      past: {
        allowed: false,
        reaction: 'НЕПОЛНАЯ ПРОЦЕДУРА. Просто забыть недостаточно. Сначала необходимо извлечь смысл, иначе груз имеет привычку возвращаться в другой упаковке.'
      }
    }
  },
  {
    id: 'others_expectations',
    name: 'Чужие ожидания относительно того, кем вам уже пора быть',
    options: {
      future: {
        allowed: false,
        reaction: 'ОТКАЗАНО. Таможня не пропускает вещи, которые окружающие пытаются выдать за ваш собственный багаж.'
      },
      recycle: {
        allowed: false,
        reaction: 'ПЕРЕРАБОТКА НЕЦЕЛЕСООБРАЗНА. Нет необходимости извлекать жизненный урок из груза, который изначально принадлежал не вам.'
      },
      past: {
        allowed: true,
        stamp: 'confiscated',
        stampLabel: 'КОНФИСКОВАНО',
        reaction: 'КОНФИСКОВАНО. Владелец груза не установлен. Судя по маркировке, данный багаж вообще принадлежал окружающим.'
      }
    }
  },
  {
    id: 'curiosity',
    name: 'Интерес к разным сферам жизни, знаниям и наукам',
    options: {
      future: {
        allowed: true,
        stamp: 'approved',
        stampLabel: 'ПРИОРИТЕТНЫЙ ПРОВОЗ',
        reaction: 'ПРИОРИТЕТНЫЙ ПРОВОЗ. Объект расширяет обзор, улучшает качество решений и не даёт жить внутри одной случайной версии мира. Рекомендуется использовать регулярно.'
      },
      recycle: {
        allowed: false,
        reaction: 'НЕ НУЖДАЕТСЯ В ПЕРЕРАБОТКЕ. Любопытство в исправном состоянии и пригодно для дальнейшего использования.'
      },
      past: {
        allowed: false,
        reaction: 'ДЕЙСТВИЕ ЗАБЛОКИРОВАНО. Без любопытства следующий год рискует оказаться подозрительно похожим на предыдущий.'
      }
    }
  },
  {
    id: 'scattered',
    name: 'Метаться между всем сразу, ничего не изучая по-настоящему',
    options: {
      future: {
        allowed: false,
        reaction: 'ОТКАЗАНО ВО ВВОЗЕ. Интерес к разным областям разрешён. Хаотичное движение без попытки понять хоть что-нибудь — нет.'
      },
      recycle: {
        allowed: true,
        stamp: 'recycled',
        stampLabel: 'ПЕРЕРАБОТАНО В ОПЫТ',
        reaction: 'НАПРАВЛЕНО НА КОРРЕКТИРОВКУ. Извлечён полезный вывод: широкий взгляд работает только тогда, когда иногда хватает терпения смотреть глубже.'
      },
      past: {
        allowed: true,
        stamp: 'confiscated',
        stampLabel: 'КОНФИСКОВАНО',
        reaction: 'КОНФИСКОВАНО. Бессистемное метание не является развитием, даже если выглядит очень занято.'
      }
    }
  },
  {
    id: 'self_question',
    name: 'Вопрос: "Кто я и чего я действительно хочу?"',
    options: {
      future: {
        allowed: true,
        stamp: 'approved',
        stampLabel: 'РАЗРЕШЕНО',
        reaction: 'РАЗРЕШЕНО К ПРОВОЗУ БЕЗ СРОКА ГОДНОСТИ. Вопрос не требует немедленного окончательного ответа. Достаточно не подменять его чужими готовыми решениями.'
      },
      recycle: {
        allowed: false,
        reaction: 'ПЕРЕРАБОТКА НЕВОЗМОЖНА. Этот вопрос не дефект, а навигационный инструмент.'
      },
      past: {
        allowed: false,
        reaction: 'ОТКАЗАНО. Без этого вопроса существует риск однажды очень успешно прийти не туда.'
      }
    }
  },
  {
    id: 'clarity_demand',
    name: 'Требование полностью разобраться в жизни до того, как начать действовать',
    options: {
      future: {
        allowed: false,
        reaction: 'НЕ РЕКОМЕНДУЕТСЯ К ПРОВОЗУ. Данный груз способен бесконечно удерживать пассажира на месте под предлогом подготовки к движению.'
      },
      recycle: {
        allowed: true,
        stamp: 'recycled',
        stampLabel: 'ПЕРЕРАБОТАНО В ОПЫТ',
        reaction: 'НАПРАВЛЕНО НА КОРРЕКТИРОВКУ. Осторожное размышление сохранено. Требование абсолютной ясности удалено как технически невыполнимое.'
      },
      past: {
        allowed: true,
        stamp: 'confiscated',
        stampLabel: 'КОНФИСКОВАНО',
        reaction: 'КОНФИСКОВАНО. Полная определённость до начала пути не обнаружена ни у одного пассажира за всю историю контроля.'
      }
    }
  },
  {
    id: 'self_revision',
    name: 'Способность пересматривать себя и меняться с учётом прожитого',
    options: {
      future: {
        allowed: true,
        stamp: 'approved',
        stampLabel: 'РАЗРЕШЕНО',
        reaction: 'РАЗРЕШЕНО К ПРОВОЗУ. Ценный объект. Не имеет ничего общего с отказом от себя. Напротив, подтверждает, что владелец не застрял в старой версии.'
      },
      recycle: {
        allowed: false,
        reaction: 'НЕ ТРЕБУЕТ ПЕРЕРАБОТКИ. Способность меняться уже является результатом правильно обработанного опыта.'
      },
      past: {
        allowed: false,
        reaction: 'ОТКАЗАНО. Запретить себе меняться — слишком странный способ двигаться в будущее.'
      }
    }
  },
  {
    id: 'foresight',
    name: 'Умение думать о будущем и видеть последствия решений',
    options: {
      future: {
        allowed: true,
        stamp: 'approved',
        stampLabel: 'РАЗРЕШЕНО',
        reaction: 'РАЗРЕШЕНО. Помогает отличать красивый импульс от хорошего решения. Не следует путать с тревожной попыткой контролировать каждую случайность.'
      },
      recycle: {
        allowed: false,
        reaction: 'НЕ ТРЕБУЕТ КОРРЕКТИРОВКИ. Планирование признано исправным при условии, что не блокирует жизнь полностью.'
      },
      past: {
        allowed: false,
        reaction: 'ОТКАЗАНО. Будущее всё равно наступит. Выгоднее встретить его не совершенно неподготовленным.'
      }
    }
  },
  {
    id: 'readiness',
    name: 'Готовность действовать, когда решение созрело',
    options: {
      future: {
        allowed: true,
        stamp: 'approved',
        stampLabel: 'ОСОБАЯ ВАЖНОСТЬ',
        reaction: 'РАЗРЕШЕНО. ОСОБАЯ ВАЖНОСТЬ. Размышления прокладывают маршрут. Но границу пересекают всё-таки ногами.'
      },
      recycle: {
        allowed: false,
        reaction: 'НЕ ПОДЛЕЖИТ ПЕРЕРАБОТКЕ. Готовность действовать является рабочим механизмом, а не избыточным грузом.'
      },
      past: {
        allowed: false,
        reaction: 'ПРОЦЕДУРА НЕ МОЖЕТ БЫТЬ ЗАВЕРШЕНА. Пассажир, который только думает о переходе, формально остаётся в предыдущем секторе.'
      }
    }
  }
];

const LOGIC_TRIALS = [
  {
    id: 'caution_vs_fear',
    title: 'Осторожность или страх?',
    situation: 'Вам предлагают новое направление, которое интересно, но потребует усилий и несёт определённый риск.',
    stamp: 'ОСМОТРИТЕЛЬНОСТЬ',
    type: 'choice',
    options: [
      {
        id: 'a', text: 'Немедленно согласиться: думать будем после последствий.',
        correct: false,
        reaction: 'НЕ ПРОЙДЕНО. Импульсивность — это не смелость, а решение передать последствия будущей версии себя.'
      },
      {
        id: 'b', text: 'Отказаться заранее: неизвестность подозрительна сама по себе.',
        correct: false,
        reaction: 'НЕ ПРОЙДЕНО. Неизвестность требует проверки, а не автоматического запрета на въезд.'
      },
      {
        id: 'c', text: 'Узнать больше, оценить риски и возможности, а затем принять собственное решение.',
        correct: true,
        reaction: 'ПРОВЕРКА ПРОЙДЕНА. Осторожность не запрещает движение. Она просто просит включить свет перед тем, как идти по лестнице.'
      }
    ]
  },
  {
    id: 'exploration_route',
    title: 'Маршрут исследования',
    situation: 'Никиту заинтересовала новая область знаний. Необходимо составить маршрут так, чтобы любопытство превратилось в развитие, а не в хаотичное коллекционирование случайных фактов.',
    stamp: 'ЛЮБОПЫТСТВО',
    type: 'sort',
    items: [
      { id: 'step1', text: 'Сделать собственный вывод.' },
      { id: 'step2', text: 'Применить или проверить интерес на практике.' },
      { id: 'step3', text: 'Заметить, что тема действительно зацепила.' },
      { id: 'step4', text: 'Узнать о новой области больше.' }
    ],
    correctOrder: ['step3', 'step4', 'step2', 'step1'],
    wrongReaction: 'МАРШРУТ НЕ СОГЛАСОВАН. Развитие обычно начинается с интереса, продолжается изучением и проверкой, а не с готового вывода, оформленного до знакомства с предметом.',
    correctReaction: 'ПРОВЕРКА ПРОЙДЕНА. Интерес к разным вещам — не рассеянность, если однажды ты позволяешь себе остановиться и понять их глубже.'
  },
  {
    id: 'error_archive',
    title: 'Архив ошибок',
    situation: 'В архив поступило событие из прошлого, завершившееся не так, как хотелось. Выберите корректный способ хранения.',
    stamp: 'ОПЫТ',
    type: 'choice',
    options: [
      {
        id: 'a', text: 'Хранить в папке "Почему я всё испортил" и регулярно пересматривать.',
        correct: false,
        reaction: 'ОТКЛОНЕНО. Архив предназначен для хранения выводов, а не для организации пожизненного внутреннего суда.'
      },
      {
        id: 'b', text: 'Удалить без просмотра, чтобы случайно ничего не понять.',
        correct: false,
        reaction: 'ОТКЛОНЕНО. Необработанный опыт имеет неприятную привычку возвращаться под новым названием.'
      },
      {
        id: 'c', text: 'Извлечь вывод, изменить то, что можно изменить в будущем, и закрыть дело без пожизненного самосуда.',
        correct: true,
        reaction: 'ПРОВЕРКА ПРОЙДЕНА. Прошлое имеет право быть учителем. Но ему не выдаётся разрешение работать надзирателем.'
      },
      {
        id: 'd', text: 'Переименовать файл в "Так было задумано".',
        correct: false,
        reaction: 'ОТКЛОНЕНО. Красивое название не превращает ошибку в стратегию. Хотя попытка бюрократически элегантная.'
      }
    ]
  },
  {
    id: 'when_to_act',
    title: 'Когда пора действовать',
    situation: 'Вы изучили направление, поняли основные риски, чувствуете, что это ваше решение, но стопроцентной гарантии результата нет.',
    stamp: 'ДЕЙСТВИЕ',
    type: 'choice',
    options: [
      {
        id: 'a', text: 'Подождать абсолютной уверенности.',
        correct: false,
        reaction: 'ОТКЛОНЕНО. Абсолютная уверенность не прибыла ни одним известным рейсом.'
      },
      {
        id: 'b', text: 'Действовать бездумно, потому что сомнения раздражают.',
        correct: false,
        reaction: 'ОТКЛОНЕНО. Усталость от размышлений не является основанием для случайного маршрута.'
      },
      {
        id: 'c', text: 'Принять, что гарантий нет, и сделать обдуманный шаг.',
        correct: true,
        reaction: 'ПРОВЕРКА ПРОЙДЕНА. Думать о пути важно. Но однажды нужно перестать стоять у карты и начать идти.'
      },
      {
        id: 'd', text: 'Составить ещё пятнадцать таблиц и назвать это движением.',
        correct: false,
        reaction: 'ОТКЛОНЕНО. Подготовка признана избыточной. Таблицы не пересекают границу вместо пассажира.'
      }
    ]
  }
];

const DECLARATION_ITEMS = [
  {
    id: 'd1',
    title: 'Ясная голова',
    description: 'Чтобы отличать собственные решения от чужого давления и красивых, но пустых обещаний.'
  },
  {
    id: 'd2',
    title: 'Осторожность',
    description: 'Чтобы замечать последствия заранее, но не отказываться от пути только потому, что он новый.'
  },
  {
    id: 'd3',
    title: 'Интерес к миру',
    description: 'Чтобы узнавать науки, идеи, людей и способы смотреть на жизнь шире привычного маршрута.'
  },
  {
    id: 'd4',
    title: 'Вопросы к себе',
    description: 'Чтобы иногда честно спрашивать: кто я сейчас, чего я хочу и куда действительно собираюсь идти.'
  },
  {
    id: 'd5',
    title: 'Терпение к поиску',
    description: 'Чтобы не требовать от себя всех ответов немедленно и не считать размышления признаком слабости.'
  },
  {
    id: 'd6',
    title: 'Способность меняться',
    description: 'Чтобы не быть пленником старых решений и позволять себе становиться точнее, сильнее и свободнее.'
  },
  {
    id: 'd7',
    title: 'Свобода от прошлых ошибок',
    description: 'Чтобы помнить урок, но не жить внутри приговора, который никто не обязан продолжать исполнять.'
  },
  {
    id: 'd8',
    title: 'Смелость действия',
    description: 'Чтобы, когда время придёт и решение станет своим, не остаться на месте только из-за привычки сомневаться.'
  },
  {
    id: 'd9',
    title: 'Хорошие возможности',
    description: 'Чтобы в жизни появлялись направления, люди и события, которые действительно стоят внимания и усилий.'
  },
  {
    id: 'd10',
    title: 'Удача',
    description: 'Потому что человек может быть умным, осторожным и трудолюбивым, но своевременное везение ещё никому не мешало.'
  }
];

// ─── STATE ────────────────────────────────────────────────────────────────────

let state = {
  currentScreen: 'start',
  startPhase: 0,
  identityStep: 0,
  identityCompleted: false,
  baggageIndex: 0,
  baggageChoices: {},
  baggageCompleted: false,
  sortItems: [],
  logicTrialIndex: 0,
  collectedStamps: [],
  logicCompleted: false,
  declarationSelected: [],
  declarationLimitTriggered: false,
  declarationCompleted: false,
  finalPermitShown: false,
  gameCompleted: false
};

function resetState() {
  state = {
    currentScreen: 'start',
    startPhase: 0,
    identityStep: 0,
    identityCompleted: false,
    baggageIndex: 0,
    baggageChoices: {},
    baggageCompleted: false,
    sortItems: [],
    logicTrialIndex: 0,
    collectedStamps: [],
    logicCompleted: false,
    declarationSelected: [],
    declarationLimitTriggered: false,
    declarationCompleted: false,
    finalPermitShown: false,
    gameCompleted: false
  };
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────

const SCREENS = ['identity', 'baggage', 'logic', 'declaration', 'permit'];
const SCREEN_LABELS = ['Проверка личности', 'Досмотр багажа', 'Красный коридор', 'Декларация', 'Разрешение'];

function goToScreen(name) {
  state.currentScreen = name;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + name);
  if (target) {
    target.classList.add('active');
    target.scrollTop = 0;
  }
  updateProgressBar();
  window.scrollTo(0, 0);
}

function updateProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  const screenToStep = {
    'identity': 0, 'baggage': 1, 'baggageReport': 1,
    'logic': 2, 'logicReport': 2,
    'declaration': 3, 'finalPermit': 4, 'crossedBorder': 4
  };
  const currentStep = screenToStep[state.currentScreen] ?? -1;
  bar.querySelectorAll('.progress-step').forEach((el, i) => {
    el.classList.toggle('active', i === currentStep);
    el.classList.toggle('done', i < currentStep);
  });
  const visible = !['start'].includes(state.currentScreen);
  bar.style.display = visible ? 'flex' : 'none';
}

// ─── SCREEN: START ────────────────────────────────────────────────────────────

function initStartScreen() {
  state.startPhase = 0;
  const lines = [
    'ИНИЦИАЛИЗАЦИЯ ПОГРАНИЧНОЙ СИСТЕМЫ...',
    'Установлено направление перехода:',
    `СЕКТОР ${CONFIG.currentAge} → СЕКТОР ${CONFIG.destinationAge}`,
    `Обнаружен пассажир: ${CONFIG.playerName.toUpperCase()}`,
    'Статус перехода: ПРИОСТАНОВЛЕН'
  ];
  const container = document.getElementById('start-lines');
  container.innerHTML = '';
  const btn = document.getElementById('btn-why-delayed');
  const reasonPanel = document.getElementById('start-reason');
  const btnStart = document.getElementById('btn-start-control');
  btn.style.display = 'none';
  reasonPanel.style.display = 'none';
  btnStart.style.display = 'none';

  let delay = 0;
  lines.forEach((line, i) => {
    delay += i === 0 ? 300 : 600;
    setTimeout(() => {
      const p = document.createElement('p');
      p.className = 'terminal-line' + (i === 2 ? ' highlight' : '') + (i === 4 ? ' status-warn' : '');
      p.textContent = line;
      container.appendChild(p);
      if (i === lines.length - 1) {
        setTimeout(() => { btn.style.display = 'block'; }, 400);
      }
    }, delay);
  });

  btn.onclick = () => {
    btn.style.display = 'none';
    reasonPanel.style.display = 'block';
    setTimeout(() => { btnStart.style.display = 'block'; }, 300);
  };

  btnStart.onclick = () => {
    initIdentityScreen();
    goToScreen('identity');
  };
}

// ─── SCREEN: IDENTITY ─────────────────────────────────────────────────────────

function initIdentityScreen() {
  state.identityStep = 0;
  renderIdentityQuestion();
}

function renderIdentityQuestion() {
  const q = IDENTITY_QUESTIONS[state.identityStep];
  const container = document.getElementById('identity-question-area');
  container.innerHTML = '';

  const title = document.createElement('div');
  title.className = 'question-number';
  title.textContent = `Вопрос ${state.identityStep + 1} из ${IDENTITY_QUESTIONS.length}`;
  container.appendChild(title);

  const qText = document.createElement('h3');
  qText.className = 'question-text';
  qText.textContent = q.text;
  container.appendChild(qText);

  const opts = document.createElement('div');
  opts.className = 'options-list';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.text;
    btn.onclick = () => handleIdentityAnswer(opt, opts, container);
    opts.appendChild(btn);
  });
  container.appendChild(opts);

  const feedback = document.createElement('div');
  feedback.id = 'identity-feedback';
  feedback.className = 'feedback-panel hidden';
  container.appendChild(feedback);
}

function handleIdentityAnswer(opt, optsEl, container) {
  const feedback = container.querySelector('#identity-feedback');
  optsEl.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

  if (opt.correct) {
    feedback.className = 'feedback-panel success';
    feedback.innerHTML = `<span class="feedback-status">✓ ПРИНЯТО</span><p>${opt.reaction}</p>`;
    const next = document.createElement('button');
    next.className = 'btn-primary mt-16';
    if (state.identityStep < IDENTITY_QUESTIONS.length - 1) {
      next.textContent = 'Продолжить';
      next.onclick = () => {
        state.identityStep++;
        renderIdentityQuestion();
      };
    } else {
      next.textContent = 'Открыть чемодан';
      next.onclick = () => {
        state.identityCompleted = true;
        initBaggageScreen();
        goToScreen('baggage');
      };
      feedback.insertAdjacentHTML('beforeend', `
        <div class="identity-done">
          <div class="stamp-inline approved-stamp">ЛИЧНОСТЬ ПОДТВЕРЖДЕНА</div>
          <p>Пассажир ${CONFIG.playerName} допущен к досмотру жизненного багажа.</p>
        </div>
      `);
    }
    feedback.appendChild(next);
  } else {
    feedback.className = 'feedback-panel error';
    feedback.innerHTML = `<span class="feedback-status">✗ ОТКЛОНЕНО</span><p>${opt.reaction}</p>`;
    const retry = document.createElement('button');
    retry.className = 'btn-secondary mt-16';
    retry.textContent = 'Попробовать снова';
    retry.onclick = () => {
      optsEl.querySelectorAll('.option-btn').forEach(b => { b.disabled = false; });
      feedback.className = 'feedback-panel hidden';
    };
    feedback.appendChild(retry);
  }
}

// ─── SCREEN: BAGGAGE ──────────────────────────────────────────────────────────

function initBaggageScreen() {
  state.baggageIndex = 0;
  renderBaggageItem();
}

function renderBaggageItem() {
  const item = BAGGAGE_ITEMS[state.baggageIndex];
  const total = BAGGAGE_ITEMS.length;

  document.getElementById('baggage-progress').textContent =
    `Предмет ${state.baggageIndex + 1} из ${total}`;

  const nameEl = document.getElementById('baggage-item-name');
  nameEl.textContent = item.name;

  const scanner = document.querySelector('.scanner-beam');
  if (scanner) {
    scanner.classList.remove('scanning');
    void scanner.offsetWidth;
    scanner.classList.add('scanning');
  }

  const feedback = document.getElementById('baggage-feedback');
  feedback.className = 'feedback-panel hidden';
  feedback.innerHTML = '';

  const btns = document.getElementById('baggage-btns');
  btns.querySelectorAll('button').forEach(b => b.disabled = false);

  const zones = document.getElementById('baggage-zones');
  updateBaggageZones(zones);
}

function updateBaggageZones(zones) {
  if (!zones) return;
  const futureList = zones.querySelector('#zone-future ul');
  const recycleList = zones.querySelector('#zone-recycle ul');
  const pastList = zones.querySelector('#zone-past ul');
  if (!futureList || !recycleList || !pastList) return;
  futureList.innerHTML = '';
  recycleList.innerHTML = '';
  pastList.innerHTML = '';
  Object.entries(state.baggageChoices).forEach(([id, choice]) => {
    const item = BAGGAGE_ITEMS.find(i => i.id === id);
    if (!item) return;
    const li = document.createElement('li');
    li.textContent = item.name;
    if (choice === 'future') futureList.appendChild(li);
    else if (choice === 'recycle') recycleList.appendChild(li);
    else if (choice === 'past') pastList.appendChild(li);
  });
}

function handleBaggageChoice(zone) {
  const item = BAGGAGE_ITEMS[state.baggageIndex];
  const opt = item.options[zone];
  const feedback = document.getElementById('baggage-feedback');
  const btns = document.getElementById('baggage-btns');
  btns.querySelectorAll('button').forEach(b => b.disabled = true);

  if (opt.allowed) {
    state.baggageChoices[item.id] = zone;
    feedback.className = 'feedback-panel success';
    feedback.innerHTML = `
      <div class="stamp-badge stamp-${opt.stamp}">${opt.stampLabel}</div>
      <p>${opt.reaction}</p>
    `;
    const nextBtn = document.createElement('button');
    const isLast = state.baggageIndex >= BAGGAGE_ITEMS.length - 1;
    nextBtn.className = 'btn-primary mt-16';
    nextBtn.textContent = isLast ? 'Завершить досмотр' : 'Следующий предмет';
    nextBtn.onclick = () => {
      if (isLast) {
        state.baggageCompleted = true;
        renderBaggageReport();
        goToScreen('baggageReport');
      } else {
        state.baggageIndex++;
        renderBaggageItem();
      }
    };
    feedback.appendChild(nextBtn);
    updateBaggageZones(document.getElementById('baggage-zones'));
  } else {
    feedback.className = 'feedback-panel error';
    feedback.innerHTML = `<span class="feedback-status">✗ ОТКЛОНЕНО</span><p>${opt.reaction}</p>`;
    const retryBtn = document.createElement('button');
    retryBtn.className = 'btn-secondary mt-16';
    retryBtn.textContent = 'Выбрать иначе';
    retryBtn.onclick = () => {
      btns.querySelectorAll('button').forEach(b => b.disabled = false);
      feedback.className = 'feedback-panel hidden';
    };
    feedback.appendChild(retryBtn);
  }
}

// ─── SCREEN: BAGGAGE REPORT ───────────────────────────────────────────────────

function renderBaggageReport() {
  const future = [], recycle = [], past = [];
  BAGGAGE_ITEMS.forEach(item => {
    const choice = state.baggageChoices[item.id];
    const opt = item.options[choice];
    if (!opt || !opt.allowed) return;
    if (choice === 'future') future.push({ item, opt });
    else if (choice === 'recycle') recycle.push({ item, opt });
    else if (choice === 'past') past.push({ item, opt });
  });

  function renderSection(arr, title, stampClass) {
    if (!arr.length) return '';
    return `
      <div class="report-section">
        <h3 class="report-section-title">${title}</h3>
        <ul class="report-items">
          ${arr.map(({ item, opt }) =>
            `<li><span class="stamp-mini stamp-${opt.stamp}">${opt.stampLabel}</span> ${item.name}</li>`
          ).join('')}
        </ul>
      </div>`;
  }

  const html = `
    <div class="report-sections">
      ${renderSection(future, 'РАЗРЕШЕНО ВЗЯТЬ В БУДУЩЕЕ', 'approved')}
      ${renderSection(recycle, 'ПЕРЕРАБОТАНО В ОПЫТ', 'recycled')}
      ${renderSection(past, 'ОСТАВЛЕНО В ПРОШЛОМ', 'confiscated')}
    </div>
  `;
  document.getElementById('baggage-report-sections').innerHTML = html;
}

// ─── SCREEN: LOGIC ────────────────────────────────────────────────────────────

function initLogicScreen() {
  state.logicTrialIndex = 0;
  state.collectedStamps = [];
  renderLogicTrial();
  renderStampSlots();
}

function renderStampSlots() {
  const slots = document.getElementById('stamp-slots');
  slots.innerHTML = LOGIC_TRIALS.map((t, i) => `
    <div class="stamp-slot ${state.collectedStamps.includes(t.stamp) ? 'filled' : ''}" id="slot-${i}">
      <div class="stamp-slot-label">${t.stamp}</div>
    </div>
  `).join('');
}

function renderLogicTrial() {
  const trial = LOGIC_TRIALS[state.logicTrialIndex];
  const numEl = document.getElementById('logic-trial-num');
  if (numEl) numEl.textContent = `Испытание ${state.logicTrialIndex + 1} из ${LOGIC_TRIALS.length}`;
  document.getElementById('logic-trial-title').textContent = trial.title;
  document.getElementById('logic-trial-situation').textContent = trial.situation;

  const area = document.getElementById('logic-trial-area');
  area.innerHTML = '';

  if (trial.type === 'choice') {
    renderLogicChoiceTrial(trial, area);
  } else if (trial.type === 'sort') {
    state.sortItems = [...trial.items];
    renderLogicSortTrial(trial, area);
  }
}

function renderLogicChoiceTrial(trial, area) {
  const feedback = document.createElement('div');
  feedback.className = 'feedback-panel hidden';

  const opts = document.createElement('div');
  opts.className = 'options-list';
  trial.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.text;
    btn.onclick = () => {
      opts.querySelectorAll('button').forEach(b => b.disabled = true);
      if (opt.correct) {
        feedback.className = 'feedback-panel success';
        feedback.innerHTML = `<span class="feedback-status">✓ ПРОЙДЕНО</span><p>${opt.reaction}</p>`;
        awardStamp(trial.stamp, feedback);
      } else {
        feedback.className = 'feedback-panel error';
        feedback.innerHTML = `<span class="feedback-status">✗ НЕ ПРОЙДЕНО</span><p>${opt.reaction}</p>`;
        const retry = document.createElement('button');
        retry.className = 'btn-secondary mt-16';
        retry.textContent = 'Попробовать снова';
        retry.onclick = () => {
          opts.querySelectorAll('button').forEach(b => b.disabled = false);
          feedback.className = 'feedback-panel hidden';
        };
        feedback.appendChild(retry);
      }
    };
    opts.appendChild(btn);
  });

  area.appendChild(opts);
  area.appendChild(feedback);
}

function renderLogicSortTrial(trial, area) {
  const list = document.createElement('div');
  list.className = 'sort-list';
  list.id = 'sort-list';

  function renderList() {
    list.innerHTML = '';
    state.sortItems.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'sort-row';
      row.innerHTML = `
        <span class="sort-num">${index + 1}.</span>
        <span class="sort-text">${item.text}</span>
        <div class="sort-controls">
          <button class="sort-btn" ${index === 0 ? 'disabled' : ''} onclick="moveSort(${index}, -1)" aria-label="Переместить вверх">↑</button>
          <button class="sort-btn" ${index === state.sortItems.length - 1 ? 'disabled' : ''} onclick="moveSort(${index}, 1)" aria-label="Переместить вниз">↓</button>
        </div>
      `;
      list.appendChild(row);
    });
  }
  renderList();
  window._renderSortList = renderList;

  const checkBtn = document.createElement('button');
  checkBtn.className = 'btn-primary mt-16';
  checkBtn.textContent = 'Проверить порядок';

  const feedback = document.createElement('div');
  feedback.className = 'feedback-panel hidden';

  checkBtn.onclick = () => {
    const current = state.sortItems.map(i => i.id);
    const correct = trial.correctOrder;
    const isCorrect = current.every((id, i) => id === correct[i]);
    if (isCorrect) {
      feedback.className = 'feedback-panel success';
      feedback.innerHTML = `<span class="feedback-status">✓ ПРОЙДЕНО</span><p>${trial.correctReaction}</p>`;
      awardStamp(trial.stamp, feedback);
    } else {
      feedback.className = 'feedback-panel error';
      feedback.innerHTML = `<span class="feedback-status">✗ НЕ ПРОЙДЕНО</span><p>${trial.wrongReaction}</p>`;
      setTimeout(() => feedback.querySelector && null, 100);
    }
  };

  area.appendChild(list);
  area.appendChild(checkBtn);
  area.appendChild(feedback);
}

window.moveSort = function(index, direction) {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= state.sortItems.length) return;
  const tmp = state.sortItems[index];
  state.sortItems[index] = state.sortItems[newIndex];
  state.sortItems[newIndex] = tmp;
  if (window._renderSortList) window._renderSortList();
};

function awardStamp(stampName, feedback) {
  state.collectedStamps.push(stampName);
  renderStampSlots();
  const isLast = state.logicTrialIndex >= LOGIC_TRIALS.length - 1;
  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn-primary mt-16';
  nextBtn.textContent = isLast ? 'Перейти к итогам' : 'Следующая проверка';
  nextBtn.onclick = () => {
    if (isLast) {
      state.logicCompleted = true;
      renderLogicReport();
      goToScreen('logicReport');
    } else {
      state.logicTrialIndex++;
      renderLogicTrial();
    }
  };
  feedback.appendChild(nextBtn);
}

// ─── SCREEN: LOGIC REPORT ────────────────────────────────────────────────────

function renderLogicReport() {
  const stamps = document.getElementById('logic-report-stamps');
  stamps.innerHTML = state.collectedStamps.map(s =>
    `<div class="stamp-badge-large">${s}</div>`
  ).join('');
}

// ─── SCREEN: DECLARATION ─────────────────────────────────────────────────────

function initDeclarationScreen() {
  state.declarationSelected = [];
  state.declarationLimitTriggered = false;
  state.declarationCompleted = false;
  renderDeclarationItems();
}

function renderDeclarationItems() {
  const grid = document.getElementById('declaration-grid');
  const msg = document.getElementById('declaration-limit-msg');
  const confirmBtn = document.getElementById('btn-confirm-declaration');
  const doneMsg = document.getElementById('declaration-done-msg');
  const nextBtn = document.getElementById('btn-declaration-next');
  msg.style.display = 'none';
  confirmBtn.style.display = 'none';
  doneMsg.style.display = 'none';
  nextBtn.style.display = 'none';

  grid.innerHTML = DECLARATION_ITEMS.map(item => `
    <div class="decl-card ${state.declarationSelected.includes(item.id) ? 'selected' : ''}"
         id="decl-${item.id}"
         role="button"
         tabindex="0"
         onclick="toggleDeclaration('${item.id}')"
         onkeydown="if(event.key==='Enter'||event.key===' ')toggleDeclaration('${item.id}')">
      <div class="decl-card-title">${item.title}</div>
      <div class="decl-card-desc">${item.description}</div>
      <div class="decl-stamp ${state.declarationSelected.includes(item.id) ? 'visible' : ''}">ЗАЯВЛЕНО</div>
    </div>
  `).join('');
}

window.toggleDeclaration = function(id) {
  if (state.declarationCompleted) return;
  if (state.declarationLimitTriggered) return;

  const idx = state.declarationSelected.indexOf(id);
  if (idx > -1) {
    state.declarationSelected.splice(idx, 1);
  } else {
    if (state.declarationSelected.length >= 6) return;
    state.declarationSelected.push(id);
  }

  renderDeclarationItems();

  if (state.declarationSelected.length === 6 && !state.declarationLimitTriggered) {
    state.declarationLimitTriggered = true;
    showDeclarationLimitMessage();
  }
};

function showDeclarationLimitMessage() {
  const msg = document.getElementById('declaration-limit-msg');
  const confirmBtn = document.getElementById('btn-confirm-declaration');
  msg.style.display = 'block';
  confirmBtn.style.display = 'block';
  document.getElementById('declaration-grid').querySelectorAll('.decl-card').forEach(el => {
    el.style.pointerEvents = 'none';
  });
  confirmBtn.onclick = () => {
    approveAllDeclaration();
  };
}

function approveAllDeclaration() {
  state.declarationSelected = DECLARATION_ITEMS.map(i => i.id);
  state.declarationCompleted = true;
  state.declarationLimitTriggered = false;
  const grid = document.getElementById('declaration-grid');
  grid.innerHTML = DECLARATION_ITEMS.map(item => `
    <div class="decl-card selected approved" id="decl-${item.id}">
      <div class="decl-card-title">${item.title}</div>
      <div class="decl-card-desc">${item.description}</div>
      <div class="decl-stamp visible">ОДОБРЕНО К ВВОЗУ</div>
    </div>
  `).join('');
  document.getElementById('declaration-limit-msg').style.display = 'none';
  document.getElementById('btn-confirm-declaration').style.display = 'none';
  document.getElementById('declaration-done-msg').style.display = 'block';
  document.getElementById('btn-declaration-next').style.display = 'block';
}

// ─── SCREEN: FINAL PERMIT ────────────────────────────────────────────────────

function initFinalPermitScreen() {
  state.finalPermitShown = true;
  setTimeout(() => {
    const stamp = document.getElementById('final-stamp');
    if (stamp) stamp.classList.add('stamp-animate');
  }, 800);
}

// ─── SCREEN: CROSSED BORDER ──────────────────────────────────────────────────

function initCrossedBorderScreen() {
  state.gameCompleted = true;
  setTimeout(() => {
    const gateLeft = document.getElementById('gate-panel-left');
    const gateRight = document.getElementById('gate-panel-right');
    if (gateLeft) gateLeft.classList.add('open');
    if (gateRight) gateRight.classList.add('open');
    setTimeout(() => {
      const glow = document.getElementById('gate-glow');
      if (glow) glow.classList.add('visible');
      const text = document.getElementById('border-final-text');
      if (text) text.classList.add('visible');
    }, 800);
  }, 400);
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  goToScreen('start');
  updateProgressBar();
  initStartScreen();

  // Progress bar render
  const bar = document.getElementById('progress-bar');
  if (bar) {
    bar.innerHTML = SCREEN_LABELS.map((label, i) => `
      <div class="progress-step" data-step="${i}">
        <div class="progress-dot"></div>
        <div class="progress-label">${label}</div>
      </div>
    `).join('');
  }
  updateProgressBar();

  // Global button wiring
  document.getElementById('btn-open-baggage')?.addEventListener('click', () => {
    initBaggageScreen();
    goToScreen('baggage');
  });
  document.getElementById('btn-to-baggage-report')?.addEventListener('click', () => {
    renderBaggageReport();
    goToScreen('baggageReport');
  });
  document.getElementById('btn-to-logic')?.addEventListener('click', () => {
    initLogicScreen();
    goToScreen('logic');
  });
  document.getElementById('btn-to-logic-report')?.addEventListener('click', () => {
    renderLogicReport();
    goToScreen('logicReport');
  });
  document.getElementById('btn-to-declaration')?.addEventListener('click', () => {
    initDeclarationScreen();
    goToScreen('declaration');
  });
  document.getElementById('btn-declaration-next')?.addEventListener('click', () => {
    initFinalPermitScreen();
    goToScreen('finalPermit');
  });
  document.getElementById('btn-cross-border')?.addEventListener('click', () => {
    initCrossedBorderScreen();
    goToScreen('crossedBorder');
  });
  document.getElementById('btn-restart')?.addEventListener('click', () => {
    resetState();
    initStartScreen();
    goToScreen('start');
    updateProgressBar();
  });

  // Baggage choice buttons
  document.getElementById('btn-future')?.addEventListener('click', () => handleBaggageChoice('future'));
  document.getElementById('btn-recycle')?.addEventListener('click', () => handleBaggageChoice('recycle'));
  document.getElementById('btn-past')?.addEventListener('click', () => handleBaggageChoice('past'));
});
