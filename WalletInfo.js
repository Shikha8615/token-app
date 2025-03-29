import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const WalletInfo = () => {
    const wallet = useWallet();
    const [balance, setBalance] = useState(null);
    const connection = new Connection(clusterApiUrl("devnet"));

    useEffect(() => {
        const fetchBalance = async () => {
            if (wallet.publicKey) {
                const balance = await connection.getBalance(wallet.publicKey);
                setBalance(balance / 1e9);
            }
        };
        fetchBalance();
    }, [wallet.publicKey]);

    return (
        <div>
            {wallet.connected ? (
                <div>
                    <p>Wallet Address: {wallet.publicKey?.toBase58()}</p>
                    <p>Balance: {balance} SOL</p>
                </div>
            ) : (
                <p>Connect your wallet</p>
            )}
        </div>
    );
};

export default WalletInfo;
