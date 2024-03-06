const inputField = document.querySelector("form input"),
  thumbArea = document.querySelector(".thumb_area"),
  imgTag = thumbArea.querySelector("img"),
  btnDownload = document.querySelector("button");

console.log(imgTag);

inputField.addEventListener("keyup", () => {
  inputValue = inputField.value;
  thumbArea.classList.add("active");

  if (inputValue.indexOf("https://www.youtube.com/watch?v=") != -1) {
    let videoId = inputValue.split("v=")[1].substring(0, 11);
    let thumbVideo = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    imgTag.src = thumbVideo;
  } else if (inputValue.indexOf("https://youtu.be/") != -1) {
    let videoId = inputValue.split("be/")[1].substring(0, 11);
    let thumbVideo = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    imgTag.src = thumbVideo;
  } else if (inputValue.match(/\.(jpe?g|png|gif|bmp|webp)/i)) {
    imgTag.src = inputValue;
  } else {
    imgTag.src = "";
    thumbArea.classList.remove("active");
  }
});

const dowloadImage = (e) => {
  e.preventDefault();

  btnDownload.innerText = "Downloading...";
  // console.log(inputField.value);
  fetch(inputField.value)
    .then((res) => res.blob())
    .then((image) => {
      // console.log(image);
      const URLImage = URL.createObjectURL(image);
      // console.log(URLImage);
      const link = document.createElement("a");
      link.download = Date.now();
      link.href = URLImage;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(URLImage);
      btnDownload.innerText = "Succes Download Image";
    })
    .catch((err) => {
      // console.log(err);
      alert("dowload Image has been blocked by CORS policy");
      btnDownload.innerText = "Download Thumbnail";
    });
};

btnDownload.addEventListener("click", dowloadImage);
