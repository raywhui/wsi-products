const intToCurrency = (int) => {
  const price = `$${int.toFixed(2)}`;
  return price;
}

// Compile Handlebars
const renderProducts = (items, savedList = false, storageType) => {
  const source = document.getElementById('product-template').innerHTML;
  const cardTemplate = Handlebars.compile(source);
  const context = {
    products: items.map((data, i) => { // Map products array
      let regularPrice = '',
        sellingPrice = '';
      if (!!data.priceRange) {
        const {
          regular,
          selling
        } = data.priceRange;
        regularPrice = !!regular ? `${intToCurrency(regular.low)} - ${intToCurrency(regular.high)}` : ``
        sellingPrice = `${intToCurrency(selling.low)} - ${intToCurrency(selling.high)}`
      } else {
        const {
          regular,
          selling
        } = data.price;
        regularPrice = !!regular ? `${intToCurrency(regular)}` : ``
        sellingPrice = `${intToCurrency(selling)}`
      }
      return {
        savedList: savedList,
        storageType: storageType,
        key: i,
        image: data.images[0].href,
        id: data.id,
        title: data.name,
        price: {
          regular: regularPrice,
          selling: sellingPrice,
        },
      };
    }),
  };
  console.log(context)
  const html = cardTemplate(context);
  return html
}

(async () => {
  // Init storage type session or local
  if (!!productsStorage.storageType) {
    toggleBadge(productsStorage.getItem('storageType'))
  } else {
    productsStorage.setItem('storageType', 'local');
    toggleBadge('local')
  }

  // Render all products to page with Handlebars
  const productsData = await getData();
  const allItemsHtml = renderProducts(productsData.groups, false, productsStorage.getItem('storageType'))
  document.querySelector('#product-list').innerHTML = allItemsHtml;

  // Badges display current status, logic must set the other storage type
  localBadge.addEventListener('click', () => {
    handleSetSession();
  })
  sessionBadge.addEventListener('click', () => {
    handleSetLocal();
  })
})();