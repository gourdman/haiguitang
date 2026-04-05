# 在 Vercel 部署（不把密钥推送到 GitHub）

## 若线上 `/api/chat`、`/api/match-score` 返回 404

说明 **Serverless 没有进本次部署**。请确认：

1. 仓库根目录存在 **`api/chat.js`**、**`api/match-score.js`**、**`api/lib/deepseek-core.js`**，且 **`vercel.json`** 已提交。
2. 在 GitHub 网页上能看到上述文件（未提交则 Vercel 拉不到代码，只会部署静态前端，API 全是 404）。
3. Vercel 项目 **Root Directory** 留空（或指向仓库根），不要指到 `backend` 或 `src` 子目录。
4. 部署完成后在 Vercel → 该 Deployment → **Functions** 里应能看到 `/api/chat`、`/api/match-score`。

---

**不要**把 `.env` 或 `backend/.env` 提交到 GitHub。任何人拿到仓库都能看到你的 `DEEPSEEK_API_KEY`，存在盗用与费用风险。

正确做法：在 **Vercel 控制台** 为项目配置 **Environment Variables**（与本地 `.env` 等价，但只存在 Vercel 服务端）。

## 1. 环境变量（Production / Preview 按需勾选）

在 Vercel → Project → **Settings** → **Environment Variables** 添加：

| Name | 说明 |
|------|------|
| `DEEPSEEK_API_KEY` | **必填**，你的 DeepSeek API 密钥 |
| `DEEPSEEK_MODEL` | 可选，默认 `deepseek-chat` |
| `DEEPSEEK_TIMEOUT_MS` | 可选，默认 `30000` |
| `DEEPSEEK_BASE_URL` | 一般不用改，默认官方 `chat/completions` 地址 |

保存后 **Redeploy** 一次，新变量才会生效。

## 2. 本项目在 Vercel 上的结构

- 前端：`npm run build` → `dist`（Vite）
- 接口：根目录 `api/chat.js`、`api/match-score.js`（Serverless），与页面同域名下的 `/api/chat`、`/api/match-score`
- 前端已使用相对路径 `fetch('/api/chat')`，部署后无需改代码即可打到上述函数

## 3. 超时说明

`vercel.json` 里为上述 API 配置了较长 `maxDuration`。免费套餐对单函数执行时间有限制，若请求经常超时，需在 Vercel 升级套餐或缩短上游超时。

## 4. 仍想在本地跑 Express 后端

可继续使用 `backend/server.js` + `backend/.env`；与 Vercel 部署相互独立，互不影响。
