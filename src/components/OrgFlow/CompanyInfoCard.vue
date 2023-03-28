<template>
  <div class="companyInfoCard-section1">
    <div class="companyInfoCard-section1-left">
      <div class="companyInfoCard-logo">
        <img
          v-if="orgDetails && orgDetails.name"
          class="w-100 h-100"
          :src="
            require(`@/assets/images/organization/${orgDetails.name.toLowerCase()}/logo.png`)
          "
          alt="Avatar"
          style="/* object-it: contain !important; */"
        />
      </div>
      <h2 class="companyInfoCard-company-text">{{ orgDetails.name }}</h2>
      <a
        :href="orgDetails.website"
        target="_blank"
        class="companyInfoCard-website-text"
        >{{ orgDetails.website }}</a
      >
      <div class="companyInfoCard-socialLink">
        <font-awesome-icon icon="fa-brands fa-facebook" />
        <font-awesome-icon icon="fa-brands fa-twitter" />
        <font-awesome-icon icon="fa-brands fa-linkedin" />
        <font-awesome-icon icon="fa-brands fa-instagram" />
        <font-awesome-icon icon="fa-brands fa-github" />
      </div>
      <div class="companyInfoCard-bttn">
        <b-button
          variant="secondary"
          size="sm"
          @click="$store.commit('modals/OPEN_MODIFY_ORG_POPUP', true)"
          >Manage</b-button
        >
      </div>
    </div>
    <div class="companyInfoCard-section1-right">
      <h2 class="companyInfoCard-about-text">About</h2>
      <p class="companyInfoCard-desc-text">
        {{ orgDetails.about }}
      </p>
      <div class="companyInfoCard-company-info">
        <div class="companyInfoCard-info-card">
          <h4 class="companyInfoCard-info-title">ACTIVE Members</h4>
          <h4
            class="companyInfoCard-info-detail"
            v-if="orgUsers && orgUsers.length"
          >
            {{ orgUsers.length }}
          </h4>
        </div>
        <!-- <div class="companyInfoCard-info-card">
          <h4 class="companyInfoCard-info-title">community size</h4>
          <h4 class="companyInfoCard-info-detail">100+</h4>
        </div> -->
        <!-- <div class="companyInfoCard-info-card">
          <h4 class="companyInfoCard-info-title">Treasury</h4>
          <h4 class="companyInfoCard-info-detail">$45678.23401010</h4>
        </div> -->
        <!-- <div class="companyInfoCard-info-card">
          <h4 class="companyInfoCard-info-title">Dollar</h4>
          <h4 class="companyInfoCard-info-detail">$ 1237754</h4>
        </div> -->
        <div class="companyInfoCard-info-card">
          <h4 class="companyInfoCard-info-title">
            Knowledge Token 
          </h4>
          <h4 class="companyInfoCard-info-detail">
            {{ orgKnowledgeToken ? orgKnowledgeToken : 0 }}
          </h4>
        </div>
        <div class="companyInfoCard-info-card">
          <h4 class="companyInfoCard-info-title">XP</h4>
          <h4 class="companyInfoCard-info-detail">
            {{ (orgKnowledgeToken ? orgKnowledgeToken : 0) * 100 }}
          </h4>
        </div>

        <!-- <div class="companyInfoCard-info-card">
          <h4 class="companyInfoCard-info-title">Crypto</h4>
          <h4 class="companyInfoCard-info-detail">$45678.23401010</h4>
        </div> -->
      </div>
      <!-- <div class="companyInfoCard-token">
        <p class="companyInfoCard-info-token">
          Token: 2 Tokens | 1 Liquidity Pool
        </p>
      </div> -->
    </div>
  </div>
</template>

<script>
import { BButton } from "bootstrap-vue";

export default {
  name: "CompanyInfoCard",
  components: {
    BButton,
  },
  data() {
    return {
      tokenAddress: "0x7007D4Dc65D768e275DDA842deB1cD793cf99642",
      signerAddress: "0x2ff26C2A2fCf7ead5a1b8133303a33367b3B7F59",
    };
  },
  props: {
    orgDetails: { type: Object, required: true },
    orgUsers: { type: Array },
  },
  computed: {
    orgKnowledgeToken() {
      return this.$store.state.org.orgKnowledgeToken;
    },
  },
  methods: {
    async getBalance() {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const payload = {
        tokenAddress: this.tokenAddress,
        signerAddress: this.signerAddress,
        chainId: parseInt(chainId, 16).toString(),
      };
      this.$store
        .dispatch("org/getOrgBalance", payload)
        .then((res) => {
          this.$store.commit("org/SET_ORG_KNT", res.balance);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getBalance();
  },
};
</script>
