# Backend (Node.js + Express)

## Setup
```bash
cd backend
npm install
```

## Start
```bash
npm run start
```

## Dev (auto restart)
```bash
npm run dev
```

## API
- `GET /api/test`
- `POST /api/chat`
- 详细接口文档见：`backend/API.md`

## CORS
- 可通过 `backend/.env` 设置 `CORS_ORIGIN`（逗号分隔多个允许的前端地址）。
- 未设置时，默认允许所有来源（方便本地联调）。

## Logging
- 服务会打印每个请求的日志（方法、路径、状态码、耗时、来源 IP）。

