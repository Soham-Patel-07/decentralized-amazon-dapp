import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const Navigation = ({ account, setAccount }) => {
    const [chainId, setChainId] = useState(null)
    
    useEffect(() => {
        const checkConnection = async () => {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' })
                    if (accounts.length > 0) {
                        setAccount(accounts[0])
                    }
                    
                    const network = await new ethers.providers.Web3Provider(window.ethereum).getNetwork()
                    setChainId(network.chainId.toNumber())
                } catch (err) {
                    console.error(err)
                }
            }
        }
        
        checkConnection()
        
        // Listen for account changes
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0])
                } else {
                    setAccount(null)
                }
            })
            
            window.ethereum.on('chainChanged', () => {
                window.location.reload()
            })
        }
    }, [setAccount])

    const connectHandler = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length > 0) {
                setAccount(accounts[0])
            }
        } catch (err) {
            console.error("Error connecting:", err)
        }
    }

    const displayAccount = account 
        ? account.slice(0, 6) + '...' + account.slice(38, 42)
        : null

    return (
        <nav>
            <div className='nav__brand'>
                <h1>Dappazon</h1>
                {chainId && <span style={{ fontSize: '12px', color: '#888' }}>Chain: {chainId}</span>}
            </div>

            <input
                type="text"
                className="nav__search"
            />

            <button
                type="button"
                className='nav__connect'
                onClick={connectHandler}
            >
                {displayAccount || 'Connect'}
            </button>

            <ul className='nav__links'>
                <li><a href="#Clothing & Jewelry">Clothing & Jewelry</a></li>
                <li><a href="#Electronics & Gadgets">Electronics & Gadgets</a></li>
                <li><a href="#Toys & Gaming">Toys & Gaming</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;