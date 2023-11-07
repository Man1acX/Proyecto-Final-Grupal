import {apiKey} from ("./apikey");

const submitEl = document.getElementById("submit-btn");
const loaderEl = document.querySelector(".loader");
const wrapperEl = document.querySelector(".wrapper");
const dataEl = document.getElementById("search-box");

const generarGif = () => {
    loaderEl.style.display = "block";
    wrapperEl.style.display = "none";

    const dato = dataEl.value;
    const Count = 50;

    const URL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${dato}&limit=${Count}&offset=0&rating=g&lang=en`;
    document.querySelector(".wrapper").innerHTML = "";

    fetch(URL)
        .then((Response) => Response.json())
        .then((info) => {
            console.log(info.data);
            const dataGif = info.data;
            dataGif.forEach((gif) => {
                const container = document.createElement("div");
                container.classList.add("container");

                const image = document.createElement("img");
                console.log(gif);

                image.setAttribute("src", gif.image.downsized_medium.url);
                image.onload = () => {
                    Count--;
                    if(Count == 0){
                        loaderEl.style.display = "none";
                        document.querySelector("wrapper").style.display = "grid";
                    }
                };
                container.append(image);


                const copiar = document.createElement("button");
                copiar.innerText = "Copy";
                copiar.onclick = () => {

                    const copyurl = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;

                    navigator.clipboard
                        .writeText(copyurl)
                        .then(() => {
                            alert("Gif copied to clipboard");
                        })
                        .catch(() => {
                            alert("Gif copied to clipboard");

                            const hiddenInput = document.createElement("input");
                            hiddenInput.setAttribute("type", "text");
                            document.body.appendChild(hiddenInput);
                            hiddenInput.value = copyurl;
                            hiddenInput.select();
                            document.execCommand("copy");
                            document.body.removeChild(hiddenInput);
                        });
                };
                container.append(copiar);
                document.querySelector(".wrapper").append(container);
            });
        });
};

submitEl.addEventListener("click", generarGif);
window.addEventListener("load", generarGif);

