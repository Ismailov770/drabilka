# Backend API Specification for DrabilkaUz UI

> ВНИМАНИЕ: этот файл используется как **промпт для ИИ‑бэкенда на Java**.
> Твоя задача — реализовать REST‑backend для системы DrabilkaUz, строго следуя описанным ниже моделям данных, эндпоинтам и бизнес‑логике.
> Фронтенд — существующий Next.js/React проект (репозиторий `siment-maker-ui-design`), который визуализирует интерфейс DrabilkaUz; не меняй его контракты, а подстройся под них.

Эта документация описывает, какие данные ожидает и отправляет фронтенд DrabilkaUz и какие REST‑эндпоинты должен реализовать backend (в т.ч. backend‑ИИ), чтобы полностью подстроиться под текущий интерфейс.

## 1. Общая информация

- **Фреймворк фронта**: Next.js (App Router), React, TypeScript, TailwindCSS.
- **Базовый URL API**: берётся из `.env`

  ```env
  NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
  ```

- В коде используется обёртка `lib/api.ts`:

  ```ts
  get(path, options?)
  post(path, body?, options?)
  put(path, body?, options?)
  patch(path, body?, options?)
  del(path, body?, options?)
  ```

  Все пути ниже даны **относительно** `/api`. Например, `POST /auth/login` → `http://localhost:8080/api/auth/login`.

- Ответы по умолчанию в формате JSON. Ошибки желательно возвращать так:

  ```json
  {
    "message": "Описание ошибки",
    "code": "SOME_CODE",
    "details": { }
  }
  ```

### 1.1. Хранение данных и связи сущностей

- Каждая модель в этом документе (`Sale`, `Debt`, `Expense`, `PayrollRecord`, `ProductionRecord`, `ProductFlow`, `Equipment`, `EquipmentMovement`, `TechnicalExpense`, `Repair`, `VehicleLogEntry`, `DriverIncident`, `DriverFuelRecord`) соответствует **таблице или коллекции** в базе данных backend’а.
- Минимальные связи, которые backend обязан учитывать при проектировании схемы БД:
  - `Sale.id` ↔ `Debt.saleId` (одна продажа может порождать ноль или одну запись долга).
  - `Equipment.id` ↔ `TechnicalExpense.equipment` и `Repair.equipment` (оборудование и его расходы/ремонты).
  - Сотрудники (создаются через `POST /employees`) ↔ `PayrollRecord.employee` (начисления зарплат).
  - Водители/транспорт ↔ `DriverFuelRecord.driver`/`vehicle` и `VehicleLogEntry.driver` (по имени/идентификатору).
  - `DriverIncident.driver` ↔ сущность водителя (по имени/логину).
- Backend может использовать любую СУБД (SQL/NoSQL), но **JSON‑контракт с фронтом** должен полностью соответствовать описанным ниже моделям.
- Backend вправе добавлять внутренние служебные поля в БД (например, `created_at`, `updated_at`, `version`), но не обязан отдавать их во фронт — главное, чтобы публичный JSON соответствовал спецификации.

### 1.2. Общие правила фильтрации, поиска и пагинации

Для всех эндпоинтов, которые возвращают списки (`GET /sales`, `/debts`, `/expenses`, `/payroll`, `/production/batches`, `/inventory/flows`, `/equipment`, `/equipment/movements`, `/technical/expenses`, `/technical/repairs`, `/vehicles/logs`, `/driver/incidents`, `/driver/fuel-records`):

- **Фильтры по доменным полям** указаны в соответствующем разделе каждого эндпоинта (например, `dateFrom`/`dateTo`, `status`, `product` и т.д.) и передаются как query‑параметры строкой запроса.
- Рекомендуется (и для ИИ‑backend’а — обязательно) поддержать единый контракт пагинации и сортировки:
  - `page`: number ≥ 1, номер страницы (по умолчанию 1).
  - `pageSize`: number > 0, размер страницы (по умолчанию, например, 50).
  - `sortBy`: string, имя поля модели, по которому производится сортировка (например, `date`, `createdAt`, `amount`, `status`).
  - `sortDir`: string, `"asc"` или `"desc"`.
- Возвращаемый формат для списков можно расширить до:

  ```json
  {
    "items": [ /* массив сущностей */ ],
    "page": 1,
    "pageSize": 50,
    "totalItems": 123,
    "totalPages": 3
  }
  ```

  При этом фронтенд DrabilkaUz может использовать только поле `items` на первых этапах интеграции, но backend должен быть готов к работе с пагинацией.

