// const posts = [];

const Post = require("../models/posts");

exports.createPost = (req, res) => {
  const { title, description, photo } = req.body;
  // console.log(`title: ${title}, description: ${description}`);
  // posts.push({
  //   id: Math.random(),
  //   title,
  //   description,
  //   photo,
  // });
  const post = new Post(title, description, photo);
  post
    .setPost()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.renderCreatePage = (req, res) => {
  // res.sendFile(path.join(__dirname, "..", "views", "addPost.html"));
  res.render("addPost", { title: "Add Post" });
};

exports.getPosts = (req, res) => {
  // console.log(posts);
  // res.sendFile(path.join(__dirname, "..", "views", "homePage.html"));
  // express-day-1/routes/views/homePage.html
  Post.getAllPosts()
    .then(([rows]) => {
      console.log(rows);
      res.render("home", { title: "Home Page", postArr: rows });
    })
    .catch((err) => console.log(err));
};

exports.getPost = (req, res) => {
  const postId = Number(req.params.postId);
  // const post = posts.find((post) => post.id === postId);
  // console.log(post);
  Post.getSinglePost(postId)
    .then(([row]) => {
      console.log(row);
      res.render("details", { title: "Post Detail Page", post: row[0] });
    })
    .catch((err) => console.log(err));
};
