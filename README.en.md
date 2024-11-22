# vite-plugin-auto-loading

[中文](./README.md) | English

A Vite plugin for automatically handling loading states in Vue components.

## Installation

```bash
npm install vite-plugin-auto-loading -D

# or
pnpm add vite-plugin-auto-loading -D
```

## Usage

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import  { autoLoadingPlugin } from 'vite-plugin-auto-loading'
export default defineConfig({
  plugins: [
    autoLoadingPlugin({
      debug: true // Enable debug logs
    })
  ]
})
```

In Vue components:

```vue
<script setup>
const loading = reactive({
  fetchData: false,
  submitForm: false
})
// Loading states for these functions will be handled automatically
const fetchData = async () => {
  await api.getData()
}
const submitForm = async () => {
  await api.submit()
}
</script>
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| debug | boolean | false | Enable debug logs |
```

主要修改建议：
1. 在原有的中文 README.md 顶部添加语言切换链接
2. 创建新的英文 README.en.md 文件
3. 两个文件互相引用，方便切换语言
4. 保持格式和结构一致，只是内容语言不同

这样用户就可以通过点击顶部的语言链接来切换中英文文档了。