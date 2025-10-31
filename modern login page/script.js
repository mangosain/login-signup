    document.addEventListener('DOMContentLoaded', () => {
            const loginTab = document.getElementById('login-tab');
            const signupTab = document.getElementById('signup-tab');
            const loginForm = document.getElementById('login-form');
            const signupForm = document.getElementById('signup-form');
            const messageBox = document.getElementById('message-box');
            const signupPasswordInput = document.getElementById('signup-password');

            const passLength = document.getElementById('pass-length');
            const passCapital = document.getElementById('pass-capital');
            const passNumber = document.getElementById('pass-number');
            const passSpecial = document.getElementById('pass-special');
            let passwordTouched = false;

            const checkIcon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
            const xIcon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
            
            const validationRules = {
                length: false,
                capital: false,
                number: false,
                special: false
            };

            const brandPanel = document.getElementById('brand-panel');
            const brandTitle = document.getElementById('brand-title');
            const brandText = document.getElementById('brand-text');
            const brandIcon = document.getElementById('brand-icon');

            const originalBrand = {
                title: brandTitle.innerHTML,
                text: brandText.innerHTML,
                icon: brandIcon.innerHTML,
            };
            
            const successIcon = `
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            `;

            const resetBrandPanel = () => {
                brandTitle.innerHTML = originalBrand.title;
                brandText.innerHTML = originalBrand.text;
                brandIcon.innerHTML = originalBrand.icon;
                brandPanel.classList.remove('success');
            };

            const updateRuleUI = (element, isValid) => {
                const text = element.innerText;
                if (isValid) {
                    element.innerHTML = checkIcon + text;
                    element.classList.add('valid');
                    element.classList.remove('invalid');
                } else if (passwordTouched) {
                    element.innerHTML = xIcon + text;
                    element.classList.add('invalid');
                    element.classList.remove('valid');
                } else {
                    element.innerHTML = xIcon + text;
                    element.classList.remove('valid', 'invalid');
                }
            };

            const validatePassword = () => {
                const value = signupPasswordInput.value;
                validationRules.length = value.length >= 8;
                validationRules.capital = /[A-Z]/.test(value);
                validationRules.number = /[0-9]/.test(value);
                validationRules.special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

                updateRuleUI(passLength, validationRules.length);
                updateRuleUI(passCapital, validationRules.capital);
                updateRuleUI(passNumber, validationRules.number);
                updateRuleUI(passSpecial, validationRules.special);

                return Object.values(validationRules).every(Boolean);
            };

            signupPasswordInput.addEventListener('input', () => {
                passwordTouched = true;
                validatePassword();
            });

            loginTab.addEventListener('click', () => {
                loginForm.classList.remove('hidden');
                signupForm.classList.add('hidden');
                loginTab.classList.add('active');
                signupTab.classList.remove('active');
                resetBrandPanel();
            });

            signupTab.addEventListener('click', () => {
                loginForm.classList.add('hidden');
                signupForm.classList.remove('hidden');
                loginTab.classList.remove('active');
                signupTab.classList.add('active');
                resetBrandPanel();
            });
            
            const showMessage = (message, isError = false) => {
                messageBox.textContent = message;
                messageBox.classList.add('visible');
                messageBox.classList.remove('success', 'error');

                if (isError) {
                    messageBox.classList.add('error');
                } else {
                    messageBox.classList.add('success');
                    brandTitle.innerHTML = 'Success!';
                    brandText.innerHTML = message;
                    brandIcon.innerHTML = successIcon;
                    brandPanel.classList.add('success');
                }

                setTimeout(() => {
                    messageBox.classList.remove('visible');
                    if (!isError) {
                        resetBrandPanel();
                    }
                }, 3000);
            };

            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                showMessage('Login successful! Redirecting...', false);
            });

            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                passwordTouched = true;
                const isPasswordValid = validatePassword();
                
                if (!isPasswordValid) {
                    showMessage('Please ensure all password requirements are met.', true);
                    return;
                }
                
                if (!document.getElementById('terms').checked) {
                    showMessage('You must agree to the Terms of Service.', true);
                    return;
                }

                showMessage('Account created successfully!', false);
            });
            // === Show/Hide Password Feature (with Eye Icon) ===

// SVG icons
const eyeOpen = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="18" height="18">
<path stroke-linecap="round" stroke-linejoin="round" d="M1.458 12C2.732 7.943 6.523 5 12 5c5.478 0 9.268 2.943 10.542 7-1.274 4.057-5.064 7-10.542 7-5.477 0-9.268-2.943-10.542-7z" />
<circle cx="12" cy="12" r="3" />
</svg>`;

const eyeClosed = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="18" height="18">
<path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18M9.88 9.88A3 3 0 0112 9c1.657 0 3 1.343 3 3a3 3 0 01-.88 2.12M21 21l-2.387-2.387A10.97 10.97 0 0012 19c-5.478 0-9.268-2.943-10.542-7a10.97 10.97 0 012.507-4.281L3 3z" />
</svg>`;

// --- Helper Function ---
const addToggleIcon = (inputElement) => {
    if (!inputElement) return;
    const wrapper = document.createElement('span');
    wrapper.innerHTML = eyeClosed;
    wrapper.style.cursor = 'pointer';
    wrapper.style.marginLeft = '8px';
    wrapper.style.verticalAlign = 'middle';
    wrapper.style.color = '#007bff';

    inputElement.parentNode.insertBefore(wrapper, inputElement.nextSibling);

    wrapper.addEventListener('click', () => {
        if (inputElement.type === 'password') {
            inputElement.type = 'text';
            wrapper.innerHTML = eyeOpen;
        } else {
            inputElement.type = 'password';
            wrapper.innerHTML = eyeClosed;
        }
    });
};

// --- Apply to both login & signup password fields ---
const loginPasswordInput = document.querySelector('#login-form input[type="password"]');
addToggleIcon(loginPasswordInput);

addToggleIcon(signupPasswordInput);

        });