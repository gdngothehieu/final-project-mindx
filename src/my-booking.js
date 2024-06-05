const getBooking = () => {
    const nights = JSON.parse(localStorage.getItem("booking"));

    const booking = JSON.parse(localStorage.getItem("bookings"));
    if(booking){
        document.getElementById("booking-list").innerHTML += ` <div class="card booking-item" >
        <img src="../images/mindx.jpg" alt="">
        <p style="width: 25%;">
            <b>Tên:</b>
            ${booking.title} 
        </p>
    <p style="width: 25%;">
        <b>Chi tiết::</b>
        ${nights.nights} đêm, ${nights.adults} người, ${nights.children} trẻ em
    </p>
    <p style="width: 25%;">
        <b>Tổng cộng:</b> ${Number(nights.nights || 1) * Number(nights.adults || 1) * Number(booking.price)} VND
    </p>
    <button id="booking-${booking.i}" class="btn btn-danger" onclick="xoaBooking(${booking.i})" style="margin-top: 5%;">Xóa mã đặt chỗ</button>
    `
    } else {
        document.getElementById("booking-list").innerHTML += "<div style='margin-left:20px;'><b>Bạn chưa có mã đặt phòng nào</b></div>";
    }


 window.xoaBooking = (i) => {
    console.log(i);
    localStorage.removeItem("bookings");
    document.getElementById("booking-list").innerHTML =``
    getBooking();
 }
}

getBooking();