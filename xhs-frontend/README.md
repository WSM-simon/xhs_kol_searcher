# Vue 3 + TypeScript + Vite

## Frontend Structure
src/
├── assets/
├── components/
 │  ├── KeywordInput.vue
 │  ├── BloggerList.vue
 │  ├── BloggerCard.vue
 │  └── BloggerDetailModal.vue
├── pages/
 │  └── KeywordSearchPage.vue
├── App.vue
├── main.js
└── router/index.js

|#|页面 (Page)|主要区域 / 子组件 (Component)|说明|
|---|---|---|---|
|1|**KeywordSelectPage.vue**关键词选择页面|• **KeywordList.vue**：20 个默认关键词（可多行 Chip 或 List）。• **KeywordInput.vue**：手动输入组件（输入后回车 / 按钮添加）。• **BucketPanel.vue**：已选关键词区域，显示 ≤ 5 个 Chip + 剩余数量提示。• **KeywordChip.vue**：单个关键词 Chip（可点击移除）。• **PrimaryButton.vue**：下一步 / 搜索按钮|负责「选词 → 生成 bucket」。把最终 `bucket` 数组存到 Pinia / inject provide 或路由 query 里。|
|2|**SearchResultsPage.vue**搜索结果页面|• **ColumnContainer.vue**：根据 `bucketSize` 动态渲染 N 列。• **BloggerColumn.vue**：每列内部循环渲染博主卡片。• **BloggerCard.vue**：博主基本信息 + 「加入队列」按钮。• **SearchQueuePanel.vue**：右侧 / 底部固定面板，显示详细搜索队列。• **QueueItem.vue**：队列里的一个博主（头像、昵称、进度、状态栏 ProgressBar.vue）。• **PrimaryButton.vue**：跳转到“博主详细搜索结果页”|这个页面承担两件事：① 展示分栏搜索结果；② 实时展示“详细搜索队列”。搜索结束后启用跳转按钮。|
|3|_（逻辑层而非单独路由）_详细搜索队列|直接由 **SearchQueuePanel.vue** + **QueueItem.vue** 实现|不需要单独页面；跟随 SearchResultsPage 共存。状态可放 Pinia：`queueList`, `progress`.|
|4|**BloggerDetailResultPage.vue**博主详细搜索结果页|• **Toolbar.vue**：排序 / 筛选控件（下拉、搜索框、Tag 筛选等）。• **BloggerTable.vue**：表格 / 卡片布局展示详细数据。• **BloggerRow.vue**：表格里的行或卡片。• **EmptyState.vue**：无数据提示|从 Pinia / 路由参数获取完整详细数据；提供多列排序、过滤、分页。|
