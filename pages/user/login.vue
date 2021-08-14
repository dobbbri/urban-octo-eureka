<template>
  <modal
    title="Identificação"
    :showing="showModal"
    :show-close-btn="false"
    :bg-click-close="false"
    @close="showModal = false"
  >
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <!-- // -->
        <ValidationProvider v-slot="{ errors }" rules="required|email">
          <label for="user.email">Email:</label>
          <input
            v-model="user.email"
            v-focus
            type="text"
            placeholder="Informe o seu email"
            required
          />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" rules="required">
          <label for="user.password">Senha:</label>
          <input
            v-model="user.password"
            type="password"
            placeholder="Informe a sua senha"
            required
          />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>

        <div class="w-full mt-4">
          <button :disabled="$store.state.isLoading" type="submit" class="btn btn-success !ml-0">
            Entrar
          </button>
        </div>
      </form>
    </ValidationObserver>
  </modal>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: { ValidationObserver, ValidationProvider },

  data() {
    return {
      showModal: true,
      user: {
        email: 'sergiodobri@gmail.com',
        password: '1234'
      }
    }
  },

  methods: {
    async onSubmit() {
      const response = await this.$http.$post('api/v1/users/login', this.user)

      console.log('response', response)
      // const { email, name, token } = response.json
      // console.log(email, name, token)
      // const { ok, status, statustext } = response
      // console.log(ok, status, statustext)
      // const decoded = jwtDecode(token)
      // this.$router.push('/admin')
    }
  }
}
</script>
