const getData = async () => {
  const fetchJSON = await fetch('/data/products1.json');
  const productsJSON = await fetchJSON.json();
  console.log(productsJSON);
  return productsJSON;
};

const intToCurrency = (int) => {
  const price = `$${int.toFixed(2)}`;
  return price;
}

(async () => {
  const productsData = await getData();
  const {
    groups
  } = productsData;

  // Compile Handlebars
  const source = document.getElementById('product-template').innerHTML;
  const cardTemplate = Handlebars.compile(source);
  const context = {
    title: productsData.id,
    author: 'This is my first post!',
    products: groups.map((data, i) => { // Map products array
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
  console.log('context:', context);
  const html = cardTemplate(context);
  document.querySelector('#product-list').innerHTML = html;
})();