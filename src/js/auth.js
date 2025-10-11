import { getLocalStorage, setLocalStorage } from './utils.mjs';

const usersKey = 'users';
const currentUserKey = 'currentUser';

export default class Auth {
  constructor() {
    this.users = getLocalStorage(usersKey) || [];
    this.currentUser = sessionStorage.getItem(currentUserKey);
  }

  init() {
    this.initModals();
    this.updateHeader();
  }

  initModals() {
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const closeButtons = document.querySelectorAll('.close-button');

    if (showRegister) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'none';
            registerModal.style.display = 'block';
        });
    }

    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerModal.style.display = 'none';
            loginModal.style.display = 'block';
        });
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target == registerModal) {
            registerModal.style.display = 'none';
        }
    });

    document.getElementById('login-form').addEventListener('submit', this.login.bind(this));
    document.getElementById('register-form').addEventListener('submit', this.register.bind(this));
  }

  login(event) {
    event.preventDefault();
    const username = event.target.elements['login-username'].value;
    const password = event.target.elements['login-password'].value;
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      sessionStorage.setItem(currentUserKey, username);
      this.currentUser = username;
      this.updateHeader();
      document.getElementById('login-modal').style.display = 'none';
    } else {
      alert('Invalid username or password');
    }
  }

  register(event) {
    event.preventDefault();
    const username = event.target.elements['register-username'].value;
    const password = event.target.elements['register-password'].value;
    const existingUser = this.users.find(u => u.username === username);
    if (existingUser) {
      alert('Username already exists');
    } else {
      const newUser = { username, password };
      this.users.push(newUser);
      setLocalStorage(usersKey, this.users);
      sessionStorage.setItem(currentUserKey, username);
      this.currentUser = username;
      this.updateHeader();
      document.getElementById('register-modal').style.display = 'none';
    }
  }

  logout() {
    sessionStorage.removeItem(currentUserKey);
    this.currentUser = null;
    this.updateHeader();
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  updateHeader() {
    const authContainer = document.getElementById('auth-container');
    if (this.isLoggedIn()) {
      authContainer.innerHTML = `<span>Welcome, ${this.currentUser}!</span><button id="logout-button">Logout</button>`;
      document.getElementById('logout-button').addEventListener('click', this.logout.bind(this));
    } else {
      authContainer.innerHTML = '<button id="login-button">Login</button>';
      document.getElementById('login-button').addEventListener('click', () => {
        document.getElementById('login-modal').style.display = 'block';
      });
    }
  }
}
