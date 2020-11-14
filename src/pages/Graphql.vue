<template>
  <div>Graph Client Demo</div>
  <template v-if="loading">
    ...
  </template>
  <template v-else-if="error">
    {{ err }}
  </template>
  <template v-else>
    {{ result }}
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';

export default defineComponent({
  name: 'Graphql',
  setup() {
    const DEMO_QUERY = gql`{ hello }`;

    const { result, loading, error } = useQuery(
      DEMO_QUERY,
      {},
      {},
    );

    return {
      result,
      loading,
      error,
    };
  },
});
</script>

<style scoped>

</style>
