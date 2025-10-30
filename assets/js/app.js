// Vue.js 2 Multi-Page E-Commerce Application
// VIX Core Initiative - Rakamin Academy Final Task

new Vue({
    el: '#app',
    data: {
        // Page routing
        currentPage: 'home',

        // Products data
        allProducts: [],
        featuredProducts: [],
        filteredProducts: [],
        selectedProduct: null,

        // Loading states
        loading: false,
        previewLoading: false,
        carouselLoading: false,

        // Category filtering
        selectedCategory: 'all',

        // Carousel data
        currentCarouselCategory: 'men', // 'men' or 'women'
        carouselProducts: [],
        carouselSlides: [],
        currentSlide: 0,
        autoPlayEnabled: true,
        autoPlayInterval: null,
        autoPlayCountdown: 5,
        countdownInterval: null,

        // Color selection
        selectedColor: { name: 'Default', hex: '#4F46E5' },
        colorPalettes: {
            "men's clothing": [
                { name: 'Navy Blue', hex: '#1e3a8a' },
                { name: 'Charcoal', hex: '#374151' },
                { name: 'Forest Green', hex: '#065f46' },
                { name: 'Burgundy', hex: '#7c2d12' },
                { name: 'Steel Gray', hex: '#64748b' }
            ],
            "women's clothing": [
                { name: 'Rose Pink', hex: '#f43f5e' },
                { name: 'Lavender', hex: '#a855f7' },
                { name: 'Coral', hex: '#fb7185' },
                { name: 'Mint Green', hex: '#34d399' },
                { name: 'Peach', hex: '#fdba74' }
            ],
            "electronics": [
                { name: 'Space Gray', hex: '#4b5563' },
                { name: 'Silver', hex: '#d1d5db' },
                { name: 'Midnight Black', hex: '#111827' },
                { name: 'Electric Blue', hex: '#3b82f6' },
                { name: 'Tech Red', hex: '#dc2626' }
            ],
            "jewelery": [
                { name: 'Gold', hex: '#fbbf24' },
                { name: 'Rose Gold', hex: '#f59e0b' },
                { name: 'Silver', hex: '#e5e7eb' },
                { name: 'Platinum', hex: '#f3f4f6' },
                { name: 'Bronze', hex: '#92400e' }
            ]
        },

        // Shopping cart
        cartItems: [],

        // All Products Navigation
        currentProductIndex: 0,
        visibleProducts: 4,
        
        // Featured Product Navigation
        currentFeaturedIndex: 0,
        currentFeaturedProduct: null
    },

    computed: {
        // Cart item count for badge
        cartItemsCount() {
            return this.cartItems.reduce((total, item) => total + item.quantity, 0);
        },

        // Cart total items
        totalItems() {
            return this.cartItems.reduce((total, item) => total + item.quantity, 0);
        },

        // Cart subtotal
        subtotal() {
            return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        },

        // Maximum product index for navigation
        maxProductIndex() {
            return Math.max(0, this.allProducts.length - this.visibleProducts);
        }
    },

    methods: {
    
        async fetchAllProducts() {
            try {
                this.loading = true;
                const response = await fetch('https://fakestoreapi.com/products');
                if (response.ok) {
                    this.allProducts = await response.json();
                    this.filteredProducts = [...this.allProducts];
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                this.loading = false;
            }
        },

        // Fetch featured products for home page
        async fetchFeaturedProducts() {
            try {
                this.previewLoading = true;
                // Get first 4 products as featured
                const response = await fetch('https://fakestoreapi.com/products?limit=4');
                if (response.ok) {
                    this.featuredProducts = await response.json();
                }
            } catch (error) {
                console.error('Error fetching featured products:', error);
            } finally {
                this.previewLoading = false;
            }
        },

        // Filter products by category
        filterByCategory(category) {
            this.selectedCategory = category;

            if (category === 'all') {
                this.filteredProducts = [...this.allProducts];
            } else {
                this.filteredProducts = this.allProducts.filter(product =>
                    product.category.toLowerCase() === category.toLowerCase()
                );
            }
        },

        // Navigate to catalog with specific category
        goToCatalog(category = 'all') {
            this.currentPage = 'catalog';
            this.filterByCategory(category);
        },

        // View product from home page preview
        viewProduct(product) {
            this.selectedProduct = product;
            this.initializeColorSelection();
            this.currentPage = 'catalog';
        },

        // Select product in catalog
        selectProduct(product) {
            this.selectedProduct = product;
            this.initializeColorSelection();
        },

        // Close product modal
        closeModal() {
            this.selectedProduct = null;
        },

        // Get color palette for product category
        getProductColors(category) {
            const categoryKey = category.toLowerCase();
            return this.colorPalettes[categoryKey] || [
                { name: 'Default Blue', hex: '#4F46E5' },
                { name: 'Default Gray', hex: '#6b7280' },
                { name: 'Default Green', hex: '#10B981' }
            ];
        },

        // Select color for product
        selectColor(color) {
            this.selectedColor = color;
        },

        // Initialize color selection when product changes
        initializeColorSelection() {
            if (this.selectedProduct) {
                const colors = this.getProductColors(this.selectedProduct.category);
                this.selectedColor = colors[0] || { name: 'Default', hex: '#4F46E5' };
            }
        },

        // Format category name for display
        formatCategory(category) {
            return category
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        },

        // Truncate product title for cards
        truncateTitle(title, maxLength = 50) {
            if (title.length <= maxLength) return title;
            return title.substring(0, maxLength) + '...';
        },

        // Scroll to preview section
        scrollToPreview() {
            const previewSection = document.getElementById('preview');
            if (previewSection) {
                previewSection.scrollIntoView({ behavior: 'smooth' });
            }
        },

        // Buy Now action
        buyNow() {
            if (!this.selectedProduct) return;

            const orderDetails = {
                product: this.selectedProduct.title,
                price: this.selectedProduct.price,
                color: this.selectedColor.name,
                productId: this.selectedProduct.id
            };

            // Simulate purchase process
            alert(`🛒 Purchase Initiated!\n\nProduct: ${orderDetails.product}\nColor: ${orderDetails.color}\nPrice: $${orderDetails.price}\n\nRedirecting to checkout...`);

            console.log('Order Details:', orderDetails);
            this.closeModal();
        },

        // Add to Cart action
        addToCart() {
            if (!this.selectedProduct) return;

            const cartItem = {
                id: this.selectedProduct.id,
                title: this.selectedProduct.title,
                price: this.selectedProduct.price,
                image: this.selectedProduct.image,
                category: this.selectedProduct.category,
                color: this.selectedColor.name,
                quantity: 1
            };

            // Check if item already exists in cart
            const existingItemIndex = this.cartItems.findIndex(item =>
                item.id === cartItem.id && item.color === cartItem.color
            );

            if (existingItemIndex > -1) {
                // Increase quantity if item exists
                this.cartItems[existingItemIndex].quantity += 1;
            } else {
                // Add new item to cart
                this.cartItems.push(cartItem);
            }

            // Save to localStorage
            this.saveCartToStorage();

            // Show success message
            alert(`✅ Added to Cart!\n\n${cartItem.title}\nColor: ${cartItem.color}\n\nCart items: ${this.cartItemsCount}`);

            this.closeModal();
        },

        // Quick add to cart from catalog grid
        quickAddToCart(product) {
            const colors = this.getProductColors(product.category);
            const defaultColor = colors[0] || { name: 'Default', hex: '#4F46E5' };

            const cartItem = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                category: product.category,
                color: defaultColor.name,
                quantity: 1
            };

            // Check if item already exists in cart
            const existingItemIndex = this.cartItems.findIndex(item =>
                item.id === cartItem.id && item.color === cartItem.color
            );

            if (existingItemIndex > -1) {
                this.cartItems[existingItemIndex].quantity += 1;
            } else {
                this.cartItems.push(cartItem);
            }

            this.saveCartToStorage();

            // Show success message
            alert(`✅ Quick Added to Cart!\n\n${cartItem.title}\nColor: ${cartItem.color}`);
        },

        // Update item quantity in cart
        updateQuantity(item, change) {
            const itemIndex = this.cartItems.findIndex(cartItem =>
                cartItem.id === item.id && cartItem.color === item.color
            );

            if (itemIndex > -1) {
                this.cartItems[itemIndex].quantity += change;

                // Remove item if quantity becomes 0 or less
                if (this.cartItems[itemIndex].quantity <= 0) {
                    this.cartItems.splice(itemIndex, 1);
                }

                this.saveCartToStorage();
            }
        },

        // Remove item from cart
        removeFromCart(item) {
            const itemIndex = this.cartItems.findIndex(cartItem =>
                cartItem.id === item.id && cartItem.color === item.color
            );

            if (itemIndex > -1) {
                this.cartItems.splice(itemIndex, 1);
                this.saveCartToStorage();
            }
        },

        // Save cart to localStorage
        saveCartToStorage() {
            localStorage.setItem('shopvue-cart', JSON.stringify(this.cartItems));
        },

        // Load cart from localStorage
        loadCartFromStorage() {
            const savedCart = localStorage.getItem('shopvue-cart');
            if (savedCart) {
                this.cartItems = JSON.parse(savedCart);
            }
        },

        // Checkout process
        checkout() {
            if (this.cartItems.length === 0) return;

            const orderSummary = {
                items: this.cartItems,
                totalItems: this.totalItems,
                subtotal: this.subtotal.toFixed(2),
                orderDate: new Date().toISOString()
            };

            alert(`🛒 Checkout Initiated!\n\nTotal Items: ${orderSummary.totalItems}\nTotal Amount: $${orderSummary.subtotal}\n\nRedirecting to payment...`);

            console.log('Order Summary:', orderSummary);

            // Clear cart after checkout
            this.cartItems = [];
            this.saveCartToStorage();
        },

        // Carousel Methods
        async fetchCarouselProducts() {
            try {
                this.carouselLoading = true;

                // Determine category based on current carousel category
                const category = this.currentCarouselCategory === 'men' ? "men's clothing" : "women's clothing";

                // Filter products by category
                const categoryProducts = this.allProducts.filter(product =>
                    product.category.toLowerCase() === category.toLowerCase()
                );

                this.carouselProducts = categoryProducts;
                this.createCarouselSlides();

            } catch (error) {
                console.error('Error fetching carousel products:', error);
            } finally {
                this.carouselLoading = false;
            }
        },

        // Create slides from products (4 products per slide)
        createCarouselSlides() {
            const slides = [];
            const productsPerSlide = 4;

            for (let i = 0; i < this.carouselProducts.length; i += productsPerSlide) {
                slides.push(this.carouselProducts.slice(i, i + productsPerSlide));
            }

            this.carouselSlides = slides;
            this.currentSlide = 0;
        },

        // Switch carousel category
        async switchCarouselCategory() {
            // Toggle between men and women
            this.currentCarouselCategory = this.currentCarouselCategory === 'men' ? 'women' : 'men';

            // Fetch new products for the category
            await this.fetchCarouselProducts();
        },

        // Manual slide navigation
        nextSlide() {
            if (this.currentSlide < this.carouselSlides.length - 1) {
                this.currentSlide++;
            }
        },

        previousSlide() {
            if (this.currentSlide > 0) {
                this.currentSlide--;
            }
        },

        goToSlide(index) {
            this.currentSlide = index;
        },

        // Auto-play functionality
        startAutoPlay() {
            if (this.autoPlayInterval) return;

            this.autoPlayEnabled = true;
            this.autoPlayCountdown = 5;

            // Start countdown timer
            this.countdownInterval = setInterval(() => {
                this.autoPlayCountdown--;

                if (this.autoPlayCountdown <= 0) {
                    this.autoPlayCountdown = 5;
                }
            }, 1000);

            // Auto-play interval (switch category every 5 seconds)
            this.autoPlayInterval = setInterval(async () => {
                await this.switchCarouselCategory();
                this.autoPlayCountdown = 5;
            }, 5000);
        },

        stopAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }

            if (this.countdownInterval) {
                clearInterval(this.countdownInterval);
                this.countdownInterval = null;
            }

            this.autoPlayEnabled = false;
        },

        toggleAutoPlay() {
            if (this.autoPlayEnabled) {
                this.stopAutoPlay();
            } else {
                this.startAutoPlay();
            }
        },

        // Initialize carousel
        async initializeCarousel() {
            // Wait for products to be loaded
            if (this.allProducts.length === 0) {
                await this.fetchAllProducts();
            }

            // Randomly start with men's or women's category
            this.currentCarouselCategory = Math.random() > 0.5 ? 'men' : 'women';

            // Fetch initial carousel products
            await this.fetchCarouselProducts();

            // Start auto-play
            this.startAutoPlay();
        },

        // All Products Navigation Methods
        nextProduct() {
            if (this.currentProductIndex < this.maxProductIndex) {
                this.currentProductIndex++;
            }
        },

        previousProduct() {
            if (this.currentProductIndex > 0) {
                this.currentProductIndex--;
            }
        },
        
        // Featured Product Methods
        initializeFeaturedProduct() {
            if (this.allProducts.length > 0) {
                // Start with a random product
                this.currentFeaturedIndex = Math.floor(Math.random() * this.allProducts.length);
                this.currentFeaturedProduct = this.allProducts[this.currentFeaturedIndex];
            }
        },
        
        nextFeaturedProduct() {
            if (this.allProducts.length > 0) {
                // Get random product that's different from current
                let newIndex;
                do {
                    newIndex = Math.floor(Math.random() * this.allProducts.length);
                } while (newIndex === this.currentFeaturedIndex && this.allProducts.length > 1);
                
                this.currentFeaturedIndex = newIndex;
                this.currentFeaturedProduct = this.allProducts[this.currentFeaturedIndex];
            }
        },
        
        previousFeaturedProduct() {
            if (this.allProducts.length > 0) {
                // Get random product that's different from current
                let newIndex;
                do {
                    newIndex = Math.floor(Math.random() * this.allProducts.length);
                } while (newIndex === this.currentFeaturedIndex && this.allProducts.length > 1);
                
                this.currentFeaturedIndex = newIndex;
                this.currentFeaturedProduct = this.allProducts[this.currentFeaturedIndex];
            }
        },
        
        // Truncate description for featured product
        truncateDescription(description, maxLength = 150) {
            if (description.length <= maxLength) return description;
            return description.substring(0, maxLength) + '...';
        }
    },

    // Initialize app when Vue instance is created
    async created() {
        // Load cart from localStorage
        this.loadCartFromStorage();

        // Fetch all products
        await this.fetchAllProducts();

        // Fetch featured products for home page
        await this.fetchFeaturedProducts();

        // Initialize carousel
        await this.initializeCarousel();
        
        // Initialize featured product
        this.initializeFeaturedProduct();

        // Add keyboard navigation
        window.addEventListener('keydown', (event) => {
            // ESC key to close modal
            if (event.key === 'Escape' && this.selectedProduct) {
                this.closeModal();
            }
        });
    },

    // Cleanup when component is destroyed
    beforeDestroy() {
        // Stop auto-play intervals
        this.stopAutoPlay();

        // Remove event listeners
        window.removeEventListener('keydown', this.handleKeydown);
    }
});