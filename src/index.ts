import type { Plugin } from 'vite';
export interface AutoLoadingOptions {
    debug?: boolean;
}
export function autoLoadingPlugin(options: AutoLoadingOptions = {}): Plugin {
    const { debug = false } = options;
    return {
        name: 'vite-plugin-loading',
        enforce: 'pre',
        transform(code, id) {
            try {
                if (!id.endsWith('.vue')) return code;
                if (debug) {
                  console.debug(`[vite-plugin-auto-loading] Processing ${id}`);
              }
                // 只匹配 reactive 定义的 loading
                const reactiveMatch = code.match(/loading\s*=\s*reactive\s*\(\s*{([^}]*)}\s*\)/);
                const refMatch = code.match(/loading\s*=\s*ref\s*\(\s*{([^}]*)}\s*\)/);
                const loadingMatch = reactiveMatch || refMatch;
                if (!loadingMatch) return code;

                // 提取 loading keys
                const loadingKeys = loadingMatch[1]
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean)
                    .map((item) => item.split(':')[0].trim());
                if (loadingKeys.length === 0) return code;

                // 查找函数体结束位置
                const findClosingBrace = (str: string, startIndex: number) => {
                    let count = 1;
                    let i = startIndex;
                    let inString = false;
                    let stringChar = '';

                    while (i < str.length && count > 0) {
                        const char = str[i];
                        // 处理字符串
                        if ((char === '"' || char === "'") && str[i - 1] !== '\\') {
                            if (!inString) {
                                inString = true;
                                stringChar = char;
                            } else if (char === stringChar) {
                                inString = false;
                            }
                        }
                        // 计数括号
                        if (!inString) {
                            if (char === '{') count++;
                            if (char === '}') count--;
                        }
                        i++;
                    }
                    return i;
                };

                // 包装函数体
                const wrapFunctionBody = (body: string, key: string) => {
                    const indentMatch = body.match(/^\s+/);
                    const indent = indentMatch ? indentMatch[0] : '  ';

                    return `
${indent}loading.${key} = true;
${indent}try {
${body}${indent}} finally {
${indent}  loading.${key} = false;
${indent}}`;
                };

                let transformedCode = code;

                // 定义所有需要匹配的函数模式
                const patterns = [
                    // 箭头函数: const name = async () => {}
                    {
                        regex: (key: string) =>
                            new RegExp(
                                `const\\s+${key}\\s*=\\s*async\\s*\\([^)]*\\)\\s*=>\\s*{`,
                                'g'
                            ),
                        processMatch: (match: RegExpExecArray, key: string) => ({
                            start: match.index,
                            bodyStart: match.index + match[0].length
                        })
                    },
                    // 普通函数: async function name() {}
                    {
                        regex: (key: string) =>
                            new RegExp(`async\\s+function\\s+${key}\\s*\\([^)]*\\)\\s*{`, 'g'),
                        processMatch: (match: RegExpExecArray, key: string) => ({
                            start: match.index,
                            bodyStart: match.index + match[0].length
                        })
                    },
                    // setup方法: name: async () => {}
                    {
                        regex: (key: string) =>
                            new RegExp(`${key}:\\s*async\\s*\\([^)]*\\)\\s*=>\\s*{`, 'g'),
                        processMatch: (match: RegExpExecArray, key: string) => ({
                            start: match.index,
                            bodyStart: match.index + match[0].length
                        })
                    }
                ];

                // 处理每个 loading key
                loadingKeys.forEach((key) => {
                    // 检查函数是否包含 await
                    const hasAwait = (body: string) => /\bawait\b/.test(body);

                    // 应用每个模式
                    patterns.forEach((pattern) => {
                        const regex = pattern.regex(key);
                        let match;

                        while ((match = regex.exec(transformedCode)) !== null) {
                            const { start, bodyStart } = pattern.processMatch(match, key);
                            const bodyEnd = findClosingBrace(transformedCode, bodyStart);

                            if (bodyEnd > bodyStart) {
                                const prefix = transformedCode.slice(start, bodyStart);
                                const body = transformedCode.slice(bodyStart, bodyEnd - 1);

                                // 只处理包含 await 的函数
                                if (hasAwait(body)) {
                                    const newBody = wrapFunctionBody(body, key);
                                    transformedCode =
                                        transformedCode.slice(0, start) +
                                        prefix +
                                        newBody +
                                        '}' +
                                        transformedCode.slice(bodyEnd);
                                }
                            }
                        }
                    });
                });

                return transformedCode;
            } catch (e) {
                console.error(`[vite-plugin-loading] Error processing ${id}:`, e);
                return code; // 发生错误时返回原始代码
            }
        }
    };
}
