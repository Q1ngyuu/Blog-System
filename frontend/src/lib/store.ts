// In-memory data store with JSON file persistence for local dev.
// On Vercel serverless, data lives only for the function's lifetime.

let posts: PostRow[] = [];
let categories: CategoryRow[] = [];
let nextPostId = 1;
let nextCategoryId = 1;

export interface PostRow {
  id: number;
  title: string;
  content: string;
  summary: string | null;
  category_id: number | null;
  created_at: string;
  updated_at: string | null;
}

export interface CategoryRow {
  id: number;
  name: string;
}

function now(): string {
  return new Date().toISOString();
}

export function initStore(): void {
  if (categories.length > 0) return; // already seeded

  categories = [
    { id: nextCategoryId++, name: "技术" },
    { id: nextCategoryId++, name: "生活" },
    { id: nextCategoryId++, name: "随笔" },
    { id: nextCategoryId++, name: "前端" },
  ];

  const [tech, life, essay, frontend] = categories;

  posts = [
    {
      id: nextPostId++,
      title: "Python Flask 入门指南",
      content:
        "Flask 是一个轻量级的 Python Web 框架，由 Armin Ronacher 开发。它的设计哲学是「微内核 + 扩展」，核心只包含路由、请求和响应处理等基础功能，其他如数据库 ORM、表单验证等通过插件灵活扩展。\n\n" +
        "## 为什么选择 Flask？\n\n" +
        "相比 Django 这种「大而全」的框架，Flask 更加灵活轻便。你可以自由选择自己喜欢的组件：用 SQLAlchemy 还是 Peewee 做 ORM？用 Jinja2 还是 Mako 做模板引擎？一切都由你决定。\n\n" +
        "Flask 的学习曲线非常平缓，初学者可以在一个下午就搭建出一个可用的 Web 应用。这也是为什么它常年位列 Python Web 框架排行榜前三。\n\n" +
        "## 快速上手\n\n" +
        "安装 Flask 只需要一行命令：\n\n" +
        "```bash\npip install flask\n```\n\n" +
        "创建一个最简单的应用：\n\n" +
        "```python\nfrom flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef hello():\n    return 'Hello, World!'\n\nif __name__ == '__main__':\n    app.run(debug=True)\n```\n\n" +
        "运行后访问 `http://127.0.0.1:5000/`，你就能看到那句经典的 Hello, World! 了。\n\n" +
        "## 路由与视图函数\n\n" +
        "Flask 使用装饰器来定义路由，支持动态 URL 参数、类型转换和自定义转换器：\n\n" +
        "```python\n@app.route('/user/<int:user_id>')\ndef user_profile(user_id):\n    return f'用户 {user_id} 的主页'\n```\n\n" +
        "你可以轻松定义 GET、POST、PUT、DELETE 等 HTTP 方法，构建出标准的 RESTful API。\n\n" +
        "## 模板渲染\n\n" +
        "Flask 默认集成 Jinja2 模板引擎，支持模板继承、条件判断、循环等丰富的语法，让你可以快速构建动态页面。配合 Bootstrap 或 Tailwind CSS，前端开发效率极高。\n\n" +
        "## 总结\n\n" +
        "Flask 是一个非常适合入门和快速原型开发的框架。当你需要更大的灵活性，或者项目规模不大时，Flask 是非常好的选择。如果你正准备学习 Web 开发，不妨从 Flask 开始。",
      summary: "从零开始学习 Flask Web 开发，涵盖路由、模板、数据库等核心概念",
      category_id: tech.id,
      created_at: now(),
      updated_at: now(),
    },
    {
      id: nextPostId++,
      title: "理解 RESTful API 设计",
      content:
        "REST（Representational State Transfer）是 Roy Fielding 在 2000 年提出的软件架构风格。它不是一种标准，而是一组设计原则和约束条件。一个好的 RESTful API 应该让使用者一眼就能理解如何与你的服务交互。\n\n" +
        "## 核心原则\n\n" +
        "### 1. 资源导向\n\n" +
        "REST 的核心思想是把一切都视为「资源」。每个资源有一个唯一的 URI，比如 `/users/1` 表示 ID 为 1 的用户。URI 应该用名词而非动词——用 `/articles` 而不是 `/getArticles`。\n\n" +
        "### 2. 无状态通信\n\n" +
        "每个请求必须包含服务器理解该请求所需的所有信息。服务器不应该在请求之间存储客户端的状态。这样做的好处是系统更容易扩展，因为任何服务器节点都可以处理任何请求。\n\n" +
        "### 3. 统一接口\n\n" +
        "使用标准的 HTTP 方法来操作资源：\n\n" +
        "- `GET /articles` — 获取文章列表\n" +
        "- `GET /articles/1` — 获取单篇文章\n" +
        "- `POST /articles` — 创建新文章\n" +
        "- `PUT /articles/1` — 更新整篇文章\n" +
        "- `PATCH /articles/1` — 部分更新文章\n" +
        "- `DELETE /articles/1` — 删除文章\n\n" +
        "### 4. 使用合适的 HTTP 状态码\n\n" +
        "状态码是 API 与客户端沟通的重要语言：\n\n" +
        "- `200 OK` — 请求成功\n" +
        "- `201 Created` — 资源创建成功\n" +
        "- `204 No Content` — 删除成功，无返回内容\n" +
        "- `400 Bad Request` — 请求参数有误\n" +
        "- `401 Unauthorized` — 未认证\n" +
        "- `404 Not Found` — 资源不存在\n" +
        "- `500 Internal Server Error` — 服务器内部错误\n\n" +
        "## API 版本管理\n\n" +
        "API 不可能一成不变。常见的版本管理策略有三种：\n\n" +
        "1. **URL 路径版本**：`/api/v1/articles` — 最直观，但不够 RESTful\n" +
        "2. **请求头版本**：`Accept: application/vnd.myapi.v1+json` — 更 RESTful，但不直观\n" +
        "3. **查询参数版本**：`/api/articles?version=1` — 简单但容易遗漏\n\n" +
        "我个人推荐在 URL 中使用版本号，虽然理论上不够「纯粹」，但在实际项目中最为清晰直观。\n\n" +
        "## 分页、过滤与排序\n\n" +
        "当资源数量庞大时，必须提供分页支持：\n\n" +
        "```\nGET /api/articles?page=2&page_size=20&sort=-created_at&category=tech\n```\n\n" +
        "返回的响应中应该包含分页元数据，方便客户端了解当前页面的位置。\n\n" +
        "## 总结\n\n" +
        "设计一个好的 RESTful API 并不难，关键在于遵循约定俗成的规范，保持一致性。记住：API 的用户是开发者，让他们的体验尽可能顺畅，你的 API 就是成功的。",
      summary: "深入理解 RESTful API 设计原则、HTTP 状态码、版本管理与分页策略",
      category_id: tech.id,
      created_at: now(),
      updated_at: now(),
    },
    {
      id: nextPostId++,
      title: "周末徒步登山记",
      content:
        "周六清晨六点，闹钟还没响，我已经自然醒了。窗外的天空泛着鱼肚白，是个难得的好天气。今天的目标是城北的凤凰山，海拔不算高，但沿途风景据说极好。\n\n" +
        "## 出发\n\n" +
        "简单收拾了背包——两瓶水、三明治、充电宝、防晒霜，还有那顶陪了我三年的渔夫帽。驱车两小时，到达山脚停车场时已经八点半。停车场只有零星几辆车，看来今天人不多，正合我意。\n\n" +
        "山脚的空气明显比市区清新许多，带着青草和泥土的气息。入口处有一块木牌，上面写着「凤凰山森林公园」，字迹已经斑驳，透着一股岁月的味道。\n\n" +
        "## 登山途中\n\n" +
        "前半小时是缓坡，路面铺着碎石，走起来还算轻松。路边开满了不知名的野花，紫色的、白色的、黄色的，在晨风中轻轻摇曳。偶尔有早起的鸟儿从头顶掠过，留下一串清脆的鸣叫。\n\n" +
        "走过缓坡后，路开始变陡。石阶被雨水冲刷得有些光滑，每一步都要踩稳。心率明显上来了，能听到自己粗重的呼吸声。停下来喝口水，回头一看——远处的城市已经在晨雾中若隐若现，高楼大厦变成了小小的积木块。\n\n" +
        "半山腰遇到了一位老大爷，看起来六十多岁，背着手慢悠悠地往上走。聊了两句才知道，他每周都来，已经坚持了十几年。「爬山不在于快，在于坚持。」老大爷笑呵呵地说完，继续稳步向前。\n\n" +
        "## 登顶\n\n" +
        "经过两个小时的攀登，终于到达了山顶。那一刻，所有的疲惫都被眼前的景色冲散了。\n\n" +
        "云海在脚下翻涌，远处的山峦层层叠叠，像一幅水墨画。阳光穿过云层洒下来，给整片云海镀上了一层金色。山顶的风很大，吹得衣服猎猎作响，但那种站在高处的畅快感，是坐在办公室里永远体会不到的。\n\n" +
        "我在山顶找了块平整的石头坐下，掏出三明治慢慢吃着。这一刻，时间好像变慢了。没有消息提醒，没有会议邀请，只有风声、鸟鸣和自己平稳的呼吸。\n\n" +
        "## 下山\n\n" +
        "下山比上山快得多，但对膝盖的冲击也大得多。每一步都能感觉到小腿肌肉的抗议。不过心情是轻盈的——那种完成了一件事的满足感，足以抵消身体的疲惫。\n\n" +
        "回到停车场已经是下午两点。坐在车里，看着后视镜里渐行渐远的山，心里已经在计划下一次的路线了。\n\n" +
        "## 一点感悟\n\n" +
        "登山这件事，和生活中的很多事情其实很像——过程虽然辛苦，但只要一步一步往前走，总能到达想去的地方。最重要的是，别忘了偶尔停下来，看看沿途的风景。",
      summary: "一次说走就走的户外徒步体验，登顶云海，所有的疲惫都值得了",
      category_id: life.id,
      created_at: now(),
      updated_at: now(),
    },
    {
      id: nextPostId++,
      title: "我的居家办公效率提升方法",
      content:
        "远程办公已经一年多了。刚开始的时候，每天睡到自然醒，穿着睡衣坐在沙发上敲代码，感觉这就是理想中的工作方式。但很快我就发现了一个残酷的事实：效率反而比在公司时更低了。\n\n" +
        "经过一年多的摸索和调整，我总结出了一套适合自己的居家办公方法论。分享出来，希望能帮到同样在远程工作的你。\n\n" +
        "## 1. 固定作息，像上班一样对待\n\n" +
        "最开始我犯的最大错误就是作息混乱。有时候熬夜到凌晨两点，第二天十点才起床，整个上午就废了。\n\n" +
        "后来我给自己定了一个规矩：**每天早上八点起床，九点准时坐到书桌前。** 跟去公司上班一样，该洗漱洗漱，该换衣服换衣服。穿着睡衣工作虽然舒服，但心理上很难切换到「工作模式」。\n\n" +
        "## 2. 打造专属工作区\n\n" +
        "不要在床上或沙发上工作——这是血泪教训。我在书房辟出了一块区域，买了升降桌和人体工学椅，双显示器加机械键盘，整个环境让我一坐下去就有「要开始干活了」的感觉。\n\n" +
        "物理空间的划分对心理状态的影响比你想象的大得多。工作区和生活区的分离，能帮助你在下班后真正「离开」工作。\n\n" +
        "## 3. 番茄工作法 + 时间块\n\n" +
        "我用的是改良版的番茄工作法：\n\n" +
        "- **25 分钟** 深度工作，手机静音、关闭通知\n" +
        "- **5 分钟** 休息，站起来走动、喝水、看看窗外\n" +
        "- 每 4 个番茄钟后，休息 **15-20 分钟**\n\n" +
        "同时我会在每天开始前列出当天的 3 件最重要的事（MIT, Most Important Tasks），优先完成它们。其他琐事排在这三件事后面。\n\n" +
        "## 4. 异步沟通，减少打断\n\n" +
        "远程工作中最大的效率杀手是即时通讯。我关掉了 Slack 和微信的消息提醒，改为每隔两小时集中查看一次。如果是紧急事项，同事会直接打电话。\n\n" +
        "我还养成了一个习惯：写详细的文档而不是口头沟通。一个清晰的 Notion 页面，比来回十几条消息高效得多。\n\n" +
        "## 5. 定期运动，保持精力\n\n" +
        "久坐是健康杀手。我每天中午会出去散步 30 分钟，下午四点左右做一组简单的徒手训练——俯卧撑、深蹲、平板支撑。周末会去骑行或爬山。\n\n" +
        "运动不仅能保持身体健康，更重要的是对心理状态的调节。当你感觉下午昏昏欲睡的时候，十来个俯卧撑比一杯咖啡更管用。\n\n" +
        "## 总结\n\n" +
        "居家办公不是「躺着赚钱」的美梦，它需要更强的自律和时间管理能力。但一旦找到了适合自己的节奏，你会发现这种工作方式带来的自由度是传统办公室无法给予的。",
      summary: "一年多远程办公的经验总结，从作息、环境、方法到精力管理",
      category_id: life.id,
      created_at: now(),
      updated_at: now(),
    },
    {
      id: nextPostId++,
      title: "关于阅读这件事",
      content:
        "上个月整理书架，翻出了一本泛黄的《百年孤独》。扉页上写着「2016 年购于北京」，一晃已经十年了。\n\n" +
        "十年前读这本书时，我被那些绕口的人名搞得晕头转向，读到三分之一就放弃了。当时的批注写着：「人物关系太复杂，看不下去。」现在重新翻开，却一口气读完了全书，连那些曾经觉得啰嗦的段落都变得意味深长。\n\n" +
        "## 书还是那本书，变的是人\n\n" +
        "这让我想明白了一件事：**阅读从来不只是关于书，更是关于你与书相遇时的自己。**\n\n" +
        "二十岁时读《百年孤独》，看到的是一个魔幻的故事。三十岁时再读，读到的是家族的轮回、时间的循环，以及那种刻在骨子里的孤独感。不是马尔克斯变了，是我变了。我开始理解为什么布恩迪亚家族的人总是在重复同样的错误——因为我们每个人不也如此吗？\n\n" +
        "## 阅读的层次\n\n" +
        "有人说阅读有四个层次：\n\n" +
        "1. **基础阅读** — 认识字，理解句子\n" +
        "2. **检视阅读** — 快速浏览，抓住主旨\n" +
        "3. **分析阅读** — 深入理解，批判性思考\n" +
        "4. **主题阅读** — 围绕一个主题，读多本书，构建自己的知识体系\n\n" +
        "大多数人停留在第一和第二层。只有当你开始分析阅读时，书才真正开始「为你所用」。这不是说每本书都需要精读——有些书快速浏览就够了——但那些真正重要的书，值得你花时间去消化、去质疑、去内化。\n\n" +
        "## 我的阅读习惯\n\n" +
        "这几年我逐渐形成了一些阅读习惯：\n\n" +
        "**做笔记**：不是摘抄，而是用自己的话复述作者的观点，然后写下自己的思考。这个过程能帮你确认自己是否真的理解了。\n\n" +
        "**交叉阅读**：同时读 2-3 本书，一本专业书、一本文学作品、一本杂书。不同领域的知识会在你的大脑中产生意想不到的连接。\n\n" +
        "**读完要输出**：读完一本书后，我会写一篇简短的读后感，哪怕只有几百字。输出的过程是最好的消化。\n\n" +
        "**不勉强自己**：如果一本书读了 50 页还提不起兴趣，就果断放下。世界上好书太多，不值得为一本不合适的书浪费时间。\n\n" +
        "## 阅读的意义\n\n" +
        "在这个短视频和碎片信息泛滥的时代，静下心来读一本完整的书变得越来越奢侈。但正因为如此，深度阅读变得更加珍贵。\n\n" +
        "阅读让我知道，我遇到的问题，几百年前就有人思考过；我经历的迷茫，前人也曾走过。这种跨越时空的共鸣，是其他任何媒介都无法给予的。\n\n" +
        "如果你也很久没有好好读一本书了，不妨今晚关掉手机，拿起那本一直想读但一直没读的书。哪怕只读半小时。",
      summary: "从重读《百年孤独》谈起，聊聊阅读的层次、习惯与意义",
      category_id: essay.id,
      created_at: now(),
      updated_at: now(),
    },
    {
      id: nextPostId++,
      title: "Git 工作流的思考",
      content:
        "团队协作中，选择一个合适的 Git 工作流，往往比选择什么技术栈更重要。技术栈可以迁移，但工作流一旦形成习惯，会深刻影响团队的协作效率和代码质量。\n\n" +
        "## 主流的 Git 工作流\n\n" +
        "### Git Flow\n\n" +
        "Git Flow 是最经典的分支模型，由 Vincent Driessen 在 2010 年提出。它定义了一套严格的分支体系：\n\n" +
        "- **main** — 生产环境代码，只接受来自 release 和 hotfix 的合并\n" +
        "- **develop** — 开发主线，功能分支从这里切出，完成后合并回来\n" +
        "- **feature/xxx** — 功能开发分支\n" +
        "- **release/x.x.x** — 发布准备分支\n" +
        "- **hotfix/xxx** — 紧急修复分支\n\n" +
        "Git Flow 适合有固定发布周期的项目，比如按月发布版本的移动应用或桌面软件。但对于持续部署的 Web 应用来说，这套流程显得过于繁琐。\n\n" +
        "### GitHub Flow\n\n" +
        "GitHub Flow 是 GitHub 内部使用的工作流，极其简洁：\n\n" +
        "1. `main` 分支始终可部署\n" +
        "2. 任何新工作从 `main` 切出分支\n" +
        "3. 分支名要有描述性，如 `add-user-auth`\n" +
        "4. 提交 PR，进行代码审查\n" +
        "5. 合并后立即部署\n\n" +
        "GitHub Flow 的理念是「持续部署」，适合网站和 SaaS 产品。它的优势是简单、快速，缺点是对团队的代码审查和自动化测试要求较高。\n\n" +
        "### Trunk-Based Development（TBD）\n\n" +
        "TBD 是更激进的方案：所有开发者直接向主干提交，分支的生命周期极短（通常不超过一天）。Google 和 Facebook 等大厂都在使用这种模式。\n\n" +
        "这要求极其完善的自动化测试和特性开关（Feature Flag），不适合大多数中小团队。\n\n" +
        "## 如何选择？\n\n" +
        "没有银弹，选择取决于你的团队和项目：\n\n" +
        "| 场景 | 推荐工作流 |\n" +
        "|---|---|\n" +
        "| 小型团队（2-5 人），持续部署 | GitHub Flow |\n" +
        "| 中型团队，固定发布周期 | Git Flow |\n" +
        "| 开源项目，外部贡献者多 | GitHub Flow + Fork |\n" +
        "| 大型团队，完善的 CI/CD | Trunk-Based |\n\n" +
        "## 写好 Commit Message\n\n" +
        "无论选择哪种工作流，写好 Commit Message 都是基本素养。我推荐使用 Conventional Commits 规范：\n\n" +
        "```\nfeat: add user login with JWT\nfix: resolve race condition in order creation\nrefactor: extract validators into shared module\ndocs: update API documentation\nstyle: format code with prettier\n```\n\n" +
        "一个好的 Commit Message 应该能回答「为什么做这个改动」，而不仅仅是「改了什么」。Diff 已经告诉了你改了什么，但不会告诉你原因。\n\n" +
        "## 代码审查的文化\n\n" +
        "工具和流程只是手段，真正重要的是团队的代码审查文化。一个好的代码审查应该是：\n\n" +
        "- **善意的** — 目标是提高代码质量，而不是挑剔别人\n" +
        "- **具体的** — 说「这里可能有问题」比「写得不好」更有帮助\n" +
        "- **及时的** — PR 放了两天才 review，开发者的心流早就断了\n" +
        "- **双向的** — 审查者也能从中学到东西\n\n" +
        "## 总结\n\n" +
        "Git 工作流没有对错之分，只有合适与否。选择一个适合你团队规模、项目类型和交付节奏的流程，然后坚持执行。更重要的是，保持开放的心态——当团队成长或项目变化时，工作流也应该随之演进。",
      summary: "深入对比 Git Flow、GitHub Flow 和 Trunk-Based 开发模式，聊聊如何写好 Commit Message",
      category_id: tech.id,
      created_at: now(),
      updated_at: now(),
    },
    {
      id: nextPostId++,
      title: "学会断舍离",
      content:
        "周末花了一整天整理房间。从衣柜开始，到书架，再到堆满杂物的阳台储物柜。最后清理出了三大袋不要的东西——旧衣服、过期的杂志、买了却从没打开过的电子产品。\n\n" +
        "看着客厅地板上堆成小山的「废弃物」，我突然意识到：这些年我到底囤积了多少根本不需要的东西？\n\n" +
        "## 我们为什么喜欢囤积\n\n" +
        "囤积是人类的本能。在远古时代，资源稀缺，多囤一点食物和工具意味着更高的生存概率。但现代社会物质极度丰富，这种本能反而成了一种负担。\n\n" +
        "我发现自己囤积的原因大致有三种：\n\n" +
        "1. **「万一以后用得上」** — 于是那件三年前买的但不合身的衬衫一直挂在衣柜里\n" +
        "2. **「扔掉太可惜」** — 明知道某样东西不会再用了，但觉得扔掉是浪费\n" +
        "3. **「这是回忆啊」** — 旧电影票、展览手册、旅行纪念品……每件都承载着一段记忆\n\n" +
        "## 断舍离不是扔东西\n\n" +
        "日本杂物管理咨询师山下英子提出的「断舍离」概念，常被误解为就是「扔东西」。但其实它包含三个层次：\n\n" +
        "- **断**：断绝不需要的东西进入自己的生活\n" +
        "- **舍**：舍弃家里堆积的废物\n" +
        "- **离**：脱离对物品的执念\n\n" +
        "最重要的其实是「断」——从源头减少不必要的购入。如果做不到这一点，「舍」就只是一次性的清理，过不了多久又会回到原来的状态。\n\n" +
        "## 我的实践方法\n\n" +
        "这次整理，我给自己定了三条标准：\n\n" +
        "1. **一年没用过的东西，果断处理。** 一件东西如果一整年都没有被使用，那基本上以后也不会用了。\n\n" +
        "2. **保留的不是「物品」，而是「使用价值」。** 如果一样东西只有「回忆价值」而没有「使用价值」，我会拍张照片存在手机里，然后把它处理掉。记忆不会因为物品的消失而消失。\n\n" +
        "3. **购入新物品前，先处理掉一件旧物品。** 这个「一进一出」的规则能有效控制物品总量。\n\n" +
        "## 清理后的感受\n\n" +
        "把三大袋东西搬下楼扔掉之后，回到家里，感觉整个空间都「透气」了。\n\n" +
        "书架不再塞得满满当当，留下的都是真正会重读的书。衣柜里的衣服虽然少了，但每一件都是合身且常穿的。阳台的储物柜空出了一半的空间，阳光透过窗户洒进来，连光线都变好了。\n\n" +
        "更意外的收获是心理上的。当周围的环境变得整洁有序时，内心也莫名平静了下来。原来杂乱的环境真的会在无形中消耗注意力——你的大脑一直在无意识地「扫描」那些无序的视觉信息。\n\n" +
        "## 不只是物品\n\n" +
        "断舍离的理念不只适用于物品。社交关系、信息摄入、日程安排，其实都需要定期「断舍离」。\n\n" +
        "取关了那些从不互动的公众号，退出了常年死寂的群聊，删掉了手机上从没打开过的 App。做完这些之后，每天接收的信息量减少了，但质量提高了。\n\n" +
        "**丢掉的不只是物品，还有附着在上面的执念。给自己留出更多空间，才能让真正重要的东西进来。**",
      summary: "一次彻底的断舍离实践，不仅是整理物品，更是对内心的梳理",
      category_id: life.id,
      created_at: now(),
      updated_at: now(),
    },
    {
      id: nextPostId++,
      title: "雨夜随想",
      content:
        "窗外下着淅淅沥沥的小雨。我泡了一杯热茶，放了一张 Bill Evans 的爵士钢琴唱片。这是我最喜欢的夜晚模式。\n\n" +
        "## 雨声\n\n" +
        "雨声大概是这世界上最让人平静的白噪音了。雨点打在窗玻璃上的声音、落在树叶上的声音、顺着屋檐滴落的声音，每一种都不同，但组合在一起却出奇地和谐。\n\n" +
        "有一个专门的词叫「ASMR」，很多人用它来助眠。其实古人早就知道这个道理——「小楼一夜听春雨」，这不就是最早的 ASMR 体验吗？\n\n" +
        "## 慢下来的勇气\n\n" +
        "我发现自己越来越难以「什么都不做」了。\n\n" +
        "等人的时候刷手机，吃饭的时候看视频，走路的时候听播客。每一分钟都要被填满，每一秒钟都要有信息输入。我们害怕「浪费时间」，害怕「什么都没做」，害怕在人生的竞赛中落后一步。\n\n" +
        "但这样的夜晚提醒我：**什么都不做，也是一种「做」。**\n\n" +
        "放空不是浪费，而是给自己的大脑留出整理和消化的空间。那些最好的创意和最深刻的领悟，往往不是在你拼命工作的时候产生的，而是在你散步、洗澡、或者像现在这样——对着窗外发呆的时候悄悄浮现的。\n\n" +
        "## 关于孤独\n\n" +
        "一个人待着，和孤独是两回事。\n\n" +
        "孤独是一种被动状态，你渴望陪伴却得不到。而独处是你主动选择的——你享受与自己相处的时间。这种区别很重要，因为很多人害怕的不是「一个人」，而是「孤独」。\n\n" +
        "学会独处是一种能力。它意味着你不再需要外界的持续刺激来填补内心的空洞。你可以看书、写字、听音乐、或者什么都不做，而不感到焦虑。\n\n" +
        "## 茶凉了\n\n" +
        "不知不觉，茶杯已经见底了。雨也小了许多，从淅淅沥沥变成了若有若无的毛毛细雨。远处偶尔传来几声汽车驶过积水路面的声音。\n\n" +
        "唱片播完了最后一段钢琴独奏，房间里只剩下老式挂钟的滴答声。该去睡觉了。\n\n" +
        "这样的夜晚什么成就都没有，但我觉得很充实。\n\n" +
        "也许，这就是生活本来的样子。",
      summary: "一个安静的雨夜，一杯热茶，一张老唱片，以及一些关于慢生活的零碎感想",
      category_id: essay.id,
      created_at: now(),
      updated_at: now(),
    },
    // ── 技术 (6篇) ──
    {
      id: nextPostId++, title: "Docker 容器化部署实战",
      content: "## 为什么需要 Docker？\n\nDocker 解决了\"在我机器上能跑\"的经典问题。通过容器化，开发、测试、生产环境完全一致。\n\n## Dockerfile 基础\n\n```dockerfile\nFROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD [\"python\", \"app.py\"]\n```\n\n## Docker Compose\n\n```yaml\nservices:\n  web:\n    build: .\n    ports:\n      - \"5000:5000\"\n```\n\n## 常用命令\n\n- `docker build -t myapp .` 构建镜像\n- `docker run -p 5000:5000 myapp` 运行容器\n- `docker-compose up -d` 启动服务组\n\nDocker 是现代开发的必备技能，掌握它能让部署变得简单可靠。",
      summary: "从 Dockerfile 编写到 docker-compose 编排，一站式掌握容器化部署",
      category_id: tech.id, created_at: now(), updated_at: now(),
    },
    {
      id: nextPostId++, title: "Linux 常用命令速查",
      content: "## 文件操作\n\n```bash\nls -la          # 列出所有文件\nfind . -name \"*.py\"  # 查找文件\ntail -f app.log # 实时查看日志\ngrep -r \"error\" .  # 递归搜索\n```\n\n## 进程管理\n\n```bash\nps aux | grep python   # 查找进程\nkill -9 1234          # 强制终止\nhtop                  # 交互式进程查看\n```\n\n## 网络\n\n```bash\ncurl -X GET http://localhost:5000/api/posts\nnetstat -tlnp | grep 5000\n```\n\n## 权限\n\n```bash\nchmod +x script.sh    # 添加执行权限\nchown user:group file # 修改所有者\n```",
      summary: "整理 Linux 开发中最高频使用的命令，提高命令行效率",
      category_id: tech.id, created_at: now(), updated_at: now(),
    },
    {
      id: nextPostId++, title: "MySQL 索引优化指南",
      content: "## 索引是什么？\n\n索引就像书的目录，帮助数据库快速定位数据，避免全表扫描。\n\n## B+Tree 索引\n\nMySQL InnoDB 默认使用 B+Tree 索引。所有数据存储在叶子节点，叶子节点之间通过指针连接，支持范围查询。树的高度通常为 2-4 层。\n\n## 最左前缀原则\n\n联合索引 (a, b, c) 的情况下：WHERE a=1 可以使用索引；WHERE a=1 AND b=2 可以使用索引；WHERE b=2 不能使用索引。\n\n## EXPLAIN 分析\n\n```sql\nEXPLAIN SELECT * FROM posts WHERE category_id = 1;\n```\n\n关注 type 列：ALL < index < range < ref < const。好的查询至少要到 range 级别。",
      summary: "深入理解 B+Tree 索引原理，学会分析慢查询并优化数据库性能",
      category_id: tech.id, created_at: now(), updated_at: now(),
    },
    {
      id: nextPostId++, title: "Redis 缓存策略与实战",
      content: "## Redis 数据类型\n\n| 类型 | 场景 |\n|------|------|\n| String | 缓存、计数器 |\n| Hash | 对象存储 |\n| List | 消息队列 |\n| Set | 标签、去重 |\n| ZSet | 排行榜 |\n\n## 缓存穿透\n\n查询不存在的数据，缓存和数据库都没有。解决方案：布隆过滤器或缓存空值。\n\n## 缓存击穿\n\n热点 key 过期瞬间，大量请求打到数据库。解决方案：互斥锁或永不过期+异步更新。\n\n## 缓存雪崩\n\n大量 key 同时过期。解决方案：过期时间加随机值、多级缓存、限流降级。",
      summary: "学习 Redis 常用数据结构，掌握缓存穿透、击穿、雪崩的解决方案",
      category_id: tech.id, created_at: now(), updated_at: now(),
    },
    {
      id: nextPostId++, title: "设计模式：单例与工厂",
      content: "## 单例模式\n\n确保一个类只有一个实例，并提供全局访问点。\n\n```python\nclass Singleton:\n    _instance = None\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance\n```\n\n## 工厂模式\n\n定义一个创建对象的接口，让子类决定实例化哪个类。\n\n```python\ndef animal_factory(name):\n    mapping = {\"dog\": Dog, \"cat\": Cat}\n    return mapping.get(name, Animal)()\n```\n\n两种模式都很常用，理解它们的设计思想比记住代码更重要。",
      summary: "用 Python 代码演示最常用的两种设计模式，理解其应用场景",
      category_id: tech.id, created_at: now(), updated_at: now(),
    },
    {
      id: nextPostId++, title: "HTTP 协议深入理解",
      content: "## HTTP 请求报文\n\n```\nGET /api/posts HTTP/1.1\nHost: localhost:5000\nAccept: application/json\n```\n\n## HTTP 方法\n\n| 方法 | 语义 | 幂等 |\n|------|------|------|\n| GET | 查询 | 是 |\n| POST | 创建 | 否 |\n| PUT | 全量更新 | 是 |\n| DELETE | 删除 | 是 |\n\n## 状态码\n\n- 2xx：成功\n- 3xx：重定向\n- 4xx：客户端错误\n- 5xx：服务器错误\n\n## HTTPS\n\nHTTPS = HTTP + TLS，通过非对称加密交换对称密钥，然后用对称加密传输数据。",
      summary: "从请求报文到状态码，全面理解 HTTP 协议的工作机制",
      category_id: tech.id, created_at: now(), updated_at: now(),
    },
    // ── 前端 (6篇) ──
    {
      id: nextPostId++, title: "Tailwind CSS 实战技巧",
      content: "## 为什么选择 Tailwind？\n\n传统 CSS 需要命名、切换文件、处理优先级。Tailwind 用原子类直接在 HTML 中描述样式，效率极高。\n\n## 响应式设计\n\n断点：sm:640px、md:768px、lg:1024px、xl:1280px。\n\n```html\n<div class=\"w-full md:w-1/2 lg:w-1/3\">响应式宽度</div>\n```\n\n## 常用组合\n\n- 卡片：rounded-2xl shadow-lg p-6 bg-white\n- 按钮：px-4 py-2 rounded-xl font-medium transition\n- 输入框：border rounded-xl px-3 py-2 focus:ring-2\n\nTailwind 的原子化 CSS 方式让样式编写快了很多，强烈推荐。",
      summary: "掌握 Tailwind 的响应式设计、自定义主题和实用技巧，高效构建 UI",
      category_id: frontend.id, created_at: now(), updated_at: now(),
    },
    {
      id: nextPostId++, title: "Vue 3 Composition API 入门",
      content: "## setup 语法糖\n\n```vue\n<script setup>\nimport { ref, computed } from \"vue\";\nconst count = ref(0);\nconst double = computed(() => count.value * 2);\n</script>\n```\n\n## ref vs reactive\n\n- ref：包装基本类型，访问需要 .value\n- reactive：包装对象，直接访问属性\n\n## watch vs watchEffect\n\n- watch(source, callback)：明确监听某个数据源\n- watchEffect(callback)：自动追踪回调中的响应式依赖\n\nComposition API 让代码组织更加灵活，是 Vue 3 最大的亮点。",
      summary: "学会 setup 语法糖、ref/reactive、watch/computed，快速上手 Vue 3",
      category_id: frontend.id, created_at: now(), updated_at: now(),
    },
    {
      id: nextPostId++, title: "CSS Grid 布局完全指南",
      content: "## Grid vs Flexbox\n\n- Flexbox：一维布局（行或列）\n- Grid：二维布局（行和列同时）\n\n## 容器属性\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}\n```\n\n## 项目属性\n\n```css\n.item {\n  grid-column: span 2;\n  grid-row: 1 / 3;\n}\n```\n\n## 实用布局\n\n圣杯布局：grid-template-columns: 200px 1fr 200px;\n\nGrid 是现代 CSS 布局的基石，掌握它就能轻松实现各种复杂布局。",
      summary: "图解 Grid 容器属性与项目属性，轻松实现复杂二维布局",
      category_id: frontend.id, created_at: now(), updated_at: now(),
    },
    {
      id: nextPostId++, title: "TypeScript 泛型高级用法",
      content: "## 基础泛型\n\n```typescript\nfunction identity<T>(arg: T): T { return arg; }\n```\n\n## 泛型约束\n\n```typescript\nfunction logLength<T extends { length: number }>(arg: T): T {\n  console.log(arg.length);\n  return arg;\n}\n```\n\n## 条件类型\n\n```typescript\ntype IsString<T> = T extends string ? true : false;\n```\n\n## 映射类型\n\n```typescript\ntype Readonly<T> = { readonly [K in keyof T]: T[K] };\ntype Partial<T> = { [K in keyof T]?: T[K] };\n```\n\n泛型是 TypeScript 最强大的特性之一，值得花时间深入理解。",
      summary: "深入理解泛型约束、条件类型、映射类型，写出类型安全的代码",
      category_id: frontend.id, created_at: now(), updated_at: now(),
    },
    {
      id: nextPostId++, title: "Next.js 服务端渲染原理",
      content: "## 三种渲染模式\n\n| 模式 | 生成时机 | 适用场景 |\n|------|----------|----------|\n| SSR | 每次请求 | 个性化内容 |\n| SSG | 构建时 | 静态内容 |\n| ISR | 构建时 + 按需 | 大部分页面 |\n\n## SSR\n\n服务端每次请求时渲染页面，返回完整 HTML。SEO 友好，但服务器压力大。\n\n## SSG\n\n构建时生成所有静态 HTML，访问速度最快，但内容更新需要重新构建。\n\n## ISR\n\n构建时生成静态页面，设置 revalidate 时间，后台按需重新生成。这是大多数场景的最佳选择。",
      summary: "了解 SSR、SSG、ISR 的区别，选择最适合的渲染策略",
      category_id: frontend.id, created_at: now(), updated_at: now(),
    },
    {
      id: nextPostId++, title: "Webpack 到 Vite：构建工具演进",
      content: "## Webpack 的时代\n\nWebpack 将一切视为模块，通过 loader 和 plugin 实现强大的构建能力。但项目大了之后，冷启动和热更新越来越慢。\n\n## Vite 的革新\n\nVite 利用浏览器原生 ESM 支持：开发时按需编译，只处理浏览器请求的模块；生产时 Rollup 打包，输出优化产物。\n\n## 速度对比\n\n| | Webpack 5 | Vite 5 |\n|------|-----------|--------|\n| 冷启动 | 30-60s | <1s |\n| HMR | 1-5s | <50ms |\n\n中小项目可以直接迁移到 Vite，大型项目建议渐进式迁移。",
      summary: "对比 Webpack 和 Vite 的开发体验，了解 ESM 原生支持的威力",
      category_id: frontend.id, created_at: now(), updated_at: now(),
    },
    // ── 生活 (5篇) ──
    {
      id: nextPostId++, title: "如何打造高效的工作环境",
      content: "## 桌面环境\n\n一个整洁的桌面能让思维更清晰。推荐主显示器+副屏竖放（看代码超方便）、机械键盘、人体工学椅。\n\n## 软件工具\n\n- VS Code：主力编辑器，插件生态无敌\n- iTerm2 + Oh My Zsh：终端美化\n- Notion：笔记+任务管理\n\n## 时间管理\n\n番茄工作法：25 分钟专注+5 分钟休息，4 个番茄后休息 15 分钟。\n\n## 音乐\n\n推荐 coding 时听 Lo-Fi、古典音乐或白噪音，避免有歌词的音乐分散注意力。",
      summary: "从桌面布置到工具选择，打造一个让你专注工作的环境",
      category_id: life.id, created_at: now(), updated_at: now(),
    },
    {
      id: nextPostId++, title: "我的 2024 书单推荐",
      content: "## 技术类\n\n1. 《代码整洁之道》—— 写出让人看得懂的代码\n2. 《深入理解计算机系统》—— CS:APP，经典中的经典\n3. 《设计数据密集型应用》—— DDIA，分布式系统必读\n\n## 文学类\n\n4. 《百年孤独》—— 魔幻现实主义的巅峰\n5. 《活着》—— 余华的代表作，读一次哭一次\n6. 《小王子》—— 每个年龄段都能读出不同的感悟\n\n## 哲学/思维\n\n7. 《思考，快与慢》—— 理解大脑的两套系统\n8. 《原子习惯》—— 小习惯带来大改变\n\n每天睡前读 30 分钟，一年下来能读完 20-30 本书。",
      summary: "分享今年读过的好书，涵盖技术、文学、哲学多个领域",
      category_id: life.id, created_at: now(), updated_at: now(),
    },
    {
      id: nextPostId++, title: "健身半年的变化与心得",
      content: "## 初始状态\n\n身高 175cm，体重 78kg，体脂率约 25%。久坐写代码，肩颈经常酸痛。\n\n## 训练计划\n\n每周 4 练：周一胸+三头、周二背+二头、周四腿+肩、周五全身+核心。\n\n## 饮食调整\n\n早餐燕麦+鸡蛋+牛奶，午餐正常吃少油，晚餐鸡胸肉+蔬菜+红薯。戒掉了奶茶和零食。\n\n## 变化\n\n6 个月后：70kg，体脂率约 18%。最重要的是精神状态好了很多，写代码不再容易疲劳。",
      summary: "坚持健身 6 个月，体重降了 8kg，分享训练计划和饮食方案",
      category_id: life.id, created_at: now(), updated_at: now(),
    },
    {
      id: nextPostId++, title: "一个人的旅行：成都到拉萨",
      content: "## 准备工作\n\n提前 3 个月开始体能训练，每天骑行 30km。装备：山地车+驮包、冲锋衣+速干衣、修车工具+备用内胎。\n\n## 难忘的路段\n\n- **折多山**：川藏线上第一座 4000 米以上的山，爬坡爬到怀疑人生\n- **怒江 72 拐**：下坡超爽，但刹车片差点磨光\n- **然乌湖**：湖水蓝得不真实，停下来拍了一个小时\n\n## 到达拉萨\n\n看到布达拉宫的那一刻，所有疲惫都值了。这趟旅行让我明白：很多事情不是做不到，只是不敢开始。",
      summary: "骑行 318 国道，22 天，2200 公里，一路风景一路歌",
      category_id: life.id, created_at: now(), updated_at: now(),
    },
    {
      id: nextPostId++, title: "学会做 10 道家常菜",
      content: "## 入门菜\n\n1. 西红柿炒鸡蛋 —— 国民第一菜，关键在于鸡蛋要嫩\n2. 酸辣土豆丝 —— 切丝要均匀，大火快炒\n3. 可乐鸡翅 —— 零失败，新手友好\n\n## 进阶菜\n\n4. 红烧排骨 —— 炒糖色是关键，小火慢炖 40 分钟\n5. 清蒸鲈鱼 —— 蒸 8 分钟，淋上热油和蒸鱼豉油\n6. 麻婆豆腐 —— 灵魂是豆瓣酱和花椒粉\n\n## 心得\n\n火候比调料重要。买菜选时令的，食材好菜就好吃。做饭是很好的减压方式，推荐程序员们都试试。",
      summary: "从厨房小白到能做一桌菜，记录我的烹饪学习之路",
      category_id: life.id, created_at: now(), updated_at: now(),
    },
    // ── 随笔 (5篇) ──
    {
      id: nextPostId++, title: "程序员的 35 岁危机真的存在吗",
      content: "## 焦虑的来源\n\n网上充斥着\"35 岁被裁\"\"程序员吃青春饭\"的言论。但我认为，35 岁被淘汰的不是年龄，而是能力停滞。\n\n## 我的观察\n\n身边超过 35 岁的优秀程序员都有这些共同点：持续学习，不局限于一种语言/框架；有业务理解能力，不只是\"接需求写代码\"；能带人、能沟通、能推动事情落地。\n\n## 建议\n\n每年学一门新语言或新框架，多关注系统设计和架构，培养软技能：沟通、管理、产品思维。\n\n代码之外的能力，才是你不可替代的价值。",
      summary: "关于年龄焦虑，我有一些不同的看法",
      category_id: essay.id, created_at: now(), updated_at: now(),
    },
    {
      id: nextPostId++, title: "为什么我选择写博客",
      content: "## 开始的原因\n\n最初是为了记录学到的技术，方便以后查阅。写着写着发现，把知识写清楚比看懂难得多。\n\n## 写作的好处\n\n1. 加深理解：能写清楚才是真的懂\n2. 建立个人品牌：博客是最好的简历\n3. 认识同好：通过博客认识了很多朋友\n4. 被动收入：虽然不多，但广告费够买咖啡\n\n## 坚持的秘诀\n\n不追求完美，先写出来再改。每周一篇，养成习惯。写自己真正感兴趣的内容。\n\n费曼说：\"如果你不能简单地解释一件事，说明你还没有真正理解它。\"",
      summary: "坚持写作两年，说说博客给我带来的改变",
      category_id: essay.id, created_at: now(), updated_at: now(),
    },
    {
      id: nextPostId++, title: "深夜 coding 的利与弊",
      content: "## 为什么喜欢深夜 coding\n\n没有消息打扰，没有会议，完整的连续时间。大脑反而更清醒。有一种\"世界只剩我和代码\"的沉浸感。\n\n## 代价\n\n第二天精神差，形成恶性循环。长期熬夜对身体的影响是累积的。失去了和家人/朋友相处的晚间时间。\n\n## 尝试调整\n\n最近开始尝试早起 coding：晚上 11 点睡觉，早上 6 点起床，6:30-8:30 专注 2 小时。试了两周，效率完全不输深夜，而且身体状态好了很多。\n\n推荐每个习惯熬夜的程序员试一试早起 coding。",
      summary: "夜深人静时写代码效率翻倍，但代价是什么？",
      category_id: essay.id, created_at: now(), updated_at: now(),
    },
    {
      id: nextPostId++, title: "关于 AI 取代程序员的思考",
      content: "## AI 能做什么\n\n自动补全代码（Copilot 已经很好用了）、生成样板代码（CRUD 基本不用手写）、Bug 修复建议（有时候比 Google 快）。\n\n## AI 不能做什么\n\n理解复杂业务逻辑、做出架构级别的决策、与产品设计测试有效沟通、对代码质量和可维护性负责。\n\n## 我的看法\n\nAI 不会取代程序员，但会用 AI 的程序员会取代不会用的。未来的程序员更像是\"AI 的指挥者\"——告诉 AI 做什么、检查 AI 做得好不好、把 AI 不能做的部分做好。\n\n适应变化，持续学习，这才是程序员的核心竞争力。",
      summary: "Copilot 和 ChatGPT 让编程门槛降低，我们该何去何从？",
      category_id: essay.id, created_at: now(), updated_at: now(),
    },
    {
      id: nextPostId++, title: "从一个 Bug 学到的教训",
      content: "## Bug 描述\n\n写一个 Flask API 时，所有 POST 请求都返回 500，但日志里没有任何错误信息。\n\n## Debug 过程\n\n检查请求体格式——没问题。检查数据库连接——正常。添加 print 调试——没输出。逐行注释代码——发现 try/except 里有个地方吞掉了异常。\n\n## 真正的 Bug\n\n```python\ntry:\n    data = request.get_json()\nexcept:\n    pass  # 这里吞掉了所有异常！\n```\n\n一个裸 except: pass 让所有错误都石沉大海。\n\n## 教训\n\n1. 永远不要写裸 except\n2. 永远不要 except: pass\n3. 至少记录一下异常信息\n\n这个 Bug 耗费了 3 小时，但教会了我异常处理的重要性。",
      summary: "一个简单的缩进错误让我 debug 了 3 个小时",
      category_id: essay.id, created_at: now(), updated_at: now(),
    },
  ];
}

