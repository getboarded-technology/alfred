<template>
  <div
    class="login"
    :class="isOTPSent ? 'd-flex justify-content-center align-items-center' : ''"
  >
    <div
      v-show="!isOTPSent"
      class="login-section1"
    >
      <b-link>
        <img
          :src="
            theme === 'dark'
              ? require('../assets/images/dark/logo/Getboarded_Logo.png')
              : require('../assets/images/light/logo/Getboarded_Logo.png')
          "
          alt=""
        >
      </b-link>
      <b-col
        sm="8"
        md="6"
        lg="12"
        class="login-section1-content"
      >
        <h2 class="login-heading">
          Login
        </h2>
        <h3 class="login-subheading">
          To sign up or log in you only have to provide <br>
          your email address
        </h3>

        <hr>

        <b-form
          class="login-form"
          @submit.prevent
        >
          <validation-observer ref="loginValidation">
            <b-form-group
              label="Email"
              label-for="login-email"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-form-input
                  id="login-email"
                  v-model="userEmail"
                  :state="errors.length > 0 ? false : null"
                  name="login-email"
                  placeholder="user@getBoarded.com"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </validation-observer>
          <b-form-group>
            <b-button
              type="submit"
              block
              variant="primary"
              class="login-btn p-1"
              @click="validationForm"
            >
              Get OTP
            </b-button>
            <h5 class="text-center m-2">
              OR
            </h5>
            <!-- <b-button
              type="submit"
              variant="outline-dark"
              block
              class="login-btn p-1"
              @click="connectToMetamask"
            >
              <span class="login-btn-text">Connect with Wallet</span>
            </b-button> -->
            <connect-wallet-btn/>
          </b-form-group>
        </b-form>
      </b-col>
    </div>
    <div
      v-show="!isOTPSent"
      class="login-section2"
    >
      <b-col
        lg="8"
        class="d-none d-lg-flex flex-column align-items-center h-100"
      >
        <div class="container w-100 h-100 d-flex justify-content-center p-5">
          <div
            v-if="slide === 1"
            class="p-1"
          >
            <card />
            <small-card
              msg="Willing Risk Taker"
              :icon="require('@/assets/images/avatars/card1.png')"
              :opacity="70"
            />
            <small-card
              msg="Sound Decision Maker"
              :icon="require('@/assets/images/avatars/card2.png')"
              :opacity="50"
            />
            <small-card
              msg="Skilled Communicator"
              :icon="require('@/assets/images/avatars/card3.png')"
              :opacity="20"
            />
            <div class="text-center  pt-3">
              <h3 class="login-heading">
                Create Profile
              </h3>
              <h4 class="login-subheading">
                Craft your personality & skill-based profiles, <br>
                highlight your talents & be found
              </h4>
            </div>
          </div>

          <div
            v-if="slide === 2"
            class="slide-in-right d-flex flex-column align-items-center justify-content-center p-5"
          >
            <img :src="explore">
            <div class="text-center  pt-3">
              <h3 class="login-heading">
                Explore Apps
              </h3>
              <h4 class="login-subheading">
                Get tons of activities done by exploring multiple <br>
                apps; work smarter & faster
              </h4>
            </div>
          </div>
          <div
            v-if="slide === 3"
            class="slide-in-right d-flex flex-column align-items-center justify-content-center p-5"
          >
            <img :src="community">
            <div class="text-center  pt-3">
              <h3 class="login-heading">
                Build Communities
              </h3>
              <h4 class="login-subheading">
                Engage in your community; participate, share & <br>
                get work done quicker
              </h4>
            </div>
          </div>
        </div>
        <div
          class="login-indicator-container"
          style="height: 1px"
        >
          <div
            class="login-indicator"
            style="display: inline-block; !important width: 2rem; !important  !important"
            :class="slide === 1 ? 'bg-primary' : 'bg-light'"
            @click="slide = 1"
          />
          <div
            :class="slide === 2 ? 'bg-primary' : ' bg-white'"
            class="login-indicator"
            style="display: inline-block; !important width: 2rem; !important  !important"
            @click="slide = 2"
          />
          <div
            :class="slide === 3 ? 'bg-primary' : 'bg-white'"
            class="login-indicator"
            style="display: inline-block; !important width: 2rem; !important  !important"
            @click="slide = 3"
          />
        </div>
      </b-col>
    </div>
    <div
      v-show="isOTPSent"
      class="otp-card"
    >
      <img
        src="../assets/images/logo/logo2.png"
        alt=""
        class="mx-auto d-block mb-3 "
      >
      <b-form
        class="auth-login-form mt-1"
        @submit.prevent
      >
        <b-form-group>
          <div class="mb-2 text-center">
            <h1 class="fw-bold">
              Authentication
            </h1>
            <p>
              To sign up or log in you only have to<br>
              provide your email address.
            </p>
          </div>
          <hr class="mb-3">
          <div class="d-flex justify-content-between">
            <label for="login-password">Enter OTP</label>
          </div>
          <validation-provider
            #default="{ errors }"
            name="Enter OTP"
            rules="required"
          >
            <b-form-input
              id="login-otp"
              v-model="userOTP"
              :state="errors.length > 0 ? false : null"
              name="login-otp"
              placeholder="******"
            />
            <b-link
              :to="{ name: 'auth-forgot-password-v2' }"
              @click="validationForm"
            >
              <small>Resend OTP?</small>
            </b-link>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <b-form-group class="mt-3">
          <b-button
            type="submit"
            variant="primary"
            block
            @click="validationForm"
          >
            Verify OTP
          </b-button>
        </b-form-group>
      </b-form>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'

