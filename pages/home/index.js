import { getNews } from "../../scripts/api.js";
import { createNewsElement } from "../../scripts/dom.js";
import { setCategory } from "../../scripts/localStorage.js";

async function renderNews(){
    let news = [];
    if(localStorage.getItem("@Living:category")){
        news = await filterNews(localStorage.getItem("@Living:category"));
    } else{
        news = await getNews();
    }
    const list = document.querySelector("ul");
    list.innerHTML = "";
    news.forEach(notice=>{
        const post = createNewsElement(notice);
        list.appendChild(post);
    });
}
renderNews();

async function renderNavButton(){
    const nav = document.querySelector("nav");
    const news = await getNews();
    let categories = ["Todos"];
    news.forEach(notice=>{
        if(!categories.find(category=>category===notice.category)){
            categories.push(notice.category);
        }
    })
    categories.forEach(category=>{
        const button = document.createElement("button");
        button.classList.add("button-grey");
        button.innerText = category;
        button.addEventListener("click",async ()=>{
            setCategory(category);
            renderNews();
        })
        nav.appendChild(button);
    })
}
renderNavButton();

async function filterNews(category){
    const news = await getNews();
    const filteredNews = news.filter(notice=>notice.category===category);
    if(category==="Todos"){
        return news;
    } else{
        return filteredNews;
    }
}