## 2. Аутентификация и localStorage

### 2.1. Локальное хранилище

Стартовая страница `/` содержит выбор роли и поля **login** и **parol**. В текущей демо‑реализации после «успешного логина» фронт только запоминает роль пользователя и язык интерфейса в `localStorage`:

```ts
localStorage.setItem("userRole", role)        // "owner" | "cashier" | "driver" | "technical"
localStorage.setItem("userLanguage", "uz")
```

- Layout’ы дашбордов (`/owner-dashboard`, `/cashier-dashboard`, `/driver-dashboard`, `/technical-dashboard`) читают `userRole` и перенаправляют на `/`, если роль не совпадает с ожидаемой.
- Компонент сайдбара (`SidebarNav`) при выходе очищает локальную информацию о роли (в демо‑версии это только `userRole`) и перенаправляет на `/`.

  ```ts
  localStorage.removeItem("userRole")
  localStorage.removeItem("userLanguage")
  ```

### 2.2. POST /auth/login

**Назначение**: вход пользователя по роли и логину (username).

- **URL**: `POST /auth/login`
- **Тело запроса**:

  ```json
  {
    "username": "string",
    "password": "string",
    "role": "owner | cashier | driver | technical"
  }
  ```

- **Успешный ответ (200)**:

  ```json
  {
    "user": {
      "id": "string",
      "username": "string",
      "role": "owner",
      "name": "string",
      "language": "uz"
    },
    "token": "jwt-or-session-token"
  }
  ```

- Фронтенд после успешного ответа записывает в `localStorage` поля, описанные выше, и перенаправляет на `/${role}-dashboard`.

### 2.3. GET /auth/me (опционально)

- **URL**: `GET /auth/me`
- **Заголовок**: `Authorization: Bearer <token>`
- **Ответ 200**: объект `user` как в `/auth/login`.

Backend может использовать этот эндпоинт для серверной валидации сессии. Текущий фронт полагается только на `localStorage`, но может быть расширен до обращения к `/auth/me`.

## 3. Основные сущности и эндпоинты

Ниже перечислены ключевые сущности, которые используются на экранах. Все таблицы в UI построены на статических демо‑данных; backend должен вернуть те же поля, чтобы фронт мог заменить мок‑данные реальными.

### 3.1. Продажа (Sale)

Используется в:

- `/cashier-dashboard` (главный экран кассира)
- `/cashier-dashboard/sales`
- печать чека (`components/print-receipt.tsx`)

**Модель `Sale`**:

```ts
Sale {
  id: string        // "S001"
  client: string    // клиент / компания
  phone: string     // номер телефона клиента (обязателен при создании из UI кассира)
  material: string  // тип продукта ("Oddiy sement", "Shagal" и т.п.)
  weight: number    // тоннаж
  price: number     // итоговая сумма (сом)
  date: string      // "YYYY-MM-DD"
  employee: string  // кассир / ответственный
  carNumber: string // гос. номер авто
  paymentType: string // "Naqd" | "Qarzga" | "Click" | ...
  note?: string
}
```

#### GET /sales

- **Назначение**: выдать список продаж для таблиц и дашборда.
- **Параметры query (опционально)**:
  - `dateFrom` / `dateTo` – по полю `date` (строки формата `YYYY-MM-DD`).
  - `paymentType` – фильтр по типу оплаты (значения, используемые во фронте: `"Naqd"`, `"Qarzga"`, `"Click"` и т.п.).
  - `client` – фильтр по клиенту/компании (подстрочный поиск по имени клиента).
  - `carNumber` – фильтр по автомобилю (точное совпадение или подстрочный поиск по гос. номеру).
  - при необходимости — общая строка поиска `search`, которая ищет по нескольким текстовым полям (`client`, `carNumber`, `material`).
- Все фильтры и параметры пагинации передаются в строке запроса, например:

  ```http
  GET /api/sales?dateFrom=2024-01-01&dateTo=2024-01-31&paymentType=Naqd&client=ABC&page=1&pageSize=50
  ```
- **Ответ 200**:

  ```json
  {
    "items": [
      {
        "id": "S001",
        "client": "ABC Company",
        "phone": "+99890 111 11 11",
        "material": "Oddiy sement",
        "weight": 50,
        "price": 8500,
        "date": "2024-01-15",
        "employee": "Fatima",
        "carNumber": "01A123BC",
        "paymentType": "Naqd"
      }
    ]
  }
  ```

