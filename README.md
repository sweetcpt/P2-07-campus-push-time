# P2-07 校园社群推送时间 A/B 实验

独立于 P2-06 的参考成品式课程实验项目，研究上午 `09:00` 与晚上 `20:00` 推送校园福利内容是否会影响点击率。

## 页面

- `index.html`：项目首页
- `project2.html`：项目说明
- `experiment.html?id=P2-07`：实验工作台
- `share.html?e=P2-07`：参与登记入口
- `experience.html?e=P2-07`：校园推文体验页
- `aggregate.html`：CTR 汇总和 CSV 导出
- `setup.html`：独立 Worker 配置

## 实验设计

- A 版：上午 09:00
- B 版：晚上 20:00
- 文案、封面、福利内容、按钮和页面布局一致，只改变推送时间
- 计划总有效样本 120 份，A/B 各 60 份以上，发布周期 7 天
- 主指标：点击率 CTR = 点击人数 / 曝光人数
- 预览 `?preview=A/B` 不写入正式数据

## 本机运行

```bash
python3 -m http.server 8000
```

访问 `http://localhost:8000/index.html`。正式参与入口是 `share.html?e=P2-07`。

本机模式下数据保存在 `p207_*` localStorage；没有 Worker 时页面仍然可用，不生成随机样本。

## 发布与收集

GitHub Pages 可以直接托管本目录。跨设备收集时，部署 `worker/` 中独立的 Worker + D1，并在 `setup.html` 填写 API 地址。具体步骤见 [DEPLOY.md](DEPLOY.md)。

正式报告只填写 `aggregate.html` 中实际记录的 A/B 曝光、点击和 CTR，不要提前写“差异显著”。
