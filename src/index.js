import "./scss/style.scss";
import { loadavg } from "os";

class FormView {

    constructor() {
        this.form = document.getElementById('form');
        this.form.onsubmit = this.onSubmitForm;
        localStorage.removeItem("news");
        if(localStorage.getItem("news")) {
            this.load();
        }
    }

    load(){
        this.context = document.getElementById('news');
        this.context.innerHTML = ''
        const news = JSON.parse(localStorage.getItem("news"));
        let html ='';
        news.forEach((newsone,i) => {
            if(newsone.category){
                if(newsone.category === "Новости"){
                    html += '<div class="news__block news__padding"><div class="news__category">' + newsone.category + '</div><div class="news__title-aux">' + newsone.title + '</div><div class="news__footer">' + newsone.date + ' • 12:00 • ' + newsone.author + '</div></div>'
                } else if(newsone.column){
                    html += '<div class="news__block news__padding"><div class="news__author avatar"><img src="../img/avatar.jpg" alt="avatar" class="avatar__photo avatar__photo_big"><div class="avatar__name">' + newsone.author + '</div></div><div style="clear: both;"></div><div class="news__title-aux">' + newsone.title + '</div><div class="news__footer">' + newsone.date + ' • 12:00 • ' + newsone.author + '</div></div>';
                } else if(newsone.fitcher){
                    html += '<div class="news__block news__padding news__block_big"><div class="news__category news__category_bg">' + newsone.category + '</div><div class="news__background-photo" style="background-image: url(../img/news1.png)"></div><div class="news__background"></div><div class="news__title">' + newsone.title + '</div></div>';
                } else{
                    html += '<div class="news__block news__padding"><div class="news__category news__category_bg">' + newsone.category + '</div><div class="news__photo" style="background-image: url(../img/401.jpg)"></div><div class="news__title-aux">' + newsone.title + '</div><div class="news__content">' + newsone.description + '</div><div class="news__footer">' + newsone.date + '• 12:00 • <br/>' + newsone.author + '</div></div>';
                }
            }
        })
        this.context.innerHTML = html;
    }

    onSubmitForm(e) {
        e.preventDefault();
        const {target: form} = e;
        const { title, description, category, author, date, fitcher, column} = form;
        console.log(title.value, description.value, category.value, author.value, date.value, fitcher.checked, column.checked);
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
        // this.load();
        window.location.reload();
    }
}

new FormView();