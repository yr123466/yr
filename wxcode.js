// 核心：提取code + 强制阻断 + 复制
if ($request?.url) {
  // 1. 提取code（从原始URL，最稳定）
  const code = $request.url.match(/code=([^&]+)/)?.[1];
  
  if (code) {
    // 2. QX原生复制（兼容所有版本，无报错）
    $prefs.setValueForKey(code, "saved_code");
    console.log("✅ 提取并保存code：" + code);
    // 弹窗提示（QX原生，必生效）
    $notify("拦截成功", "code已复制", code);
  } else {
    console.log("❌ 未提取到code");
    $notify("拦截成功", "未提取到code", "");
  }

  // 3. 强制阻断：返回空响应，游戏直接卡死/报错
  $done({
    status: 200,
    body: "",
    headers: { "Content-Length": "0" }
  });
} else {
  $done({});
}