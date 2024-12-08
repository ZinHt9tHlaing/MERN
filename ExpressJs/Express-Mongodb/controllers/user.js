const { validationResult } = require("express-validator");

const Post = require("../models/post");
const User = require("../models/user");

const POST_PAR_PAGE = 6;

exports.getProfile = (req, res, next) => {
  const pageNumber = +req.query.page || 1;
  let totalPostNumber;

  Post.find({ userId: req.user._id })
    .countDocuments()
    .then((totalPostCount) => {
      totalPostNumber = totalPostCount;
      return Post.find({ userId: req.user._id })
        .populate("userId", "email username")
        .skip((pageNumber - 1) * POST_PAR_PAGE)
        .limit(POST_PAR_PAGE)
        .sort({ createdAt: -1 });
    })
    .then((posts) => {
      if (posts.length > 0) {
        // console.log(posts);
        return res.render("user/profile", {
          title: req.session.userInfo.email,
          postArr: posts,
          currentPage: pageNumber,
          hasNextPage: POST_PAR_PAGE * pageNumber < totalPostNumber,
          hasPreviousPage: pageNumber > 1,
          nextPage: pageNumber + 1,
          previousPage: pageNumber - 1,
          currentUserEmail: req.session.userInfo
            ? req.session.userInfo.email
            : "",
        });
      } else {
        return res.status(500).render("error/500", {
          title: "Something went wrong",
          errMessage: "No post in this page query.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      const error = new Error("Something went wrong.");
      return next(error);
    });
};

exports.getPublicProfile = (req, res, next) => {
  const { id } = req.params;

  const pageNumber = +req.query.page || 1;
  let totalPostNumber;

  Post.find({ userId: id })
    .countDocuments()
    .then((totalPostCount) => {
      totalPostNumber = totalPostCount;
      return Post.find({ userId: id })
        .populate("userId", "email")
        .skip((pageNumber - 1) * POST_PAR_PAGE)
        .limit(POST_PAR_PAGE)
        .sort({ createdAt: -1 });
    })
    .then((posts) => {
      if (posts.length > 0) {
        return res.render("user/public-profile", {
          title: posts[0].userId.email,
          postArr: posts,
          currentPage: pageNumber,
          hasNextPage: POST_PAR_PAGE * pageNumber < totalPostNumber,
          hasPreviousPage: pageNumber > 1,
          nextPage: pageNumber + 1,
          previousPage: pageNumber - 1,
          currentUserEmail: posts[0].userId.email,
        });
      } else {
        return res.status(500).render("error/500", {
          title: "Something went wrong",
          errMessage: "No post in this page query.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      const error = new Error("Something went wrong.");
      return next(error);
    });
};

exports.renderUsernamePage = (req, res) => {
  let message = req.flash("error");
  if (message.length > 0) {
    // array.length
    message = message[0];
  } else {
    message = null;
  }
  res.render("user/username", {
    title: "Set Username",
    errorMsg: message,
    oldFormData: { username: "" },
  });
};

exports.setUsername = (req, res, next) => {
  const { username } = req.body;
  const updateUsername = username.replace("@", "");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("user/username", {
      title: "Reset Password",
      errorMsg: errors.array()[0].msg,
      oldFormData: { username },
    });
  }

  User.findById(req.user._id)
    .then((user) => {
      user.username = `@${updateUsername}`;
      return user.save().then((result) => {
        console.log("Username updated");
        res.redirect("/admin/profile");
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error("Something went wrong.");
      return next(error);
    });
};

exports.renderPremiumPage = (req, res) => {
  res.render("user/premium", {
    title: "Premium",
  });
};