#### POST /sales

- **Назначение**: создание новой продажи из форм кассира.
- **Тело запроса**:

  ```json
  {
    "client": "Naqd mijoz yoki kompaniya nomi",
    "phone": "+99890 123 45 67",
    "material": "Shagal",
    "weight": 50,
    "price": 8500,
    "date": "2024-01-15",
    "employee": "Kassir",
    "carNumber": "01A123BC",
    "paymentType": "Naqd",
    "note": "ixtiyoriy"
  }
  ```

- **Ответ 201**:

  ```json
  {
    "sale": Sale
  }
  ```

**Бизнес‑логика для кредитных продаж (`paymentType = "Qarzga"`)**:

- Если продажа создаётся с типом оплаты `"Qarzga"`, backend помимо записи `Sale` должен:
  - создать связанную запись `Debt`, где `saleId = sale.id`, `company = sale.client`, `amountDue = sale.price`, `outstanding = sale.price`;
  - проставить `status` по умолчанию (например, `"Open"`) и вычислить `dueDate` по внутренним правилам (по умолчанию можно использовать +30 календарных дней к `date` продажи);
  - сохранить телефон клиента (`sale.phone`) в связанном контрагенте/справочнике, если такой используется.

Такой сценарий должен соответствовать поведению UI: при выборе в форме кассира оплаты «Qarzga» кассир указывает компанию/клиента, а долг попадает в разделы Debts / Qarzlar.

### 3.2. Долги / дебиторка (Debt)

Используется в `cashier-dashboard/debts` и `owner-dashboard/debts`.

```ts
Debt {
  id: string           // "D001"
  company: string
  saleId: string
  amountDue: number
  outstanding: number
  dueDate: string      // "YYYY-MM-DD"
  status: string       // "Ochiq" | "Qisman to'langan" | "To'langan" | ...
  notes?: string
  lastPayment?: {
    amount: number
    type: string      // "Naqd", "Bank o'tkazmasi" и т.п.
    at: string        // ISO‑дата
  }
}
```

#### GET /debts

- Параметры:
  - `company`
  - `status`
  - `dateFrom` / `dateTo` (по `dueDate`).
- Ответ: `{ "items": Debt[] }`.

#### POST /debts

Создание долга (когда продажа идёт в кредит).

```json
{
  "company": "BuildCo Ltd.",
  "saleId": "S003",
  "amountDue": 17000,
  "dueDate": "2024-05-01",
  "notes": "Truck-001"
}
```

#### POST /debts/{id}/payments

Запись частичного/полного платежа.

```json
{
  "amount": 5000,
  "type": "Naqd",
  "paidAt": "2024-03-10"
}
```

Ответ: `{ "debt": Debt }`.

### 3.3. Топливо водителей (DriverFuelRecord)

Используется в:

- `/driver-dashboard` – создание записи водителем.
- `/owner-dashboard/driver-fuel` – просмотр всех записей.

```ts
DriverFuelRecord {
  id: string           // "FUEL-<timestamp>"
  driver: string       // username или ФИО водителя
  vehicle: string      // "TRUCK-001 (01A123BC)"
  date: string         // "YYYY-MM-DD"
  time: string         // "HH:MM"
  distanceKm: number
  amount: number       // сумма топлива в сумах
  fuelType: "SOLYARKA" | "BENZIN" | "GAZ" // тип топлива, выбранный водителем
  liters?: number      // количество литров ТОЛЬКО для SOLYARKA, может быть undefined для BENZIN/GAZ
  fuelGaugePhoto?: string
  speedometerPhoto?: string
}
```

#### POST /driver/fuel-records

- **Назначение**: сохранить одну заправку.
- **Тело запроса (минимально)**:

  ```json
  {
    "vehicle": "TRUCK-001",
    "distanceKm": 120,
    "amount": 850000,
    "dateTime": "2024-02-19T09:30:00Z",
    "fuelGaugePhotoName": "gauge_240219_01.jpg",
    "speedometerPhotoName": "speed_240219_01.jpg",
    "fuelType": "SOLYARKA",
    "liters": 50.5
  }
  ```

  Где:

  - `fuelType` — обязательное поле, одно из значений: `"SOLYARKA"`, `"BENZIN"`, `"GAZ"`.
  - `liters` — **обязательное** поле, когда `fuelType = "SOLYARKA"`, и **опускается** (или может быть `null`), когда топливо `BENZIN` или `GAZ`.

