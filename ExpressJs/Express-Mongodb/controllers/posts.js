const posts = [];

exports.createPost = (req, res) => {
  const { title, description, photo } = req.body;
  // console.log(`title: ${title}, description: ${description}`);
  posts.push({
    id: Math.random(),
    title,
    description,
    photo,
  });
  res.redirect("/");
};

exports.renderCreatePage = (req, res) => {
  // res.sendFile(path.join(__dirname, "..", "views", "addPost.html"));
  res.render("addPost", { title: "Add Post" });
};

exports.renderHomePage = (req, res) => {
  // console.log(posts);
  // res.sendFile(path.join(__dirname, "..", "views", "homePage.html"));
  // express-day-1/routes/views/homePage.html
  res.render("home", { title: "Home Page", postArr: posts });
};

exports.getPost = (req, res) => {
  const postId = Number(req.params.postId);
  const post = posts.find((post) => post.id === postId);
  // console.log(post);
  res.render("details", { title: "Post Detail Page", post });
};
