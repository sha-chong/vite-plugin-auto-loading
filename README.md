# vite-plugin-auto-loading

## 简介 | Introduction
一个用于自动处理 Vue 组件中 loading 状态的 Vite 插件。

A Vite plugin for automatically handling loading states in Vue components.

## 安装 | Installation

```cmd
bash
npm install vite-plugin-auto-loading -D

or
pnpm add vite-plugin-auto-loading -D
```



## 使用方法 | Usage

ts

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import  { autoLoadingPlugin } from 'vite-plugin-auto-loading'
export default defineConfig({
plugins: [
    autoLoadingPlugin({
      debug: true // 开启调试日志 | Enable debug logs
    })
  ]
})
```





在 Vue 组件中 | In Vue Components:

vue

```vue
<script setup>
const loading = reactive({
fetchData: false,
submitForm: false
})
// 这些函数的 loading 状态会被自动处理
// Loading states for these functions will be handled automatically
const fetchData = async () => {
await api.getData()
}
const submitForm = async () => {
await api.submit()
}
</script>
```


## 配置选项 | Configuration Options
| 选项 Option | 类型 Type | 默认值 Default | 说明 Description |
|-------------|-----------|----------------|------------------|
| debug | boolean | false | 开启调试日志 \| Enable debug logs |

## 工作原理 | How it Works
插件会自动检测异步函数，并在函数执行期间管理对应的 loading 状态。

The plugin automatically detects async functions and manages their corresponding loading states during execution.

## 注意事项 | Notes
- loading 对象必须是响应式的 | The loading object must be reactive
- 异步函数名必须与 loading 对象的属性名对应 | Async function names must match the loading object property names

