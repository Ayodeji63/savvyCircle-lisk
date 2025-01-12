// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";

contract HelperConfig is Script {
    struct NetworkConfig {
        address token;
        uint256 deployerKey;
    }

    NetworkConfig public activeNetworkConfig;
    uint256 public DEFAULT_ANVIL_KEY =
        0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6;

    constructor() {
        if (block.chainid == 4202 || block.chainid == 534351) {
            activeNetworkConfig = getOtherChainConfig();
        }
        if (block.chainid == 84532) {
            activeNetworkConfig = getBaseSepoliaConfig();
        } else {
            activeNetworkConfig = getOrCreateAnvilEthConfig();
        }
    }

    function getOrCreateAnvilEthConfig() public returns (NetworkConfig memory) {
        vm.startBroadcast();
        ERC20Mock _token = new ERC20Mock();
        vm.stopBroadcast();

        return
            NetworkConfig({
                token: address(_token),
                deployerKey: DEFAULT_ANVIL_KEY
            });
    }

    function getOtherChainConfig() public returns (NetworkConfig memory) {
        vm.startBroadcast();
        // ERC20Mock _token = new ERC20Mock();
        vm.stopBroadcast();
        // 0x4cbeb5E0793b6b741E32D20349A33938Fe9eCF3f
        return
            NetworkConfig({
                token: 0x75cc21cB369C86DEb89d31ef522FeD38223C08fe,
                deployerKey: vm.envUint("PRIVATE_KEY")
            });
    }

    function getBaseSepoliaConfig() public returns (NetworkConfig memory) {
        vm.startBroadcast();
        // ERC20Mock _token = new ERC20Mock();
        vm.stopBroadcast();
        // 0x4cbeb5E0793b6b741E32D20349A33938Fe9eCF3f
        return
            NetworkConfig({
                token: 0xF998be67eA24466978a102D9f4aD03bf27aEEeD3,
                deployerKey: vm.envUint("PRIVATE_KEY")
            });
    }
}