- Backend может определять водителя по токену (`username`), а не по полю в теле.
- **Ответ 201**: `{ "record": DriverFuelRecord }`.

#### GET /driver/fuel-records

- Параметры: `dateFrom`, `dateTo`, `driver`, `vehicle`.
- Ответ: `{ "items": DriverFuelRecord[] }`.

### 3.4. Общие расходы (Expense)

Используются в `owner-dashboard/expenses`, `cashier-dashboard/expenses`, `technical-dashboard/expenses` (для техники).

```ts
Expense {
  id: string
  title: string
  category: string      // "Energiya", "Logistika", "Texnik", "Ish haqi", "Boshqa" ...
  department: string    // "Ishlab chiqarish", "Transport", "Texnik bo'lim", "HR"
  amount: number
  date: string          // "YYYY-MM-DD"
  status?: string       // "Tasdiq kutmoqda" и др.
}
```

#### GET /expenses

- Параметры: `dateFrom`, `dateTo`, `category`, `department`.
- Ответ: `{ "items": Expense[] }`.

#### POST /expenses

```json
{
  "title": "Elektr energiyasi",
  "category": "Energiya",
  "department": "Ishlab chiqarish",
  "amount": 5400,
  "date": "2024-02-19",
  "status": "Tasdiq kutmoqda"
}
```

Ответ: `{ "expense": Expense }`.

### 3.5. Начисление зарплаты (PayrollRecord)

Используется в `owner-dashboard/payroll` и `cashier-dashboard/payroll`.

```ts
PayrollRecord {
  id: string
  employee: string
  department: string
  role: string
  month: string        // "Fevral 2024"
  baseSalary: number
  overtime: number
  deductions: number
  total: number
  advance: number
  remaining: number
  status: string       // "To'langan", "Tasdiq kutmoqda" и др.
  payoutDate: string   // "YYYY-MM-DD"
}
```

#### GET /payroll

- Параметры: `dateFrom`, `dateTo` (по `payoutDate`), `status`, `department`.
- Ответ: `{ "items": PayrollRecord[] }`.

#### POST /payroll/{id}/pay

- Тело:

  ```json
  {
    "amount": 500,
    "paymentDate": "2024-02-20",
    "notes": "string optional"
  }
  ```

- Ответ: `{ "record": PayrollRecord }` (обновлённое `remaining`, `status`).

#### POST /employees

Используется модалкой «Yangi ishchini ishga olish».

```json
{
  "name": "Malika Sodiqova",
  "department": "Texnik bo'lim",
  "role": "Avtomatika muhandisi",
  "baseSalary": 1180,
  "username": "malika.sodiqova",
  "password": "string-or-handled-separately"
}
```

Ответ: `{ "employee": { ... } }`.

### 3.6. Производство и потоки продукции

#### 3.6.1. Партии производства (ProductionRecord)

Используются на `/owner-dashboard/production`.

```ts
ProductionRecord {
  batchId: string
  product: string       // "M400", "M500", "Sul'fatga chidamli" ...
  shift: string         // смена
  line: string
  quantity: number      // в кубах (m³)
  unit: string          // "m3"
  price: number
  transport: string
  operator: string
  producedAt: string    // "YYYY-MM-DD"
}
```

- `GET /production/batches` → `{ "items": ProductionRecord[] }` с фильтрами `dateFrom`, `dateTo`, `product`, `shift`.

#### 3.6.2. Потоки продукта (ProductFlow)

Используются на `/owner-dashboard/product-flow`.

```ts
ProductFlow {
  id: string
  product: string
  direction: "Kirim" | "Chiqim"
  quantity: number
  unit: string
  from: string
  to: string
  transport: string
  loggedAt: string
}
```

- `GET /inventory/flows` с фильтрами `dateFrom`, `dateTo`, `direction`, `product`.
- `POST /inventory/flows` для записи новых движений.

### 3.7. Техника и ремонты

#### 3.7.1. Оборудование (Equipment)

Используется на `/technical-dashboard/equipment`.

```ts
Equipment {
  id: string
  name: string
  model: string
  serial: string
  price: number
  purchaseDate: string
  status: string
}
```

- `GET /equipment`
- `POST /equipment`

#### 3.7.2. Движения по технике (EquipmentMovement)

Используется на `/owner-dashboard/equipment-flow`.

