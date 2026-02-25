// ====================== 核心脚本代码（修复替换失效） ======================
const CONFIG = {
  BASE_URL: 'https://gate-obt.nqf.qq.com',
  TARGET_HOST: 'http://127.0.0.1'
};

// 强制执行：先替换 URL，再提取 code，最后必触发 $done
if (typeof $request !== 'undefined' && $request.url) {
  let originalUrl = $request.url;
  // 1. 强制替换域名（兼容带参数的完整 URL）
  let newUrl = originalUrl.replace(CONFIG.BASE_URL, CONFIG.TARGET_HOST);
  
  // 2. 提取 code 并打印日志
  const codeMatch = originalUrl.match(/code=([^&]+)/);
  if (codeMatch && codeMatch[1]) {
    console.log("✅ 提取到 code：" + codeMatch[1]);
  } else {
    console.log("❌ 未匹配到 code 参数");
  }

  // 3. 核心修复：强制返回修改后的 URL，阻断原请求
  $done({
    url: newUrl,
    // 可选：强制返回空响应，彻底阻止游戏连接（二选一，优先用这个）
    response: {
      status: 200,
      body: "Request blocked"
    }
  });
} else {
  // 兜底：防止请求对象异常导致脚本失效
  $done({});
}