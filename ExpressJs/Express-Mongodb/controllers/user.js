const { validationResult } = require("express-validator");
const stripe = require("stripe")(
  "sk_test_51QU9xnDHP75BvMD1zEomduyjHYglpY23Yt2UkJZuWpYwtJ4b8q8RCbiPHBJwbmM5emfSmC2DV5TqBsLoJ2Hwn3mY00JOOddImc"
);

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
        .populate("userId", "email username isPremium profile_imgUrl")
        .skip((pageNumber - 1) * POST_PAR_PAGE)
        .limit(POST_PAR_PAGE)
        .sort({ createdAt: -1 });
    })
    .then((posts) => {
      if (!posts.length && pageNumber > 1) {
        return res.status(500).render("error/500", {
          title: "Something went wrong",
          errMessage: "No post in this page query.",
        });
      } else {
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
        .populate("userId", "email username isPremium profile_imgUrl")
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
      const error = new Error("User not found with this ID.");
      return next(error);
    });
};

exports.renderPremiumPage = (req, res, next) => {
  stripe.checkout.sessions
    .create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1QWEf2DHP75BvMD14hHV49NR",
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.protocol}://${req.get(
        "host"
      )}/admin/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.protocol}://${req.get(
        "host"
      )}/admin/subscription-cancel`,
    })
    .then((stripe_session) => {
      res.render("user/premium", {
        title: "Buy Premium",
        session_id: stripe_session.id,
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error("Something went wrong.");
      return next(error);
    });
};

exports.getSuccessPage = (req, res, next) => {
  const session_id = req.query.session_id;
  if (!session_id || !session_id.includes("cs_test_")) {
    return res.redirect("/admin/profile");
  }

  User.findById(req.user._id)
    .then((user) => {
      user.isPremium = true;
      user.payment_session_key = session_id;
      return user.save();
    })
    .then((_) => {
      res.render("user/subscription-success", {
        title: "Subscription Success",
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error("Something went wrong.");
      return next(error);
    });
};

exports.getPremiumDetails = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      return stripe.checkout.sessions.retrieve(user.payment_session_key);
    })
    .then((stripe_session) => {
      res.render("user/premium-details", {
        title: "Status",
        customer_id: stripe_session.customer,
        country: stripe_session.customer_details.address.country,
        postal_code: stripe_session.customer_details.address.postal_code,
        email: stripe_session.customer_details.email,
        name: stripe_session.customer_details.name,
        invoice_id: stripe_session.invoice,
        payment_status: stripe_session.payment_status,
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error("Something went wrong.");
      return next(error);
    });
};

exports.getProfileUploadPage = (req, res) => {
  res.render("user/profile-upload", { title: "Profile image", errorMsg: "" });
};

exports.setProfilePage = (req, res, next) => {
  const photo = req.file;
  const errors = validationResult(req);

  if (photo === undefined) {
    return res.status(422).render("user/profile-upload", {
      title: "Profile image",
      errorMsg: "Image extension must be png, jpg and jpeg.",
      oldFormData: { title, description },
    });
  }

  if (!errors.isEmpty()) {
    return res.status(422).render("user/profile-upload", {
      title: "Profile image",
      errorMsg: errors.array()[0].msg,
      oldFormData: { title, description },
    });
  }

  User.findById(req.user._id)
    .then((user) => {
      user.profile_imgUrl = photo.path;
      return user;
    })
    .then((_) => {
      res.redirect("/admin/profile");
    })
    .catch((err) => {
      console.log(err);
      const error = new Error("Something went wrong.");
      return next(error);
    });
};
