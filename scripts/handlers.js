// intialize localStorage
const productsStorage = window.localStorage;
const sessionStorage = window.sessionStorage;
const localBadge = document.querySelector('.toggle-local-storage');
const sessionBadge = document.querySelector('.toggle-session-storage');

// const productsStorage = window.sessionStorage;

/**
 * @description - Initialize products JSON
 */
const getData = async () => {
  const fetchJSON = await fetch('/data/products1.json');
  const productsJSON = await fetchJSON.json();
  console.log(productsJSON);
  return productsJSON;
};

// Handles All Products Nav Button 
const allProductsRender = async () => {
  const productsData = await getData();
  const allItemsHtml = renderProducts(productsData.groups, false)
  document.querySelector('#product-list').innerHTML = allItemsHtml;
}

const savedListRender = async () => {
  let filteredProducts = [];
  const productsData = await getData();
  if (!!productsStorage.wsiSavedProducts) {
    const parsedProductIDs = JSON.parse(productsStorage.wsiSavedProducts).savedProductIDs
    filteredProducts = productsData.groups.filter(data => {
      return parsedProductIDs.includes(data.id)
    })
  }
  // Replace all product items with saved list items
  const savedProductsHtml = renderProducts(filteredProducts, true)
  document.querySelector('#product-list').innerHTML = savedProductsHtml;
}


/**
 * @description - Handles Save to LocalStorage
 * @param {*} event
 */
const saveToStorage = (event) => {
  const {
    productId,
    storage
  } = event.currentTarget.dataset

  // Check if localStorage already has saved products
  if (!!productsStorage.wsiSavedProducts) {
    const parsedProductIDs = JSON.parse(productsStorage.wsiSavedProducts).savedProductIDs
    if (!parsedProductIDs.includes(productId)) {
      productsStorage.setItem('wsiSavedProducts', JSON.stringify({
        savedProductIDs: [...parsedProductIDs, productId]
      }))
    } else {
      console.log('product already in list')
    }
  } else {
    productsStorage.setItem('wsiSavedProducts', JSON.stringify({
      savedProductIDs: [productId]
    }))
  }
}

const removeFromStorage = (event) => {
  const {
    productId,
    storage
  } = event.currentTarget.dataset

  const parsedProductIDs = JSON.parse(productsStorage.wsiSavedProducts).savedProductIDs
  let savedProductsSet = new Set(parsedProductIDs)
  savedProductsSet.delete(productId)
  productsStorage.setItem('wsiSavedProducts', JSON.stringify({
    savedProductIDs: [...savedProductsSet]
  }))

  // Rerender saved list after removing product from storage
  savedListRender();
}


/**
 * @description - Toggles storage type badge display
 */
const toggleBadge = (type) => {
  switch (type) {
    case 'session':
      sessionBadge.style.display = 'block'
      localBadge.style.display = 'none'
      break;
    case 'local':
      sessionBadge.style.display = 'none'
      localBadge.style.display = 'block'
      break;
  }
}

const handleSetLocal = (event) => {
  console.log('123');
  toggleBadge('local');
  productsStorage.setItem('storageType', 'local');
}

const handleSetSession = (event) => {
  toggleBadge('session');
  productsStorage.setItem('storageType', 'session');
  console.log('12345');
}