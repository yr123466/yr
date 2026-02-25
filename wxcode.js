const CONFIG = {
  BASE_URL: 'https://gate-obt.nqf.qq.com',
  TARGET_HOST: 'http://127.0.0.1'
};

if (typeof $request !== 'undefined' && $request.url) {
  const originalUrl = $request.url;

  // 1️⃣ 先替换域名，生成新 URL
  const newUrl = originalUrl.replace(CONFIG.BASE_URL, CONFIG.TARGET_HOST);
  console.log("🔄 URL 已修改为：" + newUrl);

  // 2️⃣ 再从替换后的新 URL 中提取 code
  const codeMatch = newUrl.match(/code=([^&]+)/);
  if (codeMatch && codeMatch[1]) {
    const code = codeMatch[1];
    console.log("✅ 从新 URL 提取到 code：" + code);
  } else {
    console.log("❌ 未在新 URL 中匹配到 code 参数");
  }

  // 3️⃣ 返回修改后的请求
  $done({
    url: newUrl
  });
} else {
  $done({});
}