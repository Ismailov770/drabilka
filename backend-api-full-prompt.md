# DrabilkaUz Backend API – Full Prompt & Specification

> Этот файл – единый промпт/документация для Java‑backend DrabilkaUz.
> Он описывает **фактический и целевой контракт API**: эндпоинты, модели, бизнес‑логику.
> Используется как источник правды для доработки backend’а и тестирования.

---

## 1. Общая информация

- **База URL API**: `http://localhost:8080/api`
- **Фреймворк**: Spring Boot (REST), Spring Security с JWT.
- **Аутентификация**:
  - `POST /auth/login` → возвращает `token` и объект `user`.
  - Остальные защищённые эндпоинты требуют заголовок:
    - `Authorization: Bearer <jwt>`.
  - Роли: `owner`, `cashier`, `driver`, `technical` (enum `UserRole`).
- **Формат ошибок (рекомендуемый / частично реализован)**:

```json
{
  "message": "Описание ошибки",
  "code": "SOME_CODE",
  "details": {},
  "timestamp": "ISO",
  "path": "/api/..."
}
```

- **Пагинация и сортировка (по возможности)**:
  - `page`: number ≥ 1 (по умолчанию 1)
  - `pageSize`: number > 0 (по умолчанию 50)
  - `sortBy`: поле сортировки
  - `sortDir`: `"asc" | "desc"`
  - Формат ответа со списком (когда нужна пагинация):

```json
{
  "items": [ ... ],
  "page": 1,
  "pageSize": 50,
  "totalItems": 123,
  "totalPages": 3
}
```

---

## 2. Аутентификация и пользователи

### 2.1. Модель пользователя (AuthUser)

```ts
AuthUser {
  id: string,        // UUID
  username: string,
  role: "owner" | "cashier" | "driver" | "technical",
  name: string       // fullName
}
```

### 2.2. POST /auth/login

- **URL**: `POST /api/auth/login`
- **Тело запроса**:

```json
{
  "username": "owner01",
  "password": "20252020",
  "role": "owner"
}
```

- **Успешный ответ (200)**:

```json
{
  "user": {
    "id": "c7488b80-0e91-41ca-b72f-459c8790fbc7",
    "username": "owner01",
    "role": "owner",
    "name": "Owner User"
  },
  "token": "<jwt-token>"
}
```

### 2.3. GET /auth/me

- **URL**: `GET /api/auth/me`
- **Заголовки**:
  - `Authorization: Bearer <token>`
- **Ответ 200** – объект `AuthUser`:

```json
{
  "id": "...",
  "username": "owner01",
  "role": "owner",
  "name": "Owner User"
}
```

### 2.4. POST /auth/change-password (только OWNER)

- **URL**: `POST /api/auth/change-password`
- **Роли**: `OWNER`
- **Заголовок**: `Authorization: Bearer <token>` (токен текущего владельца)
- **Тело запроса**:

```json
{
  "oldPassword": "20252020",
  "newPassword": "newStrongPass"
}
```

- **Ответ 204 (NO CONTENT)** – без тела.

---

## 3. Загрузка и хранение файлов

### 3.1. Общий принцип

- Все файлы загружаются в локальную папку `uploads/`.
- HTTP‑доступ к файлам:
  - `GET /uploads/**` → раздаётся как статика.
- Используется централизованный сервис `FileStorageService`.

### 3.2. Категории загрузок

Enum `UploadCategory` и соответствующие подпапки:

- `COMMON` → `uploads/common` → URL `/uploads/common/...`
- `FUEL` → `uploads/fuel` → `/uploads/fuel/...`
- `INCIDENTS` → `uploads/incidents` → `/uploads/incidents/...`
- `REPAIRS` → `uploads/repairs` → `/uploads/repairs/...`
- `EQUIPMENT` → `uploads/equipment` → `/uploads/equipment/...`

### 3.3. POST /uploads/images – общий upload

- **URL**: `POST /api/uploads/images`
- **Роли**: `OWNER`, `CASHIER`, `DRIVER`, `TECHNICAL`
- **Content-Type**: `multipart/form-data`
- **Параметры формы**:
  - `files`: один или несколько файлов (`MultipartFile[]`)
  - `category` (optional, default `COMMON`):
    - `COMMON | FUEL | INCIDENTS | REPAIRS | EQUIPMENT`
- **Успешный ответ (201)**:

```json
{
  "urls": [
    "/uploads/incidents/uuid1.jpg",
    "/uploads/incidents/uuid2.png"
  ]
}
```

Использование:
1. Сначала отправить `POST /uploads/images` с нужной категорией.
2. В ответе взять `urls[]` и передать их в соответствующий бизнес‑эндпоинт (`photoUrls`, `beforePhotos`, `photoUrl` и т.д.).

---

## 4. Сотрудники (Employees)

