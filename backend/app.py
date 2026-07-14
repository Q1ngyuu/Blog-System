import os
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder="static", static_url_path="")

# --- Config ---
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY") or "dev-key-change-in-production"

database_url = os.getenv("DATABASE_URL", "sqlite:///blog.db")
# Railway provides postgres:// but SQLAlchemy needs postgresql://
if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)
app.config["SQLALCHEMY_DATABASE_URI"] = database_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# --- Extensions ---
CORS(app)
db = SQLAlchemy(app)

# --- Routes ---

@app.route("/api/health")
def health():
    return jsonify(status="ok", message="Blog System API is running")


# --- Models ---
import models  # noqa: E402 F401 — ensure models are registered with SQLAlchemy

# --- Blueprints ---
from routes.posts import posts_bp
from routes.categories import categories_bp

app.register_blueprint(posts_bp, url_prefix="/api/posts")
app.register_blueprint(categories_bp, url_prefix="/api/categories")


# --- SPA fallback (must be last) ---

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    static_dir = os.path.join(app.root_path, app.static_folder or "static")
    if path and os.path.isfile(os.path.join(static_dir, path)):
        return send_from_directory(static_dir, path)
    return send_from_directory(static_dir, "index.html")


if __name__ == "__main__":
    app.run(debug=True, port=5000)
