<template>
  <div>Graph Client Demo</div>
  {{ result }}
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import useNativeStore from '@/store/useNativeStore';

const DEMO_QUERY = gql`query { hello }`;

export default defineComponent({
  name: 'Graphql',
  setup() {
    const { result } = useQuery(DEMO_QUERY, {}, {
      prefetch: true,
    });

    return {
      result,
    };
  },
  async serverPrefetch() {
    return new Promise((resolve) => {
      watch(
        () => this.result,
        () => resolve(),
      );
    });
  },
});
</script>

<style scoped>

</style>
