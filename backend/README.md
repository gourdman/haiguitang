# Backend (Node.js + Express)

## Setup
```bash
cd backend
npm install
```

在 `backend` 目录本地创建 `.env`（**不要提交到 Git**），按需设置，例如：

- `DEEPSEEK_API_KEY`：DeepSeek API 密钥（必填，用于 `/api/chat`）
- `DEEPSEEK_MODEL`：可选，默认 `deepseek-chat`
- `DEEPSEEK_TIMEOUT_MS`：可选，上游超时毫秒数
- `PORT`：可选，默认 `3001`
- `CORS_ORIGIN`：可选，允许的前端来源（逗号分隔）

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

