const login = async (email, password) => {
  try {
    console.log('test');
    const res = await axios({
      method: 'POST',
      url: '/login',
      data: {
        email,
        password,
      },
    });
    console.log(res);
    windows.location.href = '/posts';
  } catch (error) {
    console.log(error);
  }
};

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  login(email, password);
});
