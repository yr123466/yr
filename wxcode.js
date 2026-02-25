// ====================== 替换拦截 + 提取code 脚本 ======================
const CONFIG = {
  BASE_URL: 'https://gate-obt.nqf.qq.com',
  TARGET_HOST: 'http://127.0.0.1'
};

if (typeof $request !== 'undefined' && $request.url) {
  const originalUrl = $request.url;

  // 1️⃣ 先替换域名，生成拦截用的新 URL
  const newUrl = originalUrl.replace(CONFIG.BASE_URL, CONFIG.TARGET_HOST);
  console.log("🔄 拦截替换 URL：" + newUrl);

  // 2️⃣ 从替换后的新 URL 中提取 code
  const codeMatch = newUrl.match(/code=([^&]+)/);
  if (codeMatch && codeMatch[1]) {
    const code = codeMatch[1];
    console.log("✅ 提取到 code：" + code);
    // 尝试复制到剪贴板，失败也不影响拦截
    try {
      $clipboard.set(code);
      console.log("📋 code 已复制到剪贴板");
    } catch (e) {
      console.log("⚠️ 剪贴板不可用，code 已打印到日志");
    }
  } else {
    console.log("❌ 未匹配到 code 参数");
  }

  // 3️⃣ 核心拦截：直接返回本地响应，彻底阻断游戏连接
  $done({
    response: {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: -1,
        msg: "Request blocked",
        data: null
      })
    }
  });
} else {
  $done({});
}