import React, { useState } from 'react';
import { Container, Navbar, Nav, Badge, Row, Col, Modal, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProductList from './components/ProductList';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    
    alert(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCardClick = (category) => {
    setSelectedCategory(category);
    setCurrentView('products');
  };

  const featuredCategories = [
    { name: 'Electronics', count: '5+ Products', color: 'var(--primary)', category: 'electronics' },
    { name: 'Fashion', count: '6+ Products', color: 'var(--secondary)', category: 'fashion' },
    { name: 'Home & Living', count: '7+ Products', color: 'var(--accent)', category: 'home' },
    { name: 'Sports', count: '7+ Products', color: 'var(--warning)', category: 'sports' }
  ];

  const features = [
    { title: 'Free Shipping', desc: 'On orders over $50' },
    { title: 'Secure Payment', desc: '100% secure payment' },
    { title: 'Easy Returns', desc: '10-day return policy' },
    { title: '24/7 Support', desc: 'Always here to help' }
  ];

  const horizontalCards = [
    { 
      id: 1, 
      title: 'Electronics', 
      subtitle: 'Latest Tech',
      color: 'var(--primary)',
      category: 'electronics'
    },
    { 
      id: 2, 
      title: 'Home', 
      subtitle: 'Living',
      color: 'var(--accent)',
      category: 'home'
    },
    { 
      id: 3, 
      title: 'Fashion', 
      subtitle: 'Trending',
      color: 'var(--secondary)',
      category: 'fashion'
    }
  ];

  const renderHomePage = () => (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-80">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="hero-title">
                  Discover Your 
                  <span className="gradient-text"> Perfect Style</span>
                </h1>
                <p className="hero-subtitle">
                  Explore our carefully curated collection of premium products. 
                  From cutting-edge electronics to trendy fashion - find everything 
                  you need in one place.
                </p>
                
                {/* Horizontal Cards */}
                <div className="horizontal-cards-container">
                  {horizontalCards.map((card) => (
                    <div 
                      key={card.id}
                      className="horizontal-card"
                      onClick={() => handleCardClick(card.category)}
                      style={{ borderLeft: `4px solid ${card.color}` }}
                    >
                      <div className="card-content">
                        <h4>{card.title}</h4>
                        <p>{card.subtitle}</p>
                        <div className="click-indicator">→</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hero-buttons">
                  <button 
                    className="btn-primary-large"
                    onClick={() => {
                      setSelectedCategory('all');
                      setCurrentView('products');
                    }}
                  >
                    View All Products
                  </button>
                </div>
                
                <div className="hero-stats">
                  <div className="stat">
                    <strong>25+</strong>
                    <span>Premium Products</span>
                  </div>
                  <div className="stat">
                    <strong>4</strong>
                    <span>Categories</span>
                  </div>
                  <div className="stat">
                    <strong>24/7</strong>
                    <span>Support</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-visual">
                {/* Simple decorative elements without icons */}
                <div className="decorative-circle circle-1"></div>
                <div className="decorative-circle circle-2"></div>
                <div className="decorative-circle circle-3"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Shop By Category</h2>
              <p className="section-subtitle">Find exactly what you're looking for</p>
            </Col>
          </Row>
          <Row>
            {featuredCategories.map((category, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <div 
                  className="category-card"
                  onClick={() => handleCardClick(category.category)}
                >
                  <div className="category-header">
                    <h4>{category.name}</h4>
                    <div 
                      className="category-color-indicator"
                      style={{ backgroundColor: category.color }}
                    ></div>
                  </div>
                  <p>{category.count}</p>
                  <div className="category-arrow">→</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <Row>
            {features.map((feature, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <div className="feature-card">
                  <div className="feature-dot"></div>
                  <h5>{feature.title}</h5>
                  <p>{feature.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h2>Ready to Transform Your Shopping Experience</h2>
              <p>Join thousands of satisfied customers who trust us for quality products and exceptional service.</p>
              <button 
                className="btn-primary-large"
                onClick={() => {
                  setSelectedCategory('all');
                  setCurrentView('products');
                }}
              >
                Explore All Products
              </button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );

  const renderCartModal = () => (
    <Modal show={showCart} onHide={() => setShowCart(false)} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>🛒 Your Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length === 0 ? (
          <div className="text-center py-4">
            <h5>Your cart is empty</h5>
            <p>Add some products to get started!</p>
            <Button 
              variant="primary"
              onClick={() => {
                setShowCart(false);
                setCurrentView('products');
              }}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <Table responsive>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.name}</strong>
                      <br />
                      <small className="text-muted">{item.description}</small>
                    </td>
                    <td>${item.price}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-end">
              <h5>Total: ${getCartTotal()}</h5>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowCart(false)}>
          Continue Shopping
        </Button>
        {cartItems.length > 0 && (
          <Button variant="primary">
            Proceed to Checkout
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'products':
        return <ProductList onAddToCart={addToCart} selectedCategory={selectedCategory} />;
      case 'home':
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand 
            href="#home" 
            onClick={() => {
              setCurrentView('home');
              setSelectedCategory('all');
            }}
            style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '1.5rem' }}
          >
            🛒 StyleHub
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link 
              href="#home"
              onClick={() => {
                setCurrentView('home');
                setSelectedCategory('all');
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              href="#products"
              onClick={() => {
                setSelectedCategory('all');
                setCurrentView('products');
              }}
            >
              Products
            </Nav.Link>
            <Nav.Link 
              href="#cart"
              onClick={() => setShowCart(true)}
            >
              Cart <Badge bg="primary">{getCartItemsCount()}</Badge>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {renderContent()}
      {renderCartModal()}
    </div>
  );
}

export default App;