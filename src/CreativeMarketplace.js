import React, { useState } from 'react';

const CreativeMarketplace = () => {
  // State for active view/page
  const [activeView, setActiveView] = useState('storefront');
  // State for mock user data
  const [userData, setUserData] = useState({
    storeName: 'Artisan Workshop',
    description: 'Handcrafted items made with love and attention to detail',
    logoUrl: 'https://placehold.co/150/blue/white',
    bannerUrl: 'https://placehold.co/800x200/blue/white',
    theme: 'minimal',
  });
  
  // State for mock inventory
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Handmade Ceramic Mug',
      price: 24.99,
      description: 'Wheel-thrown ceramic mug with custom glaze.',
      imageUrl: 'https://placehold.co/300/gray/white',
      type: 'physical',
      quantity: 8,
      categories: ['ceramics', 'homeware'],
    },
    {
      id: 2,
      name: 'Digital Art Print (8x10)',
      price: 12.99,
      description: 'Printable wall art in vibrant colors.',
      imageUrl: 'https://placehold.co/300/gray/white',
      type: 'digital',
      quantity: 999,
      categories: ['prints', 'digital'],
    },
    {
      id: 3,
      name: 'Hand-knit Scarf',
      price: 45.00,
      description: 'Cozy wool scarf in multiple color options.',
      imageUrl: 'https://placehold.co/300/gray/white',
      type: 'physical',
      quantity: 3,
      categories: ['apparel', 'accessories'],
    },
  ]);
  
  // State for orders
  const [orders, setOrders] = useState([
    {
      id: 'ORD12345',
      date: '2025-03-18',
      customer: 'Alex Johnson',
      items: [{ productId: 1, quantity: 2 }],
      status: 'processing',
      total: 49.98,
    },
    {
      id: 'ORD12346',
      date: '2025-03-17',
      customer: 'Sam Taylor',
      items: [{ productId: 2, quantity: 1 }],
      status: 'shipped',
      total: 12.99,
    },
  ]);
  
  // State for cart
  const [cart, setCart] = useState([]);
  
  // Function to add item to cart
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  // Function to remove item from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };
  
  // Function to update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };
  
  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Mock checkout function
  const checkout = () => {
    alert('Checkout process would integrate with Stripe/PayPal here');
    setCart([]);
  };
  
  // Add a new product to inventory
  const addProduct = (product) => {
    setInventory([...inventory, {
      id: inventory.length + 1,
      ...product
    }]);
  };
  
  // Dashboard component
  const Dashboard = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold text-lg mb-2">Recent Orders</h3>
          <p className="text-3xl font-bold">{orders.length}</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold text-lg mb-2">Products</h3>
          <p className="text-3xl font-bold">{inventory.length}</p>
          <p className="text-sm text-gray-500">Active listings</p>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold text-lg mb-2">Revenue</h3>
          <p className="text-3xl font-bold">${orders.reduce((total, order) => total + order.total, 0).toFixed(2)}</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-4 rounded shadow">
        <h3 className="font-bold text-lg mb-4">Recent Orders</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Order ID</th>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Customer</th>
              <th className="text-left p-2">Total</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.date}</td>
                <td className="p-2">{order.customer}</td>
                <td className="p-2">${order.total.toFixed(2)}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  // Inventory Management component
  const InventoryManagement = () => {
    const [newProduct, setNewProduct] = useState({
      name: '',
      price: 0,
      description: '',
      type: 'physical',
      quantity: 1,
      categories: []
    });
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewProduct({
        ...newProduct,
        [name]: name === 'price' || name === 'quantity' ? parseFloat(value) : value
      });
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      addProduct({
        ...newProduct,
        imageUrl: 'https://placehold.co/300/gray/white',
      });
      setNewProduct({
        name: '',
        price: 0,
        description: '',
        type: 'physical',
        quantity: 1,
        categories: []
      });
    };
    
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Inventory Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-bold text-lg mb-4">Products ({inventory.length})</h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Product</th>
                    <th className="text-left p-2">Price</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-left p-2">Quantity</th>
                    <th className="text-left p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map(product => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">
                        <div className="flex items-center">
                          <img src={product.imageUrl} alt={product.name} className="w-10 h-10 mr-2 rounded" />
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td className="p-2">${product.price.toFixed(2)}</td>
                      <td className="p-2">{product.type}</td>
                      <td className="p-2">{product.quantity}</td>
                      <td className="p-2">
                        <button className="text-blue-600 hover:underline">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg mb-4">Add New Product</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={newProduct.name} 
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded" 
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Price</label>
                <input 
                  type="number" 
                  name="price" 
                  min="0" 
                  step="0.01" 
                  value={newProduct.price} 
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded" 
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  name="description" 
                  value={newProduct.description} 
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded" 
                  rows="3"
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Product Type</label>
                <select 
                  name="type" 
                  value={newProduct.type} 
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="physical">Physical Product</option>
                  <option value="digital">Digital Product</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <input 
                  type="number" 
                  name="quantity" 
                  min="0" 
                  value={newProduct.quantity} 
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded" 
                />
              </div>
              
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  // Store Settings component
  const StoreSettings = () => {
    const [settings, setSettings] = useState({ ...userData });
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setSettings({
        ...settings,
        [name]: value
      });
    };
    
    const saveSettings = (e) => {
      e.preventDefault();
      setUserData(settings);
      alert('Store settings saved!');
    };
    
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Store Settings</h2>
        
        <div className="bg-white p-6 rounded shadow">
          <form onSubmit={saveSettings}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Store Name</label>
              <input 
                type="text" 
                name="storeName" 
                value={settings.storeName} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded" 
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Store Description</label>
              <textarea 
                name="description" 
                value={settings.description} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded" 
                rows="3"
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Theme</label>
              <select 
                name="theme" 
                value={settings.theme} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="minimal">Minimal</option>
                <option value="bold">Bold</option>
                <option value="artistic">Artistic</option>
                <option value="vintage">Vintage</option>
              </select>
            </div>
            
            <div className="mt-6">
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  // Storefront component
  const Storefront = () => {
    return (
      <div>
        {/* Banner */}
        <div 
          className="relative h-48 bg-cover bg-center" 
          style={{ backgroundImage: `url(${userData.bannerUrl})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">{userData.storeName}</h1>
              <p className="text-xl">{userData.description}</p>
            </div>
          </div>
        </div>
        
        {/* Products */}
        <div className="max-w-6xl mx-auto p-6">
          <h2 className="text-2xl font-bold mb-6">Shop Our Products</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {inventory.map(product => (
              <div key={product.id} className="bg-white rounded shadow overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // Shopping Cart component
  const ShoppingCart = () => (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      
      {cart.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="mb-4">Your cart is empty.</p>
          <button 
            onClick={() => setActiveView('storefront')}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-4">Product</th>
                <th className="text-center p-4">Quantity</th>
                <th className="text-right p-4">Price</th>
                <th className="text-right p-4">Total</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id} className="border-b">
                  <td className="p-4">
                    <div className="flex items-center">
                      <img src={item.imageUrl} alt={item.name} className="w-12 h-12 mr-4 rounded" />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.type === 'digital' ? 'Digital Product' : 'Physical Product'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border rounded-l text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        min="1" 
                        value={item.quantity} 
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-12 h-8 border-t border-b text-center"
                      />
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border rounded-r text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-4 text-right">${item.price.toFixed(2)}</td>
                  <td className="p-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td colSpan="3" className="p-4 text-right font-bold">
                  Subtotal:
                </td>
                <td className="p-4 text-right font-bold">
                  ${cartTotal.toFixed(2)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          
          <div className="p-4 flex justify-between">
            <button 
              onClick={() => setActiveView('storefront')}
              className="text-blue-600 hover:underline"
            >
              Continue Shopping
            </button>
            <button 
              onClick={checkout}
              className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
  // Orders Management component
  const OrdersManagement = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>
      
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Recent Orders</h3>
          <div className="flex">
            <select className="border rounded p-2 mr-2">
              <option>All Orders</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
            <button className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300">Filter</button>
          </div>
        </div>
        
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Order ID</th>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Customer</th>
              <th className="text-left p-2">Items</th>
              <th className="text-left p-2">Total</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.date}</td>
                <td className="p-2">{order.customer}</td>
                <td className="p-2">{order.items.reduce((total, item) => total + item.quantity, 0)}</td>
                <td className="p-2">${order.total.toFixed(2)}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-2">
                  <button className="text-blue-600 hover:underline">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  // Navigation component
  const Navigation = () => (
    <div className="flex justify-between items-center bg-white p-4 shadow-md">
      <div className="flex items-center">
        <button 
          onClick={() => setActiveView('storefront')}
          className="font-bold text-xl text-blue-600"
        >
          {userData.storeName}
        </button>
      </div>
      
      {activeView === 'storefront' || activeView === 'cart' ? (
        <div className="flex items-center">
          <button 
            onClick={() => setActiveView('storefront')}
            className={`mr-4 ${activeView === 'storefront' ? 'font-bold' : ''}`}
          >
            Shop
          </button>
          
          <button 
            onClick={() => setActiveView('cart')}
            className="relative"
          >
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setActiveView('dashboard')}
            className="ml-8 text-sm text-gray-500 hover:underline"
          >
            Seller Dashboard
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <button 
            onClick={() => setActiveView('dashboard')}
            className={`mr-4 ${activeView === 'dashboard' ? 'font-bold' : ''}`}
          >
            Dashboard
          </button>
          
          <button 
            onClick={() => setActiveView('inventory')}
            className={`mr-4 ${activeView === 'inventory' ? 'font-bold' : ''}`}
          >
            Inventory
          </button>
          
          <button 
            onClick={() => setActiveView('orders')}
            className={`mr-4 ${activeView === 'orders' ? 'font-bold' : ''}`}
          >
            Orders
          </button>
          
          <button 
            onClick={() => setActiveView('settings')}
            className={`mr-4 ${activeView === 'settings' ? 'font-bold' : ''}`}
          >
            Settings
          </button>
          
          <button 
            onClick={() => setActiveView('storefront')}
            className="ml-4 text-sm text-gray-500 hover:underline"
          >
            View Store
          </button>
        </div>
      )}
    </div>
  );
  
  // Main component
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      {activeView === 'dashboard' && <Dashboard />}
      {activeView === 'inventory' && <InventoryManagement />}
      {activeView === 'orders' && <OrdersManagement />}
      {activeView === 'settings' && <StoreSettings />}
      {activeView === 'storefront' && <Storefront />}
      {activeView === 'cart' && <ShoppingCart />}
    </div>
  );
};

export default CreativeMarketplace;