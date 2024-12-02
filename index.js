let data = [];

//串接資料並存放
function getData(){
  axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
  .then(function(response){
    data = response.data.data;
    renderTicketArea(data);
  })
  .catch(function(error){
    console.log(error);
  });
};

//資料與介面綁定
let ticketCardArea = document.querySelector('.ticketCard-area');

function init(){
  getData();
};

init();

function renderTicketArea(data){
  let ticketCardContent = "";
  data.forEach(function(item){
    ticketCardContent += `
              <li class="ticketCard">
              <div class="ticketCard-img">
                <a href="#">
                  <img src=${item.imgUrl} alt="">
                </a>
                <div class="ticketCard-region">${item.area}</div>
                <div class="ticketCard-rank">${item.rate}</div>
              </div>
              <div class="ticketCard-content">
                <div>
                  <h3>
                    <a href="#" class="ticketCard-name">${item.name}</a>
                  </h3>
                  <p class="ticketCard-description">
                    ${item.description}
                  </p>
                </div>
                <div class="ticketCard-info">
                  <p class="ticketCard-num">
                    <span><i class="fas fa-exclamation-circle"></i></span>
                    剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                  </p>
                  <p class="ticketCard-price">
                    TWD <span id="ticketCard-price">$${item.price}</span>
                  </p>
                </div>
              </div>
            </li>
    `
  });
  
  ticketCardArea.innerHTML = ticketCardContent;
};

// 篩選資料
const selectRegion = document.querySelector('.regionSearch');
const cantFind = document.querySelector('.cantFind-area');
const searchResultText = document.querySelector("#searchResult-text");
selectRegion.addEventListener("change", renderSelectTicket);

function renderSelectTicket (e){
  let selectData = [];
  data.forEach(function (item){
    if(e.target.value == item.area){
      selectData.push(item);
    }else if(e.target.value == "全部地區"){
      selectData.push(item);
    };
    });
  searchResultText.innerHTML = `本次搜尋共${selectData.length}筆資料`
  if( selectData.length == 0){
    cantFind.style.display= "block";
    renderTicketArea(selectData);
  }else{
    cantFind.style.display= "none";
    renderTicketArea(selectData);
  }
};

// 新增資料
const ticketName = document.querySelector('#ticketName');
const ticketImgUrl = document.querySelector('#ticketImgUrl');
const ticketRegion = document.querySelector('#ticketRegion');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketNum = document.querySelector('#ticketNum');
const ticketRate = document.querySelector('#ticketRate');
const ticketDescription = document.querySelector('#ticketDescription');
const addTicketBtn = document.querySelector('.addTicket-btn');
addTicketBtn.addEventListener("click", addTicket);

function addTicket(e){
  e.preventDefault();
  let newTicketObj = {};
  newTicketObj.id = data.length;
  newTicketObj.name = ticketName.value;
  newTicketObj.imgUrl = ticketImgUrl.value;
  newTicketObj.area = ticketRegion.value;
  newTicketObj.description = ticketDescription.value;
  newTicketObj.group = ticketNum.value;
  newTicketObj.price = ticketPrice.value;
  newTicketObj.rate = ticketRate.value;
  data.push(newTicketObj);
  renderTicketArea(data);
  [ticketName ,ticketImgUrl, ticketRegion, ticketDescription, ticketNum, ticketPrice, ticketRate].forEach(input => input.value = "");
};
