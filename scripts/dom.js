import { setPostId } from "./localStorage.js";

export function createNewsElement(notice){
    const {title, description, image, id} = notice;
    const post = document.createElement("li");
    post.classList.add("post");
    post.id = id;
    post.insertAdjacentHTML("afterbegin",`
        <img src=${image} alt=${title}>
        <h2 class="font-3-semibold">${title}</h2>
        <p class="font-4-regular grey-200">${description}</p>          
    `);
    const anchor = document.createElement("a");
    anchor.className = "font-4-semibold brand-100"
    anchor.innerText = "Acessar conteúdo"
    anchor.addEventListener("click",(event)=>{
        setPostId(id);
        localStorage.removeItem("@Living:category");
        window.location.replace("/pages/post/index.html");
    });
    post.appendChild(anchor);
    return post;
}

export function createFullNewsElement(notice){
    const {title, description, image, content} = notice;
    const post = document.createElement("section");
    post.classList.add("fullPost");
    post.insertAdjacentHTML("afterbegin",`
        <header>
            <div class="container">
                <h2 class="font-1-semibold">${title}</h2>
                <p class="font-4-regular grey-200">${description}</p>
            </div>  
        </header>
        <div class="container">
            <img src=${image} alt="${title}">
            <p class="font-4-regular grey-200">${content}</p>            
        </div>         
    `);
    return post;
}




{/* <section class="fullPost">
            <header>
                <div class="container">
                    <h2>Cuidados para manter com plantas dentro de apartamentos</h2>
                    <p>Invite as many collaborators as you’d like. They can register as team members or join as guests – no registration required.</p>
                </div>  
            </header>
            <div class="container">
                <img src="/assets/logoTop.png" alt="">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                        
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>            
            </div>        
        </section> */}