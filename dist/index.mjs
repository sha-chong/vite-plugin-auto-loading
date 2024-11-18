function M(x={}){let{debug:h=!1}=x;return{name:"vite-plugin-loading",enforce:"pre",transform(o,c){try{if(!c.endsWith(".vue"))return o;h&&console.debug(`[vite-plugin-auto-loading] Processing ${c}`);let l=o.match(/loading\s*=\s*reactive\s*\(\s*{([^}]*)}\s*\)/),y=o.match(/loading\s*=\s*ref\s*\(\s*{([^}]*)}\s*\)/),d=l||y;if(!d)return o;let f=d[1].split(",").map(t=>t.trim()).filter(Boolean).map(t=>t.split(":")[0].trim());if(console.log(f,2222),f.length===0)return o;let E=(t,r)=>{let e=1,n=r,a=!1,g="";for(;n<t.length&&e>0;){let s=t[n];(s==='"'||s==="'")&&t[n-1]!=="\\"&&(a?s===g&&(a=!1):(a=!0,g=s)),a||(s==="{"&&e++,s==="}"&&e--),n++}return n},$=(t,r)=>{let e=t.match(/^\s+/),n=e?e[0]:"  ";return`
${n}loading.${r} = true;
${n}try {
${t}${n}} finally {
${n}  loading.${r} = false;
${n}}`},i=o,b=[{regex:t=>new RegExp(`const\\s+${t}\\s*=\\s*async\\s*\\([^)]*\\)\\s*=>\\s*{`,"g"),processMatch:(t,r)=>({start:t.index,bodyStart:t.index+t[0].length})},{regex:t=>new RegExp(`async\\s+function\\s+${t}\\s*\\([^)]*\\)\\s*{`,"g"),processMatch:(t,r)=>({start:t.index,bodyStart:t.index+t[0].length})},{regex:t=>new RegExp(`${t}:\\s*async\\s*\\([^)]*\\)\\s*=>\\s*{`,"g"),processMatch:(t,r)=>({start:t.index,bodyStart:t.index+t[0].length})}];return f.forEach(t=>{let r=e=>/\bawait\b/.test(e);b.forEach(e=>{let n=e.regex(t),a;for(;(a=n.exec(i))!==null;){let{start:g,bodyStart:s}=e.processMatch(a,t),u=E(i,s);if(u>s){let w=i.slice(g,s),p=i.slice(s,u-1);if(r(p)){let m=$(p,t);i=i.slice(0,g)+w+m+"}"+i.slice(u)}}}})}),i}catch(l){return console.error(`[vite-plugin-loading] Error processing ${c}:`,l),o}}}}export{M as autoLoadingPlugin};
//# sourceMappingURL=index.mjs.map