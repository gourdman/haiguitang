# Backend API 文档

后端默认地址：`http://localhost:3001`（可通过 `PORT` 环境变量修改）

## 通用说明

- 所有接口返回 JSON。
- 成功返回：`{ ok: true, ... }`
- 失败返回：`{ ok: false, code: string, message: string, details?: object }`
- 开发环境下（非 production）部分错误会带 `details` 便于调试。

---

## `GET /api/test`

健康检查接口，用于确认服务是否可用。

### 请求示例

```bash
curl http://localhost:3000/api/test
```

### 成功响应

```json
{
  "ok": true,
  "message": "API is working",
  "timestamp": "2026-03-31T12:00:00.000Z"
}
```

---

## `POST /api/chat`

聊天接口，接收问题与故事对象，调用 DeepSeek 返回回答。

### 请求头

- `Content-Type: application/json`

### 请求体

```json
{
  "question": "这是自杀吗？",
  "story": {
    "surface": "汤面文本",
    "bottom": "汤底文本"
  }
}
```

### 参数说明

- `question`: `string`，必填，玩家问题
- `story`: `object`，必填，故事对象（可扩展字段）

### 成功响应

```json
{
  "ok": true,
  "answer": "否"
}
```

### 失败响应示例

```json
{
  "ok": false,
  "code": "INVALID_QUESTION",
  "message": "question is required (string)"
}
```

常见错误码：

- `INVALID_QUESTION`：问题为空或类型错误
- `INVALID_STORY`：`story` 不是 JSON 对象
- `MISSING_DEEPSEEK_API_KEY`：服务端缺少 API Key
- `UPSTREAM_TIMEOUT`：上游 AI 请求超时
- `UPSTREAM_DEEPSEEK_ERROR`：上游 AI 返回错误
- `INTERNAL_ERROR`：其他服务端错误

---

## 日志说明

服务会记录每个请求的基础日志，格式如下：

```text
[时间] METHOD /path 状态码 耗时ms ip=来源IP
```

示例：

```text
[2026-03-31T12:00:00.000Z] POST /api/chat 200 312ms ip=::1
```
