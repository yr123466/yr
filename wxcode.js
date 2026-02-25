if ($request && $request.url) {
  var url = $request.url;

  // 替换成 127.0.0.1 拦截（你本地成功的逻辑）
  var newUrl = url.replace("https://gate-obt.nqf.qq.com", "http://127.0.0.1");

  // 提取 code
  var code = "";
  var match = newUrl.match(/code=([^&]+)/);
  if (match) code = match[1];

  // 弹窗（和本地完全一样）
  $notify("拦截成功", "code 已提取", code);

  // 只返回修改后的URL，不伪造响应（这才是你要的）
  $done({ url: newUrl });
} else {
  $done({});
}