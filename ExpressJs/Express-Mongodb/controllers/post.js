const Post = require("../models/post");

exports.createPost = (req, res) => {
  const { title, description, photo } = req.body;
  Post.create({ title, description, imgUrl: photo, userId: req.user })
    .then((result) => {
      res.redirect("/");
    })
    .catch((error) => console.log(error));
};

exports.renderCreatePage = (req, res) => {
  // res.sendFile(path.join(__dirname, "..", "views", "addPost.html"));
  res.render("addPost", { title: "Add Post" });
};

exports.renderHomePage = (req, res) => {
  // isLogIn = true
  // const cookie = req.get("Cookie").split("=")[1].trim() === "true";
  Post.find()
    .select("title description")
    .populate("userId", "email")
    .sort({ title: -1 })
    .then((posts) => {
      // console.log(posts);
      res.render("home", {
        title: "Home Page",
        postArr: posts,
        isLogIn: req.session.isLogin ? true : false,
        currentUserEmail: req.session.userInfo
          ? req.session.userInfo.email
          : "",
        // csrfToken: req.csrfToken(),
      });
    })
    .catch((err) => console.log(err));
};

exports.getDetailPost = (req, res) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) =>
      res.render("details", {
        title: post.title,
        post,
        currentLoginUserId: req.session.userInfo
          ? req.session.userInfo._id
          : "",
      })
    )
    .catch((err) => console.log(err));
};

exports.getEditPost = (req, res) => {
  const { postId } = req.params;
  Post.findById(postId)
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

  Post.findById(postId)
    .then((post) => {
      if (post.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/");
      }
      post.title = title;
      post.description = description;
      post.imgUrl = photo;
      return post.save().then((result) => {
        console.log("Post updated");
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.deletePost = (req, res) => {
  const { postId } = req.params;
  Post.deleteOne({ _id: postId, userId: req.user._id })
    .then(() => {
      console.log("Post deleted");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
