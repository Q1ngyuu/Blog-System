import os
from app import app, db
from models import Category, Post

with app.app_context():
    print("==> Dropping all tables...")
    db.drop_all()
    print("    Done.")

    print("==> Creating all tables...")
    db.create_all()
    print("    Done.")

    print("==> Seeding categories...")
    categories = {
        "tech": Category(name="技术"),
        "life": Category(name="生活"),
        "essay": Category(name="随笔"),
    }
    db.session.add_all(categories.values())
    db.session.commit()
    for c in categories.values():
        print(f"    + {c}")

    print("==> Seeding posts...")
    posts = [
        Post(
            title="Python Flask 入门指南",
            content="Flask 是一个轻量级的 Python Web 框架，适合快速构建 Web 应用和 API。\n\n本文将带你从零开始搭建一个 Flask 项目，涵盖路由、模板、数据库等基础知识。",
            summary="从零开始学习 Flask Web 开发",
            category=categories["tech"],
        ),
        Post(
            title="理解 RESTful API 设计",
            content="REST（Representational State Transfer）是一种软件架构风格，它定义了一组约束和原则，用于设计网络应用程序。\n\n一个好的 RESTful API 应该遵循资源导向、无状态通信、统一接口等原则。",
            summary="RESTful API 最佳实践与设计原则",
            category=categories["tech"],
        ),
        Post(
            title="周末徒步登山记",
            content="周六清晨六点出发，驱车两小时到达山脚。沿途野花盛开，空气清新。\n\n登顶那一刻，俯瞰云海翻涌，所有的疲惫都值得了。下山后在农家小院吃了一顿地道的柴火鸡。",
            summary="一次说走就走的户外徒步体验",
            category=categories["life"],
        ),
        Post(
            title="我的居家办公效率提升方法",
            content="远程办公一年多，总结了几点提高效率的心得：\n\n1. 固定作息时间\n2. 打造专属工作区\n3. 使用番茄工作法\n4. 定期运动保持精力",
            summary="远程办公的高效秘诀分享",
            category=categories["life"],
        ),
        Post(
            title="关于阅读这件事",
            content="最近重读了《百年孤独》，与十年前读时的感受完全不同。\n\n阅读的魅力或许就在于此——同一本书，不同年龄读，会有不同的理解和共鸣。",
            summary="重新思考阅读的意义与乐趣",
            category=categories["essay"],
        ),
        Post(
            title="Git 工作流的思考",
            content="团队协作中，选择一个合适的 Git 工作流至关重要。\n\nGit Flow 适合有固定发布周期的项目，而 GitHub Flow 则更适合持续部署的团队。无论选择哪种，保持提交信息清晰、分支命名规范都是基本要求。",
            summary="聊聊团队协作中的 Git 实践",
            category=categories["tech"],
        ),
        Post(
            title="学会断舍离",
            content="整理房间时发现囤积了大量不再使用的物品。下定决心做了一次彻底的断舍离。\n\n丢掉的不只是物品，还有附着在上面的执念。房间清爽了，心境也跟着明朗起来。",
            summary="整理物品也是对内心的整理",
            category=categories["life"],
        ),
        Post(
            title="雨夜随想",
            content="窗外下着淅淅沥沥的小雨，泡一杯热茶，放一张老唱片。\n\n这样的夜晚适合放空，什么都不想，什么都不做。或许人生也需要这样的留白时刻。",
            summary="一个安静的雨夜，一些零碎的感想",
            category=categories["essay"],
        ),
    ]
    db.session.add_all(posts)
    db.session.commit()
    for p in posts:
        print(f"    + {p}")

    print(f"\n==> Done! {len(categories)} categories, {len(posts)} posts seeded.")
