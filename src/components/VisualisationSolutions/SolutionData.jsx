export const solutionData = {
    'logic-chess-logic': {
      title: 'Шахматная стратегия: Мат в 3 хода',
      description: 'Анализ позиции и последовательность победных действий',
      steps: [
        {
          description: 'Начальная позиция',
          initialBoard: [
            ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
            ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
            ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜']
          ],
          move: null,
          insights: [
            'Белые фигуры имеют стратегическое преимущество',
            'Король противника уязвим для атаки'
          ]
        },
        {
          description: 'Первый стратегический ход',
          initialBoard: [
            ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
            ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, '♟', null, null, null],
            [null, null, null, null, null, null, null, null],
            ['♟', '♟', '♟', '♟', null, '♟', '♟', '♟'],
            ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜']
          ],
          move: {
            from: { row: 6, col: 4 },
            to: { row: 4, col: 4 },
          },
          insights: [
            'Белые открывают путь ферзю.',
            'Белые создают угрозу на центральных полях.',
            'Белые готовят позицию для быстрого нападения.'
          ]
        },
        {
          description: 'Дебютный ход чёрных',
          initialBoard: [
            ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
            ['♙', '♙', '♙', '♙', null, '♙', '♙', '♙'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, '♙', null, null, null],
            [null, null, null, null, '♟', null, null, null],
            [null, null, null, null, null, null, null, null],
            ['♟', '♟', '♟', '♟', null, '♟', '♟', '♟'],
            ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜']
          ],
          move: {
            from: { row: 1, col: 4 },
            to: { row: 3, col: 4 },
          },
          insights: [
            'Чёрные отвечают стандартным ходом, защищая центр.',
            'Черные открывают линию для чёрного ферзя.'
          ]
        },
        {
          description: 'Открытие ферзя белых',
          initialBoard: [
            ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
            ['♙', '♙', '♙', '♙', null, '♙', '♙', '♙'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, '♙', null, null, '♛'],
            [null, null, null, null, '♟', null, null, null],
            [null, null, null, null, null, null, null, null],
            ['♟', '♟', '♟', '♟', null, '♟', '♟', '♟'],
            ['♜', '♞', '♝', null, '♚', '♝', '♞', '♜']
          ],
          move: {
            from: { row: 7, col: 3 },
            to: { row: 3, col: 7 },
          },
          insights: [
            'Белый ферзь перемещается на центральную позицию.',
            'Белые почти сразу ставят шах чёрному королю.'
          ]
        },
        {
          description: 'Опрометчивый ход чёрных',
          initialBoard: [
            ['♖', '♘', '♗', '♕', null, '♗', '♘', '♖'],
            ['♙', '♙', '♙', '♙', '♔', '♙', '♙', '♙'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, '♙', null, null, '♛'],
            [null, null, null, null, '♟', null, null, null],
            [null, null, null, null, null, null, null, null],
            ['♟', '♟', '♟', '♟', null, '♟', '♟', '♟'],
            ['♜', '♞', '♝', null, '♚', '♝', '♞', '♜']
          ],
          move: {
            from: { row: 0, col: 4 },
            to: { row: 1, col: 4 },
          },
          insights: [
            'Черный король делает опрометчивый ход.',
            'Черные ставят себя под риск мата.'
          ]
        },
        {
          description: 'Фатальная победа белых',
          initialBoard: [
            ['♖', '♘', '♗', '♕', null, '♗', '♘', '♖'],
            ['♙', '♙', '♙', '♙', '♔', '♙', '♙', '♙'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, '♛', null, null, null],
            [null, null, null, null, '♟', null, null, null],
            [null, null, null, null, null, null, null, null],
            ['♟', '♟', '♟', '♟', null, '♟', '♟', '♟'],
            ['♜', '♞', '♝', null, '♚', '♝', '♞', '♜']
          ],
          move: {
            from: { row: 3, col: 7 },
            to: { row: 3, col: 4 },
          },
          insights: [
            'Белые ловят на ошибке и ставят мат черному королю.',
            'Игра заканчивается победой белых за три хода.'
          ]
        }
      ]
    },
    'logic-math-reasoning': {
        title: "Математическое моделирование: Алгоритм решения",
        description: "Исследование последовательности вычислений",
        steps: [
            {
                description: "Инициализация параметров",
                insights: [
                    "Определение числа φ (фи)",
                    "Установка начальных координат"
                ],
                formula: "φ = (1 + √5) / 2 ≈ 1.618",
    
                mathematicalDetails: {
    
                    goldenRatio: 1.618,
    
                    startPoint: { x: 0, y: 0 }
    
                }
    
            },
    
            {
    
                description: "Базовый алгоритм роста",
    
                insights: [
    
                    "Экспоненциальный рост радиуса",
    
                    "Постоянный угол поворота"
    
                ],
    
                formula: "r = a * exp(θ / (2π / ln(φ)))",
    
                mathematicalDetails: {
    
                    growthRate: "Экспоненциальный",
    
                    angleIncrement: "2π / ln(φ)"
    
                }
    
            },
    
            {
    
                description: "Параметрическое уравнение",
    
                insights: [
    
                    "Преобразование полярных координат",
    
                    "Расчет декартовых координат"
    
                ],
    
                formula: [
    
                    "x = r * cos(θ)",
    
                    "y = r * sin(θ)"
    
                ],
    
                mathematicalDetails: {
    
                    coordinateTransformation: "Полярно-декартово преобразование",
    
                    trigonometricFunctions: ["cos", "sin"]
    
                }
    
            },
    
            {
    
                description: "Цветовая динамика",
    
                insights: [
    
                    "Градиентное изменение цвета",
    
                    "Зависимость от угла поворота"
    
                ],
    
                formula: "color = hsl(θ * k, 70%, 50%)",
    
                mathematicalDetails: {
    
                    colorModel: "HSL",
    
                    colorVariation: "Линейная от угла"
    
                }
    
            },
    
            {
    
                description: "Итеративное построение",
    
                insights: [
    
                    "Последовательное формирование спирали",
    
                    "Контроль количества витков"
    
                ],
    
                formula: "Σ(r, θ) для каждой итерации",
    
                mathematicalDetails: {
    
                    iterationControl: "Количество шагов",
    
                    convergenceCriteria: "Максимальный угол или радиус"
    
                }
    
            }
    
        ]
    },
    'practical-project-management': {
        title: 'Управление проектом математических головоломок',
        description: 'Разработка веб-платформы с интерактивными математическими головоломками',
        steps: [
          {
            description: 'Зарождение идеи проекта',
            visualization: 'network-graph',
            nodes: [
              { 
                id: 1, 
                title: 'Концепция платформы', 
                duration: 5,
                details: 'Математические головоломки'
              }
            ],
            connections: [],
            insights: [
              'Создание концепции интерактивного математического ресурса',
              'Первичное видение образовательной платформы',
              'Генерация уникальной идеи проекта'
            ]
          },
          {
            description: 'Проектирование архитектуры',
            visualization: 'network-graph',
            nodes: [
              { 
                id: 1, 
                title: 'Концепция платформы', 
                duration: 5,
                details: 'Математические головоломки'
              },
              { 
                id: 2, 
                title: 'Выбор технологий', 
                duration: 10,
                details: 'React, Vite, JavaScript'
              }
            ],
            connections: [
              { from: 1, to: 2 }
            ],
            insights: [
              'Определение технологического стека',
              'Выбор оптимальных инструментов разработки'
            ]
          },
          {
            description: 'Подготовка инфраструктуры',
            visualization: 'network-graph',
            nodes: [
              { 
                id: 1, 
                title: 'Концепция платформы', 
                duration: 5,
                details: 'Математические головоломки'
              },
              { 
                id: 2, 
                title: 'Выбор технологий', 
                duration: 10,
                details: 'React, Vite, JavaScript'
              },
              { 
                id: 3, 
                title: 'Настройка окружения', 
                duration: 7,
                details: 'Git, Node.js'
              }
            ],
            connections: [
              { from: 1, to: 2 },
              { from: 1, to: 3 }
            ],
            insights: [
              'Подготовка разработческой инфраструктуры',
              'Создание базовых UI компонентов'
            ]
          },
          {
            description: 'Разработка базовых модулей',
            visualization: 'network-graph',
            nodes: [
              { 
                id: 1, 
                title: 'Концепция платформы', 
                duration: 5,
                details: 'Математические головоломки'
              },
              { 
                id: 2, 
                title: 'Выбор технологий', 
                duration: 10,
                details: 'React, Vite, JavaScript'
              },
              { 
                id: 3, 
                title: 'Настройка окружения', 
                duration: 7,
                details: 'Git, Node.js'
              },
              { 
                id: 4, 
                title: 'Разработка UI', 
                duration: 15,
                details: 'Создание интерфейса'
              }
            ],
            connections: [
              { from: 1, to: 2 },
              { from: 1, to: 3 },
              { from: 2, to: 4 }
            ],
            insights: [
              'Создание базовых модулей платформы',
              'Разработка интерфейса'
            ]
          },
          {
            description: 'Финальная интеграция',
            visualization: 'network-graph',
            nodes: [
              { 
                id: 1, 
                title: 'Концепция платформы', 
                duration: 5,
                details: 'Математические головоломки'
              },
              { 
                id: 2, 
                title: 'Выбор технологий', 
                duration: 10,
                details: 'React, Vite, JavaScript'
              },
              { 
                id: 3, 
                title: 'Настройка окружения', 
                duration: 7,
                details: 'Git, Node.js'
              },
              { 
                id: 4, 
                title: 'Разработка UI', 
                duration: 15,
                details: 'Создание интерфейса'
              },
              { 
                id: 5, 
                title: 'Тестирование', 
                duration: 20,
                details: 'Функциональность'
              }
            ],
            connections: [
              { from: 1, to: 2 },
              { from: 1, to: 3 },
              { from: 2, to: 4 },
              { from: 3, to: 5 }
            ],
            insights: [
              'Комплексное тестирование платформы',
              'Проверка функциональности и производительности'
            ]
          },
          {
            description: 'Презентация и запуск',
            visualization: 'network-graph',
            nodes: [
              { 
                id: 1, 
                title: 'Концепция платформы', 
                duration: 5,
                details: 'Математические головоломки'
              },
              { 
                id: 2, 
                title: 'Выбор технологий', 
                duration: 10,
                details: 'React, Vite, JavaScript'
              },
              { 
                id: 3, 
                title: 'Настройка окружения', 
                duration: 7,
                details: 'Git, Node.js'
              },
              { 
                id: 4, 
                title: 'Разработка UI', 
                duration: 15,
                details: 'Создание интерфейса'
              },
              { 
                id: 5, 
                title: 'Тестирование', 
                duration: 20,
                details: 'Функциональность'
              },
              { 
                id: 6, 
                title: 'Презентация', 
                duration: 10,
                details: 'Демонстрация проекта'
              }
            ],
            connections: [
              { from: 1, to: 2 },
              { from: 1, to: 3 },
              { from: 2, to: 4 },
              { from: 3, to: 5 },
              { from: 4, to: 6 }
            ],
            insights: [
              'Подготовка презентационных материалов',
              'Демонстрация возможностей платформы',
              'Первичный запуск проекта'
            ]
          }
        ]
      },
