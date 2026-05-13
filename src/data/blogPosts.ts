export interface BlogPost {
  id: string;
  tag: string;
  title: string;
  summary: string;
  date: string;
  image: string;
  slug: string;
  pinned?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    tag: "產品更新",
    title: "全新發佈：CodeGenApps 核心引擎大升級，開發速度再突破",
    summary: "我們非常興奮地宣布全新的核心引擎更新，這將帶來顯著的效能提升與更自動化的流程體驗。無論是複雜的關聯資料庫或是進階身分驗證，現在都能用更少的時間完成。",
    date: "2026-05-10",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=800&fit=crop&q=80",
    slug: "engine-update-v2",
    pinned: true,
  },
  {
    id: "2",
    tag: "使用案例",
    title: "某知名電商平台如何利用 CGA 縮短 50% 開發週期",
    summary: "探索快速迭代下，CGA 協助解決高併發訂單系統建置的實戰經驗與架構設計思維。",
    date: "2026-05-08",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
    slug: "ecommerce-case-study",
  },
  {
    id: "3",
    tag: "教學指南",
    title: "10 分鐘學會如何設計出完善的資料庫 Blueprint",
    summary: "從零開始建立 Firebase 與 SQL 等不同情境下的資料模型，掌握核心設計原則與擴展性。",
    date: "2026-05-05",
    image: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop&q=80",
    slug: "blueprint-guide",
  },
  {
    id: "4",
    tag: "活動",
    title: "CodeGenApps Taiwan 2026 開發者大會回顧",
    summary: "精彩的議程重點整理，影片與簡報資源下載，錯過現場的開發者別錯過這篇回顧。",
    date: "2026-04-28",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&q=80",
    slug: "dev-conf-2026",
  },
  {
    id: "5",
    tag: "產品更新",
    title: "新功能上線：前端共用元件庫正式推出",
    summary: "現在您可以直接在控制台中快速套用 RWD 元件與設計系統，進一步加速您的全端開發流程。",
    date: "2026-04-15",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&q=80",
    slug: "ui-component-library",
  },
  {
    id: "6",
    tag: "教學指南",
    title: "串接第三方 API 的五個最佳實踐",
    summary: "在 No Code/Low Code 環境中，優雅地處理錯誤與非同步請求，提升產品穩定性與體驗。",
    date: "2026-04-10",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80",
    slug: "api-integration-best-practices",
  },
  {
    id: "7",
    tag: "產品更新",
    title: "v1.2: 增強的自動部署與權限控管",
    summary: "部署時間縮短 30%，並加入更細緻的 RBAC 權限管理機制，讓團隊協作更加安全高效。",
    date: "2026-03-25",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop&q=80",
    slug: "v1-2-deployment-rbac",
  },
  {
    id: "8",
    tag: "使用案例",
    title: "新創公司如何利用 CGA 在兩週內完成產品雛形",
    summary: "看看這家 SaaS 新創如何從點子到上線，大幅縮小初期技術風險，快速打入市場獲得回饋。",
    date: "2026-03-12",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop&q=80",
    slug: "startup-mvp-case",
  },
  {
    id: "9",
    tag: "活動",
    title: "線上工作坊：深入拆解大語言模型應用架構",
    summary: "帶你一步步理解如何將 AI 模型整合進現有服務中，從 prompt 工程到 API 對接完整解析。",
    date: "2026-02-28",
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&h=600&fit=crop&q=80",
    slug: "llm-architecture-workshop",
  },
  {
    id: "10",
    tag: "教學指南",
    title: "用 CGA 輕鬆完成 Stripe 金流對接",
    summary: "不需煩惱複雜的 Webhook 與簽章驗證，這篇教學教你如何快速設定安全的訂閱制支付流程。",
    date: "2026-02-15",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop&q=80",
    slug: "stripe-integration-guide",
  },
  {
    id: "11",
    tag: "使用案例",
    title: "傳統產業數位轉型：自動化庫存管理系統經驗談",
    summary: "老品牌如何透過客製化的內部工具，整合多個資料孤島，提升 40% 的物流處理效率。",
    date: "2026-01-20",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop&q=80",
    slug: "digital-transformation-manufacturing",
  },
  {
    id: "12",
    tag: "教學指南",
    title: "提升資料庫查詢效能的常見技巧",
    summary: "學會正確使用索引 (Index) 與關聯設計，讓你即使面對百萬級距資料，也能維持極速響應。",
    date: "2026-01-05",
    image: "https://images.unsplash.com/photo-1620912189868-30778f908e33?w=800&h=600&fit=crop&q=80",
    slug: "database-performance-tuning",
  }
];
