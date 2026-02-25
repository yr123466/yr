if ($request && $request.url) {
  var url = $request.url;

  // 替换成 127.0.0.1 拦截
  var newUrl = url.replace("https://gate-obt.nqf.qq.com", "http://127.0.0.1");

  // 提取 code
  var code = "";
  var match = newUrl.match(/code=([^&]+)/);
  if (match) code = match[1];

  // 弹窗
  $notify("拦截成功", "code 已提取", code);

  // 返回修改后的 URL（真正断连，不重试）
  $done({ url: newUrl });
} else {
  $done({});
}