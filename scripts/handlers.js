const saveToLocal = (event) => {
  // let savedProducts = {}
  const {
    productId,
    key
  } = event.currentTarget.dataset
  const productsStorage = window.localStorage;

  // Check if localStorage already has saved products
  if (!!productsStorage.wsiSavedProducts) {
    savedProducts = JSON.parse(productsStorage.wsiSavedProducts)
    console.log('productsStorageBefore:', savedProducts);
  }

  const stringifyProducts = {
    ...savedProducts,
    [productId]: key
  }
  productsStorage.setItem('wsiSavedProducts', JSON.stringify(stringifyProducts))
  // productsStorage.setItem('wsiSavedProductsz', [123, 123, 124252])
  console.log('productsStorage:', productsStorage);
}

const saveToSession = '';

const handleSave = () => {

}