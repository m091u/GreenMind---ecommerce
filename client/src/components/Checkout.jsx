import React from 'react';

const Checkout = () => {

    const handleCheckout = () => {
        axios.post(`${API_URL}/be_link`, { cartItems})
        .then((response) => {
            if (response.data.url) {
                window.location.href = response.data.url;
            }
        })
        .catch((err) => console.log(err.message))
    }
    
  return (
    <div>
      {/* Your component content here */}
    </div>
  );
};

export default Checkout;