
    // URL of the API you want to fetch
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

                    commonFeatures.forEach(element => {
                        setOfFeatures.push('<div class="table-cell-2"> <div class="tooltip-text">'+ element +'</div></div>');
                    });

                    // Convert array to string
                    const setToString = setOfFeatures.join('');      
                  
                    div.innerHTML = createHtml(setToString, sortedProducts,commonFeatures);
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
function createHtml(features,products,commonFeatures){
    var html="<div class='pricing-table-wrapper'> <div class= 'pricing-2'>";
    var featuresHtml='<div class="table-cell-2">';
    featuresHtml+='<div class="table-header-2">All Pricing Includes</div>';
    featuresHtml+='<div class="body-text-2 m">  <style> html.w-mod-js *[data-ix="tooltip-hover"], .tooltip-trigger { display: flex !important; }</style>  </div></div>';
    featuresHtml+=features+"</div>";
    html+=featuresHtml;
    html+=products.map(product=>createPlanHtml(product,commonFeatures)).join('');
  

    var endHtml=html+ "</div></div>";
    return endHtml;
}

function createPlanHtml(product,commonFeatures){
    const features=getValuesNotInArray(product.features,commonFeatures);
    var html="<div class='w-layout-grid'><div class='cHQdJ'><label class='sc-gwZsXD gcIrqH'><div class='jlhVkr'>";
    html+='<span class="hemwwv">'+product.name+'</span>';
    html+='<span><span class="sc-eIVEXM dyJMbD">$'+product.prices.setupFee+'<span class="sc-RpuvT ebTNMh"> / Month</span></span>';
    html+='<li class="sc-iipuKH dHKZej"><svg class="sc-bPzAnn flUzcH" fill="currentColor" width="14px" height="10px" viewBox="0 0 14 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title></title><g id="Variant-3" stroke="none" stroke-width="1" fill-rule="evenodd"><path d="M13.6506722,2.00848715 L5.90623037,9.6551278 C5.67389058,9.88453999 5.36890372,10 5.0639168,10 C4.75892988,10 4.45394301,9.88453999 4.22160323,9.6551278 L0.349491416,5.83180748 C-0.116497139,5.37190617 -0.116497139,4.62830919 0.349491416,4.16840789 C0.81526177,3.70829114 1.56813,3.70829114 2.03411855,4.16840789 L5.0639168,7.16002843 L11.9660451,0.345087565 C12.4318154,-0.115029188 13.1846836,-0.115029188 13.6506722,0.345087565 C14.1164426,0.804988866 14.1164426,1.54837039 13.6506722,2.00848715 Z" id="checkmark"></path></g></svg><span class="sc-nUItV fJlsIf"><b class="sc-gsxalj ePltAh">'+`${product.prices.overage.limit} rides / month`+'</b></span></li>';
    html+='<li class="sc-iipuKH dHKZej"><svg class="sc-bPzAnn flUzcH" fill="currentColor" width="14px" height="10px" viewBox="0 0 14 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title></title><g id="Variant-3" stroke="none" stroke-width="1" fill-rule="evenodd"><path d="M13.6506722,2.00848715 L5.90623037,9.6551278 C5.67389058,9.88453999 5.36890372,10 5.0639168,10 C4.75892988,10 4.45394301,9.88453999 4.22160323,9.6551278 L0.349491416,5.83180748 C-0.116497139,5.37190617 -0.116497139,4.62830919 0.349491416,4.16840789 C0.81526177,3.70829114 1.56813,3.70829114 2.03411855,4.16840789 L5.0639168,7.16002843 L11.9660451,0.345087565 C12.4318154,-0.115029188 13.1846836,-0.115029188 13.6506722,0.345087565 C14.1164426,0.804988866 14.1164426,1.54837039 13.6506722,2.00848715 Z" id="checkmark"></path></g></svg><span class="sc-nUItV fJlsIf"><b class="sc-gsxalj ePltAh">'+`Then ${product.prices.overage.fee} / ride`+'</b></span></li>';
    html+='</span>'   
    const featureString=features.map(feature=>buildLiField(feature))
    html+=featureString.join('');
    
    html+='</div></label></div></div>';
    return html;

}

function getValuesNotInArray(arr1, arr2) {
    return arr1.filter(item => arr2.indexOf(item) === -1);
}

function loadCSS(filename) {
    var link = document.createElement("link");
    link.href = filename;
    link.rel = "stylesheet";
    link.type = "text/css";
    document.head.appendChild(link);
}

function buildLiField(liText){
    return '<li class="sc-iipuKH dHKZej"><svg class="sc-bPzAnn flUzcH" fill="currentColor" width="14px" height="10px" viewBox="0 0 14 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title></title><g id="Variant-3" stroke="none" stroke-width="1" fill-rule="evenodd"><path d="M13.6506722,2.00848715 L5.90623037,9.6551278 C5.67389058,9.88453999 5.36890372,10 5.0639168,10 C4.75892988,10 4.45394301,9.88453999 4.22160323,9.6551278 L0.349491416,5.83180748 C-0.116497139,5.37190617 -0.116497139,4.62830919 0.349491416,4.16840789 C0.81526177,3.70829114 1.56813,3.70829114 2.03411855,4.16840789 L5.0639168,7.16002843 L11.9660451,0.345087565 C12.4318154,-0.115029188 13.1846836,-0.115029188 13.6506722,0.345087565 C14.1164426,0.804988866 14.1164426,1.54837039 13.6506722,2.00848715 Z" id="checkmark"></path></g></svg><span class="sc-nUItV fJlsIf"><b class="sc-gsxalj ePltAh">'+liText+'</b></span></li>';
     
}
// Example usage:
loadCSS("css/styles.css");