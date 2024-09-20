# ![ChainQuery Logo](chain-query.svg) ChainQuery: Blockchain RPC Explorer


## 🚀 Overview

ChainQuery is a cutting-edge, full-stack web application designed to explore and interact with Solana and Ethereum blockchains through their respective RPC (Remote Procedure Call) interfaces. Built with React, Next.js, and TypeScript, this application serves as a powerful tool for blockchain developers, researchers, and enthusiasts.

## 🌟 Key Features

- **Multi-Blockchain Support**: Seamlessly interact with both Solana and Ethereum networks.
- **Pre-built RPC Calls**: Execute common RPC methods with a user-friendly interface.
- **Custom RPC Playground**: Experiment with any RPC method using our flexible playground.
- **Real-time Results**: View blockchain data instantly with our responsive UI.
- **Dark Mode Support**: Toggle between light and dark themes for comfortable viewing.
- **Responsive Design**: Fully functional on desktop and mobile devices.

## 💻 Technical Stack

- **Frontend**: React, Next.js, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Blockchain Interaction**: @solana/web3.js, ethers.js
- **API Routes**: Next.js API Routes
- **State Management**: React Hooks
- **Version Control**: Git

## 🛠 Features in Detail

### Solana Explorer
- Get Account Info
- Get Balance
- Get Transaction Details
- Fetch Block Information

### Ethereum Explorer
- Get Account Balance
- Fetch Block by Number
- Get Transaction by Hash
- Retrieve Current Gas Price

### RPC Playground
- Select between Solana and Ethereum
- Input custom RPC methods
- Provide parameters in JSON format
- Execute and view results in real-time


## 🚀 Getting Started

1. Clone the repository

```plaintext
git clone https://github.com/HashirAKB/chain-query.git
```


2. Install dependencies

```plaintext
cd chainquery
npm install
```


3. Set up environment variables

```plaintext
SOLANA_RPC_URL=your_solana_rpc_url
ETHEREUM_RPC_URL=your_ethereum_rpc_url
```


4. Run the development server

```plaintext
npm run dev
```


5. Open [http://localhost:3000](http://localhost:3000) in your browser


## 🛣 Roadmap

- Add support for more blockchain networks
- Implement user authentication for saved queries
- Create visualizations for blockchain data
- Develop a CLI version of ChainQuery


## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to submit pull requests, report issues, or request features.


## 🙏 Acknowledgements

- [Solana Web3.js](https://github.com/solana-labs/solana-web3.js)
- [Ethers.js](https://docs.ethers.io/v5/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Next.js](https://nextjs.org/)


---

Built with ❤️ by HashirAKB