/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 生产环境：你的后端/边缘代理前缀，不含 /chat/completions */
  readonly VITE_API_PROXY_BASE?: string
  readonly VITE_DEEPSEEK_MODEL?: string
}
