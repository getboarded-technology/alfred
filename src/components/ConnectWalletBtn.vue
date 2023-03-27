<template>
  <div>
    <b-button
      type="submit"
      block
      variant="primary"
      v-if="!walletAddress"
      @click="showWallets"
      color="#f2c046"
      class="connect__wallet__btn"
    >
      Connect Wallet
    </b-button>

    <div class="d-flex align-items-center" v-else>
      <div class="rounded-full overflow-hidden mx-1">
        <img
          class="avatar object-cover"
          :src="`https://source.boringavatars.com/beam/100/${avatarNameGenerator()}`"
          alt=""
        />
      </div>

      <div v-if="walletAddress">
        <h4 class="font-large">
          {{ walletAddress.slice(0, 5) }}....{{
            walletAddress.slice(walletAddress.length - 5, walletAddress.length)
          }}
        </h4>
      </div>
    </div>

    <div class="overlay__bg" v-if="wallet" @click="showWallets">
      <div class="overlay__inner" @click.stop>
        <div
          class="my-1 w-100 d-flex justify-content-between align-center px-2"
        >
          <h2 class="font-semibold">Connect to wallet</h2>
          <h2 class="text-grey cursor-pointer" @click="showWallets">X</h2>
        </div>
        <!-- wallet type  -->
        <div class="overlay__inner__wallet__type px-2">
          <button
            v-for="(walletType, index) in walletTypes"
            @click.prevent="walletUse(walletType.type)"
            class="my-1 overlay__inner__wallet__type__btn rounded-md"
            :key="index"
          >
            <span class="text-xl text-black font-bold m-0">{{
              walletType.name
            }}</span>
            <!-- <div
              v-if="walletType.type === 'metamask'"
              class="text-xl text-grey d-flex m-0"
            >
               Networks
              <span>
                <vs-icon class="mx-1" size="small" icon="info"></vs-icon>
              </span>
            </div> -->
            <img
              class="overlay__inner__wallet__type__icon"
              :src="walletType.imgSrc"
            />
          </button>
          <div class="font-medium text-lg">
            <p>
              Data policies in compliance with the
              <a
                href="https://fairdatasociety.org/"
                target="blank"
                class="text-sky-600 cursor-pointer"
                style="color: #2563eb"
                >Fair Data Society Principles.</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BButton } from "bootstrap-vue";
import metamask from "@/assets/images/wallet/Metamask.svg";
import intmax from "@/assets/images/wallet/intmax.svg";
// import coinbase from "@/assets/images/wallet/Coinbase.svg";
import walletconnect from "@/assets/images/wallet/WalletConnect.svg";
// import unstopableDomain from "@/assets/images/wallet/unstopableDomains.svg";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import UAuth from "@uauth/js";
import { IntmaxWalletSigner } from "webmax";
// import constants from "../../../constants";

