export const contractAddress = "0x57aa54a38243f8df625a0d24f8a8f77cf4663060";
export const abi = [{ "type": "constructor", "inputs": [{ "name": "_token", "type": "address", "internalType": "address" }], "stateMutability": "nonpayable" }, { "type": "function", "name": "LOAN_DURATION", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "LOAN_INTEREST_RATE", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "LOAN_PRECISION", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "LOCK_PERIOD", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "createGroup", "inputs": [{ "name": "_name", "type": "string", "internalType": "string" }, { "name": "user", "type": "address", "internalType": "address" }, { "name": "_groupId", "type": "int256", "internalType": "int256" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "deposit", "inputs": [{ "name": "_groupId", "type": "int256", "internalType": "int256" }], "outputs": [], "stateMutability": "payable" }, { "type": "function", "name": "distributeLoans", "inputs": [{ "name": "_groupId", "type": "int256", "internalType": "int256" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "getAmountRepaid", "inputs": [{ "name": "_groupId", "type": "int256", "internalType": "int256" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "getContractTokenBalance", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "getGroupMonthlySavings", "inputs": [{ "name": "_groupId", "type": "int256", "internalType": "int256" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "getGroupTotalLoanGiveOut", "inputs": [{ "name": "_groupId", "type": "int256", "internalType": "int256" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "getGroupTotalRepaidLoan", "inputs": [{ "name": "_groupId", "type": "int256", "internalType": "int256" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "getGroupTotalSavings", "inputs": [{ "name": "_groupId", "type": "int256", "internalType": "int256" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "getGroups", "inputs": [{ "name": "groupIds", "type": "int256[]", "internalType": "int256[]" }], "outputs": [{ "name": "", "type": "tuple[]", "internalType": "struct ZiniSavings.GroupInfo[]", "components": [{ "name": "monthlyContribution", "type": "uint256", "internalType": "uint256" }, { "name": "totalSavings", "type": "uint256", "internalType": "uint256" }, { "name": "loanGivenOut", "type": "uint256", "internalType": "uint256" }, { "name": "repaidLoan", "type": "uint256", "internalType": "uint256" }, { "name": "creationTime", "type": "uint256", "internalType": "uint256" }, { "name": "name", "type": "string", "internalType": "string" }, { "name": "admin", "type": "address", "internalType": "address" }, { "name": "memberCount", "type": "uint256", "internalType": "uint256" }] }], "stateMutability": "view" }, { "type": "function", "name": "getOutStandingLoan", "inputs": [{ "name": "_groupId", "type": "int256", "internalType": "int256" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "getTestTokens", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "getUserGroups", "inputs": [{ "name": "user", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "int256[]", "internalType": "int256[]" }], "stateMutability": "view" }, { "type": "function", "name": "groupCount", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "groups", "inputs": [{ "name": "", "type": "int256", "internalType": "int256" }], "outputs": [{ "name": "monthlyContribution", "type": "uint256", "internalType": "uint256" }, { "name": "totalSavings", "type": "uint256", "internalType": "uint256" }, { "name": "loanGivenOut", "type": "uint256", "internalType": "uint256" }, { "name": "repaidLoan", "type": "uint256", "internalType": "uint256" }, { "name": "creationTime", "type": "uint256", "internalType": "uint256" }, { "name": "firstHalfLoanDistributed", "type": "bool", "internalType": "bool" }, { "name": "secondHalfLoanDistributed", "type": "bool", "internalType": "bool" }, { "name": "firstBatchRepaidCount", "type": "uint256", "internalType": "uint256" }, { "name": "name", "type": "string", "internalType": "string" }, { "name": "admin", "type": "address", "internalType": "address" }, { "name": "memberCount", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "joinGroup", "inputs": [{ "name": "_groupId", "type": "int256", "internalType": "int256" }, { "name": "user", "type": "address", "internalType": "address" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "loans", "inputs": [{ "name": "", "type": "address", "internalType": "address" }, { "name": "", "type": "int256", "internalType": "int256" }], "outputs": [{ "name": "totalAmount", "type": "uint256", "internalType": "uint256" }, { "name": "amountRepaid", "type": "uint256", "internalType": "uint256" }, { "name": "monthlyPayment", "type": "uint256", "internalType": "uint256" }, { "name": "nextPaymentDue", "type": "uint256", "internalType": "uint256" }, { "name": "fullyRepaid", "type": "bool", "internalType": "bool" }, { "name": "isFirstBatch", "type": "bool", "internalType": "bool" }], "stateMutability": "view" }, { "type": "function", "name": "repayLoan", "inputs": [{ "name": "_groupId", "type": "int256", "internalType": "int256" }, { "name": "_amount", "type": "uint256", "internalType": "uint256" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "setMonthlyContribution", "inputs": [{ "name": "_groupId", "type": "int256", "internalType": "int256" }, { "name": "_amount", "type": "uint256", "internalType": "uint256" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "token", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "contract IERC20" }], "stateMutability": "view" }, { "type": "event", "name": "DepositMade", "inputs": [{ "name": "groupId", "type": "int256", "indexed": true, "internalType": "int256" }, { "name": "member", "type": "address", "indexed": false, "internalType": "address" }, { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }], "anonymous": false }, { "type": "event", "name": "GroupCreated", "inputs": [{ "name": "groupId", "type": "int256", "indexed": true, "internalType": "int256" }, { "name": "name", "type": "string", "indexed": false, "internalType": "string" }, { "name": "admin", "type": "address", "indexed": false, "internalType": "address" }], "anonymous": false }, { "type": "event", "name": "LoanDistributed", "inputs": [{ "name": "groupId", "type": "int256", "indexed": true, "internalType": "int256" }, { "name": "borrower", "type": "address", "indexed": false, "internalType": "address" }, { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }, { "name": "isFirstBatch", "type": "bool", "indexed": false, "internalType": "bool" }], "anonymous": false }, { "type": "event", "name": "LoanRepayment", "inputs": [{ "name": "groupId", "type": "int256", "indexed": true, "internalType": "int256" }, { "name": "borrower", "type": "address", "indexed": false, "internalType": "address" }, { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }], "anonymous": false }, { "type": "event", "name": "MemberJoined", "inputs": [{ "name": "groupId", "type": "int256", "indexed": true, "internalType": "int256" }, { "name": "member", "type": "address", "indexed": true, "internalType": "address" }], "anonymous": false }, { "type": "event", "name": "SavingsDeposited", "inputs": [{ "name": "groupId", "type": "int256", "indexed": true, "internalType": "int256" }, { "name": "member", "type": "address", "indexed": false, "internalType": "address" }, { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }], "anonymous": false }, { "type": "error", "name": "AddressEmptyCode", "inputs": [{ "name": "target", "type": "address", "internalType": "address" }] }, { "type": "error", "name": "AddressInsufficientBalance", "inputs": [{ "name": "account", "type": "address", "internalType": "address" }] }, { "type": "error", "name": "FailedInnerCall", "inputs": [] }, { "type": "error", "name": "ReentrancyGuardReentrantCall", "inputs": [] }, { "type": "error", "name": "SafeERC20FailedOperation", "inputs": [{ "name": "token", "type": "address", "internalType": "address" }] }]