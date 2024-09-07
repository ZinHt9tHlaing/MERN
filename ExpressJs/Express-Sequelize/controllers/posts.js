// const posts = [];

const Post = require("../models/posts");

exports.createPost = (req, res) => {
  const { title, description, photo } = req.body;
  Post.create({
    title,
    description,
    imgUrl: photo
  }).then((result) => {
    console.log(result);
    console.log("New post created");
    res.redirect('/');
  }).catch(err => console.log(err))
};

exports.renderCreatePage = (req, res) => {
  // res.sendFile(path.join(__dirname, "..", "views", "addPost.html"));
  res.render("addPost", { title: "Add Post" });
};

exports.getPosts = (req, res) => {
  Post.findAll().then((posts) => {
    // console.log(posts);
    res.render("home", { title: "Home Page", postArr: posts });
  })
    .catch((err) => console.log(err));
};

exports.getPostById = (req, res) => {
  const postId = req.params.postId;
  // Post.findByPk(postId)
  //   .then((post) => {
  //     res.render("details", { title: "Post Detail Page", post});
  //   })
  //   .catch((err) => console.log(err));

    Post.findOne({ where: { id: postId } })
    .then((post) => {
      console.log(post);
      res.render("details", { title: "Post Detail Page", post });
    })
    .catch((err) => console.log(err));
};
