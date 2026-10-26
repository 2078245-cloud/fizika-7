(() => {
  "use strict";

  const STORAGE_KEY = "fizika7-progress-v1";

  const lessons = [
    {
      id: "intro-1",
      title: "Предмет и материал",
      tag: "Вводное занятие 1",
      description: "Начинаем с LEGO и пластилина.",
      content: `
        <p>
          Возьми кусочек пластилина или представь его.
          Из него можно сделать шар, рыбку или лодочку.
        </p>

        <h3>Одна новая мысль</h3>

        <p>
          Шар и лодочка — разные предметы.
          В физике отдельный предмет называют
          <strong>физическим телом</strong>.
        </p>

        <p>
          Пластилин — материал этих предметов.
          Изменяя форму, ты не обязательно меняешь материал.
        </p>

        <p>
          Ещё пример: деталь LEGO — предмет,
          а пластмасса — материал, из которого она изготовлена.
        </p>
      `,
      question: "Ты слепил из пластилинового шара лодочку. Что изменилось?",
      answers: [
        "Форма предмета. Материал остался пластилином.",
        "Пластилин превратился в воду."
      ],
      correct: 0,
      success: "Верно! Предмет получил другую форму, но материал остался прежним.",
      hint: "Посмотри на лодочку: она всё ещё пластилиновая. Изменение формы не превращает пластилин в воду.",
      activity: "Найди два разных предмета из одного материала. Назови их вслух."
    },

    {
      id: "intro-2",
      title: "Измеряем, а не угадываем",
      tag: "Вводное занятие 2",
      description: "Измеряем небольшую постройку.",
      content: `
        <p>
          Построй небольшую модель из LEGO
          или возьми карандаш.
          Попробуй сначала предположить его длину.
        </p>

        <h3>Теперь проверим</h3>

        <p>
          Приложи линейку так, чтобы начало предмета
          совпало с нулевой отметкой.
          Ноль не всегда находится на самом краю линейки.
        </p>

        <p>
          Посмотри, возле какой отметки расположен
          другой конец предмета.
        </p>

        <p>
          Записывать нужно и число, и единицу.
          Например: «длина 12 см».
          Это пример записи, а не готовый результат твоего измерения.
        </p>

        <p>
          Если линейки сейчас нет,
          представь предмет, который начинается на отметке 0 см
          и заканчивается на отметке 8 см.
        </p>
      `,
      question: "Предмет начинается на отметке 0 см и заканчивается на 8 см. Как записать длину?",
      answers: [
        "8",
        "8 см"
      ],
      correct: 1,
      success: "Верно! В записи есть и число, и единица длины.",
      hint: "Числа без единицы недостаточно: 8 метров и 8 сантиметров — разные длины.",
      activity: "Если есть линейка, измерь один предмет. Сравни результат со своим предположением. Ошибиться в предположении — нормально."
    },

    {
      id: "intro-3",
      title: "Время и единицы",
      tag: "Вводное занятие 3",
      description: "Спокойно разбираемся с минутами и секундами.",
      content: `
        <p>
          Представь, что перед походом вы договариваетесь:
          «Через две минуты выходим».
        </p>

        <h3>Как выразить это время в секундах?</h3>

        <p>
          В одной минуте 60 секунд.
          В двух минутах — два таких промежутка.
        </p>

        <p>
          Складываем: 60 + 60 = 120 секунд.
        </p>

        <p>
          То же действие можно записать короче:
          2 × 60 = 120.
        </p>

        <p>
          Теперь попробуй похожий пример самостоятельно.
          Скорость ответа не важна.
        </p>
      `,
      question: "Сколько секунд в трёх минутах?",
      answers: [
        "180 секунд",
        "30 секунд",
        "63 секунды"
      ],
      correct: 0,
      success: "Верно! Три раза по 60: 60 + 60 + 60 = 180 секунд.",
      hint: "Каждая минута содержит 60 секунд. Нужно взять 60 три раза, а не прибавить 3 к 60.",
      activity: "Объясни вслух, как перевести четыре минуты в секунды. Если трудно, нарисуй четыре отрезка по одной минуте."
    }
  ];

  const main = document.querySelector("main");

  if (!main) {
    return;
  }

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

      if (!saved || typeof saved !== "object") {
        return { completed: [], lastLesson: null };
      }

      const knownIds = new Set(lessons.map((lesson) => lesson.id));

      return {
        completed: Array.isArray(saved.completed)
          ? [...new Set(saved.completed.filter((id) => knownIds.has(id)))]
          : [],
        lastLesson: knownIds.has(saved.lastLesson)
          ? saved.lastLesson
          : null
      };
    } catch {
      return { completed: [], lastLesson: null };
    }
  }

  let progress = loadProgress();
  let storageWarning = false;

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      storageWarning = false;
    } catch {
      storageWarning = true;
    }
  }

  function moveToTop() {
    window.scrollTo(0, 0);
  }

  function showHome() {
    const completedCount = progress.completed.length;

    main.innerHTML = `
      <section class="card">
        <span class="tag">Твой учебник</span>
        <h2>Начинаем с понятного</h2>

        <p>
          Сейчас доступны три вводных занятия.
          Проходи их по порядку, без спешки.
        </p>

        <p class="muted">
          Выполнено вводных заданий:
          ${completedCount} из ${lessons.length}.
          Это отметки о выполнении, а не школьные оценки.
        </p>

        <button id="continue-button" class="button-primary" type="button">
          ${progress.lastLesson ? "Продолжить занятие" : "Начать с нуля"}
        </button>
      </section>

      <section class="card">
        <h2>Вводные занятия</h2>
        <div id="lesson-list"></div>
      </section>

      <section class="card">
        <h2>Как заниматься</h2>
        <p>
          Прочитай короткое объяснение.
          Попробуй ответить.
          Если ошибёшься, получишь подсказку.
          Затем попробуй ещё раз.
        </p>
        <p>
          Здесь нет таймера:
          можно остановиться и вернуться позже.
        </p>
      </section>

      <section class="card">
        <h2>О сохранении</h2>
        <p class="muted">
          Прогресс хранится только в этом браузере
          на этом устройстве.
          При очистке данных сайта он может исчезнуть.
          В другом браузере или на другом устройстве
          он автоматически не появится.
        </p>
        ${
          storageWarning
            ? '<p role="status" class="feedback hint">Браузер не разрешил сохранить прогресс. Пока он доступен только до закрытия или обновления страницы.</p>'
            : ""
        }
      </section>
    `;

    const list = document.getElementById("lesson-list");

    lessons.forEach((lesson, index) => {
      const button = document.createElement("button");
      button.type = "button";

      const completed = progress.completed.includes(lesson.id);

      button.textContent =
        `${index + 1}. ${lesson.title}` +
        (completed ? " — выполнено" : "");

      button.addEventListener("click", () => {
        showLesson(lesson.id);
      });

      list.appendChild(button);
    });

    document.getElementById("continue-button").addEventListener("click", () => {
      showLesson(progress.lastLesson || lessons[0].id);
    });

    moveToTop();
  }

  function showLesson(id) {
    const index = lessons.findIndex((lesson) => lesson.id === id);

    if (index === -1) {
      showHome();
      return;
    }

    const lesson = lessons[index];

    progress.lastLesson = id;
    saveProgress();

    main.innerHTML = `
      <button id="home-button" type="button">
        ← К списку занятий
      </button>

      <section class="card" style="margin-top: 20px;">
        <span class="tag">${lesson.tag}</span>
        <h2>${lesson.title}</h2>
        ${lesson.content}
      </section>

      <section class="card">
        <span class="tag">Попробуй сам</span>
        <h2>${lesson.question}</h2>

        <div id="answers"></div>

        <div
          id="answer-feedback"
          role="status"
          aria-live="polite"
          hidden
        ></div>

        <button
          id="next-button"
          class="button-primary"
          type="button"
          hidden
        >
          ${
            index < lessons.length - 1
              ? "Следующее занятие →"
              : "Завершить вводный блок"
          }
        </button>
      </section>

      <section class="card">
        <h2>Попробуй вне экрана</h2>
        <p>${lesson.activity}</p>
      </section>

      ${
        storageWarning
          ? '<p class="feedback hint" role="status">Прогресс сейчас не сохраняется между посещениями. Само занятие работает.</p>'
          : ""
      }
    `;

    document.getElementById("home-button").addEventListener("click", showHome);

    const answers = document.getElementById("answers");
    const feedback = document.getElementById("answer-feedback");
    const nextButton = document.getElementById("next-button");

    let answeredCorrectly = false;

    lesson.answers.forEach((answer, answerIndex) => {
      const button =
