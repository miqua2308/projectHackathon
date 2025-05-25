import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Navbar from "./Navbar";

interface WalletConnectionAlertProps {
  message?: string;
}

const WalletConnectionAlert: React.FC<WalletConnectionAlertProps> = ({
  message = "Please connect your wallet to continue",
}) => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
        <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="mb-6">{message}</p>
        <WalletMultiButton className="!rounded-button bg-green-500 border-none hover:bg-green-600" />
      </div>
    </div>
  );
};

export default WalletConnectionAlert;