'practical-financial-analysis': {
  title: 'Финансовый анализ: Инвестиции в Казахстане',
  description: 'Анализ объемов иностранных инвестиций и их распределение по секторам в тенге',
  steps: [
    {
      description: 'Объем иностранных инвестиций',
      insights: [
        'Общий объем иностранных инвестиций в Казахстане с 2019 по 2024 год',
        'Снижение инвестиций в 2020 году из-за пандемии COVID-19'
      ],
      financialData: {
        title: 'Объем иностранных инвестиций (в млрд тенге)',
        labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
        values: [6500, 5900, 7100, 8300, 9000, 10000], // В тенге
        annotations: {}
      }
    },
    {
      description: 'Распределение инвестиций по секторам',
      insights: [
        'Основные сектора, получающие инвестиции: энергетика, транспорт, сельское хозяйство',
        'Рост интереса к IT и инновационным технологиям'
      ],
      financialData: {
        title: 'Распределение иностранных инвестиций по секторам (в %)',
        labels: ['Энергетика', 'Транспорт', 'Сельское хозяйство', 'IT', 'Строительство'],
        values: [40, 25, 15, 10, 10], // В процентах
        annotations: {}
      }
    },
    {
      description: 'Прогнозирование объемов инвестиций',
      insights: [
        'Прогноз роста иностранных инвестиций в Казахстане на 2023 и 2024 годы',
        'Ожидается увеличение интереса к устойчивым и зеленым технологиям'
      ],
      financialData: {
        title: 'Прогноз объемов иностранных инвестиций (в млрд тенге)',
        labels: ['2023', '2024'],
        values: [9000, 10000], // В тенге
        annotations: {}
      }
    },
    {
      description: 'Анализ рисков для инвесторов',
      insights: [
        'Оценка политических и экономических рисков',
        'Влияние глобальных экономических изменений на инвестиционный климат'
      ],
      financialData: {
        title: 'Риски для инвесторов',
        labels: ['Политические риски', 'Экономические риски', 'Рынок труда', 'Инфляция'],
        values: [30, 40, 20, 10], // В процентах
        annotations: {}
      }
    },
    {
      description: 'Инвестиционные возможности',
      insights: [
        'Перспективные области для инвестиций: возобновляемая энергия, цифровизация, агробизнес',
        'Государственные программы поддержки инвесторов'
      ],
      financialData: {
        title: 'Перспективные области для инвестиций',
        labels: ['Возобновляемая энергия', 'Цифровизация', 'Агробизнес', 'Инфраструктура'],
        values: [35, 30, 20, 15], // В процентах
        annotations: {}
      }
    }
  ]
},
    }