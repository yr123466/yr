// ====================== 核心脚本代码（强制修改URL版） ======================
const CONFIG = {
  BASE_URL: 'https://gate-obt.nqf.qq.com',
  TARGET_HOST: 'http://127.0.0.1'
};

if (typeof $request !== 'undefined' && $request.url) {
  const originalUrl = $request.url;

  // 1. 提取 code 并打印日志
  const codeMatch = originalUrl.match(/code=([^&]+)/);
  if (codeMatch && codeMatch[1]) {
    console.log("✅ 提取到 code：" + codeMatch[1]);
  } else {
    console.log("❌ 未匹配到 code 参数");
  }

  // 2. 强制替换域名，生成新的 URL
  const newUrl = originalUrl.replace(CONFIG.BASE_URL, CONFIG.TARGET_HOST);
  console.log("🔄 URL 已修改为：" + newUrl);

  // 3. 核心：返回修改后的 URL，确保 QX 执行
  $done({
    url: newUrl
  });
} else {
  $done({});
}