import { ethers } from 'ethers';
import IndonesiaWeb3ServicesABI from '../contracts/IndonesiaWeb3Services.json';

const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE';

export async function getContract() {
    if (!window.ethereum) throw new Error('MetaMask not installed');
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, IndonesiaWeb3ServicesABI.abi, signer);
    return contract;
}

export async function payTax(amountEther) {
    const contract = await getContract();
    const tx = await contract.payTax({ value: ethers.utils.parseEther(amountEther) });
    await tx.wait();
    return tx.hash;
}

export async function payRetribution(amountEther) {
    const contract = await getContract();
    const tx = await contract.payRetribution({ value: ethers.utils.parseEther(amountEther) });
    await tx.wait();
    return tx.hash;
}
