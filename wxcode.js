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
    // 打印到日志，避免调用 $clipboard
    console.log("✅ 提取到 code: " + code);
    // 尝试弹窗，失败也不影响脚本执行
    try {
      $notify("✅ NQF Code 提取成功", "code 已打印到日志", code);
    } catch (e) {}
  } else {
    console.log("❌ 未找到 code 参数");
  }
  // 3. 返回修改后的请求
  $done({ url: newUrl });
}