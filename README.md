# Surge_ProxyList
部分机场不单独提供服务器列表链接，完整的配置文件过于鸡肋，使用 Cloudflare Workers 将机场配置文件链接转换为仅有服务器列表的链接，方便使用。

## 环境

* Surge

* Cloudflare Workers

## 部署步骤

1. 在 [Cloudflare](https://cloudflare.com) 中创建新的 worker

2. 将 [worker.js](./worker.js) 中的全部代码内容粘贴到 cloudflare 的脚本区域并点击【保存并部署】

3. 获取形如 `https://damp-base-f250.abc.workers.dev` 的链接（此链接可以自定义）

## 使用

在 Surge 配置文件中的 [Proxy Group] 部分按照 `pg = url-test, policy-path=https://damp-base-f250.abc.workers.dev/jichang.com/***/Ue***/surge.conf, url=http://www.gstatic.com/generate_204, interval=600, tolerance=100` 配置使用，其中 `jichang.com/***/Ue***/surge.conf` 部分为机场的配置文件链接（不包括'https://'）

