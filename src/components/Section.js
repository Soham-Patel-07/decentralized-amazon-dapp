import { ethers } from 'ethers'
import Rating from './Rating'

const Section = ({ title, items, togglePop }) => {
    const formatCost = (cost) => {
        try {
            return ethers.utils.formatUnits(cost.toString(), 'ether')
        } catch {
            return "0"
        }
    }
    
    const getRating = (rating) => {
        try {
            return rating?.toNumber ? rating.toNumber() : rating || 0
        } catch {
            return 0
        }
    }

    if (!items || items.length === 0) {
        return null
    }
    
    return (
        <div className='cards__section'>
            <h3 id={title}>{title}</h3>
            <hr />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {items.map((item, index) => (
                    <div 
                        key={index} 
                        onClick={() => togglePop(item)}
                        style={{ 
                            width: '250px', 
                            border: '1px solid #ddd', 
                            borderRadius: '8px', 
                            overflow: 'hidden',
                            cursor: 'pointer'
                        }}
                    >
                        <div style={{ width: '100%', height: '200px', backgroundColor: '#f5f5f5' }}>
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                        </div>
                        <div style={{ padding: '10px' }}>
                            <h4>{item.name}</h4>
                            <Rating value={getRating(item.rating)} />
                            <p>{formatCost(item.cost)} ETH</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Section;