export default {
  name: "ConnectWalletButton",
  data() {
    return {
      wallet: false,
      walletTypes: [
        {
          type: "metamask",
          name: "Metamask",
          imgSrc: metamask,
        },
        {
          type: "intmax",
          name: "Itnmax",
          imgSrc: intmax,
        },
        {
          type: "walletConnect",
          name: "WalletConnect",
          imgSrc: walletconnect,
        },
        // {
        //   type: "coinbaseWallet",
        //   name: "Coinbase Wallet",
        //   imgSrc: coinbase,
        // },
        // {
        //   type: "unstopableDomain",
        //   name: "Connect Unstoppable Domains",
        //   imgSrc: unstopableDomain,
        // },
      ],
      publicAddress: "",
      coinbase: "",
    };
  },
  components: {
    BButton,
  },
  computed: {
    userData() {
      return this.$store.state.user.user;
    },
    walletAddress() {
      return this.$store.state.user.user.walletAddress;
    },
    orgWalletAddress() {
      return this.$store.state.org.org.walletAddress;
    },
    avatarNameGenerator() {
      return this.$store.state.user.avatarNameGenerator;
    },
  },
  methods: {
    showWallets() {
      this.wallet = !this.wallet;
    },
    async connectCoinbase() {
      // Initialize Coinbase Wallet SDK
      const coinbaseWallet = new CoinbaseWalletSDK({
        appName: "ALFRED",
        appLogoUrl: "../../assets/images/wallet/Coinbase.svg",
        darkMode: false,
      });

      // Initialize a Web3 Provider object
      const ethereum = coinbaseWallet.makeWeb3Provider(
        "https://mainnet.infura.io/v3/97e74bd317314078b07820c97fabd54d",
        1
      );
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      // const coinbase = await web3.eth.getCoinbase();
      // if (!coinbase) {
      //   this.$vs.notify({
      //     title: this.$t("Login.notify.title"),
      //     text: this.$t("Metamasklogin.activate"),
      //     iconPack: "feather",
      //     icon: "icon-alert-circle",
      //     color: "warning",
      //   });
      // }
      this.publicAddress = account.toLowerCase();
      this.publicAddress = account.toLowerCase();
      this.$store.dispatch("updateWalletInfo", {
        walletAddress: this.publicAddress,
      });
      if (this.walletAddress.slice(0, 5)) {
        this.$router.push("/account-type");
        this.wallet = false;
      }
    },
    async connectMetaMask() {
      this.coinbase = false;
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      this.move(account);
      this.$store.commit("user/UPDATE_WALLET_INFO", account);
      const payload = {
        walletAddress: account,
      };
      this.$store
        .dispatch("user/saveUserDetails", payload)
        .then((res) => {
          this.move(res.data.user.walletAddress);
        })
        .catch(() => {
          return;
        });
    },
    async walletConnect(web3) {
      const provider = new WalletConnectProvider({
        rpc: {
          1: "https://mainnet.mycustomnode.com",
          3: "https://ropsten.mycustomnode.com",
          100: "https://dai.poa.network",
          // ...
        },
      });
      await provider.enable();

      const accounts = await this.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      const coinbase = await web3.eth.getCoinbase();
      if (!coinbase) {
        this.$vs.notify({
          title: this.$t("Login.notify.title"),
          text: this.$t("Metamasklogin.activate"),
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning",
        });
      }
      this.publicAddress = account.toLowerCase();
      this.$store.dispatch("updateWalletInfo", {
        walletAddress: this.publicAddress,
      });
      // if (this.walletAddress.slice(0, 5)) {
      //   this.$router.push("/account-type");
      //   this.wallet = false;
      // }
    },
    async intMax() {
      try {
        const signer = new IntmaxWalletSigner();
        const account = await signer.connectToAccount({
          extraKeys: ["publicKey"],
        });
        this.publicAddress = account.address.toLowerCase();
        this.$store.commit("user/UPDATE_WALLET_INFO", this.publicAddress);
        const payload = {
          walletAddress: this.publicAddress,
        };
        this.$store
          .dispatch("user/saveUserDetails", payload)
          .then((res) => {
            this.move(res.data.user.walletAddress);
          })
          .catch(() => {
            return;
          });
      } catch (error) {
        console.error(error);
      }
    },

    async connectunstopableDomain() {
      const uauth = new UAuth({
        clientID: "332bb91f-49d2-4dae-ae6a-896a38905409",
        redirectUri: "",
      });

      uauth
        .login()
        .then((user) => {
          // user exists
          console.log("User information:", user);
        })
        .catch(() => {
          // user does not exist
        });
    },
    walletUse(type) {
      const web3 = new Web3(Web3.givenProvider);
      if (!web3.givenProvider) {
        this.$vs.notify({
          title: this.$t("Login.notify.title"),
          text: this.$t("Metamasklogin.install"),
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning",
        });
      } else {
        this.showWallets();
        if (type === "metamask") {
          return this.connectMetaMask(web3);
        } else if (type === "walletConnect") {
          this.walletConnect(web3);
        } else if (type === "coinbaseWallet") {
          this.connectCoinbase(web3);
        } else if (type === "intmax") {
          this.intMax(web3);
        } else {
          // this.connectunstopableDomain();
          return;
        }
      }
    },
    move(address) {
      if (address && address.slice(0, 5)) {
        this.$store.commit("user/SET_USER_LOGGED", true);
        const path = `/account-type`;
        if (this.$route.path !== path) this.$router.push(path);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.connect__wallet__btn {
  background: linear-gradient(90deg, #f8be17 0%, #ffce42 101.56%) !important;
  width: 100%;
  color: #000;
  padding: 0.5em 0.75em;
  font-size: 1.25em;
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
}

.avatar {
  width: 3em;
  height: 3em;
}
.overlay {
  &__bg {
    top: 0;
    left: 0;
    z-index: 100;
    background-color: #21211f77;
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__inner {
    width: 30%;
    padding: 1.5em 0.5em;
    border-radius: 5px;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    &__wallet__type {
      &__btn {
        padding: 2em 1em;
        background-color: #f2f3f5;
        width: 100%;
        border-radius: 6px;
        border: 2px solid #dbdde5;
        height: 50px;
        display: inline-flex !important;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        &:hover {
          box-shadow: 0 4px 8px 0 rgba(175, 165, 165, 0.527);
          transform: scale(1.1);
          transition: transform 0.2s;
        }
      }
    }
  }
}

@media only screen and (max-width: 991px) {
  .overlay {
    &__inner {
      width: 85%;
    }
  }
}
</style>