```ts
EquipmentMovement {
  id: string
  equipment: string
  category: string
  movement: "Kirim" | "Chiqim"
  reason: string
  cost: number
  photoUrl?: string
  loggedAt: string
}
```

- `GET /equipment/movements`
- `POST /equipment/movements`

#### 3.7.3. Технические расходы (TechnicalExpense)

Используются на `/technical-dashboard/expenses`.

```ts
TechnicalExpense {
  id: string
  equipment: string
  description: string
  cost: number
  date: string
  category: string
}
```

- `GET /technical/expenses`
- `POST /technical/expenses`

#### 3.7.4. Ремонты (Repair)

Используются на `/technical-dashboard/repairs`.

```ts
Repair {
  id: string
  equipment: string
  issue: string
  date: string
  cost: number
  tech: string
  status: string
  photos?: string[]
}
```

- `GET /technical/repairs`
- `POST /technical/repairs`

### 3.8. Машины и ANPR (VehicleLogEntry)

Используется на `/owner-dashboard/vehicles`.

```ts
VehicleLogEntry {
  id: string            // номер машины
  driver: string
  vehicleType: string   // "Yirik yuk" | "Kichik yuk"
  material: string
  direction: "Kirdi" | "Chiqdi"
  entryAt: string       // ISO datetime
  exitAt?: string
}
```

- `GET /vehicles/logs` с фильтрами `dateFrom`, `dateTo`, `vehicleType`, `direction`.

### 3.9. Инциденты и таймлайн (DriverIncident)

Инциденты используются на `/driver-dashboard/incidents`, а таймлайн `/driver-dashboard/timeline` показывает те же данные в другом виде.

```ts
DriverIncident {
  id: string
  name: string
  location: string
  date: string
  time: string
  driver: string
  status: string
  description?: string
  photos?: string[]
}
```

- `GET /driver/incidents`
- `POST /driver/incidents`

### 3.10. Кассовый учёт солярки (FuelStock)

Новый модуль для страницы кассира `/cashier-dashboard/fuel` и просмотра статистики владельцем.

#### Модель остатка солярки

```ts
FuelStockBalance {
  dieselLiters: number // текущий остаток солярки по кассе, может быть отрицательным
}
```

#### Модель операции по топливу кассы

```ts
FuelStockOperation {
  id: string
  dateTime: string       // ISO-дата/время операции
  driverName: string     // ФИО или username водителя
  vehiclePlate?: string  // гос. номер транспорта
  fuelType: "SOLYARKA" | "BENZIN" | "GAZ"
  liters?: number        // для SOLYARKA – обязательное поле; для BENZIN/GAZ может быть опущено
  balanceAfter?: number  // остаток солярки после операции (в литрах, может быть < 0)
  comment?: string
}
```

#### GET /cashier/fuel-stock

- **URL**: `GET /api/cashier/fuel-stock`
- **Роли**: `CASHIER`, `OWNER` (владелец может читать остаток)
- **Ответ 200**:

  ```json
  {
    "dieselLiters": -10.5
  }
  ```

#### GET /cashier/fuel-stock/operations

- **URL**: `GET /api/cashier/fuel-stock/operations`
- **Роли**: `CASHIER`, `OWNER`
- **Фильтры (query)**:
  - `dateFrom`, `dateTo` — период по `dateTime` (формат `YYYY-MM-DD`).
  - `driverName` — подстрочный поиск по имени водителя.
  - `vehiclePlate` — подстрочный поиск по номеру машины.
  - `fuelType` — `SOLYARKA | BENZIN | GAZ`.
- **Ответ 200**:

  ```json
  {
    "items": [
      {
        "id": "FS-001",
        "dateTime": "2025-12-10T08:30:00Z",
        "driverName": "Driver 1",
        "vehiclePlate": "01A123BC",
        "fuelType": "SOLYARKA",
        "liters": 60,
        "balanceAfter": -10
      }
    ]
  }
  ```

#### POST /cashier/fuel-stock/operations

- **URL**: `POST /api/cashier/fuel-stock/operations`
- **Роли**: `CASHIER`
- **Назначение**: зарегистрировать выдачу топлива водителю с кассы.
- **Тело запроса**:

  ```json
  {
    "driverName": "Driver 1",
    "vehiclePlate": "01A123BC",
    "fuelType": "SOLYARKA",
    "liters": 60
  }
  ```

