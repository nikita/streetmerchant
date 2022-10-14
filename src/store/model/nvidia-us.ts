import {Store} from './store';

export const NvidiaUS: Store = {
  currency: '$',
  labels: {
    inStock: {
      container: '.buy > button',
      text: ['add to cart', 'buy now'],
    },
    outOfStock: {
      container: '.buy > button',
      text: ['out of stock'],
    },
  },
  links: [
    {
      brand: 'test:brand',
      model: 'test:model',
      series: 'test:series',
      url: 'https://www.nvidia.com/en-gb/geforce/graphics-cards/rtx-2060-super/',
    },
    {
      brand: 'nvidia',
      model: 'founders edition',
      series: '3060ti',
      url: 'https://shop.nvidia.com/en-gb/geforce/store/gpu/?page=1&limit=9&locale=en-gb&category=GPU&gpu=RTX%203060%20Ti&manufacturer=NVIDIA',
    },
    {
      brand: 'nvidia',
      model: 'founders edition',
      series: '3070',
      url: 'https://shop.nvidia.com/en-gb/geforce/store/gpu/?page=1&limit=9&locale=en-gb&category=GPU&gpu=RTX%203070&manufacturer=NVIDIA',
    },
    {
      brand: 'nvidia',
      model: 'founders edition',
      series: '3070ti',
      url: 'https://shop.nvidia.com/en-gb/geforce/store/gpu/?page=1&limit=9&locale=en-gb&category=GPU&gpu=RTX%203070%20Ti&manufacturer=NVIDIA',
    },
    {
      brand: 'nvidia',
      model: 'founders edition',
      series: '3080',
      url: 'https://shop.nvidia.com/en-gb/geforce/store/gpu/?page=1&limit=9&locale=en-gb&category=GPU&gpu=RTX%203080&manufacturer=NVIDIA',
    },
    {
      brand: 'nvidia',
      model: 'founders edition',
      series: '3080ti',
      url: 'https://shop.nvidia.com/en-gb/geforce/store/gpu/?page=1&limit=9&locale=en-gb&category=GPU&gpu=RTX%203080%20Ti&manufacturer=NVIDIA',
    },
    {
      brand: 'nvidia',
      model: 'founders edition',
      series: '3090',
      url: 'https://shop.nvidia.com/en-gb/geforce/store/gpu/?page=1&limit=9&locale=en-gb&category=GPU&gpu=RTX%203090&manufacturer=NVIDIA',
    },
    {
      brand: 'nvidia',
      model: 'founders edition',
      series: '4090',
      url: 'https://store.nvidia.com/en-us/geforce/store/gpu/?page=1&limit=9&locale=en-us&category=GPU&gpu=RTX 4090&manufacturer=NVIDIA',
    },
  ],
  name: 'nvidia-us',
};
