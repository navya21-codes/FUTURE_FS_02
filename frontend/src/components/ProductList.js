import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Card, Button, Badge } from 'react-bootstrap';

const ProductList = ({ onAddToCart, selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Complete products data with all categories
  const enhancedProducts = [
    // Fashion Products
    { id: 1, name: "Men's Casual Shirt", price: 45.99, category: "fashion", description: "Comfortable cotton casual shirt" },
    { id: 2, name: "Women's Summer Dress", price: 65.99, category: "fashion", description: "Elegant summer floral dress" },
    { id: 3, name: "Designer Jeans", price: 89.99, category: "fashion", description: "Premium quality denim jeans" },
    { id: 4, name: "Sports Shoes", price: 120.99, category: "fashion", description: "Comfortable athletic shoes" },
    { id: 5, name: "Leather Jacket", price: 199.99, category: "fashion", description: "Genuine leather biker jacket" },
    { id: 6, name: "Silk Scarf", price: 35.99, category: "fashion", description: "Luxury silk fashion scarf" },
    
    // Electronics
    { id: 7, name: "Smartphone", price: 699.99, category: "electronics", description: "Latest smartphone with advanced features" },
    { id: 8, name: "Laptop", price: 999.99, category: "electronics", description: "High-performance laptop" },
    { id: 9, name: "Headphones", price: 149.99, category: "electronics", description: "Noise-cancelling headphones" },
    { id: 10, name: "Smart Watch", price: 249.99, category: "electronics", description: "Feature-rich smartwatch" },
    { id: 11, name: "Tablet", price: 399.99, category: "electronics", description: "10-inch display tablet" },
    
    // Home & Living Products
    { id: 12, name: "Coffee Table", price: 199.99, category: "home", description: "Modern wooden coffee table" },
    { id: 13, name: "Bedding Set", price: 89.99, category: "home", description: "Luxury cotton bedding set" },
    { id: 14, name: "Wall Art", price: 45.99, category: "home", description: "Decorative wall painting" },
    { id: 15, name: "Sofa Set", price: 599.99, category: "home", description: "3-seater comfortable sofa" },
    { id: 16, name: "Dining Table", price: 299.99, category: "home", description: "6-seater wooden dining table" },
    { id: 17, name: "Floor Lamp", price: 79.99, category: "home", description: "Modern standing floor lamp" },
    { id: 18, name: "Curtains Set", price: 65.99, category: "home", description: "Elegant window curtains" },
    
    // Sports Products
    { id: 19, name: "Basketball", price: 29.99, category: "sports", description: "Official size basketball" },
    { id: 20, name: "Yoga Mat", price: 35.99, category: "sports", description: "Non-slip yoga mat" },
    { id: 21, name: "Dumbbell Set", price: 89.99, category: "sports", description: "Adjustable dumbbell set" },
    { id: 22, name: "Running Shoes", price: 79.99, category: "sports", description: "Lightweight running shoes" },
    { id: 23, name: "Tennis Racket", price: 129.99, category: "sports", description: "Professional tennis racket" },
    { id: 24, name: "Football", price: 25.99, category: "sports", description: "Official size football" },
    { id: 25, name: "Fitness Tracker", price: 59.99, category: "sports", description: "Waterproof fitness tracker" }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Simulate API call delay
      setTimeout(() => {
        setProducts(enhancedProducts);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Get display name for category
  const getCategoryDisplayName = (category) => {
    const categoryNames = {
      'electronics': 'Electronics',
      'fashion': 'Fashion',
      'home': 'Home & Living',
      'sports': 'Sports',
      'all': 'All'
    };
    return categoryNames[category] || category;
  };

  if (loading) return (
    <Container className="text-center mt-5">
      <div className="spinner-border text-gradient" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2 text-muted">Loading amazing products...</p>
    </Container>
  );

  if (error) return (
    <Container className="mt-4">
      <Alert variant="danger">{error}</Alert>
    </Container>
  );

  return (
    <Container className="my-4">
      {/* Header Section */}
      <Row className="mb-4">
        <Col>
          <div className="products-header">
            <h1 className="section-title">
              {getCategoryDisplayName(selectedCategory)} Products
            </h1>
            <p className="section-subtitle">
              {selectedCategory === 'all' 
                ? 'Discover our complete collection' 
                : `Explore our ${getCategoryDisplayName(selectedCategory).toLowerCase()} collection`
              }
            </p>
            <Badge bg="primary" className="category-badge-large">
              {filteredProducts.length} products found
            </Badge>
          </div>
        </Col>
      </Row>
      
      <Row>
        {filteredProducts.map(product => (
          <Col key={product.id} lg={4} md={6} className="mb-4">
            <Card className="h-100 shadow-lg product-card border-0">
              <Card.Body className="d-flex flex-column p-4">
                <Card.Title className="product-title">{product.name}</Card.Title>
                <Card.Text className="product-description flex-grow-1">
                  {product.description}
                </Card.Text>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="product-price">${product.price}</span>
                    <Badge className="category-badge">
                      {getCategoryDisplayName(product.category)}
                    </Badge>
                  </div>
                  <Button 
                    className="add-to-cart-btn w-100"
                    onClick={() => onAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredProducts.length === 0 && !loading && (
        <Row>
          <Col className="text-center">
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try selecting a different category</p>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductList;