// URL of the API you want to fetch
const apiUrl = 'https://api.evertransit.whipclient.io/internal-api/v1/products'
const username = 'et_signup_client'
const password = 'TejmcySXPJix2MvaF1k3E0'
var products = {}
var base64Credentials = btoa(username + ':' + password)

getProducts = function () {
  return $.ajax({
    url: apiUrl,
    type: 'GET',
    dataType: 'json',
    headers: {
      Authorization: 'Basic ZXRfc2lnbnVwX2NsaWVudDpFeHFJOCElNWkrVzMjTTJV'
    },
    success: function (response) {
      // Handle successful response
      return response
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // Handle error response
      console.log(errorThrown)
      return []
    }
  })
}

document.addEventListener('DOMContentLoaded', function () {
  // Function to add content to the div
  function addContentToDiv () {
    var div = document.getElementById('dynamic_pricing')
    // Check if the div exists
    if (div) {
      getProducts().then(data => {
        const setOfFeatures = []
        const sortedProducts = data.sort(
          (a, b) => a.prices.recurringFee - b.prices.recurringFee
        )
        const products = JSON.stringify(sortedProducts, null, 2)
        const arraysOfFeatures = data.map(obj => obj.features)

        const commonFeatures = findCommonFeatures(arraysOfFeatures)

        commonFeatures.forEach(element => {
          setOfFeatures.push(
            '<li class="sc-iipuKH dHKZej"><svg class="sc-bPzAnn flUzcH" fill="currentColor" width="14px" height="10px" viewBox="0 0 14 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title></title><g id="Variant-3" stroke="none" stroke-width="1" fill-rule="evenodd"><path d="M13.6506722,2.00848715 L5.90623037,9.6551278 C5.67389058,9.88453999 5.36890372,10 5.0639168,10 C4.75892988,10 4.45394301,9.88453999 4.22160323,9.6551278 L0.349491416,5.83180748 C-0.116497139,5.37190617 -0.116497139,4.62830919 0.349491416,4.16840789 C0.81526177,3.70829114 1.56813,3.70829114 2.03411855,4.16840789 L5.0639168,7.16002843 L11.9660451,0.345087565 C12.4318154,-0.115029188 13.1846836,-0.115029188 13.6506722,0.345087565 C14.1164426,0.804988866 14.1164426,1.54837039 13.6506722,2.00848715 Z" id="checkmark"></path></g></svg><span class="sc-nUItV fJlsIf"><b class="sc-gsxalj ePltAh">' +
              `${element}` +
              '</b></span></li>'
          )
        })

        // Convert array to string
        const setToString = setOfFeatures.join('')

        div.innerHTML = createHtml(setToString, sortedProducts, commonFeatures)
        hideElement('leftButton')
      })
    } else {
      console.error('Div not found.')
    }
  }

  // Call the function to add content on page load
  addContentToDiv()
})
function findCommonFeatures (arrays) {
  return arrays.reduce((accumulator, currentValue) => {
    return accumulator.filter(value => currentValue.includes(value))
  })
}
function createHtml (features, products, commonFeatures) {
  var html = "<div class='pricing-table-wrapper flex-container'>"

  html +=
    '<div class="card-game__cards"><button class="left scrollbutton" id="leftButton" onclick="leftScroll(event)">&lt;</button><ul class="card-game__cards-list">' +
    products
      .map((product, index) => createPlanHtml(index, product, commonFeatures))
      .join('') +
    '</ul> <button class="right scrollbutton" id="rightButton" onclick="rightScroll(event);">&gt;</button></div>'
  var endHtml = html + '</div>'
  return endHtml
}

