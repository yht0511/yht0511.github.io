var Html = document.getElementsByTagName("html")[0];
Html.lang = "zh-CN";
var Body = document.getElementsByTagName("body")[0];
var mask_div = document.createElement("div");
mask_div.setAttribute("id", "mask");
mask_div.style.position = "fixed";
mask_div.style.top = "0";
mask_div.style.zIndex = 2000;
mask_div.style.width = "100%";
mask_div.style.height = "400%";
mask_div.style.color = "#8f8f8f";
mask_div.style.fontSize = "20px";
mask_div.style.fontWeight = "1000";
mask_div.style.lineHeight = "30px";
mask_div.style.fontFamily = "Microsoft Yahei";
mask_div.style.padding = "20px";
mask_div.style.backgroundColor = "#000084";
mask_div.innerText = "\n\n正在加载文字...";

var text_div = document.createElement("div");
text_div.innerHTML = "Loading...";
text_div.style.fontWeight = "1000";
text_div.style.position = "fixed";
text_div.style.top = "20px";
text_div.style.left = "20px";
text_div.style.fontSize = "60px";
text_div.style.color = "#8f8f8f";
text_div.style.zIndex = 2001;
Body.appendChild(text_div);

var progress_div = document.createElement("div");
progress_div.style.position = "fixed";
progress_div.style.top = document.documentElement.clientHeight * 0.475 + "px";
progress_div.style.left = document.documentElement.clientWidth * 0.325 + "px";
progress_div.style.backgroundColor = "rgba(255,255,255,0.5)";
progress_div.style.width = document.documentElement.clientWidth * 0.35 + "px";
progress_div.style.height = "5%";
progress_div.style.borderRadius =
  document.documentElement.clientHeight / 2 + "px";

var progress_mask = document.createElement("div");
progress_mask.style.backgroundColor = "rgba(0,100,132,0.7)";
progress_mask.style.borderRadius =
  document.documentElement.clientHeight / 2 + "px";
progress_mask.style.width = "0%";
progress_mask.style.height = "100%";
Body.appendChild(mask_div);
//加载完成
var imgs;
document.onreadystatechange = function Load_ok() {
  switch (document.readyState) {
    case "interactive":
      console.log("interactive");
      imgs = document.getElementsByTagName("img");
      for (i in imgs) {
        imgs[i].onload = function img_load_ok() {
          console.log("load ok!");
          add_progress();
        };
      }
      if (imgs.length > 0) {
        mask_div.innerText += "\n正在加载图片...";
        progress_div.appendChild(progress_mask);
        mask_div.appendChild(progress_div);
      }
      break;
    case "complete":
      console.log("complete.");
      mask_div.innerText += "\n完成!";
      if (imgs.length > 0)
        setTimeout(function () {
          mask.style.display = "none";
          text_div.style.display = "none";
        }, 500);
      else {
        mask.style.display = "none";
        text_div.style.display = "none";
      }
      break;
  }
};
function add_progress() {
  var value = progress_mask.style.width;
  value = value.substr(0, value.length - 1);
  value = parseFloat(value);
  value += 100 / imgs.length;
  // value = parseInt(value);
  progress_mask.style.width = value + "%";
  console.log("value:" + value);
}
//处理滚动

Body.onscroll = function Handle_scroll() {
  console.log("scroll!");
};

//处理宽度

function Handle_screen_size() {
  divs = document.getElementsByTagName("div");
  for (i in divs) {
    if (divs[i].className == "col-md-3") {
      var col3 = divs[i];
    }
  }
  if (document.documentElement.clientWidth < 992) {
    col3.style.display = "none";
  } else {
    col3.style.display = "inline-block";
  }
}
Handle_screen_size();
window.addEventListener("resize", Handle_screen_size);

// 加载完以后,增添复制按钮
Body.onload = after_loaded;

function after_loaded() {
  pres = document.getElementsByTagName("pre");
  for (i in pres) {
    if (pres[i].style != undefined) {
      pres[i].id = "pre_" + i;

      pres[i].style.position = "relative";
      var copy_div = document.createElement("a");
      copy_div.className = "copy_div";
      copy_div.id = "copy_div_" + i;
      copy_div.style.fontFamily = "icomoon";
      copy_div.style.fontSize = "30px";
      copy_div.innerText = "";
      copy_div.style.position = "absolute";
      copy_div.style.top = "0px";
      copy_div.style.right = "0px";
      copy_div.style.marginTop = "10px";
      copy_div.style.visibility = "hidden";
      pres[i].appendChild(copy_div);
      // copy_div.style.visibility = "visible";
      pres[i].setAttribute(
        "onmouseover",
        "document.getElementById('copy_div_" +
          i +
          "').style.visibility = 'visible';"
      );
      pres[i].setAttribute(
        "onmouseout",
        "document.getElementById('copy_div_" +
          i +
          "').style.visibility = 'hidden';"
      );
      var k = 2;
      copy_div.setAttribute(
        "onclick",
        "console.log('copy_div_" +
          i +
          "');\
          var input = document.createElement('textarea');\
          input.setAttribute('readonly', 'readonly');\
          input.value=document.getElementById('pre_" +
          i +
          "').children[0].innerText;\
          document.body.appendChild(input);\
          input.select();\
          document.execCommand('Copy');\
          document.body.removeChild(input);\
          after_copied()"
      );
    }
  }
}

function after_copied() {
  var copied_div = document.createElement("div");
  copied_div.style.backgroundColor = "rgba(255,255,255,.7)";
  copied_div.style.width = "15%";
  copied_div.style.height = "6%";
  copied_div.style.borderRadius = "10px";
  copied_div.style.position = "fixed";
  copied_div.style.top = "-6%";
  copied_div.style.left = document.documentElement.clientWidth * 0.425+'px';
  copied_div.style.zIndex = "3000";
  copied_div.style.fontSize = "25px";
  copied_div.style.color = "rgba(0,0,255,1)";
  copied_div.style.textAlign = "center";
  copied_div.style.fontWeight = 1000;
  copied_div.style.transition = "all 0.5s";
  copied_div.style.lineHeight =
    document.documentElement.clientHeight * 0.06 + "px";
  copied_div.style.fontFamily = "icomoon";
  copied_div.innerText = " Copied";
  Body.appendChild(copied_div);
  
  setTimeout(function () {
    copied_div.style.top = "0px";
  }, 1);
  setTimeout(function () {
    copied_div.style.top = "-6%";
  }, 3000);
  setTimeout(function () {
    document.body.removeChild(copied_div);
  }, 3500);
}
