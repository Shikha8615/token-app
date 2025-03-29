import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import React, { useState } from "react";

const TokenActions = () => {
    const wallet = useWallet();
    const [tokenAddress, setTokenAddress] = useState("");
    const connection = new Connection(clusterApiUrl("devnet"));

    const createToken = async () => {
        if (!wallet.publicKey) return alert("Connect your wallet first!");

        const mintAuthority = Keypair.generate();
        const token = await createMint(connection, wallet, mintAuthority.publicKey, null, 9);

        setTokenAddress(token.toBase58());
        alert("Token Created: " + token.toBase58());
    };

    return (
        <div>
            <button onClick={createToken}>Create Token</button>
            {tokenAddress && <p>Token Address: {tokenAddress}</p>}
        </div>
    );
};

export default TokenActions;