function createPlanHtml (index, product, commonFeatures) {
  const features = getValuesNotInArray(product.features, commonFeatures)
  var html =
    "<div class='cHQdJ'><label class='sc-gwZsXD gcIrqH' style='height: 100%;'><div class='jlhVkr'>"
  html += '<span class="sc-jjgyjb hemwwv">' + product.name + '</span>'
  html +=
    '<span><span class="sc-eIVEXM dyJMbD">$' +
    product.prices.recurringFee +
    '<span class="sc-RpuvT ebTNMh"> / Month</span></span>'

  html += '</span><div class="features">Features</div>'
  const featureString =
    index === 0
      ? commonFeatures.map(feature => buildLiField(feature))
      : features.map(feature => buildLiField(feature))
  html +=
    index === 0
      ? featureString.join('')
      : '<div class="features-text">Everything in Starter,Plus :</div>' +
        featureString.join('')
  html += '<div class="horizontal-line"></div>'
  html +=
    '<li class="sc-iipuKH dHKZej"><svg class="sc-bPzAnn flUzcH" fill="currentColor" width="14px" height="10px" viewBox="0 0 14 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title></title><g id="Variant-3" stroke="none" stroke-width="1" fill-rule="evenodd"><path d="M13.6506722,2.00848715 L5.90623037,9.6551278 C5.67389058,9.88453999 5.36890372,10 5.0639168,10 C4.75892988,10 4.45394301,9.88453999 4.22160323,9.6551278 L0.349491416,5.83180748 C-0.116497139,5.37190617 -0.116497139,4.62830919 0.349491416,4.16840789 C0.81526177,3.70829114 1.56813,3.70829114 2.03411855,4.16840789 L5.0639168,7.16002843 L11.9660451,0.345087565 C12.4318154,-0.115029188 13.1846836,-0.115029188 13.6506722,0.345087565 C14.1164426,0.804988866 14.1164426,1.54837039 13.6506722,2.00848715 Z" id="checkmark"></path></g></svg><span class="sc-nUItV fJlsIf"><b class="sc-gsxalj ePltAh">' +
    `${product.prices.overage.limit} rides </b> / month` +
    '</span></li>'
  html +=
    '<li class="sc-iipuKH dHKZej"><svg class="sc-bPzAnn flUzcH" fill="currentColor" width="14px" height="10px" viewBox="0 0 14 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title></title><g id="Variant-3" stroke="none" stroke-width="1" fill-rule="evenodd"><path d="M13.6506722,2.00848715 L5.90623037,9.6551278 C5.67389058,9.88453999 5.36890372,10 5.0639168,10 C4.75892988,10 4.45394301,9.88453999 4.22160323,9.6551278 L0.349491416,5.83180748 C-0.116497139,5.37190617 -0.116497139,4.62830919 0.349491416,4.16840789 C0.81526177,3.70829114 1.56813,3.70829114 2.03411855,4.16840789 L5.0639168,7.16002843 L11.9660451,0.345087565 C12.4318154,-0.115029188 13.1846836,-0.115029188 13.6506722,0.345087565 C14.1164426,0.804988866 14.1164426,1.54837039 13.6506722,2.00848715 Z" id="checkmark"></path></g></svg><span class="sc-nUItV fJlsIf"><b class="sc-gsxalj ePltAh">' +
    `Then ${product.prices.overage.fee} </b>/ ride` +
    '</span></li>'
  html +=
    '</div><a href="https://signup.evertransit.com/product-id=' +
    product.id +
    '"  class="button-fluid-2 medium w-inline-block" target="_blank"><div class="button-text-2">Get started</div></a></label></div>'
  return html
}

function getValuesNotInArray (arr1, arr2) {
  return arr1.filter(item => arr2.indexOf(item) === -1)
}

function buildLiField (liText) {
  return (
    '<li class="sc-iipuKH dHKZej"><svg class="sc-bPzAnn flUzcH" fill="currentColor" width="14px" height="10px" viewBox="0 0 14 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title></title><g id="Variant-3" stroke="none" stroke-width="1" fill-rule="evenodd"><path d="M13.6506722,2.00848715 L5.90623037,9.6551278 C5.67389058,9.88453999 5.36890372,10 5.0639168,10 C4.75892988,10 4.45394301,9.88453999 4.22160323,9.6551278 L0.349491416,5.83180748 C-0.116497139,5.37190617 -0.116497139,4.62830919 0.349491416,4.16840789 C0.81526177,3.70829114 1.56813,3.70829114 2.03411855,4.16840789 L5.0639168,7.16002843 L11.9660451,0.345087565 C12.4318154,-0.115029188 13.1846836,-0.115029188 13.6506722,0.345087565 C14.1164426,0.804988866 14.1164426,1.54837039 13.6506722,2.00848715 Z" id="checkmark"></path></g></svg><span class="sc-nUItV fJlsIf"><b class="sc-gsxalj ePltAh">' +
    liText +
    '</b></span></li>'
  )
}

function leftScroll (event) {
  const div = document.querySelector('.card-game__cards-list')
  if (!isMobileDevice()) {
    div.scrollBy(-400, 0, 'smooth')
    if (div.scrollLeft <= 400) hideElement('leftButton')
    else showElement('leftButton')
  } else {
    swipe(event, 'right')
  }
}

function rightScroll (event) {
  const div = document.querySelector('.card-game__cards-list')
  if (!isMobileDevice()) {
    div.scrollBy(400, 0, 'smooth')
  } else {
    swipe(event, 'left')
  }
  if (div.scrollLeft >= 0) showElement('leftButton')
  else hideElement('leftButton')
}
function hideElement (buttonId) {
  var element = document.getElementById(buttonId)
  element.style.display = 'none'
}

function showElement (buttonId) {
  var element = document.getElementById(buttonId)
  element.style.display = 'block'
}

function isMobileDevice () {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

var ImageIndex = 0
function swipe (event, direction) {
  if (!isMobileDevice()) return
  console.log('in mobile')
  var midpoint = Math.floor(screen.width / 2)
  var px = event.pageX
  var items = document.getElementsByClassName('cHQdJ')
  var itemActive = items[ImageIndex]
  if (direction === 'left') {
    if (ImageIndex == items.length - 1) return
    itemActive.style.marginLeft = '-100%'
    itemActive.style.transition = '1s '
    ImageIndex = ImageIndex < items.length - 1 ? ImageIndex + 1 : ImageIndex
  } else {
    itemActive.style.marginLeft = '0'
    itemActive.style.transition = '1s '
    ImageIndex = ImageIndex >= 1 ? ImageIndex - 1 : 0
  }
}
