<template>
  <div class="wallet-card">
    <div class="wallet-card-1-circle" />
    <div class="wallet-card-2-circle" />
    <div class="wallet-card-3-circle" />
    <div class="wallet-card-4-circle" />
    <div class="wallet-card-section1">
      <h1 class="wallet-card-wallet-text">Wallet</h1>
      <h1 class="wallet-card-wallet-amount">{{ userData.xp }} XP's</h1>
      <h1 class="wallet-card-wallet-amount w-100">
        {{ userData.xp }} Knowledge Tokens
      </h1>
      <!-- <div class="wallet-card-sync-pending">
        <div>
          <h2 class="wallet-card-sync-pending-heading">Synced</h2>
          <h2 class="wallet-card-sync-pending-desc">40.34</h2>
        </div>
        <div>
          <h2 class="wallet-card-sync-pending-heading">Pending</h2>
          <h2 class="wallet-card-sync-pending-desc">23.04</h2>
        </div>
      </div> -->
    </div>
    <div class="wallet-card-section2">
      <div class="wallet-card-bttn" @click="redeemXpForKnowledge">
        <h1 class="wallet-card-bttn-text m-0">Sync</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { signingMessage, recoverAddress } from "@/utils/signMessage";
import { ethers } from "ethers";
import axios from "@/libs/axios";
export default {
  data() {
    return {
      web3Provider: "",
      signer: "",
      contractAddress: "0x2ff26C2A2fCf7ead5a1b8133303a33367b3B7F59",
      tokenAddress: "0x7007D4Dc65D768e275DDA842deB1cD793cf99642",
    };
  },
  computed: {
    userData() {
      return this.$store.state.user.user;
    },
  },
  watch: {
    userData: {
      handler(newVal) {
        newVal && newVal.walletAddress ? this.getBalance() : "";
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async connectWeb3() {
      if (!window.undefined) {
        this.web3Provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        );
        this.rpcProvider = new ethers.providers.JsonRpcProvider(
          "https://polygon-mumbai.g.alchemy.com/v2/TwQzqczuq7B6cecbFBZ3cmOjlN8Lt-vL"
        );
        // Prompt user for account connections
        await this.web3Provider.send("eth_requestAccounts", []);
        this.signer = this.web3Provider.getSigner();
        //console.log("Account:", await this.signer.getAddress());
      } else {
        //console.log("Window is undefined");
      }
    },
    async redeemXpForKnowledge() {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      this.connectWeb3();
      const signersAddress = await this.signer.getAddress();
      const { signature, messageHash } = await signingMessage(
        this.xpAmount,
        this.signer
      );
      if (recoverAddress(messageHash, signature, signersAddress)) {
        axios
          .post("https://api.getboarded.xyz/api/vault/redeem", {
            xpAmount: this.userData.xp,
            signature,
            signersAddress,
            contractAddress: this.contractAddress,
            chainId: parseInt(chainId, 16).toString(),
          })
          .then((res) => {
            if (res) {
              const payload = {
                id: this.userData._id,
                updatedDetails: { xp: this.userData.xp - this.userData.xp },
              };
              this.$store
                .dispatch("user/editUserData", payload)
                .then(() => {
                  //console.log(res);
                })
                .catch(() => {
                  return;
                });
            }
          })
          .catch(() => {
            //console.log(err);
          });
      } else {
        //console.log("Signature is invalid");
      }
    },

    async getBalance() {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const payload = {
        tokenAddress: this.tokenAddress,
        signerAddress: this.userData.walletAddress,
        chainId: parseInt(chainId, 16).toString(),
      };
      this.$store
        .dispatch("org/getOrgBalance", payload)
        .then(() => {
          //console.log(res);
        })
        .catch(() => {
          //console.log(err);
        });
    },
  },
  created() {
    this.getBalance();
  },
};
</script>

<style lang="scss" scoped>
.wallet-card {
  position: sticky;
  top: 7.5em;
  &-section1 {
    width: 70%;
  }
}
</style>