// --- Posts CRUD ---

export function getPostList(q?: string) {
  let result = posts
    .map((p) => {
      const cat = categories.find((c) => c.id === p.category_id);
      return {
        id: p.id,
        title: p.title,
        summary: p.summary,
        category_name: cat?.name ?? null,
        created_at: p.created_at,
      };
    })
    .sort((a, b) => b.id - a.id);

  if (q) {
    const lower = q.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        (p.summary && p.summary.toLowerCase().includes(lower)) ||
        (p.category_name && p.category_name.toLowerCase().includes(lower))
    );
  }

  return result;
}

export function getPostById(id: number) {
  const p = posts.find((x) => x.id === id);
  if (!p) return null;
  const cat = categories.find((c) => c.id === p.category_id);
  return {
    ...p,
    category_name: cat?.name ?? null,
  };
}

export function createPost(data: {
  title: string;
  content: string;
  summary?: string;
  category_id?: number;
}) {
  const p: PostRow = {
    id: nextPostId++,
    title: data.title,
    content: data.content,
    summary: data.summary ?? null,
    category_id: data.category_id ?? null,
    created_at: now(),
    updated_at: now(),
  };
  posts.push(p);
  return getPostById(p.id);
}

export function updatePost(
  id: number,
  data: {
    title?: string;
    content?: string;
    summary?: string;
    category_id?: number;
  }
) {
  const idx = posts.findIndex((x) => x.id === id);
  if (idx === -1) return null;
  const p = posts[idx];
  if (data.title !== undefined) p.title = data.title;
  if (data.content !== undefined) p.content = data.content;
  if (data.summary !== undefined) p.summary = data.summary || null;
  if (data.category_id !== undefined) p.category_id = data.category_id;
  p.updated_at = now();
  return getPostById(id);
}

export function deletePost(id: number): boolean {
  const idx = posts.findIndex((x) => x.id === id);
  if (idx === -1) return false;
  posts.splice(idx, 1);
  return true;
}

// --- Categories ---

export function getCategoryList() {
  return categories.map((c) => ({ id: c.id, name: c.name }));
}

export function createCategory(name: string) {
  const exists = categories.find((c) => c.name === name);
  if (exists) return null;
  const c: CategoryRow = { id: nextCategoryId++, name };
  categories.push(c);
  return { id: c.id, name: c.name };
}
