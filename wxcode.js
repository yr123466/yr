if (typeof $request !== 'undefined' && $request.url) {
  const url = $request.url;

  // 1. 从原始请求 URL 中提取 code
  const codeMatch = url.match(/code=([^&]+)/);
  if (codeMatch && codeMatch[1]) {
    const code = codeMatch[1];
    console.log("✅ 提取到 code：" + code);
    
    // 尝试复制到剪贴板
    try {
      $clipboard.set(code);
      console.log("📋 code 已复制到剪贴板");
    } catch (e) {
      console.log("⚠️ 剪贴板不可用，code 已打印到日志");
    }
  } else {
    console.log("❌ 未匹配到 code 参数");
  }

  // 2. 核心拦截：直接返回 500 错误，彻底阻断游戏连接
  $done({
    response: {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: -1,
        msg: "Network Error",
        data: null
      })
    }
  });
} else {
  $done({});
}