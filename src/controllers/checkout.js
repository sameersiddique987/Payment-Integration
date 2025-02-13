
import Stripe from 'stripe'; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const checkout = async (req, res)   => {
  console.log("Request body:", req.body);
  
  const { products } = req.body;
  
  if (!products || !Array.isArray(products)) {
    return res.status(400).json({ error: "Invalid products format" });
  }
  
  const lineItems = products.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.title, 
      },
      unit_amount: Math.round(item.price * 100), 
    },
    quantity: item.quantity,
  }));
 
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });
    
    res.json({ message: "Session completed", id: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
};

export default checkout
