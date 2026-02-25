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
    // 先打印日志，确认代码执行到这里
    console.log("✅ 提取到 code: " + code);
    // 再尝试弹窗
    try {
      $notify("✅ NQF Code 提取成功", "已复制到剪贴板", code);
    } catch (e) {
      console.log("⚠️ $notify 不可用: " + e.message);
    }
  } else {
    console.log("❌ 未找到 code 参数");
  }
  // 3. 返回修改后的请求
  $done({ url: newUrl });
}