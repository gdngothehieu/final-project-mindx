import{mindXHotel,cities} from './constant.js'
const paginator = 2;
let page = 1;
const findHotel = () => {
    let searchCity = document.getElementById("search-input").value;
    document.getElementById("card-list").innerHTML = ``;
    let filterMindXHotel = [];
    let checkinDate = document.getElementById("check-in").value;
    if(!checkinDate){
        document.getElementById("check-in").style.border = "3px solid red";
        return;
    }
    
  
    document.getElementById("check-in").style.border = "3px solid green";

    for(let i = 0 ; i < mindXHotel.length ; i++){
        let hotel = mindXHotel[i];
        let location = hotel.location;
        let patternHotelName = new RegExp(searchCity)
        console.log(patternHotelName,location,  patternHotelName.test(location.toLowerCase())      );
        if(
            (patternHotelName.test(location.toLowerCase()) ) || location.toLowerCase() === searchCity.toLowerCase()
        && new Date(checkinDate).getTime() >     new Date(hotel.availability).getTime() 
    ){
             filterMindXHotel.push(hotel);
            document.getElementById("card-list").innerHTML += addHTML(i,hotel.address,hotel.title,hotel.location,hotel.facilities,hotel.review,hotel.availability,hotel.price)
        }
    }
    // if(!filterMindXHotel.length){
    //     showHotels();
    // }
}

const bookRoom = () => {
    alert("abc")
}




const addHTML = (i,address,title,location,facilities, review,availability, price) => {
    let booking = {i,address,title,location,facilities, review,availability, price};
   
    const hotelCard =  `  
        
    <div class="card-section m-2">
 
    <div style="width:300px;">
    </div>
    <div class="card-section button-pointer">

        <div class="card">
            <div class="title-review">
                <div style="width: 200px;height:200px;">
                    
                <img src="./images/mindx.jpg" style="width:150px;height:125px" alt=""/>
                
                <img src="./images/mindx.jpg" style="width:50px;height:50px;margin-left: 15px" alt=""/>

                <img src="./images/mindx.jpg" style="width:50px;height:50px"  alt=""/>
                
                    
                </div>
                <div>
                <div style="width: 300px;">
                    <h5>${title}</h5>
                    <p><b>Thành phố: </b> ${location}</p>
                    <p><b>Địa chỉ: </b> ${address}</p>
                    <div id="facilities-list">
                        ${(function facile(){
                            let facilitiesList =``;
                            for(let i = 0 ; i < facilities.length; i++){
                                 facilitiesList +=`<div class="facilities">${facilities[i]} </div> `

                            }
                            return facilitiesList;
                        })()}
                        </div>
                    <div><b>Có phòng ngày:</b> ${availability} </div>
                </div>
                <div style="width: 100px;">
                    <p><b>Đánh giá: </b>${review } </p>
                </div>
                
            </div>
            
    <div class="price">
    <p>Giá: ${price} VND / đêm</p>
    <div id="book-room">
  ${        localStorage.getItem("user", JSON.stringify(booking))?  `<button  class="btn btn-primary" onclick="abc()" >Đặt phòng</button>` : ``}
    </div>

</div>
        </div>
    
        </div>
        
    </div>
    </div>`
    window.abc = () => {
        alert("Bạn đã đặt phòng thành công!")
        localStorage.setItem("bookings", JSON.stringify(booking));
        };
        return hotelCard;
            
}


const loading = ()=>{
    localStorage.getItem("user")
        page = Math.floor(mindXHotel.length/paginator);
    
}

const logout = () => {
    localStorage.removeItem("user");
    document.getElementById("my-booking-tag").style.display = `none`;
    document.getElementById("card-list").innerHTML = ``;
    reload();
}
const showHotels = () => {
    for(let i = 0 ; i < mindXHotel.length; i++){
        let hotel = mindXHotel[i];
        document.getElementById("card-list").innerHTML += addHTML(i,hotel.address,hotel.title,hotel.location,hotel.facilities,hotel.review,hotel.availability,hotel.price);
    }
}
// showHotels();
loading();
const login = () => {
    let username = document.getElementById("email-form").value;
    let password = document.getElementById("password-form").value;
    document.getElementById("card-list").innerHTML = ``
    if(!username || !password){
        if(!username){
            let username = document.getElementById("email-form").style.borderColor = "red";
        }
        if(!password){
            let password = document.getElementById("password-form").style.borderColor = "red";
        }
        return;
    }
    document.getElementById("email-form").style.borderColor = "green";

    document.getElementById("password-form").style.borderColor = "green";

    localStorage.setItem("user", JSON.stringify({username, password}));
    reload()
}
const addNights = () => {
    let nights = document.getElementById("nights-count").value || 1;
    let adults = document.getElementById("adults-count").value || 0;
    let children = document.getElementById("children-count").value || 0 ;
    localStorage.setItem("booking", JSON.stringify({nights, adults, children}) ) 
}

const reload= ()=>{

    let validation = JSON.parse(localStorage.getItem("user") || null) ;
    if(validation){
        document.getElementById("login-button").style.display = "none"
        // document.getElementById("sign-up-button").style.display = "none"
        document.getElementById("left-top-bar").innerHTML += `<div>${validation.username}</div>`
        document.getElementById("log-out-button").style.display = "flex"
        document.getElementById("my-booking-tag").style.display = "flex"
    } else {
        document.getElementById("login-button").style.display = "flex"
        // document.getElementById("sign-up-button").style.display = "flex"
        document.getElementById("left-top-bar").innerHTML =``
        document.getElementById("log-out-button").style.display = "none"


    }
}
if(document.getElementById("find-hotel")){
    document.getElementById("find-hotel").addEventListener("click",findHotel);  
}

document.getElementById("login-user").addEventListener("click",login);
document.getElementById("login-user-modal").addEventListener("click",addNights);
document.getElementById("log-out-button").addEventListener("click",logout);

reload();