const signUp = async (username, email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/signup',
      data: {
        username,
        email,
        password,
      },
    });
    console.log(res);
    window.location.href = '/posts';
  } catch (error) {
    console.error('Error signing up:', error);
  }
};

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signUp(username, email, password);
});
