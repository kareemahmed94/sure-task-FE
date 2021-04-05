<template>
  <div>
    <v-container fluid>
      <v-dialog v-model="verify_modal" persistent width="600">
        <v-card>
          <v-row class="mb-4">
          </v-row>

          <v-row style="width: 100%">
            <v-col md="12" cols="12">
              <div class="verify-wrapper">
                <h3 class="message-body">
                  You received an Email with the code
                </h3>
                <v-row>
                  <v-col md="12" cols="11">
                    <div class="verify-dialog" style="width: 100%">
                      <v-row class="verify-form">
                        <v-col md="12" cols="12">
                          <input
                              class="ma-0"
                              type="text"
                              ref="first_input"
                              maxlength="1"
                              size="1"
                              min="0"
                              max="1"
                              pattern="[0-9]{1}"
                              @keyup="focus_next"
                              onclick="this.setSelectionRange(0, this.value.length)"
                          />

                          <input
                              class="ma-0"
                              type="text"
                              maxlength="1"
                              size="1"
                              min="0"
                              max="1"
                              pattern="[0-9]{1}"
                              @keyup="focus_next"
                              onclick="this.setSelectionRange(0, this.value.length)"
                          />

                          <input
                              class="ma-0"
                              type="text"
                              maxlength="1"
                              size="1"
                              min="0"
                              max="1"
                              pattern="[0-9]{1}"
                              @keyup="focus_next"
                              onclick="this.setSelectionRange(0, this.value.length)"
                          />

                          <input
                              class="ma-0"
                              type="text"
                              maxlength="1"
                              size="1"
                              min="0"
                              max="1"
                              pattern="[0-9]{1}"
                              @keyup="focus_next"
                              onclick="this.setSelectionRange(0, this.value.length)"
                          />

                          <input
                              class="ma-0"
                              type="text"
                              maxlength="1"
                              size="1"
                              min="0"
                              max="1"
                              pattern="[0-9]{1}"
                              @keyup="focus_next"
                              onclick="this.setSelectionRange(0, this.value.length)"
                          />

                          <input
                              class="ma-0"

                              type="text"
                              maxlength="1"
                              size="1"
                              min="0"
                              max="1"
                              pattern="[0-9]{1}"
                              @keyup="focus_next"
                              onclick="this.setSelectionRange(0, this.value.length)"
                          />
                        </v-col>

                        <v-col md="12" cols="12">
                          <v-btn
                              color="primary"
                              light
                              large
                              shaped
                              :loading="v_loading"
                              @click="verify_code"
                          >Confirm</v-btn>
                        </v-col>
                      </v-row>
                      <v-row class="message-body">
                        <v-col md="12" cols="12">
                          <div class="block_resend" v-if="verify_message">
                            {{ verify_message }}
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>

    </v-container>
    <v-snackbar v-model="message" :color="error_type">
      {{ error_message }}
    </v-snackbar>
  </div>

</template>
<script>

import $ from "jquery";

export default {
  name: "clients_slider",

  props: {

  },
  data() {
    return {
      storage_url: process.env.StorageUrl,
      message: false,
      verify_modal: true,
      user_code: null,
      phone_number: null,
      user_id: null,
      block_resend: 0,
      error_message: false,
      v_loading: false,
      error_type: "success",
      verify_message: "",
    };
  },
  mounted() {
  },
  methods: {
    get_verification_code() {
      let inputs = $(".verify-form input");
      let code = "";
      for (let x = 0; x < inputs.length; x++) {
        code += inputs[x].value;
      }
      return code;
    },
    focus_next(e) {
      var t = $(e.target);
      t.next("input").focus();
    },
    verify_code() {
      this.v_loading = true;
      let verification_code = this.get_verification_code();
      if (verification_code.length === 6) {
        this.axios
            .post("verify", {
              user_code: verification_code,
              email: localStorage.getItem('email'),
            })
            .then((response) => {
              this.v_loading = false;
              if (response.data.status === 200) {
                this.message = true;
                this.error_type = "success";
                this.error_message = response.data.msg;
                localStorage.setItem("is_v", true);
                this.$router.go()
              } else {
                this.message = true;
                this.error_type = "error";
                this.error_message = response.data.msg;
              }
            });
      }

    },
  },
};
</script>
<style scoped>

.logo-holder-modal {
  padding-left: 35%;
  background-color: rgba(14, 65, 104, 0.25);
  padding-bottom: 10%;
  padding-top: 10%;
}


.verify-wrapper {
  direction: ltr;
  font-size: 1.5rem;
  text-align: center;
  box-sizing: border-box;
  color: #333;
}


.verify-dialog {
  margin: 10px auto;
  padding: 20px 30px;
  display: inline-block;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
  position: relative;
  max-width: 450px;
}

.verify-dialog h3 {
  margin: 0 0 10px;
  padding: 0;
  line-height: 1.25;
}

.verify-dialog span {
  font-size: 90%;
}

.verify-form {
  max-width: 500px;
  margin: 25px auto 0;
}

.verify-form input {
  margin: 0 5px;
  text-align: center;
  line-height: 80px;
  font-size: 50px;
  border: solid 1px #ccc;
  outline: none;
  width: 12%;
  transition: all 0.2s ease-in-out;
  border-radius: 3px;
}

.verify-form input:focus {
  border-color: #12406a;
  box-shadow: 0 0 2px #12406a inset;
}

.verify-form input::selection {
  background: transparent;
}

.verify-form button {
  margin: 30px 0 50px;
  width: 100%;
  padding: 6px;
  background-color: #12406a;
  border: none;
  text-transform: uppercase;
}

.verify-dialog button .close {
  border: solid 2px;
  border-radius: 30px;
  line-height: 19px;
  font-size: 120%;
  width: 22px;
  position: absolute;
  right: 5px;
  top: 5px;
}

.verify-dialog div {
  position: relative;
  z-index: 1;
}

.verify-dialog img {
  position: absolute;
  bottom: -70px;
  right: -63px;
}

</style>
