# P2-07 部署说明

## GitHub Pages

将本目录上传到独立仓库根目录，在 `Settings → Pages` 选择 `main` / `/(root)`。正式参与链接格式：

```text
https://用户名.github.io/仓库名/share.html?e=P2-07
```

## 独立 Worker + D1

```bash
cd worker
npm install -g wrangler
wrangler login
wrangler d1 create p2-07-push-time
```

把返回的数据库 ID 写入 `worker/wrangler.toml`，新库执行：

```bash
wrangler d1 execute p2-07-push-time --remote --file=schema.sql
wrangler secret put ADMIN_TOKEN
wrangler deploy
```

如已有旧版 P2-07 数据库，先执行：

```bash
wrangler d1 execute p2-07-push-time --remote --file=migrations/0001_add_click_metrics.sql
```

部署后把 Worker 地址填入 `setup.html` 并点击健康检查。API 地址保存在当前浏览器，口令只保存在 sessionStorage。

## 收集前检查

1. 用 `share.html?e=P2-07` 登记真实参与者。
2. 预览 A 应显示 `09:00`，预览 B 应显示 `20:00`。
3. 正式打开体验页才计一次曝光。
4. 点击福利按钮才计点击。
5. 刷新不改变版本，也不重复创建参与者。
6. `aggregate.html` 只显示真实数据，样本不足时只报告趋势。
