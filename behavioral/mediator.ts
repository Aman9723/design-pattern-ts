interface Mediator {
    notify(sender: Component, event: string): void
}

class AuthenicationDialog implements Mediator {
    private title: string
    private loginOrRegisterChkBx: Checkbox
    private loginUsername: TextBox
    private loginPassword: TextBox
    private registrationEmail: TextBox
    private registrationPassword: TextBox
    private registrationRepeatPassword: TextBox
    private okBtn: Button
    private cancelBtn: Button

    constructor() {}

    notify(sender: Component, event: string) {
        if (sender === this.loginOrRegisterChkBx && event === 'check') {
            if (this.loginOrRegisterChkBx.checked) {
                this.title = 'Log in'
            } else {
                this.title = 'Register'
            }
        }

        if (sender === this.okBtn && event === 'click') {
            if (this.loginOrRegisterChkBx.checked) {
            } else {
                // Create a new user account
            }
        }
    }
}

class Component {
    constructor(public dialog: Mediator) {}

    click() {
        this.dialog.notify(this, 'click')
    }

    keypress() {
        this.dialog.notify(this, 'keypress')
    }
}

class Button extends Component {}

class TextBox extends Component {}

class Checkbox extends Component {
    checked: boolean = false

    check() {
        this.checked = !this.checked
        this.dialog.notify(this, 'check')
    }
}