import {
  BLink, BFormGroup, BFormInput, BForm, BButton,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { ethers } from 'ethers'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import axios from 'axios'
import Card from '@/components/loginPage/Card.vue'
import SmallCard from '../components/loginPage/SmallCard.vue'
import explore from '../assets/images/pages/login/explore.png'
import community from '../assets/images/pages/login/community.png'
import ConnectWalletBtn from "@/components/ConnectWalletBtn.vue";



export default {
  components: {
    BLink,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    ValidationProvider,
    ValidationObserver,
    Card,
    SmallCard,
    ConnectWalletBtn
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      theme: store.state.appConfig.layout.skin,
      slide: 1,
      sliding: null,
      status: '',
      password: '',
      userEmail: '',
      userOTP: '',
      isOTPSent: false,
      required,
      email,
      explore,
      community,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  mounted() {
    setInterval(() => {
      if (this.slide === 3) {
        this.slide = 1
      } else {
        this.slide += 1
      }
      // this.slide += 1
    }, 10000)
  },
  destroyed() {
    clearInterval(this.sliding)
  },
  methods: {
    validationForm() {
      if (this.$data.isOTPSent) {
        try {
          this.$refs.loginValidation.validate().then(async success => {
            console.log('Success :', success)
            await axios
              .post('https://auth.getboarded.com/auth/verify-otp', {
                email: this.$data.userEmail,
                otp: this.$data.userOTP,
              })
              .then(response => {
                console.log(
                  'Response corresponding to email',
                  this.$data.userEmail,
                  'and OTP ',
                  this.$data.userOTP,
                  'is',
                  response.status,
                )
                if (response.status === 200) {
                  this.$toast({
                    component: ToastificationContent,
                    props: {
                      title: 'OTP Validated!',
                      icon: 'EditIcon',
                      variant: 'success',
                    },
                  })
                  this.$router.push('/')
                }
              })
              .catch(error => {
                console.log('Some error discovered', error)
              })
          })
        } catch (error) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Some error in validating form. Please try again.',
              icon: 'EditIcon',
              variant: 'danger',
            },
          })
        }
      } else {
        try {
          this.$refs.loginValidation.validate().then(async success => {
            console.log('Success :', success)
            await axios
              .post('https://auth.getboarded.com/auth/get-otp', {
                email: this.$data.userEmail,
              })
              .then(response => {
                console.log(
                  'Response corresponding to email',
                  this.$data.userEmail,
                  'is',
                  response.status,
                )
                if (response.status === 200) {
                  this.$data.isOTPSent = true
                  console.log('IsOTPSent: ', this.$data.isOTPSent)
                  this.$toast({
                    component: ToastificationContent,
                    props: {
                      title: 'OTP sent',
                      icon: 'EditIcon',
                      variant: 'success',
                    },
                  })
                  // this.$router.push('/')
                }
              })
              .catch(error => {
                console.log('Some error discovered', error)
              })
          })
        } catch (error) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Some error in validating form. Please try again.',
              icon: 'EditIcon',
              variant: 'danger',
            },
          })
        }
      }
    },
    validateOTP() {
      try {
        this.$refs.loginValidation.validate().then(async success => {
          console.log('Success :', success)
          await axios
            .post('https://auth.getboarded.com/auth/verify-otp', {
              email: this.$data.userEmail,
              otp: this.$data.userOTP,
            })
            .then(response => {
              console.log(
                'Response corresponding to email',
                this.$data.userEmail,
                'and OTP ',
                this.$data.userOTP,
                'is',
                response.status,
              )
              if (response.status === 200) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'OTP Validated!',
                    icon: 'EditIcon',
                    variant: 'success',
                  },
                })
                this.$router.push('/')
              }
            })
            .catch(error => {
              console.log('Some error discovered', error)
            })
        })
      } catch (error) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Some error in validating form. Please try again.',
            icon: 'EditIcon',
            variant: 'danger',
          },
        })
      }
    },
    async connectToMetamask() {
      console.log(this.$data.userEmail, this.$data.password)
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          await provider.send('eth_requestAccounts', [])
          const signer = await provider.getSigner()
          const address = await signer.getAddress()
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Logged in witn address ${address.slice(
                0,
                6,
              )}...${address.slice(-4)}`,
              icon: 'EditIcon',
              variant: 'success',
            },
          })
          if (address) this.$router.push('/')
          else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Error while connecting to Web3: Invalid address',
                icon: 'EditIcon',
                variant: 'danger',
              },
            })
          }
        } catch (error) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Error while connecting to Web3: ${
                error.message ? error.message : error
              }`,
              icon: 'EditIcon',
              variant: 'danger',
            },
          })
        }
      } else {
        console.log('Please install metamask extension.')
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';

.slide-in-right{
  img{
    width: 80%;
  }
}
</style>
