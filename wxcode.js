// 1. 先替换 URL：把 gate-obt.nqf.qq.com 换成 127.0.0.1
const originalUrl = $request.url;
const newUrl = originalUrl.replace("https://gate-obt.nqf.qq.com", "http://127.0.0.1");

// 2. 再从替换后的 URL 里提取 code
const codeMatch = newUrl.match(/code=([^&]+)/);
let code = "未找到code";

if (codeMatch && codeMatch[1]) {
    code = codeMatch[1];
    // 尝试复制到剪贴板
    try {
        $clipboard.set(code);
        $notify("✅ 先替换后提取成功", "Code: " + code, "已复制到剪贴板");
    } catch (e) {
        console.log("提取到code: " + code);
    }
}

// 3. 返回修改后的请求
$done({
    url: newUrl
});
