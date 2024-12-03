const { formatISO9075 } = require("date-fns");
const Post = require("../models/post");
const { validationResult } = require("express-validator");

exports.createPost = (req, res, next) => {
  const { title, description } = req.body;
  const image = req.file;

  if (image === undefined) {
    return res.status(422).render("addPost", {
      title: "Post create",
      errorMsg: "Image extension must be png, jpg and jpeg.",
      oldFormData: { title, description },
    });
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("addPost", {
      title: "Post create",
      errorMsg: errors.array()[0].msg,
      oldFormData: { title, description },
    });
  }

  Post.create({ title, description, imgUrl: image.path, userId: req.user })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      const error = new Error("Something went wrong.");
      return next(error);
    });
};

exports.renderCreatePage = (req, res, next) => {
  // res.sendFile(path.join(__dirname, "..", "views", "addPost.html"));
  res.render("addPost", {
    title: "Add Post",
    errorMsg: "",
    oldFormData: { title: "", photo: "", description: "" },
  });
};

exports.renderHomePage = (req, res, next) => {
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
    .catch((err) => {
      console.log(err);
      const error = new Error("Something went wrong.");
      return next(error);
    });
};

exports.getDetailPost = (req, res, next) => {
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
    .catch((err) => {
      console.log(err);
      const error = new Error("Post not found with this ID.");
      return next(error);
    });
};

exports.getEditPost = (req, res, next) => {
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
          description: undefined,
        },
        isValidationFail: false,
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error("Something went wrong.");
      return next(error);
    });
};

exports.updatePost = (req, res, next) => {
  const { postId, title, description } = req.body;
  const image = req.file;
  const errors = validationResult(req);

  // if (image === undefined) {
  //   return res.status(422).render("editPost", {
  //     title,
  //     postId,
  //     errorMsg: "Image extension must be png, jpg and jpeg.",
  //     oldFormData: { title, description },
  //     isValidationFail: true,
  //   });
  // }

  if (!errors.isEmpty()) {
    return res.status(422).render("editPost", {
      title,
      postId,
      errorMsg: errors.array()[0].msg,
      oldFormData: { title, description },
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
      if (image) {
        post.imgUrl = image.path;
      }
      return post.save().then((result) => {
        console.log("Post updated");
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error("Something went wrong.");
      return next(error);
    });
};

exports.deletePost = (req, res, next) => {
  const { postId } = req.params;
  Post.deleteOne({ _id: postId, userId: req.user._id })
    .then(() => {
      console.log("Post deleted");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      const error = new Error("Something went wrong.");
      return next(error);
    });
};
