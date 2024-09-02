// components/Trade.tsx
import { useState } from 'react';
import { useAleo } from '../context/aleocontext';

const Trade = () => {
    const { account, trade, getBalance } = useAleo();
    const [amount, setAmount] = useState<string>('');
    const [pair, setPair] = useState<string>('BTC/ETH');
    const [balance, setBalance] = useState<string>('0');

    const handleTrade = async () => {
        try {
            const result = await trade(pair, amount);
            console.log('Trade executed:', result);

            // Update balance after trade
            const updatedBalance = await getBalance(account.address);
            setBalance(updatedBalance);
        } catch (error) {
            console.error('Error executing trade:', error);
        }
    };

    return (
        <div>
            <h2>Trade</h2>
            <p>Account: {account.address}</p>
            <p>Balance: {balance}</p>
            <select value={pair} onChange={(e) => setPair(e.target.value)}>
                <option value="BTC/ETH">BTC/ETH</option>
                <option value="ETH/USDT">ETH/USDT</option>
            </select>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
            />
            <button onClick={handleTrade}>Execute Trade</button>
        </div>
    );
};

export default Trade;
