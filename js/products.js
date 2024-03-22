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
            getProducts().then((data)=>
                {
                    const setOfFeatures = new Set()
                    const sortedProducts = data.sort(
                        (a, b) => a.prices.recurringFee - b.prices.recurringFee,
                    );
                    const products= JSON.stringify(sortedProducts, null, 2);
                   
                    data.map(obj=>obj.features).forEach(element => {
                        element.forEach(text=>setOfFeatures.add('<div class="table-cell-2"> <div class="tooltip-text">'+ text +'</div></div>'))
                    });
                    // Convert Set to an array using spread operator
                    const setToArray = [...setOfFeatures];

                    // Convert array to string
                    const setToString = setToArray.join('');      
                    console.log(setToString) 
                    div.innerHTML = createHtml(setToString, products);
                });
            // Add content to the div
            div.innerHTML = "New content added to the div!";
        } else {
            console.error("Div not found.");
        }
    }

    // Call the function to add content on page load
    addContentToDiv();
});

function createHtml(features,data){
    var html="<div class='pricing-table-wrapper'> <div class='w-layout-grid pricing-2'>";
    var featuresHtml='<div class="table-cell-2">';
    featuresHtml+='<div class="price-title table-header-2">Subscription</div>';
    featuresHtml+='<div class="w-embed">  <style> html.w-mod-js *[data-ix="tooltip-hover"], .tooltip-trigger { display: flex !important; }</style>  </div></div>';
    featuresHtml+=features;
    html+=featuresHtml;
    var endHtml=html+ "</div></div>";
    return endHtml;
}