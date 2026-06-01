# GraphEdit — Frontend

Клієнтська частина **GraphEdit**: перегляд і проходження карт знань, редактор для викладачів, кабінет і статистика.

> Backend знаходиться в сусідній папці **`graphedit-server/`** (не `knowledgemap-server`).

## Технології

- React 18, TypeScript, Vite
- React Router, Tailwind CSS, DaisyUI
- vis-network — візуалізація графа (перегляд і редактор)
- Firebase Auth — вхід через Google
- REST API → `graphedit-server`

## Встановлення

```bash
npm install
cp .env.example .env
npm run dev
```

За замовчуванням UI: `http://localhost:5173`

## Змінні середовища

| Змінна | Опис |
|--------|------|
| `VITE_API_BASE_URL` | URL API з префіксом `/api`, напр. `http://localhost:3002/api` |

Firebase-конфіг — у `src/firebase.ts` (проєкт `diploma-web`). Після деплoy на Vercel додайте домен у Firebase Console → Authentication → Authorized domains.

## Деплой на Vercel

1. **Add New → Project** → той самий Git-репозиторій
2. **Root Directory** → `graphedit`
3. Framework: **Vite** (або підхопиться з `vercel.json`)
4. Environment Variable:

| Змінна | Значення |
|--------|----------|
| `VITE_API_BASE_URL` | `https://YOUR-BACKEND.vercel.app/api` |

5. Deploy

Після деплoy: у **backend** Vercel встановіть `FRONTEND_URL=https://your-frontend.vercel.app` і redeploy backend (CORS). Деталі — [`DEPLOY_VERCEL.md`](../DEPLOY_VERCEL.md) у корені репозиторію.

## Скрипти

```bash
npm run dev      # розробка
npm run build    # production-збірка
npm run preview  # перегляд збірки
```

## Маршрути

| Шлях | Опис |
|------|------|
| `/` | Головна |
| `/maps` | Каталог опублікованих карт |
| `/my-maps` | Мої карти (автор + з прогресом) |
| `/map/:mapId` | Перегляд карти |
| `/editor/:mapId` | Редактор (teacher / admin) |
| `/profile` | Особистий кабінет |
| `/users/:userId` | Публічний профіль автора |
| `/teaching` | Статистика карт (teacher / admin) |
| `/teaching/users` | Усі учні по ваших картах |
| `/teaching/maps/:mapId` | Прогрес учнів по одній карті |
| `/topics` | Каталог тем |
| `/admin/adminPage` | Панель адміністратора |

## Ролі

- **student** — перегляд карт, прогрес
- **teacher** — створення/редагування карт, статистика учнів
- **admin** — те саме + керування користувачами

Перед роботою переконайтесь, що запущено **`graphedit-server`** на порту з `.env` (зазвичай `3002`).
