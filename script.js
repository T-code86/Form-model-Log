const book = document.getElementById('book');
const cover = document.getElementById('cover');
const inside = document.querySelector('.inside');
const turningPages = Array.from(document.querySelectorAll('.turning-page'));
const form = document.getElementById('account-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const confirmField = document.getElementById('confirm-field');
const formHeading = document.getElementById('form-heading');
const formEyebrow = document.getElementById('form-eyebrow');
const formIntro = document.getElementById('form-intro');
const submitButton = document.getElementById('submit-button');
const formError = document.getElementById('form-error');
const greetingHeading = document.getElementById('greeting-heading');
const greetingCopy = document.getElementById('greeting-copy');
const switchModeButton = document.getElementById('switch-mode');
const signOutButton = document.getElementById('sign-out');

let isSignUp = false;

function setFormMode(signUp) {
    isSignUp = signUp;
    formError.textContent = '';
    confirmField.hidden = !signUp;
    confirmPasswordInput.required = signUp;
    passwordInput.autocomplete = signUp ? 'new-password' : 'current-password';
    formEyebrow.textContent = signUp ? 'Begin your story' : 'Your story awaits';
    formHeading.textContent = signUp ? 'Create your account' : 'Welcome back';
    formIntro.textContent = signUp
        ? 'Join Tony C Nation and start your next chapter.'
        : 'Sign in to pick up where you left off.';
    submitButton.textContent = signUp ? 'Create account' : 'Sign in';
    greetingHeading.textContent = signUp ? 'Welcome back!' : 'Hello, friend!';
    greetingCopy.textContent = signUp
        ? 'Already a member? Sign in and continue your story.'
        : 'New here? Create an account and start your story with us.';
    switchModeButton.textContent = signUp ? 'Sign in' : 'Create account';
}

function openBook() {
    book.classList.remove('is-closing-pages', 'is-closing-cover', 'pages-open', 'ball-rolls-away');
    book.classList.add('is-opening');
    book.classList.add('is-open');
    cover.inert = true;
    cover.setAttribute('aria-hidden', 'true');
}

function closeBook() {
    book.classList.remove('ball-rolls-away');
    book.classList.add('is-closing-pages');
    book.classList.remove('pages-open');
    inside.inert = true;
    inside.setAttribute('aria-hidden', 'true');
}

switchModeButton.addEventListener('click', () => {
    setFormMode(!isSignUp);
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    formError.textContent = '';

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    if (isSignUp && passwordInput.value !== confirmPasswordInput.value) {
        formError.textContent = 'Your passwords do not match. Please try again.';
        confirmPasswordInput.focus();
        return;
    }

    openBook();
});

signOutButton.addEventListener('click', closeBook);

cover.addEventListener('transitionend', (event) => {
    if (event.target !== cover || event.propertyName !== 'transform') {
        return;
    }

    if (book.classList.contains('is-opening') && book.classList.contains('is-open')) {
        book.classList.add('pages-open');
        return;
    }

    if (book.classList.contains('is-closing-cover') && !book.classList.contains('is-open')) {
        book.classList.remove('is-closing-cover', 'is-closing-pages', 'is-opening', 'pages-open');
        form.reset();
        setFormMode(false);
        emailInput.focus();
    }
});

turningPages[turningPages.length - 1].addEventListener('transitionend', (event) => {
    if (event.propertyName !== 'transform' || !book.classList.contains('is-opening') || !book.classList.contains('pages-open')) {
        return;
    }

    book.classList.remove('is-opening');
    inside.inert = false;
    inside.removeAttribute('aria-hidden');
    book.classList.add('ball-rolls-away');
});

turningPages[0].addEventListener('transitionend', (event) => {
    if (event.propertyName !== 'transform' || !book.classList.contains('is-closing-pages')) {
        return;
    }

    book.classList.add('is-closing-cover');
    book.classList.remove('is-open');
    cover.inert = false;
    cover.removeAttribute('aria-hidden');
});
