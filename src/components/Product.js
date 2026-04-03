import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const Product = ({ item, provider, account, dappazon, togglePop }) => {
  const [order, setOrder] = useState(null)
  const [hasBought, setHasBought] = useState(false)
  const [buying, setBuying] = useState(false)

  const fetchDetails = async () => {
    if (!dappazon || !account) return
    
    try {
      const events = await dappazon.queryFilter("Buy")
      const orders = events.filter(
        (event) => event.args.buyer === account && event.args.itemId.toString() === item.id.toString()
      )

      if (orders.length === 0) return

      const order = await dappazon.orders(account, orders[0].args.orderId)
      setOrder(order)
    } catch (err) {
      console.error("Error fetching order details:", err)
    }
  }

  const buyHandler = async () => {
    if (!dappazon || !provider) {
      alert("Please connect to blockchain first")
      return
    }
    
    setBuying(true)
    
    try {
      const signer = await provider.getSigner()
      const itemId = typeof item.id === 'number' ? item.id : parseInt(item.id)
      const cost = typeof item.cost === 'string' ? item.cost : item.cost.toString()
      
      const tx = await dappazon.connect(signer).buy(itemId, { value: cost })
      await tx.wait()
      
      setHasBought(true)
      alert("Purchase successful!")
    } catch (err) {
      console.error("Error buying item:", err)
      alert("Error: " + err.message)
    } finally {
      setBuying(false)
    }
  }

  useEffect(() => {
    if (dappazon) {
      fetchDetails()
    }
  }, [hasBought, dappazon, account])

  const formatCost = (cost) => {
    if (!cost) return "0"
    try {
      return ethers.utils.formatUnits(cost.toString(), 'ether')
    } catch {
      return "0"
    }
  }

  const formatStock = (stock) => {
    if (!stock) return 0
    try {
      return stock.toNumber ? stock.toNumber() : stock
    } catch {
      return 0
    }
  }

  const formatRating = (rating) => {
    if (!rating) return 0
    try {
      return rating.toNumber ? rating.toNumber() : rating
    } catch {
      return 0
    }
  }

  return (
    <div className="product" style={{ zIndex: 1000 }}>
      <div className="product__details" style={{ position: 'relative', backgroundColor: '#fff', padding: '20px' }}>
        <div className="product__image" style={{ width: '300px', height: '300px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <div className="product__overview">
          <h1>{item.name}</h1>

          <Rating value={formatRating(item.rating)} />

          <hr />

          <h2>{formatCost(item.cost)} ETH</h2>

          <hr />

          <h2>Overview</h2>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima rem, iusto,
            consectetur inventore quod soluta quos qui assumenda aperiam, eveniet doloribus
            commodi error modi eaque! Iure repudiandae temporibus ex? Optio!
          </p>
        </div>

        <div className="product__order">
          <h1>{formatCost(item.cost)} ETH</h1>

          <p>
            FREE delivery <br />
            <strong>
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </strong>
          </p>

          {formatStock(item.stock) > 0 ? (
            <p>In Stock.</p>
          ) : (
            <p>Out of Stock.</p>
          )}

          <button className='product__buy' onClick={buyHandler} disabled={buying}>
            {buying ? 'Processing...' : 'Buy Now'}
          </button>

          <p><small>Ships from</small> Dappazon</p>
          <p><small>Sold by</small> Dappazon</p>

          {order && (
            <div className='product__bought'>
              Item bought on <br />
              <strong>
                {new Date(Number(order.time.toString() + '000')).toLocaleDateString(
                  undefined,
                  {
                    weekday: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                  })}
              </strong>
            </div>
          )}
        </div>


        <button onClick={togglePop} className="product__close">
          <img src={close} alt="Close" />
        </button>
      </div>
    </div >
  );
}

export default Product;