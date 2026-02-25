/*
================ Quantumult X 配置块 ================
[rewrite_local]
# 替换域名并提取 code
^https?:\/\/gate-obt\.nqf\.qq\.com\/prod\/ws url script-request-header
js链接待补充

[mitm]
hostname = gate-obt.nqf.qq.com

================ 配置结束 ================
*/

// ====================== 核心脚本代码 ======================
const CONFIG = {
  STORAGE_KEY: 'nqf_code_v1',
  BASE_URL: 'https://gate-obt.nqf.qq.com',
  TARGET_HOST: 'http://127.0.0.1',
  VERSION: '1.0.0'
};

// 🎯 替换域名 + 提取 code 模块
if (typeof $request !== 'undefined') {
  const url = $request.url;
  // 1. 替换域名
  const newUrl = url.replace(CONFIG.BASE_URL, CONFIG.TARGET_HOST);
  // 2. 提取 code
  const codeMatch = url.match(/code=([^&]+)/);
  if (codeMatch && codeMatch[1]) {
    const code = codeMatch[1];
    $clipboard.set(code);
    $notify("✅ NQF Code 提取成功", "已复制到剪贴板", code);
  }
  // 3. 返回修改后的请求
  $done({ url: newUrl });
}