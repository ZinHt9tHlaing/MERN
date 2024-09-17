const Post = require("../models/post");

// const posts = [];

exports.createPost = (req, res) => {
  const { title, description, photo } = req.body;
  const post = new Post(title, description, photo);
  post
    .create()
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
  res.redirect("/");
};

exports.renderCreatePage = (req, res) => {
  // res.sendFile(path.join(__dirname, "..", "views", "addPost.html"));
  res.render("addPost", { title: "Add Post" });
};

exports.renderHomePage = (req, res) => {
  Post.getPosts()
    .then((posts) => res.render("home", { title: "Home Page", postArr: posts }))
    .catch((err) => console.log(err));
};

exports.getPost = (req, res) => {
  const postId = req.params.postId;
  Post.getPost(postId)
    .then((post) => res.render("details", { title: post.title, post }))
    .catch((err) => console.log(err));
};

exports.getEditPost = (req, res) => {
  const { postId } = req.params;
  Post.getPost(postId)
    .then((post) => {
      if (!post) {
        return res.redirect("/");
      }
      res.render("editPost", { title: post.title, post });
    })
    .catch((err) => console.log(err));
};

exports.updatePost = (req, res) => {
  const { postId, title, description, photo } = req.body;
  const post = new Post(title, description, photo, postId);

  post
    .create()
    .then((result) => {
      console.log("Post updated");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.deletePost = (req, res) => {
  const { postId } = req.params;
  Post.deletePost(postId)
    .then(() => {
      console.log("Post deleted");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
