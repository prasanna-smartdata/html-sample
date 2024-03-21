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