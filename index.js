import{mindXHotel,cities} from './constant.js'
const paginator = 2;
const findHotel = () => {
    let searchCity = document.getElementById("search-input").value;
    let filterMindXHotel = []
    document.getElementById("card-list").innerHTML = ``;
    const validateDate = () => {
        
        let checkinDate = document.getElementById("check-in").value;
        let checkoutDate = document.getElementById("check-out").value;
        console.log(Date.parse(checkinDate),Date.parse(checkoutDate));
        if(Date.parse(checkinDate) > Date.parse(checkoutDate)){
            alert("Checkout date must be larger than check in")
        }
    } 
    validateDate();
    for(const hotel of mindXHotel){
        let location = hotel.location;
        if(location.toLowerCase() === searchCity.toLowerCase()){
             filterMindXHotel.push(hotel);
            document.getElementById("card-list").innerHTML += addHTML(hotel.title,hotel.location,hotel.facilities,hotel.review,hotel.availability,hotel.price)



        }


    }
    if(!filterMindXHotel.length){
        showHotels();
    }
}

const bookRoom = () => {
    alert("abc")
}

const login = () => {
    let username = document.getElementById("email-form").value;
    let password = document.getElementById("password-form").value;
    alert(username)
    alert(password)
}
const addHTML = (i,title,location,facilities, review,availability, price) => {
    const hotelCard =  `  
        
    <div class="card-section m-2">

    <div style="width:300px;">
    </div>
    <div class="card-section button-pointer">

        <div class="card">
            <div class="title-review">
                <div style="width: 15%;">
                    
                <img src="" alt=""/>
                <img src="" alt=""/>
                <img src="" alt=""/>
                <img src="" alt=""/>
                    
                </div>
                <div>
                <div style="width: 400px;">
                    <h5>${title}</h5>
                    <p>${location}</p>
                    <div>
                        ${facilities}
                    </div>
                    <div>Available: ${availability} </div>
                </div>
                <div style="width: 20%;">
                    <p>${review}</p>
                </div>
                
            </div>
            
    <div class="price">
    <p>Price: ${price} VND</p>
    <div id="book-room">
    <button  class="btn btn-danger" onclick="{
        alert(${i});
}" >Đặt phòng</button>
    </div>

</div>
        </div>
    
        </div>
        
    </div>
    </div>`
    // const filterCard =    `      <div class="filter-card">
    //                 <h4> Popular filter for </h4>
    //                 <span class="fa fa-star checked"></span>
    //                 <span class="fa fa-star checked"></span>
    //                 <span class="fa fa-star checked"></span>
    //                 <span class="fa fa-star"></span>
    //                 <span class="fa fa-star"></span>
    //             </div>`
    if(i===0){
        // return filterCard + hotelCard
        return hotelCard;

    } else {
        return hotelCard;
    }
            
}


const filterHotel = {

}

const showHotels = () => {
    for(let i = 0 ; i < mindXHotel.length; i++){
        let hotel = mindXHotel[i];
        document.getElementById("card-list").innerHTML += addHTML(i,hotel.title,hotel.location,hotel.facilities,hotel.review,hotel.availability,hotel.price);
    }
}
showHotels();

document.getElementById("find-hotel").addEventListener("click",findHotel);
document.getElementById("login-user").addEventListener("click",login);