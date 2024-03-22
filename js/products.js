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



document.addEventListener("DOMContentLoaded", function() {
    // Function to add content to the div
    function addContentToDiv() {
        var div = document.getElementById("dynamic_pricing");
        // Check if the div exists
        if (div) {
            getProducts().then((data)=>
                {
                    const setOfFeatures =[];
                    const sortedProducts = data.sort(
                        (a, b) => a.prices.recurringFee - b.prices.recurringFee,
                    );
                    const products= JSON.stringify(sortedProducts, null, 2);
                   
                  
                    const arraysOfFeatures = data.map(obj => obj.features);

                    const commonFeatures = findCommonFeatures(arraysOfFeatures);

                    console.log(commonFeatures) 

                    commonFeatures.forEach(element => {
                        setOfFeatures.push('<div class="table-cell-2"> <div class="tooltip-text">'+ element +'</div></div>');
                    });

                    // Convert array to string
                    const setToString = setOfFeatures.join('');      
                  
                    div.innerHTML = createHtml(commonFeatures, products);
                });
            
        } else {
            console.error("Div not found.");
        }
    }

    // Call the function to add content on page load
    addContentToDiv();
});
function findCommonFeatures(arrays) {
    return arrays.reduce((accumulator, currentValue) => {
        return accumulator.filter(value => currentValue.includes(value));
    });
}
function createHtml(features,data){
    var html="<div class='pricing-table-wrapper'> <div class='pricing-2 width:20%; '>";
    var featuresHtml='<div class="table-cell-2">';
    featuresHtml+='<div class="table-header-2">All Pricing Includes</div>';
    featuresHtml+='<div class="w-embed">  <style> html.w-mod-js *[data-ix="tooltip-hover"], .tooltip-trigger { display: flex !important; }</style>  </div></div>';
    featuresHtml+=features;
    html+=featuresHtml;
    var endHtml=html+ "</div><div></div></div>";
    return endHtml;
}

function createPlanHtml(){

}