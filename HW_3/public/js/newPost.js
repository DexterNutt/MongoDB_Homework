const newPost = async (title, post) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/newPost',
      data: {
        title,
        post,
      },
    });
    const newPost = res.data;
    console.log(newPost);
    window.location.href = `/posts/${newPost._id}`;
  } catch (error) {
    console.error('Error creating post:', error);
  }
};

document.getElementById('postForm').addEventListener('submit', async e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const post = document.getElementById('post').value;

  newPost(title, post);
});
