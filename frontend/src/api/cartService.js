import api from './axiosInstance';

export const cartService = {
  // Add item to cart
  async addToCart(product) {
    try {
      const response = await api.post('/clearance-items/add-to-cart', {
        item_id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Get cart items
  async getCart() {
    try {
      const response = await api.get('/clearance-items/cart');
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  // Remove item from cart
  async removeFromCart(itemId) {
    try {
      // Note: You'll need to implement this endpoint in the backend
      const response = await api.delete(`/clearance-items/cart/${itemId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  // Clear cart
  async clearCart() {
    try {
      const response = await api.post('/clearance-items/checkout');
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
};

export default cartService;
