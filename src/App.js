import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import Dappazon from './abis/Dappazon.json'

// Config
import config from './config.json'

// Local images
import cameraImg from './assets/items/camera.jpg'
import droneImg from './assets/items/drone.jpg'
import headsetImg from './assets/items/headset.jpg'
import shoesImg from './assets/items/shoes.jpg'
import sunglassesImg from './assets/items/sunglasses.jpg'
import watchImg from './assets/items/watch.jpg'
import cubeImg from './assets/items/cube.jpg'
import trainImg from './assets/items/train.jpg'
import robotsImg from './assets/items/robots.jpg'

// Default products (blockchain or fallback)
const defaultProducts = [
    { id: 1, name: "Camera", category: "electronics", image: cameraImg, cost: "1000000000000000000", rating: 4, stock: 10 },
    { id: 2, name: "Drone", category: "electronics", image: droneImg, cost: "2000000000000000000", rating: 5, stock: 6 },
    { id: 3, name: "Headset", category: "electronics", image: headsetImg, cost: "250000000000000000", rating: 2, stock: 24 },
    { id: 4, name: "Shoes", category: "clothing", image: shoesImg, cost: "250000000000000000", rating: 5, stock: 3 },
    { id: 5, name: "Sunglasses", category: "clothing", image: sunglassesImg, cost: "100000000000000000", rating: 4, stock: 12 },
    { id: 6, name: "Watch", category: "clothing", image: watchImg, cost: "1250000000000000000", rating: 4, stock: 0 },
    { id: 7, name: "Puzzle Cube", category: "toys", image: cubeImg, cost: "50000000000000000", rating: 4, stock: 15 },
    { id: 8, name: "Train Set", category: "toys", image: trainImg, cost: "200000000000000000", rating: 4, stock: 0 },
    { id: 9, name: "Robot Set", category: "toys", image: robotsImg, cost: "150000000000000000", rating: 3, stock: 12 },
]

function App() {
  const [provider, setProvider] = useState(null)
  const [dappazon, setDappazon] = useState(null)
  const [account, setAccount] = useState(null)
  const [electronics, setElectronics] = useState([])
  const [clothing, setClothing] = useState([])
  const [toys, setToys] = useState([])
  const [item, setItem] = useState({})
  const [toggle, setToggle] = useState(false)

  // Load default products on start
  useEffect(() => {
    loadProductsFromBlockchain()
  }, [])

  const loadProductsFromBlockchain = async () => {
    if (!window.ethereum) {
      loadDefaultProducts()
      return
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)
      
      const network = await provider.getNetwork()
      const chainId = network.chainId.toNumber ? network.chainId.toNumber() : parseInt(network.chainId.toString())
      
      if (chainId !== 31337) {
        loadDefaultProducts()
        return
      }

      const contractAddress = config[31337]?.dappazon?.address
      if (!contractAddress) {
        loadDefaultProducts()
        return
      }

      const dappazon = new ethers.Contract(contractAddress, Dappazon, provider)
      setDappazon(dappazon)

      const items = []
      for (let i = 0; i < 9; i++) {
        const item = await dappazon.items(i + 1)
        if (item.id.toNumber() > 0) {
          items.push({
            id: item.id.toNumber(),
            name: item.name,
            category: item.category,
            image: getLocalImage(item.name.toLowerCase()),
            cost: item.cost.toString(),
            rating: item.rating.toNumber(),
            stock: item.stock.toNumber()
          })
        }
      }

      if (items.length > 0) {
        setElectronics(items.filter(i => i.category === 'electronics'))
        setClothing(items.filter(i => i.category === 'clothing'))
        setToys(items.filter(i => i.category === 'toys'))
      } else {
        loadDefaultProducts()
      }
    } catch (err) {
      console.log("Using default products")
      loadDefaultProducts()
    }
  }

  const loadDefaultProducts = () => {
    setElectronics(defaultProducts.filter(i => i.category === 'electronics'))
    setClothing(defaultProducts.filter(i => i.category === 'clothing'))
    setToys(defaultProducts.filter(i => i.category === 'toys'))
  }

  const getLocalImage = (name) => {
    const map = {
      'camera': cameraImg, 'drone': droneImg, 'headset': headsetImg,
      'shoes': shoesImg, 'sunglasses': sunglassesImg, 'watch': watchImg,
      'cube': cubeImg, 'train': trainImg, 'robot set': robotsImg,
    }
    return map[name] || cameraImg
  }

  const togglePop = (item) => {
    setItem(item)
    setToggle(true)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Navigation account={account} setAccount={setAccount} />
      <h2>Dappazon Best Sellers</h2>

      <div style={{ padding: '20px' }}>
        <Section title={"Clothing & Jewelry"} items={clothing} togglePop={togglePop} />
        <Section title={"Electronics & Gadgets"} items={electronics} togglePop={togglePop} />
        <Section title={"Toys & Gaming"} items={toys} togglePop={togglePop} />
      </div>

      {toggle && (
        <Product 
          item={item} 
          provider={provider} 
          account={account} 
          dappazon={dappazon} 
          togglePop={() => setToggle(false)} 
        />
      )}
    </div>
  );
}

export default App;
