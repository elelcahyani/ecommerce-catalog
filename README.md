# E-Commerce Catalog

> Interactive e-commerce product catalog built with Vue.js 2 for VIX Core Initiative - Rakamin Academy Final Task

## 🚀 Features

- **Interactive Product Navigation**: Browse through 20 products with Next/Previous buttons
- **Top-Positioned Category Filtering**: Filter products by Men's Clothing, Women's Clothing, Electronics, and Jewelery
- **Color Palette Selection**: Choose from category-specific color options for each product
- **E-commerce Actions**: Buy Now and Add to Cart functionality with local storage
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time API Integration**: Fetches product data from FakeStore API
- **Three Design Scenarios**:
  - Men's Section: Blue gradient theme with masculine color palette
  - Women's Section: Pink gradient theme with feminine color palette
  - Unavailable Product: Clean error state
- **Keyboard Navigation**: Use arrow keys to navigate products
- **Loading States**: Smooth loading animations and error handling
- **Shopping Cart**: Persistent cart storage using localStorage

## 🛠️ Technologies Used

- **Vue.js 2.7.14**: Progressive JavaScript framework
- **Vanilla CSS**: Custom styling without frameworks
- **FakeStore API**: External product data source
- **ES6+ JavaScript**: Modern JavaScript features
- **Responsive Grid**: CSS Grid and Flexbox layouts

## 📁 Project Structure

```
ecommerce-catalog/
├── assets/
│   ├── css/
│   │   └── styles.css          # Main stylesheet
│   └── js/
│       └── app.js              # Vue.js application logic
├── index.html                  # Main HTML file
├── package.json               # Project configuration
└── README.md                  # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API calls and CDN resources)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ecommerce-catalog.git
   cd ecommerce-catalog
   ```

2. **Install dependencies (optional)**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Or simply open `index.html` in your browser.

4. **Open in browser**
   Navigate to `http://localhost:8080` or open `index.html` directly.

## 🎯 API Integration

The application integrates with [FakeStore API](https://fakestoreapi.com/) to fetch product data:

- **Single Product**: `GET https://fakestoreapi.com/products/{id}`
- **All Products**: `GET https://fakestoreapi.com/products`

### Product Categories

- Men's Clothing
- Women's Clothing
- Electronics
- Jewelery

## 🎨 Design Scenarios

### 1. Men's Section
- **Theme**: Blue gradient background
- **Colors**: Blue tones with white text
- **Triggered**: When product category is "men's clothing"

### 2. Women's Section
- **Theme**: Pink gradient background
- **Colors**: Pink/yellow gradient with white text
- **Triggered**: When product category is "women's clothing"

### 3. Unavailable Product
- **Theme**: Clean white card with error message
- **Triggered**: When product doesn't exist or API fails
- **Features**: Shows product ID and helpful error message

## 🔧 Key Components

### Vue.js Application (`assets/js/app.js`)

- **Data Management**: Reactive data for products and UI state
- **API Integration**: Async methods for fetching product data
- **Navigation Logic**: Next/Previous product functionality
- **Category Filtering**: Dynamic product filtering by category
- **Error Handling**: Graceful handling of API errors

### Styling (`assets/css/styles.css`)

- **Responsive Design**: Mobile-first approach with breakpoints
- **CSS Grid**: Modern layout system for product cards
- **Gradient Themes**: Dynamic theming based on product category
- **Animations**: Smooth transitions and loading states
- **Typography**: Inter font family for modern appearance

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🎮 User Interactions

- **Top Category Filters**: Easy access filtering positioned at the top of the page
- **Color Palette Selection**: Interactive color swatches for each product category
- **Buy Now Button**: Instant purchase with order summary popup
- **Add to Cart Button**: Persistent cart storage with quantity management
- **Next Product Button**: Navigate to next product (ID + 1)
- **Previous Product Button**: Navigate to previous product (ID - 1)
- **Keyboard Navigation**: Arrow keys for product navigation
- **Responsive Touch**: Touch-friendly buttons on mobile

## 🎨 Color Palettes by Category

### Men's Clothing
- Navy Blue, Charcoal, Forest Green, Burgundy, Steel Gray

### Women's Clothing  
- Rose Pink, Lavender, Coral, Mint Green, Peach

### Electronics
- Space Gray, Silver, Midnight Black, Electric Blue, Tech Red

### Jewelery
- Gold, Rose Gold, Silver, Platinum, Bronze

## 🛒 E-commerce Features

- **Buy Now**: Instant purchase simulation with product details
- **Add to Cart**: Persistent shopping cart using localStorage
- **Color Selection**: Choose from category-specific color options
- **Cart Management**: Automatic quantity updates for duplicate items
- **Order Summary**: Detailed purchase information display

## 🔍 Error Handling

- **Network Errors**: Displays unavailable product state
- **Invalid Product IDs**: Shows appropriate error message
- **Loading States**: Spinner animation during API calls
- **Graceful Degradation**: Fallback for failed API requests

## 🚀 Deployment

### GitHub Pages

1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (main/master)
4. Access via: `https://yourusername.github.io/ecommerce-catalog`

### Netlify

1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `/`
4. Deploy automatically on push

## 📊 Performance Optimizations

- **Image Optimization**: Lazy loading and proper sizing
- **API Caching**: Store fetched products to reduce API calls
- **CSS Optimization**: Efficient selectors and minimal reflows
- **JavaScript**: Event listener cleanup and memory management

## 🧪 Testing

Open the application and verify:

- ✅ Products load correctly from API
- ✅ Navigation buttons work properly
- ✅ Category filtering functions correctly
- ✅ Responsive design on different screen sizes
- ✅ Error states display appropriately
- ✅ Loading animations appear during API calls

## 🤝 Contributing

This is a final task project for VIX Core Initiative - Rakamin Academy. 



## 👨‍💻 Author

**VIX Core Initiative Student**
- Rakamin Academy Frontend Core Initiative Final Task

## 🙏 Acknowledgments

- [FakeStore API](https://fakestoreapi.com/) for providing product data
- [Vue.js](https://vuejs.org/) for the reactive framework
- [Rakamin Academy](https://rakamin.com/) for the learning opportunity
- [Google Fonts](https://fonts.google.com/) for Inter font family

