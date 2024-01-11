const img1 = [
  "06ccad326abd11d5436e52c521bca5b3.jpg",
  "250ac91c2cf16bda5710a13ecf48f651.jpg",
  "3d3c984f35d84e7f06c3f22d014f255f.jpg",
  "5f1c9361cdaeb9e90451c2d0aa6f9f96.jpg",
  "768c3bb9e36edf786d5b49e09e80f564.jpg",
  "7bf9ca61c7af0aa03bab1b653f509e0a.jpg",
  "7e2465be70c242661b66806f5baba862.jpg",
  "90a7ede69605cf05b9a94b81c0cf16ec.jpg",
  "92161906c1b44b4865ea549578decb26.jpg",
  "b372d0c0833887890edadce5965b7711.jpg",
];

const img2 = [
  "b87034e3831eb30bf6b28b79e7aa4c8e.jpg",
  "bdf93349a63d9826c8c02e4509b19442.jpg",
  "c1e8ea17bc90a5b7c4e0367073edb662.jpg",
  "c26bfe6b8979769b286bfa64963e01c3.jpg",
  "c36fa4c0bece81aaae35ec9b69101b5c.jpg",
  "c7f31359d0e2717a54f7bd115b1d146d.jpg",
  "dc5ddc13eefb532ba7938cf872411b82.jpg",
  "e771f6581c14e35ed4e17fc81bf9312e.jpg",
  "f8e44ab7915d4076d8420f315b807566.jpg",
  "fbb9dc3d977ae07599f1a44d40b00111.jpg",
  "fbd1f081e6253fdee9fcc28df4bceba3.jpg",
];

/**
 * 列表数据
 */
const list = [
  {
    id: 1,
    img: img1,
    title: "数据1",
  },
  {
    id: 2,
    img: img2,
    title: "数据2",
  },
];

/**
 * 多少行
 */
const rowNumber = 3;
/**
 * 多少列
 */
const colNumber = 3;
/**
 * 总的多少张
 */
const imgNumber = rowNumber * colNumber;
/**
 * 图多大
 */
const imgSize = 300;
/**
 * 间距
 */
const space = 10;

/**
 * 打开弹窗
 * @param {*} index
 */
function openModal(index) {
  const myDialog = document.getElementById("myDialog");
  myDialog.showModal();
  draw(index);
}

/**
 * 关闭弹窗
 */
function closeModal() {
  const myDialog = document.getElementById("myDialog");
  myDialog.close();
}

/**
 * 画图
 * @param {} index
 */
async function draw(index) {
  var data = list[index];
  /**
   * 切分为 imgNumber 张一组
   */
  const img2dArray = _.chunk(data.img, imgNumber);

  document.querySelector(".img-box").innerHTML = "";
  for (let index = 0; index < img2dArray.length; index++) {
    const element = img2dArray[index];
    const resImg = document.createElement("img");
    resImg.src = await drawImgArrayToBase64(element);
    document.querySelector(".img-box").appendChild(resImg);
  }
}

/**
 * 加载图
 * @param {} src 
 * @returns 
 */
function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = src;

    img.onload = () => {
      if (img.complete) {
        resolve(img);
      }
    };
    img.onerror = (e) => {
      reject(e);
    };
  });
}
/**
 * 绘制图 把多张图绘制在一张图上
 * @param {string[]} imgs
 */
async function drawImgArrayToBase64(imgs) {
  const canvas = document.createElement("canvas");

  canvas.width = imgSize * rowNumber + space * 2;

  canvas.height = imgSize * colNumber + space * 2;
  /**
   * @type {CanvasRenderingContext2D }
   */
  const ctx = canvas.getContext("2d");

  for (let index = 0; index < imgs.length; index++) {
    const row = Math.floor(index / rowNumber); // 行
    const col = index % colNumber; // 列
    var img = await loadImg(imgs[index]);
    ctx.drawImage(
      img,
      col * (imgSize + space),
      row * (imgSize + space),
      imgSize,
      imgSize
    );
  }
  const url = canvas.toDataURL("png");
  return url;
}


/**
 * 初始化
 */
window.onload = () => {
  var ul = document.createElement("ul");
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    var li = document.createElement("li");
    li.innerHTML = `
      <b>${element.title}</b>
      <button data-set="${index}" onclick="openModal(${index})" class="list-btn">打开图集</button>
    `;
    ul.appendChild(li);
  }
  document.body.appendChild(ul);
};
