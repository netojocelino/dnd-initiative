<script setup lang="ts">
import { Player } from '../types/player';

defineProps<{ players: Player[] }>()


</script>

<template>
    <div class="actions">
        <button type="button" @click="$emit('newPlayer')">Novo jogador</button>
        <button type="button" @click="$emit('newEnemy')">Novo Inimigo</button>
        <button :disabled="players.length < 1" type="button" @click="$emit('sortList')">Ordenar</button>
        <button :disabled="players.length < 1" type="button" @click="$emit('clearList')">Limpar</button>
    </div>
</template>

<style scoped>
.actions {
    display: flex;
    flex-direction: row;
    flex: 1;
    max-height: 5rem;
    height: 10rem;
    gap: 2;
}

.actions button {
    flex: 1;
    flex-wrap: nowrap;
    flex-shrink: initial;
    font-size: .8rem;
    border-radius: 0;
    margin: 0 1px;
}
</style>
