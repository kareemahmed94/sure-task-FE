<template>
  <div>
    <v-dialog v-model="verify_modal" persistent width="600">
      <v-card>
        <v-row class="mb-4">
          <v-col md="12" class="logo-holder-modal text-center">
            <img class="mt-6 mb-6" :src="storage_url+'assets/img/logo-blue.png'" width="200" />
          </v-col>
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
                        >تأكيد</v-btn
                        >
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
    verify_modal: false,
    user_code: null,
    phone_number: null,
    user_id: null,
  },
  data() {
    return {
      storage_url: process.env.StorageUrl,
      message: false,
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
                this.$router.push('/')
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
