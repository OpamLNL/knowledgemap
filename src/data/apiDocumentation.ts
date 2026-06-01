export type ApiDocRow = {
    endpoint: string;
    purpose: string;
    response: string;
};

export type ApiDocSection = {
    id: string;
    title: string;
    rows: ApiDocRow[];
};

/** Довідник REST API GraphEdit (без legacy-endpoint-ів). */
export const apiDocumentation: ApiDocSection[] = [
    {
        id: 'platform',
        title: 'Платформа',
        rows: [
            {
                endpoint: 'GET /api/health',
                purpose: 'Перевірка, що сервер працює (публічно, без токена)',
                response: '{ status, service, message, timestamp, uptimeSeconds }',
            },
            {
                endpoint: 'GET /api/platform/stats',
                purpose: 'Публічна статистика для головної сторінки (кількість карт, користувачів тощо)',
                response: 'Об’єкт з агрегованими показниками платформи',
            },
        ],
    },
    {
        id: 'graph-edit-maps',
        title: 'Карти знань',
        rows: [
            {
                endpoint: 'GET /api/graph-edit-maps',
                purpose: 'Каталог опублікованих карт (фільтри, сортування, пошук)',
                response: 'Масив MapListItem (id, title, author, progress, rating…)',
            },
            {
                endpoint: 'GET /api/graph-edit-maps/mine',
                purpose: 'Мої карти: створені мною та ті, що проходжу',
                response: 'Масив MapListItem',
            },
            {
                endpoint: 'GET /api/graph-edit-maps/favorites',
                purpose: 'Опубліковані карти з мого списку улюблених',
                response: 'Масив MapListItem',
            },
            {
                endpoint: 'GET /api/graph-edit-maps/:id',
                purpose: 'Метадані однієї карти (чернетка — лише автор/admin)',
                response: 'Об’єкт карти (title, status, ownerUid, dates…)',
            },
            {
                endpoint: 'POST /api/graph-edit-maps',
                purpose: 'Створити нову карту-чернетку (teacher, admin)',
                response: 'Створена карта',
            },
            {
                endpoint: 'PUT /api/graph-edit-maps/:id',
                purpose: 'Оновити назву, опис, статус карти (teacher, admin)',
                response: 'Оновлена карта',
            },
            {
                endpoint: 'DELETE /api/graph-edit-maps/:id',
                purpose: 'Видалити карту та пов’язані дані (teacher, admin)',
                response: '204 No Content',
            },
            {
                endpoint: 'PUT /api/graph-edit-maps/:id/favorite',
                purpose: 'Додати або прибрати карту з улюблених',
                response: '{ favorite: boolean }',
            },
            {
                endpoint: 'PUT /api/graph-edit-maps/:id/rating',
                purpose: 'Поставити або скасувати оцінку карти (1–5)',
                response: 'Поточний рейтинг / стан оцінки',
            },
            {
                endpoint: 'GET /api/graph-edit-maps/:id/graph',
                purpose: 'Завантажити граф для редактора (вузли, ребра; без прогресу)',
                response: '{ mapId, nodes[], edges[] }',
            },
            {
                endpoint: 'PATCH /api/graph-edit-maps/:id/graph',
                purpose: 'Bulk-збереження графа з редактора (teacher, admin)',
                response: 'Оновлений граф (nodes, edges)',
            },
            {
                endpoint: 'PATCH /api/graph-edit-maps/:id/publish',
                purpose: 'Опублікувати карту після валідації DAG + авто-знімок',
                response: 'Карта зі status: published',
            },
            {
                endpoint: 'POST /api/graph-edit-maps/:id/validate',
                purpose: 'Валідація поточного графа з тіла запиту (редактор)',
                response: 'GraphValidationResult (valid, errors, warnings, groups)',
            },
            {
                endpoint: 'GET /api/graph-edit-maps/:id/export',
                purpose: 'Експорт карти в JSON (вузли, групи, теорія, медіа)',
                response: 'JSON-файл карти (formatVersion, nodes, groups…)',
            },
            {
                endpoint: 'POST /api/graph-edit-maps/:id/import-json',
                purpose: 'Імпорт з JSON (режими merge / replace)',
                response: 'Оновлений граф після імпорту',
            },
            {
                endpoint: 'GET /api/graph-edit-maps/:id/import-library',
                purpose: 'Бібліотека груп і вузлів з інших карт автора для імпорту',
                response: 'Списки груп/вузлів для вибору в редакторі',
            },
            {
                endpoint: 'GET /api/graph-edit-maps/:id/revisions',
                purpose: 'Історія знімків (версій) карти',
                response: 'Масив MapRevision (id, comment, createdAt…)',
            },
            {
                endpoint: 'POST /api/graph-edit-maps/:id/revisions',
                purpose: 'Створити знімок поточного стану графа',
                response: 'Створена ревізія',
            },
            {
                endpoint: 'POST /api/graph-edit-maps/:id/revisions/:revisionId/restore',
                purpose: 'Відновити карту з обраної ревізії',
                response: 'Граф після відновлення (через bulk save)',
            },
        ],
    },
    {
        id: 'nodes',
        title: 'Вузли та перегляд карти',
        rows: [
            {
                endpoint: 'GET /api/nodes/map/:mapId/overview',
                purpose: 'Огляд карти: групи, прогрес %, індекс вузлів зі статусами',
                response: '{ groups, groupEdges, progress, nodesIndex[] }',
            },
            {
                endpoint: 'GET /api/nodes/map/:mapId/groups/:groupId/nodes',
                purpose: 'Вузли та ребра однієї групи для відображення на карті',
                response: '{ nodes[], edges[], topics[] }',
            },
            {
                endpoint: 'GET /api/nodes/group-graph',
                purpose: 'Групи знань і зв’язки між ними для редактора (?mapId=)',
                response: '{ mapId, groups[], groupEdges[] }',
            },
            {
                endpoint: 'GET /api/nodes',
                purpose: 'Список вузлів карти (?mapId=)',
                response: 'Масив Node',
            },
            {
                endpoint: 'GET /api/nodes/:id',
                purpose: 'Один вузол за id',
                response: 'Об’єкт Node',
            },
            {
                endpoint: 'POST /api/nodes',
                purpose: 'Створити вузол (teacher, admin)',
                response: 'Створений Node',
            },
            {
                endpoint: 'PUT /api/nodes/:id',
                purpose: 'Оновити вузол (позиція, колір, назва)',
                response: 'Оновлений Node',
            },
            {
                endpoint: 'DELETE /api/nodes/:id',
                purpose: 'Видалити вузол і його зв’язки',
                response: 'Підтвердження видалення / порожня відповідь',
            },
            {
                endpoint: 'GET /api/nodes/:id/content',
                purpose: 'Теорія (Markdown) та зображення вузла',
                response: '{ nodeId, theoryMd, media[] }',
            },
            {
                endpoint: 'PATCH /api/nodes/:id/content',
                purpose: 'Оновити текст теорії вузла',
                response: 'Оновлений NodeContent',
            },
            {
                endpoint: 'POST /api/nodes/:id/media',
                purpose: 'Завантажити зображення до вузла (multipart)',
                response: 'NodeContent з новим media',
            },
            {
                endpoint: 'DELETE /api/nodes/:id/media/:mediaId',
                purpose: 'Видалити зображення вузла',
                response: 'Оновлений NodeContent',
            },
            {
                endpoint: 'GET /api/nodes/validate',
                purpose: 'Валідація збереженого графа карти (?mapId=, teacher, admin)',
                response: 'GraphValidationResult',
            },
        ],
    },
    {
        id: 'node-connections',
        title: 'Зв’язки між вузлами',
        rows: [
            {
                endpoint: 'GET /api/node-connections',
                purpose: 'Список ребер карти (?mapId=)',
                response: 'Масив NodeConnection',
            },
            {
                endpoint: 'GET /api/node-connections/:id',
                purpose: 'Одне ребро за id',
                response: 'NodeConnection',
            },
            {
                endpoint: 'POST /api/node-connections',
                purpose: 'Створити зв’язок між вузлами (teacher, admin)',
                response: 'Створене ребро',
            },
            {
                endpoint: 'PUT /api/node-connections/:id',
                purpose: 'Оновити тип/метадані ребра',
                response: 'Оновлене ребро',
            },
            {
                endpoint: 'DELETE /api/node-connections/:id',
                purpose: 'Видалити ребро',
                response: 'Підтвердження видалення',
            },
        ],
    },
    {
        id: 'progress',
        title: 'Прогрес навчання',
        rows: [
            {
                endpoint: 'GET /api/progress/me',
                purpose: 'Мій прогрес — усі записи по темах',
                response: 'Масив UserTopicProgress',
            },
            {
                endpoint: 'GET /api/progress/me/summary',
                purpose: 'Статистика по карті: completed / available / locked / % (?mapId=)',
                response: 'ProgressSummary + nodes[] зі статусами',
            },
            {
                endpoint: 'POST /api/progress/me',
                purpose: 'Позначити тему як вивчену (перевірка locked)',
                response: 'Запис прогресу (completed)',
            },
            {
                endpoint: 'GET /api/progress',
                purpose: '[Admin] Усі записи прогресу в системі',
                response: 'Масив UserTopicProgress',
            },
            {
                endpoint: 'GET /api/progress/by-user/:userUid',
                purpose: '[Admin] Прогрес обраного користувача',
                response: 'Масив UserTopicProgress',
            },
            {
                endpoint: 'GET /api/progress/by-user/:userUid/summary',
                purpose: '[Admin] Статистика користувача по карті (?mapId=)',
                response: 'ProgressSummary',
            },
            {
                endpoint: 'POST /api/progress',
                purpose: '[Admin] Створити запис прогресу вручну',
                response: 'UserTopicProgress',
            },
            {
                endpoint: 'PUT /api/progress/:id',
                purpose: 'Оновити запис (свій або admin)',
                response: 'Оновлений запис',
            },
            {
                endpoint: 'DELETE /api/progress/:id',
                purpose: '[Admin] Видалити запис прогресу',
                response: 'Підтвердження видалення',
            },
        ],
    },
    {
        id: 'users',
        title: 'Користувачі та кабінет',
        rows: [
            {
                endpoint: 'POST /api/users/save',
                purpose: 'Синхронізація профілю після входу через Google (публічно + Bearer)',
                response: 'User (id, role, name, email, avatarUrl)',
            },
            {
                endpoint: 'GET /api/users/me',
                purpose: 'Поточний авторизований користувач',
                response: 'User',
            },
            {
                endpoint: 'GET /api/users/me/cabinet',
                purpose: 'Особистий кабінет: профіль, карти, зведений прогрес',
                response: 'CabinetDto',
            },
            {
                endpoint: 'GET /api/users/:id/profile',
                purpose: 'Публічний профіль автора за id з БД',
                response: 'Публічний профіль + опубліковані карти',
            },
            {
                endpoint: 'POST /api/users/me/avatar',
                purpose: 'Завантажити аватар (multipart)',
                response: 'User з оновленим avatarUrl',
            },
            {
                endpoint: 'DELETE /api/users/me/avatar',
                purpose: 'Скинути завантажений аватар',
                response: 'User',
            },
            {
                endpoint: 'POST /api/users/grant-teacher',
                purpose: '[Admin/teacher] Надати роль викладача за email',
                response: 'Оновлений User',
            },
            {
                endpoint: 'PATCH /api/users/:id/role',
                purpose: '[Admin] Змінити роль користувача',
                response: 'User',
            },
            {
                endpoint: 'GET /api/users',
                purpose: '[Admin] Список усіх користувачів',
                response: 'Масив User',
            },
            {
                endpoint: 'GET /api/users/search',
                purpose: '[Admin] Пошук користувачів (name, email, role, пагінація)',
                response: '{ items[], total, page… }',
            },
            {
                endpoint: 'POST /api/users',
                purpose: '[Admin] Створити користувача вручну',
                response: 'User',
            },
            {
                endpoint: 'GET /api/users/me/teaching/overview',
                purpose: '[Teacher] Статистика проходження по моїх опублікованих картах',
                response: 'TeachingOverviewDto',
            },
            {
                endpoint: 'GET /api/users/me/teaching/learners',
                purpose: '[Teacher] Усі учні, які проходять мої карти',
                response: 'Масив учнів з прогресом',
            },
            {
                endpoint: 'GET /api/users/me/teaching/maps/:mapId/learners',
                purpose: '[Teacher] Детальний прогрес учнів по одній карті',
                response: 'Список учнів + % по вузлах/темах',
            },
        ],
    },
    {
        id: 'topics',
        title: 'Теми',
        rows: [
            {
                endpoint: 'GET /api/topics',
                purpose: 'Список усіх тем (публічно)',
                response: 'Масив Topic',
            },
            {
                endpoint: 'GET /api/topics/catalog',
                purpose: 'Каталог тем з пошуком і прив’язкою до карт (публічно)',
                response: '{ items[], total, page, limit }',
            },
            {
                endpoint: 'GET /api/topics/:id',
                purpose: 'Одна тема за id (публічно)',
                response: 'Topic',
            },
            {
                endpoint: 'POST /api/topics',
                purpose: 'Створити тему (teacher, admin)',
                response: 'Topic',
            },
            {
                endpoint: 'PUT /api/topics/:id',
                purpose: 'Оновити тему',
                response: 'Topic',
            },
            {
                endpoint: 'DELETE /api/topics/:id',
                purpose: 'Видалити тему',
                response: 'Підтвердження видалення',
            },
        ],
    },
    {
        id: 'admin',
        title: 'Адміністрування',
        rows: [
            {
                endpoint: 'GET /api/admin/dashboard',
                purpose: '[Admin] Загальна панель платформи',
                response: 'DashboardStats',
            },
            {
                endpoint: 'GET /api/admin/statistics/maps',
                purpose: '[Admin] Огляд усіх карт знань',
                response: 'Масив статистики по картах',
            },
            {
                endpoint: 'GET /api/admin/statistics/maps/:mapId',
                purpose: '[Admin] Статистика по карті (студенти, % завершення)',
                response: 'MapStatisticsDto',
            },
            {
                endpoint: 'GET /api/admin/statistics/users',
                purpose: '[Admin] Користувачі з прогресом (пагінація)',
                response: '{ items[], total… }',
            },
            {
                endpoint: 'GET /api/admin/statistics/users/:firebaseUid',
                purpose: '[Admin] Детальна статистика одного користувача',
                response: 'UserStatisticsDto',
            },
        ],
    },
];
