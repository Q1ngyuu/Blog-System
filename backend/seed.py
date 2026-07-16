"""Seed the blog database with sample categories and posts."""
from app import app, db
from models import Category, Post

with app.app_context():
    # Check existing data
    cat_count = Category.query.count()
    post_count = Post.query.count()
    print(f"Existing categories: {cat_count}, posts: {post_count}")

    if cat_count > 0:
        print("Database already has seed data, skipping.")
        exit(0)

    # Insert categories
    cats = [
        Category(name="技术"),
        Category(name="生活"),
        Category(name="随笔"),
        Category(name="前端"),
    ]
    db.session.add_all(cats)
    db.session.flush()
    print("Categories inserted:", [c.name for c in cats])

    # Insert posts
    posts = [
        Post(
            title="Python Flask 入门指南",
            content="""## 为什么选择 Flask？

Flask 是一个轻量级的 Python Web 框架，适合快速构建 Web 应用。

## 安装

```bash
pip install flask
```

## Hello World

```python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"
```

## 路由

Flask 使用装饰器定义路由，非常直观：

```python
@app.route("/users/<int:user_id>")
def get_user(user_id):
    return f"User {user_id}"
```

## 总结

Flask 简单易学，是入门 Web 开发的绝佳选择。""",
            summary="从零开始学习 Flask Web 框架，搭建你的第一个 Web 应用。",
            category_id=cats[0].id,
        ),
        Post(
            title="Git 使用技巧与最佳实践",
            content="""## 基本操作

Git 是每个开发者的必备工具，掌握它能极大提升效率。

### 常用命令

```bash
git init          # 初始化仓库
git add .         # 暂存所有更改
git commit -m ""  # 提交更改
git push          # 推送到远程
git pull          # 拉取远程更新
```

### 分支管理

```bash
git branch feature        # 创建分支
git checkout feature      # 切换分支
git merge feature         # 合并分支
```

## 最佳实践

1. 频繁提交，每次提交只做一件事
2. 写清晰的 commit message
3. 使用分支开发新功能
4. 定期 pull 保持同步""",
            summary="掌握 Git 的高级技巧，提升团队协作效率。",
            category_id=cats[0].id,
        ),
        Post(
            title="周末露营记",
            content="""上周末和朋友们一起去了郊外的森林公园露营。

## 准备工作

我们带上了帐篷、睡袋、烧烤架和各种食材。出发前查了天气预报，确认是晴天。

## 露营体验

到了营地后，我们选了一个靠近小溪的位置。搭帐篷花了一些时间，但大家齐心协力很快就搞定了。

傍晚时分，我们生了篝火，烤了棉花糖和红薯。围坐在篝火旁聊天，看星星，非常惬意。

## 第二天

清晨被鸟鸣叫醒，空气中带着泥土和青草的味道。煮了一壶咖啡，坐在帐篷外看日出。

## 总结

这次露营让我重新感受到大自然的美好。远离城市的喧嚣，和朋友们度过了一个难忘的周末。强烈推荐大家也试试！""",
            summary="一次难忘的户外露营体验，享受大自然的美好。",
            category_id=cats[1].id,
        ),
        Post(
            title="设计 RESTful API 的最佳实践",
            content="""RESTful API 是现代 Web 开发的基础，设计一个好的 API 非常重要。

## 核心原则

### 1. 使用名词而非动词

```
GET    /articles       # 获取文章列表
GET    /articles/1     # 获取单篇文章
POST   /articles       # 创建文章
PUT    /articles/1     # 更新文章
DELETE /articles/1     # 删除文章
```

### 2. 使用 HTTP 状态码

- `200` 成功
- `201` 创建成功
- `400` 请求错误
- `404` 资源不存在
- `500` 服务器错误

### 3. 版本化 API

```
/api/v1/posts
/api/v2/posts
```

## 统一响应格式

```json
{
  "code": 0,
  "data": {},
  "message": "success"
}
```

## 总结

好的 API 设计让前后端协作更加顺畅，减少沟通成本。""",
            summary="学习如何设计清晰、易用的 RESTful API 接口。",
            category_id=cats[0].id,
        ),
        Post(
            title="读《百年孤独》有感",
            content="""最近重读了马尔克斯的《百年孤独》，有了许多新的感悟。

## 关于孤独

布恩迪亚家族七代人的故事，每个人都在以自己的方式对抗孤独。有人埋头炼金，有人发动战争，有人沉溺爱情。

但最终，孤独不是需要对抗的敌人，而是生命的一部分。

## 时间的循环

书中反复出现的人名、重复的命运，暗示着历史的循环。这让我想到现实中，我们是否也在不断重复前人的选择？

## 魔幻现实主义的魅力

马尔克斯用魔幻的笔触描绘了最真实的拉美历史。黄蝴蝶、升天的美女、连下四年的大雨……这些看似荒诞的意象，承载着深刻的现实批判。

## 最喜欢的句子

> "生命中曾经有过的所有灿烂，终究都需要用寂寞来偿还。"

## 总结

每个人都是一座孤岛，但文字可以架起桥梁。这本书值得一读再读。""",
            summary="重读经典，对孤独与时间有了新的理解。",
            category_id=cats[2].id,
        ),
        Post(
            title="React Hooks 深入理解",
            content="""Hooks 是 React 16.8 引入的革命性特性，让函数组件也能拥有状态和生命周期。

## useState

```jsx
const [count, setCount] = useState(0);
```

最简单的 Hook，用于在函数组件中管理状态。

## useEffect

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);
```

处理副作用：数据请求、订阅、DOM 操作等。

## useCallback

```jsx
const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []);
```

缓存函数引用，避免不必要的子组件重渲染。

## 自定义 Hook

```jsx
function useWindowSize() {
  const [size, setSize] = useState({width: 0, height: 0});
  useEffect(() => {
    const handler = () => setSize({width: window.innerWidth, height: window.innerHeight});
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return size;
}
```

## 总结

Hooks 让 React 代码更简洁、更可复用，是现代 React 开发的基石。""",
            summary="深入理解 React Hooks 的原理与使用场景。",
            category_id=cats[3].id,
        ),
    ]
    db.session.add_all(posts)
    db.session.commit()
    print(f"Posts inserted: {len(posts)}")
    print("Database seeded successfully!")