- **Бизнес-логика**:
  - Если `fuelType = "SOLYARKA"`, backend:
    - берёт текущий остаток солярки в литрах;
    - вычитает `liters` (остаток может стать отрицательным);
    - создаёт запись `FuelStockOperation` с полем `balanceAfter`.
  - Если `fuelType = "BENZIN"` или `"GAZ"`, backend создаёт запись `FuelStockOperation`, но **не обязан** обновлять `dieselLiters` (остаток солярки остаётся без изменений).
  - Ответ 201: созданный объект `FuelStockOperation`.

## 4. Роли, страницы и доступ к данным

Ниже — обзор того, какие разделы и сущности использует каждая роль. Backend на Java должен как минимум уметь **ограничивать доступ к данным по роли пользователя**, даже если текущий фронт пока явно не отправляет токен/роль в каждый запрос.

### 4.1. Owner (завод егаси)

- Основные экраны:
  - `/owner-dashboard` — сводка по продажам, расходам, зарплатам, долгам.
  - `/owner-dashboard/production` — `ProductionRecord[]`.
  - `/owner-dashboard/product-flow` — `ProductFlow[]`.
  - `/owner-dashboard/equipment-flow` — `EquipmentMovement[]`.
  - `/owner-dashboard/expenses` — `Expense[]`.
  - `/owner-dashboard/payroll` — `PayrollRecord[]` + управление выплатами и наймом сотрудников.
  - `/owner-dashboard/debts` — агрегированный вид `Debt[]`.
  - `/owner-dashboard/vehicles` — `VehicleLogEntry[]`.
  - `/owner-dashboard/driver-fuel` — `DriverFuelRecord[]`.

- Права и ожидания:
  - Полный доступ на чтение ко всем сущностям.
  - Возможность создавать и редактировать расходы, начисления зарплат, оборудование и движения по технике.
  - Просмотр и контроль долгов и платежей.

### 4.2. Cashier (кассир)

- Основные экраны:
  - `/cashier-dashboard` — сводка по продажам, расходам, зарплатам, долгам.
  - `/cashier-dashboard/sales` — создание и просмотр `Sale` (включая поле `phone`).
  - `/cashier-dashboard/expenses` — часть `Expense`.
  - `/cashier-dashboard/payroll` — просмотр `PayrollRecord` по сотрудникам.
  - `/cashier-dashboard/debts` — детализация `Debt`, регистрация частичных платежей.
  - `/cashier-dashboard/fuel` — учёт выдачи топлива водителям и остатка солярки в литрах.

- Права и ожидания:
  - Создавать `Sale` (в т.ч. кредитные с авто‑созданием `Debt`).
  - Просматривать и, при необходимости, создавать определённые виды `Expense`.
  - Регистрировать платежи по долгам через `POST /debts/{id}/payments`.

### 4.3. Driver (водитель)

- Основные экраны:
  - `/driver-dashboard` — форма отправки `DriverFuelRecord` (в демо локально, в продакшене через `POST /driver/fuel-records`).
  - `/driver-dashboard/incidents` — список `DriverIncident[]`.
  - `/driver-dashboard/timeline` — таймлайн тех же `DriverIncident[]`.

- Права и ожидания:
  - Создавать записи по топливу для своего транспорта.
  - Создавать и просматривать собственные инциденты.

### 4.4. Technical (техник)

- Основные экраны:
  - `/technical-dashboard` — форма регистрации технического события (в демо локально, в продакшене данные могут мапиться на `TechnicalExpense` или `Repair`).
  - `/technical-dashboard/equipment` — `Equipment[]`.
  - `/technical-dashboard/expenses` — `TechnicalExpense[]`.
  - `/technical-dashboard/repairs` — `Repair[]`.

- Права и ожидания:
  - Регистрировать и обновлять информацию по оборудованию.
  - Вносить технические расходы и ремонты.

## 5. PWA‑поведение

Фронтенд сконфигурирован как PWA:

- В `public/manifest.webmanifest` описаны name, icons, `display: "standalone"`.
- В `public/sw.js` регистрируется service worker для кеширования статики.
- В компоненте `PwaInstallPrompt` обрабатывается событие `beforeinstallprompt` и показывается собственный баннер «установить приложение» на любых устройствах, поддерживающих PWA.

Backendу не требуется дополнительная поддержка PWA, кроме корректной отдачи статики и SPA‑роутов. Главное — строго соблюдать контракт API, описанный выше, чтобы фронтенд мог бесшовно перейти с мок‑данных на реальный Java‑backend.


