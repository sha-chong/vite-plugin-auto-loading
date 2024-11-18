# vite-plugin-auto-loading

一个用于自动处理 Vue 组件中 loading 状态的 Vite 插件。

## 安装

```cmd
bash
npm install vite-plugin-auto-loading -D

or
pnpm add vite-plugin-auto-loading -D
```



## 使用

ts

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import  { autoLoadingPlugin } from 'vite-plugin-auto-loading'
export default defineConfig({
plugins: [
    autoLoadingPlugin({
      debug: true // 开启调试日志
    })
  ]
})
```





在 Vue 组件中:

vue

```vue
<script setup>
const loading = reactive({
fetchData: false,
submitForm: false
})
// 这些函数的 loading 状态会被自动处理
const fetchData = async () => {
await api.getData()
}
const submitForm = async () => {
await api.submit()
}
</script>
```



## 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| debug | boolean | false | 是否开启调试日志 |

## License