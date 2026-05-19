const productsMock = {
  hamburgueres: [
    {
      id: 1,
      name: 'X-Burguer Clássico',
      description: 'Hambúrguer bovino, queijo e molho especial',
      price: 25.90,
      image: 'https://picsum.photos/400/300?1'
    },
    {
      id: 2,
      name: 'X-Bacon',
      description: 'Hambúrguer com bacon crocante',
      price: 29.90,
      image: 'https://picsum.photos/400/300?2'
    }
  ],

  porcoes: [
    {
      id: 3,
      name: 'Batata Frita',
      description: 'Batata frita crocante',
      price: 18.90,
      image: 'https://picsum.photos/400/300?3'
    }
  ]
};

export async function getProductsByCategory(categorySlug) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsMock[categorySlug] || []);
    }, 500);
  });
}