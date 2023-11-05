
function onPageLoadFunc() {
    // alert("Hey User ! Do You really want to share IP Address with Us?")

    // accessing the IP Address by fetching the API
    $.getJSON("https://api.ipify.org/?format=json", function (data) {
        $(".IPAddress").html(data.ip)
    })

}
function getStartedFunc() {
    $.getJSON(`https://ipapi.co/json/`, (data) => {
        console.log("start")
        console.log(data)
        $("#city").html(data.city);
        $("#region").html(data.region);
        $("#host").html(data.asn);
        $("#org").html(data.org);
        $("#timezone").html(data.timezone);
        $("#pincode").html(data.postal)

        // $("#msg").html(data.postal.value);




        if ("geolocation" in navigator) {
            // alert to show whether user want to share location or not
            alert(" Do you want to share your location? ")
            // accessing the location by using in-built methods
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // getting the user's lat and long
                    let lat = position.coords.latitude;
                    let long = position.coords.longitude;
                    // console.log(`Latitude:${lat} & Longtitude t6: ${long}`)
                    let bottom = document.getElementById("bottom-section");
                    bottom.innerHTML = `<h1 style="margin-bottom:30px">Your Current Location</h1>`
                    let center = document.getElementById("center")
                    center.innerHTML = `
                <iframe src="https://maps.google.com/maps?q=${lat}, ${long}&output=embed" width="800" height="400" frameborder="0" style="margin-bottom:30px"
                ></iframe>`
                    document.getElementById("spanLat").innerText = `${lat}`
                    document.getElementById("spanLong").innerText = `${long}`
                    let dateobj = new Date();
                    document.getElementById("date-time").innerHTML = dateobj
                    let pin = data.postal;
                    console.log(pin)
                    getPostDetails(pin)
                },
            )
        }
    })


}

function getPostDetails(pin) {
    setTimeout(() => {
        fetch(`https://api.postalpincode.in/pincode/${pin}`)
            .then(res => res.json())
            .then(data => {
                // console.log('postal data')
                console.log(data);
                const postOffice = data[0].PostOffice;
                const gridContainer = document.querySelector(".grid-container");
                postOffice.forEach(elem => {
                    gridContainer.innerHTML += `
        <div class="grid-item">
        <h3>Name : <span>${elem.Name}</span> </h3>
        <h3>Branch Type : <span>${elem.BranchType}</span> </h3>
        <h3>Delivery Status : <span>${elem.DeliveryStatus}</span> </h3>
        <h3>District : <span>${elem.District}</span> </h3>
        <h3>Division : <span>${elem.Division}</span> </h3>
    </div>`; 
                });
                document.getElementById('noOfPost').innerHTML = data[0].Message;
               
                console.log('mess')
                console.log(data[0].Message);
            })

            .catch(err => console.log(err));
            }, 500);

    }

    function searchPost(){
        let input = document.getElementById('search-input');
        let filter = input.value.toUpperCase();
        let detail = document.querySelector(".grid-container");
        let postData = detail.getElementsByClassName("grid-item");
        console.log(postData);
        for(i=0;i<postData.length;i++){
            console.log(postData[i])
            a = postData[i].getElementsByTagName("span")[0]
            // console.log("a")
            // console.log(a)
            let txtvalue = a.textContent || a.innerText;
            if(txtvalue.toUpperCase().indexOf(filter)>-1){
                postData[i].style.display ="";
            }
            else{
                postData[i].style.display ="none";
            }
        }
    }