const { formatISO9075 } = require("date-fns");
const Post = require("../models/post");
const { validationResult } = require("express-validator");

exports.createPost = (req, res) => {
  const { title, description, photo } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("addPost", {
      title: "Post create",
      errorMsg: errors.array()[0].msg,
      oldFormData: { title, photo, description },
    });
  }

  Post.create({ title, description, imgUrl: photo, userId: req.user })
    .then((result) => {
      res.redirect("/");
    })
    .catch((error) => console.log(error));
};

exports.renderCreatePage = (req, res) => {
  // res.sendFile(path.join(__dirname, "..", "views", "addPost.html"));
  res.render("addPost", {
    title: "Add Post",
    errorMsg: "",
    oldFormData: { title: "", photo: "", description: "" },
  });
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
    .populate("userId", "email")
    .then((post) => {
      // console.log(post);
      res.render("details", {
        title: post.title,
        post,
        date: post.createdAt
          ? formatISO9075(post.createdAt, { representation: "date" })
          : undefined,
        currentLoginUserId: req.session.userInfo
          ? req.session.userInfo._id
          : "",
      });
    })
    .catch((err) => console.log(err));
};

exports.getEditPost = (req, res) => {
  const { postId } = req.params;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.redirect("/");
      }
      res.render("editPost", {
        title: post.title,
        post,
        postId: undefined,
        errorMsg: "",
        oldFormData: {
          title: undefined,
          photo: undefined,
          description: undefined,
        },
        isValidationFail: false,
      });
    })
    .catch((err) => console.log(err));
};

exports.updatePost = (req, res) => {
  const { postId, title, description, photo } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("editPost", {
      title,
      postId,
      errorMsg: errors.array()[0].msg,
      oldFormData: { title, photo, description },
      isValidationFail: true,
    });
  }

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