### 4.1. Модель Employee (упрощённо)

```ts
Employee {
  id: number,
  employeeCode: string,
  fullName: string,
  role: string,
  department: string,
  baseSalary: number,
  hiredAt: string, // YYYY-MM-DD
  active: boolean
}
```

### 4.2. GET /employees

- **URL**: `GET /api/employees`
- **Роли**: OWNER
- **Ответ 200**:

```json
[
  {
    "id": 1,
    "employeeCode": "EMP001",
    "fullName": "John Doe",
    "role": "DRIVER",
    "department": "Logistics",
    "baseSalary": 5000000,
    "hiredAt": "2024-01-10",
    "active": true
  }
]
```

### 4.3. POST /employees

- **URL**: `POST /api/employees`
- **Роли**: OWNER
- **Тело запроса** – DTO создания сотрудника (соответствует UI).
- **Ответ 201** – созданный `Employee`.

### 4.4. PUT /employees/{id}

- **URL**: `PUT /api/employees/{id}`
- **Роли**: OWNER
- **Тело** – данные для обновления сотрудника.

---

## 5. Продажи (Sales) и долги (Debts)

### 5.1. Модель Sale

```ts
Sale {
  id: string,        // "S001"
  client: string,
  phone: string,
  material: string,
  weight: number,
  price: number,
  date: string,      // YYYY-MM-DD
  employee: string,  // кассир
  carNumber: string,
  paymentType: string, // "Naqd" | "Qarzga" | "Click" | ...
  note?: string
}
```

### 5.2. GET /sales

