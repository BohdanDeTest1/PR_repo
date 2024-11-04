export class Locators {
    static signupButton = 'button:has-text("Sign up")';
    static signinButton = 'button:has-text("Sign In")';
    static nameInput = '#signupName';
    static lastNameInput = '#signupLastName';
    static emailInput = '#signupEmail';
    static passwordInput = '#signupPassword';
    static confirmPasswordInput = '#signupConfirmPassword';
    static loginEmailInput = '#signinEmail';
    static loginPasswordInput = '#signinPassword';
    static loginButton = 'button:has-text("Login")';
    static nameRequiredError = 'text=Name required';
    static lastNameRequiredError = 'text=Last name required';
    static emailError = 'text=Email is incorrect';
    static emailRequiredError = 'text=Email required';
    static passwordError = 'text=Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';
    static wrongLoginError = 'text=Wrong email or password';
    static loginErrorXPath = 'xpath=/html/body/ngb-modal-window/div/div/app-signin-modal/div[2]/app-signin-form/form/p';
}
