// intialize localStorage
const productsStorage = window.localStorage;


// Handles All Products Nav Button 
const allProductsRender = async () => {
  const productsData = await getData();
  const allItemsHtml = renderProducts(productsData.groups)
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
  const savedProductsHtml = renderProducts(filteredProducts)
  document.querySelector('#product-list').innerHTML = savedProductsHtml;
}


/**
 * @description - Handles Save to LocalStorage
 * @param {*} event - Event
 */
const saveToLocal = (event) => {
  const {
    productId,
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

const saveToSession = '';

const handleSave = () => {

}