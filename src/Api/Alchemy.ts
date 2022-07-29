import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
    apiKey: process.env.API_KEY_ALCHEMY,
    network: Network.ETH_MAINNET
};

export default new Alchemy(settings);