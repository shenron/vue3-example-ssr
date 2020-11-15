<template>
  <div>Graph Client Demo</div>
  {{ result }}
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const DEMO_QUERY = gql`query { hello }`;

export default defineComponent({
  name: 'Graphql',
  setup() {
    const { result, loading, error } = useQuery(DEMO_QUERY, {}, {
      prefetch: true,
    });

    return {
      result,
      loading,
      error,
    };
  },
  async serverPrefetch() {
    return new Promise((resolve, reject) => {
      watch(
        () => this.loading,
        () => resolve(),
      );

      watch(
        () => this.error,
        () => reject(),
      );
    });
  },
});
</script>

<style scoped>

</style>
