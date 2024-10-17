![](https://img.shields.io/badge/Base-Buildathon-blue)

# SavvyCircle: Micro-Lending Platform for African Small Business Owners

SavvyCircle is a decentralized micro-lending platform designed to empower small business owners in Africa. This platform leverages blockchain technology to create a transparent, efficient, and community-driven savings and loan system.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Smart Contract](#smart-contract)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Overview

SavvyCircle aims to address the financial inclusion challenges faced by small business owners in Africa. By utilizing smart contracts on the blockchain, we've created a platform that allows users to form savings groups, contribute funds, and access loans in a transparent and automated manner.

## Features

- **Group Creation**: Users can create or join savings groups.
- **Regular Savings**: Members contribute a fixed amount monthly to their group's pool.
- **Automated Loan Distribution**: The smart contract automatically distributes loans to eligible members.
- **Flexible Repayment**: Members can repay loans over time with a small interest rate.
- **Transparent Operations**: All transactions and group activities are recorded on the blockchain.
- **Chainlink Integration**: Utilizes Chainlink's Automation for timely loan distributions.

## Smart Contract

The core of SavvyCircle is the `ZiniSavings` smart contract. Key components include:

- ERC20 token integration for deposits and loans
- Group management system
- Automated loan distribution mechanism
- Repayment tracking
- Chainlink Automation compatibility

## How It Works

1. **Group Formation**: Users create or join a savings group.
2. **Regular Contributions**: Members make monthly contributions to their group's pool.
3. **Loan Distribution**:
   - When conditions are met, the contract automatically distributes loans.
   - Loans are given in two batches to ensure fairness.
4. **Repayment**: Members repay loans over a 3-month period with 5% interest.
5. **Cycle Continuation**: After full repayment, a new loan cycle can begin.

## Getting Started

To interact with the SavvyCircle platform:

1. Ensure you have a compatible wallet (e.g., MetaMask) and some test tokens.
2. Connect to the appropriate network where the contract is deployed.
3. Use the provided frontend interface or interact directly with the contract to:
   - Create or join a group
   - Make deposits
   - Receive loans (automatic)
   - Repay loans

Detailed instructions for deployment and interaction will be provided in separate documentation.

## Contributing

We welcome contributions to improve SavvyCircle! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

For more information, please contact [Your Contact Information].
