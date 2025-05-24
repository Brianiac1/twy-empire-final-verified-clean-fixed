import { useState, useEffect } from "react";
import { ethers } from "ethers";

const WHITELIST = ["0x3a850885EE6A67611Ee6E5886CC2dC3830C73421"];

export default function Home() {
  const [wallet, setWallet] = useState(null);
  const [isEligible, setIsEligible] = useState(false);

  useEffect(() => {
    if (wallet) {
      const eligible = WHITELIST.map(a => a.toLowerCase()).includes(wallet.toLowerCase());
      setIsEligible(eligible);
    }
  }, [wallet]);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setWallet(address);
  };

  const buyWithETH = () => {
    alert("✅ buyWithETH() logic would execute here");
  };

  const buyWithUSDC = () => {
    alert("✅ buyWithUSDC() logic would execute here");
  };

  const claimTokens = () => {
    alert("✅ claimTokens() logic would execute here");
  };

  return (
    <div style={{
      backgroundColor: 'black',
      color: 'gold',
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <img src="/token.png" alt="$TWY" style={{ width: 180, marginBottom: '1.5rem' }} />
      <h1 style={{ fontSize: '2rem' }}>$TWY Web3 Empire</h1>
      <p>Say hello to The World, Chico... and Everything in it.</p>
      <button onClick={connectWallet} style={{ padding: '12px 24px', marginTop: '1.5rem' }}>Connect Wallet</button>
      {wallet && (
        <>
          <p style={{ marginTop: '1rem' }}>Connected: {wallet}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={buyWithETH} style={{ padding: '12px 24px' }}>Buy with ETH</button>
            <button onClick={buyWithUSDC} style={{ padding: '12px 24px' }}>Buy with USDC</button>
          </div>
          {isEligible ? (
            <button onClick={claimTokens} style={{ marginTop: '2rem', padding: '12px 24px' }}>Claim Tokens</button>
          ) : (
            <p style={{ color: 'gray', marginTop: '2rem' }}>You are not eligible to claim.</p>
          )}
        </>
      )}
    </div>
  );
}