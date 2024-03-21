// $(document).ready(function() {
//     // URL of the API you want to fetch
    const apiUrl =  'https://api.evertransit.whipclient.io/internal-api/v1/products';
    const username = 'et_signup_client';
    const password = 'TejmcySXPJix2MvaF1k3E0';
    var products = {};
    var base64Credentials = btoa(username + ':' + password);
   
   getProducts=function(){
        return $.ajax({
             url: apiUrl,
             type: "GET",
             dataType: "json",
             headers: {
                 "Authorization": "Basic ZXRfc2lnbnVwX2NsaWVudDpFeHFJOCElNWkrVzMjTTJV"
             },
             success: function(response) {
                 // Handle successful response
                 return response;
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 // Handle error response
                 console.log(errorThrown);
                 return [];
             }
         });
     };    
//      function addContentToDiv() {
//         var div = document.getElementById("dynamic_pricing");
//         // Check if the div exists
//         if (div) {
//             // Add content to the div
//             getProducts().then((data)=>
//              {
//                 const text= JSON.stringify(data, null, 2);
//                 div.innerHTML = text;
//             });
           
//         } else {
//             console.error("Div not found.");
//         }
//     }
//     // Call the function to add content on page load
//     addContentToDiv();

// });


document.addEventListener("DOMContentLoaded", function() {
    // Function to add content to the div
    function addContentToDiv() {
        var div = document.getElementById("dynamic_pricing");
        // Check if the div exists
        if (div) {
            // Add content to the div
            div.innerHTML = "New content added to the div!";
        } else {
            console.error("Div not found.");
        }
    }

    // Call the function to add content on page load
    addContentToDiv();
});