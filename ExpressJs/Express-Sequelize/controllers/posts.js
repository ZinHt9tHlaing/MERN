// const posts = [];

const Post = require("../models/post");

exports.createPost = (req, res) => {
  const { title, description, photo } = req.body;
  req.user.createPost({
    title,
    description,
    imgUrl: photo,
    userId: req.user.id,
  })
    .then((result) => {
      // console.log(result);
      console.log("New post created");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.renderCreatePage = (req, res) => {
  // res.sendFile(path.join(__dirname, "..", "views", "addPost.html"));
  res.render("addPost", { title: "Add Post" });
};

exports.getPosts = (req, res) => {
  Post.findAll({
    order: [["createdAt", "desc"]],
  })
    .then((posts) => {
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
      // console.log(post);
      res.render("details", { title: "Post Detail Page", post });
    })
    .catch((err) => console.log(err));
};

exports.deletePost = (req, res) => {
  const postId = req.params.postId;
  Post.findByPk(postId)
    .then((post) => {
      if (!post) {
        res.redirect("/");
      }
      return post.destroy();
    })
    .then((result) => {
      console.log("Post Deleted!!");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getOldPost = (req, res) => {
  const postId = req.params.postId;
  Post.findByPk(postId)
    .then((post) => {
      res.render("editPost", { title: `${post.title}`, post });
    })
    .catch((err) => console.log(err));
};

exports.updatePost = (req, res) => {
  const { title, description, photo, post_id } = req.body;
  Post.findByPk(post_id)
    .then((post) => {
      post.title = title;
      post.description = description;
      post.imgUrl = photo;
      return post.save();
    })
    .then((result) => {
      // console.log(`Post id ${post_id} is updated`);
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