- **URL**: `GET /api/sales`
- **Роли**: OWNER, CASHIER
- **Фильтры (query)**:
  - `dateFrom`, `dateTo` (YYYY-MM-DD)
  - `paymentType`
  - `client`
  - `carNumber`
  - `search`
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
      "paymentType": "Naqd",
      "note": "..."
    }
  ]
}
```

### 5.3. POST /sales

- **URL**: `POST /api/sales`
- **Роли**: OWNER, CASHIER
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

- **Бизнес‑логика для `paymentType = "Qarzga"`**:
  - создаётся запись `Debt` со связанным `saleId`;
  - `company = sale.client`;
  - `amountDue = sale.price`, `outstanding = sale.price`;
  - `status = "Ochiq"` по умолчанию;
  - `dueDate` ≈ `date + 30 дней`.

### 5.4. GET /sales/{id}

- **URL**: `GET /api/sales/{id}`
- **Роли**: OWNER, CASHIER
- **Ответ 200**: `Sale` по ID.

### 5.5. Debts – основные эндпоинты

#### Модель Debt (упрощённо)

```ts
Debt {
  id: string,
  company: string,
  saleId: string,
  amountDue: number,
  outstanding: number,
  dueDate: string,
  status: string,
  notes?: string,
  lastPayment?: {
    amount: number,
    type: string,
    at: string
  }
}
```

#### GET /debts

- **URL**: `GET /api/debts`
- **Фильтры**: компания, статус, дата.
- **Ответ 200**: `{ "items": Debt[] }`.

#### GET /debts/filters

- **URL**: `GET /api/debts/filters`
- **Ответ 200**: справочные значения фильтров (компании, статусы).

#### POST /debts/{debtId}/payments

- **URL**: `POST /api/debts/{debtId}/payments`
- **Тело**:

```json
{
  "amount": 1000000,
  "type": "Naqd",          
  "at": "2024-02-10T10:00:00"
}
```

- **Бизнес‑логика**: уменьшение `outstanding`, обновление `status` и `lastPayment`.

---

## 6. Расходы (Expenses)

```ts
Expense {
  id: string,
  date: string,
  category: string,
  amount: number,
  description?: string,
  createdBy: string
}
```

### 6.1. GET /expenses

- **URL**: `GET /api/expenses`
- **Фильтры**: `dateFrom`, `dateTo`, `category`.

### 6.2. POST /expenses

- **URL**: `POST /api/expenses`
- **Тело**: базовые поля расхода.

### 6.3. GET /expenses/filters

- **URL**: `GET /api/expenses/filters`
- **Назначение**: предустановленные категории для UI.

---

## 7. Зарплаты (Payroll)

```ts
PayrollRecord {
  id: string,
  employee: string,
  month: string,    // YYYY-MM
  base: number,
  bonus: number,
  penalty: number,
  total: number,
  status: string,   // "Ochiq" | "To'langan" | ...
  paidAt?: string
}
```

### 7.1. GET /payroll

- **URL**: `GET /api/payroll`
- **Фильтры**: `month`, `employee`, `status`.

### 7.2. POST /payroll

- **URL**: `POST /api/payroll`
- **Тело**: данные начисления.

### 7.3. POST /payroll/{id}/pay

- **URL**: `POST /api/payroll/{id}/pay`
- **Логика**: установка статуса "оплачено", `paidAt`.

### 7.4. GET /payroll/filters

- **URL**: `GET /api/payroll/filters`
- **Ответ**: отделы, статусы.

---

## 8. Продукция и производство

### 8.1. Products

#### Модель Product

```ts
Product {
  id: number,
  code: string,
  name: string,
  unit: string,
  category: string
}
```

#### GET /products

- **URL**: `GET /api/products`

#### POST /products

- **URL**: `POST /api/products`
- **Тело**:

```json
{
  "code": "M400",
  "name": "Oddiy sement",
  "unit": "tonna",
  "category": "sement"
}
```

#### GET /products/inventory

- **URL**: `GET /api/products/inventory`
- **Фильтры**: `dateFrom`, `dateTo`.
- **Ответ** – список с произведённым, расходом и остатком.

### 8.2. Production batches

```ts
ProductionBatch {
  id: number,
  batchId: string,
  product: string,
  shift: "MORNING" | "NIGHT",
  line: string,
  quantity: number,
  unit: string,
  price: number,
  totalSum: number,
  transport: string,
  operator: string,
  producedAt: string // YYYY-MM-DD
}
```

#### GET /production/batches

- **URL**: `GET /api/production/batches`
- **Фильтры**: `dateFrom`, `dateTo`, `product`, `shift`.

#### POST /production/batches

- **URL**: `POST /api/production/batches`
- **Тело**:

```json
{
  "batchId": "2024-01-01-01",
  "product": "M400",
  "shift": "MORNING",
  "line": "Line 1",
  "quantity": 100,
  "unit": "tonna",
  "price": 100000,
  "transport": "Truck 1",
  "operator": "Operator name",
  "producedAt": "2024-01-01"
}
```

### 8.3. Product outflows

#### GET /production/outflows

- **URL**: `GET /api/production/outflows`
- **Фильтры**: `dateFrom`, `dateTo`, `product`, `shift`.

---

## 9. Inventory flows (TODO)

**Планируемые эндпоинты** (ещё могут не быть реализованы):

- `GET /api/inventory/flows` – движения складских остатков
- `POST /api/inventory/flows` – регистрация движения

Модель `ProductFlow` по `backend-api-spec.md`.

---

## 10. Оборудование и ремонты

### 10.1. Equipment

```ts
Equipment {
  id: string,
  name: string,
  model: string,
  serial: string,
  price: number,
  purchaseDate: string,
  status: string,
  photoUrl?: string
}
```

#### GET /equipment

- **URL**: `GET /api/equipment`

#### POST /equipment

- **URL**: `POST /api/equipment`
- **Тело**:

```json
{
  "name": "Drobilka 1",
  "model": "X100",
  "serialNumber": "SN-001",
  "price": 10000000,
  "purchaseDate": "2024-01-10",
  "status": "ACTIVE",
  "photoUrl": "/uploads/equipment/...jpg"
}
```

### 10.2. Repairs

```ts
Repair {
  id: string,
  equipment: string,
  issue: string,
  date: string,
  cost: number,
  tech: string,
  status: string,
  photos?: string[]
}
```

#### GET /equipment/repairs

- **URL**: `GET /api/equipment/repairs`
- **Фильтры**: `equipmentId`, `status`.

#### POST /equipment/repairs

- **URL**: `POST /api/equipment/repairs`
- **Тело**: создание ремонта, включая `beforePhotos` / `afterPhotos` как массив URL (полученных через `/uploads/images` с категорией `REPAIRS`).

### 10.3. Equipment movements (TODO)

По спецификации должно быть:

- `GET /api/equipment/movements`
- `POST /api/equipment/movements`

Модель `EquipmentMovement` согласно `backend-api-spec.md` (категория, движение, причина, cost, `photoUrl`).

---

## 11. Technical expenses (TODO)

Планируемые эндпоинты:

- `GET /api/technical/expenses`
- `POST /api/technical/expenses`

Модель `TechnicalExpense` – расходы по технике.

---

## 12. Technical repairs (TODO)

Планируемые эндпоинты:

- `GET /api/technical/repairs`
- `POST /api/technical/repairs`

Модель `Repair` – аналогично разделу 10.2, но под префиксом `/technical`.

---

## 13. Машины и ANPR (TODO)

По спецификации:

- `GET /api/vehicles/logs` – список `VehicleLogEntry` с фильтрами `dateFrom`, `dateTo`, `vehicleType`, `direction`.

Модель `VehicleLogEntry`:

```ts
VehicleLogEntry {
  id: string,
  driver: string,
  vehicleType: "Yirik yuk" | "Kichik yuk",
  material: string,
  direction: "Kirdi" | "Chiqdi",
  entryAt: string,
  exitAt?: string
}
```

---

## 14. Инциденты (Incidents) и Driver API

### 14.1. DriverIncident (модель из спеки)

```ts
DriverIncident {
  id: string,
  name: string,
  location: string,
  date: string,
  time: string,
  driver: string,
  status: string,
  description?: string,
  photos?: string[]
}
```

### 14.2. Incidents (общий раздел)

#### GET /incidents

- **URL**: `GET /api/incidents`
- **Фильтры**: `date`, `driver`, `status`.
- **Ответ 200**: `DriverIncident[]`.

#### POST /incidents

- **URL**: `POST /api/incidents`
- **Тело**:

```json
{
  "title": "Dvigatel muammosi",
  "location": "Toshkent",
  "date": "2024-01-20",
  "time": "14:30",
  "driverName": "Driver 1",
  "status": "Open",
  "description": "Qisqa izoh",
  "photoUrls": [
    "/uploads/incidents/...jpg"
  ]
}
```

- Если текущий пользователь с ролью `DRIVER`, то `driverName` берётся из его профиля.

### 14.3. Driver API – инциденты

#### GET /driver/incidents

- **URL**: `GET /api/driver/incidents`
- **Фильтры**: такие же, как у `/api/incidents`.

#### POST /driver/incidents

- **URL**: `POST /api/driver/incidents`
- **Тело** – то же, что у `/api/incidents`.

---

## 15. Топливо (Driver + Owner)

### 15.1. FuelEvent / DriverFuelRecord

```ts
DriverFuelRecord {
  id: number,
  driverId: number,
  vehicleId?: number,
  amount: number,
  distanceKm: number,
  fuelGaugePhotoUrl?: string,
  speedometerPhotoUrl?: string,
  dateTime: string // ISO
}
```

### 15.2. Водитель – multipart upload

#### POST /drivers/{driverId}/fuel-events

- **URL**: `POST /api/drivers/{driverId}/fuel-events`
- **Content-Type**: `multipart/form-data`
- **Параметры формы**:
  - `fuelAmount` (BigDecimal)
  - `distance` (BigDecimal)
  - `vehicleId` (optional, Long)
  - `fuelGaugePhoto` (file)
  - `speedometerPhoto` (file)

Файлы сохраняются в `uploads/fuel`, в БД пишутся URL.

#### GET /drivers/{driverId}/fuel-events

- **URL**: `GET /api/drivers/{driverId}/fuel-events`
- **Фильтры**: `dateFrom`, `dateTo`.

### 15.3. Driver API – JSON вариант

#### GET /driver/fuel-records

- **URL**: `GET /api/driver/fuel-records`
- **Фильтры**: `driverId`, `vehicleId`, `dateFrom`, `dateTo`.

#### POST /driver/fuel-records

- **URL**: `POST /api/driver/fuel-records`
- **Query**:
  - `driverId` (required),
  - `vehicleId` (optional).
- **Тело**:

```json
{
  "amount": 10.5,
  "distanceKm": 120,
  "dateTime": "2025-12-04T10:00:00",
  "fuelGaugePhotoName": "/uploads/fuel/....jpg",
  "speedometerPhotoName": "/uploads/fuel/....jpg"
}
```

### 15.4. Owner fuel API

#### GET /fuel/filters

- **URL**: `GET /api/fuel/filters`
- **Ответ**: списки водителей и машин для фильтров.

#### GET /fuel/events

- **URL**: `GET /api/fuel/events`
- **Фильтры**: `driverId`, `vehicleId`, `dateFrom`, `dateTo`.

---

## 16. Статистика и дашборды

### 16.1. Statistics

#### GET /statistics/sales

- **URL**: `GET /api/statistics/sales`
- **Назначение**: агрегированная статистика продаж.

#### GET /statistics/raw-materials

- **URL**: `GET /api/statistics/raw-materials`

#### GET /statistics/production

- **URL**: `GET /api/statistics/production`

### 16.2. Cashier dashboard

#### GET /cashier-dashboard

- **URL**: `GET /api/cashier-dashboard`
- **Назначение**: сводные данные для главного экрана кассира.

---

## 17. Безопасность и доступы

- `/api/auth/login` и Swagger (`/v3/api-docs/**`, `/swagger-ui/**`) доступны без токена.
- Все остальные `/api/**` требуют `Authorization: Bearer <token>`.
- Роли контролируются через `@PreAuthorize`:
  - OWNER имеет доступ практически ко всем административным разделам.
  - CASHIER – к продажам, долгам, кассовым разделам.
  - DRIVER – к своим топливным записям и инцидентам.
  - TECHNICAL – к технике, ремонтам и техническим расходам.

Этот файл должен использоваться как единый источник правды при дальнейшем развитии backend’а: новые сущности и эндпоинты нужно добавлять сюда, поддерживая согласованность моделей и бизнес‑логики.
