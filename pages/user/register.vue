<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      url: '/api/v1/users/register',
      user: {
        name: 'Sergio Dobri',
        email: 'sergiodobri@gmail.com',
        password: '1234',
        phone: '18988887777',
        isAdmin: true,
        street: 'Rua Ary Dornellas, 813',
        zip: '15370452',
        city: 'Pereira Barreto',
        country: 'Brasil'
      }
    }
  }
}
</script>

<style scoped></style>
