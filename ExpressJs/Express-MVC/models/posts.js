const db = require("../utils/db");

module.exports = class Post {
  constructor( title, description, image_url) {
    this.title = title;
    this.description = description;
    this.image_url = image_url;
  }

  static getAllPosts() {
    return db.execute("SELECT * FROM posts");
  }

  static getSinglePost(id) {
    return db.execute("SELECT * FROM posts WHERE posts.id = ?", [id]);
    // SELECT * FROM posts WHERE posts.id = 1
  }

  setPost() {
    return db.execute(
      "INSERT INTO posts (title, description, image_url) VALUES (?, ?, ?)",
      [this.title, this.description, this.image_url]
    );
  }
};
