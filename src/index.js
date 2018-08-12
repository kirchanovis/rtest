import "./scss/style.scss";

class FormView {

    constructor() {
        // localStorage.removeItem("news");
        if(localStorage.getItem("news")) {
            this.load();
        }
    }

    load(){
        let context = document.getElementById('news');
        context.innerHTML = ''
        const news = JSON.parse(localStorage.getItem("news"));
        let html ='';
        news.forEach((newsone, i) => {
            if(newsone.category){
                if(newsone.category === "Новости"){
                    html += `<div class="news-flex__block news-flex__padding"><div class="news-flex__category">${newsone.category}</div><div class="news-flex__title-aux">${newsone.title}</div><div class="news-flex__footer">${newsone.date} • 12:00 • ${newsone.author}</div></div>`;
                } else if(newsone.column){
                    html += `<div class="news-flex__block news-flex__padding"><div class="news-flex__author avatar"><img src="../img/avatar.jpg" alt="avatar" class="avatar__photo avatar__photo_big"><div class="avatar__name">${newsone.author}</div></div><div class="news-flex__title-aux">${newsone.title}</div><div class="news-flex__footer">${newsone.date} • 12:00 • ${newsone.author}</div></div>`;
                } else if(newsone.fitcher){
                    html += `<div class="news-flex__block news-flex__padding news-flex__block_big"><div class="news-flex__category news-flex__category_bg">${newsone.category}</div><div class="news-flex__background-photo" style="background-image: url(../img/news1.png)"></div><div class="news-flex__background"></div><div class="news-flex__title">${newsone.title}</div></div>`;
                } else{
                    html += `<div class="news-flex__block news-flex__padding"><div class="news-flex__category news-flex__category_bg">${newsone.category}</div><div class="news-flex__photo" style="background-image: url(../img/401.jpg)"></div><div class="news-flex__title-aux">${newsone.title}</div><div class="news-flex__content">${newsone.description}</div><div class="news-flex__footer">${newsone.date}• 12:00 • <br/>${newsone.author}</div></div>`;
                }
            }
        })
        context.innerHTML = html;
    }

    submitForm(form) {
        const { title, description, category, author, date, fitcher, column} = form;
        const newobj = {
            title: title.value,
            description: description.value,
            category: category.value,
            author: author.value,
            date: date.value,
            fitcher: fitcher.checked,
            column: column.checked
        }
        this.arr = [];
        if(localStorage.getItem("news")) {
            this.arr = JSON.parse(localStorage.getItem("news"))
        }
        this.arr.unshift(newobj);
        const serialObj = JSON.stringify(this.arr)
        localStorage.setItem("news", serialObj);
    }
}

let f = new FormView();

const form = document.getElementById('form');
form.onsubmit = function(e) {
    e.preventDefault ();
    const {target: form} = e;
    f.submitForm(form);
    f.load();
} 