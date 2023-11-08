const submitBtn = document.getElementById("submit-btn");

const generateGif = () => {

  const loader = document.querySelector(".loader");
  loader.style.display = "block";
  document.querySelector(".wrapper").style.display = "none";


  const q = document.getElementById("search-box").value;

  let gifCount = 50;

  const finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;
  document.querySelector(".wrapper").innerHTML = "";


  fetch(finalURL)
    .then((resp) => resp.json())
    .then((info) => {
      console.log(info.data);

      const gifsData = info.data;
      gifsData.forEach((gif) => {

        const container = document.createElement("div");
        container.classList.add("container");
        const iframe = document.createElement("img");
        console.log(gif);
        iframe.setAttribute("src", gif.images.downsized_medium.url);
        iframe.onload = () => {

          gifCount--;
          if (gifCount == 0) {

            loader.style.display = "none";
            document.querySelector(".wrapper").style.display = "grid";
          }
        };
        container.append(iframe);


        const copyBtn = document.createElement("button");
        copyBtn.innerText = "Copy Link";
        copyBtn.onclick = () => {

          const copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;

          navigator.clipboard
            .writeText(copyLink)
            .then(() => {
              alert("GIF copied to clipboard");
            })
            .catch(() => {

              alert("GIF copied to clipboard");

              const hiddenInput = document.createElement("input");
              hiddenInput.setAttribute("type", "text");
              document.body.appendChild(hiddenInput);
              hiddenInput.value = copyLink;

              hiddenInput.select();

              document.execCommand("copy");

              document.body.removeChild(hiddenInput);
            });
        };
        container.append(copyBtn);
        document.querySelector(".wrapper").append(container);
      });
    });
};

submitBtn.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);