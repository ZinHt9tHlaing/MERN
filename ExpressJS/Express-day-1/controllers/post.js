const posts = [];

exports.createPost = (req, res) => {
  const { title, description, photo } = req.body;
  console.log(`title value is ${title} & description is ${description}`);
  // res.json(req.body);
  posts.push({
    id: Math.random(),
    title,
    description,
    photo,
  });
  // console.log("AdminPage => " + posts);
  res.redirect("/");
};

exports.renderCreatePage = (req, res) => {
  // res.sendFile(path.join(__dirname, "..", "views", "addPost.html"));
  res.render("addPost", { title: "Add Post" });
};

exports.renderHomePage = (req, res) => {
  console.log(posts);
  // res.sendFile(path.join(__dirname, "..", "views", "homePage.html"));
  res.render("home", { title: "Hello World", postsArr: posts });
};

exports.getPost = (req, res) => {
  const postId = Number(req.params.postId);
  console.log(postId);
  const post = posts.find((post) => post.id === postId);
  console.log(post);
  res.render("details", { title: "Post Detail Page", post });
};
