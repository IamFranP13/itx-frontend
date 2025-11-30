export const mapProductToModel = (apiProduct) => {
  if (!apiProduct) return null;

  return {
    id: apiProduct.id || '',
    brand: apiProduct.brand || 'Unknown Brand',
    model: apiProduct.model || 'Unknown Model',
    price: apiProduct.price !== undefined ? apiProduct.price : '',
    imgUrl: apiProduct.imgUrl || '', // Maybe Default Image
  };
};

export const mapProductDetailToModel = (apiProduct) => {
  if (!apiProduct) return null;

  return {
    ...mapProductToModel(apiProduct),
    cpu: apiProduct.cpu || 'N/A',
    ram: apiProduct.ram || 'N/A',
    os: apiProduct.os || 'N/A',
    displayResolution: apiProduct.displayResolution || 'N/A',
    battery: apiProduct.battery || 'N/A',
    primaryCamera: apiProduct.primaryCamera || 'N/A',
    secondaryCamera: apiProduct.secondaryCmera || 'N/A',
    dimentions: apiProduct.dimentions || 'N/A',
    weight: apiProduct.weight || '',
    options: apiProduct.options || { colors: [], storages: [] },
  };
};
