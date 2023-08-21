let switcher = document.querySelector('.theme');
let toggle = document.querySelector('.theme__toggle');
let theme = 'light';
switcher.addEventListener('click', switchTheme)

function switchTheme() {
    let body = document.documentElement;
    let app = document.querySelector('.app');
    let buttons = document.querySelectorAll('.button');
    let equal = document.querySelector('.button-span-row');
    let expField = document.querySelector('.app__show-exp')
    let result = document.querySelector('.app__show-number');

    if (theme === "light") {
        body.style.background = 'radial-gradient(circle at 10% 20%, rgb(69, 86, 102) 0%, rgb(34, 34, 34) 90%) fixed';
        app.classList.add('app-black');
        equal.classList.add('button-span-row-dark');
        expField.classList.add('app__show-exp-dark');
        result.classList.add('app__show-number-dark')
        for (let button of buttons) {
            button.classList.add('button-dark')
        }

        toggle.style.transform = 'translateX(125%)';
        switcher.style.background = '#232323';
        theme = 'dark';
        return
    }

    if (theme === 'dark') {
        body.style.background = '';
        app.classList.remove('app-black');
        equal.classList.remove('button-span-row-dark');
        expField.classList.remove('app__show-exp-dark');
        result.classList.remove('app__show-number-dark')
        for (let button of buttons) {
            button.classList.remove('button-dark');
        }

        toggle.style.transform = 'translateX(0)';
        switcher.style.background = '#F0B703';
        theme = 'light';
    }
}