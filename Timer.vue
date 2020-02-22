<template>
    <div>
        <button
            :data-time="minute2seconds">{{ minute }} minutes</button>
    </div>
</template>

<script>
export default {
    props: {
        minute: Number
    },
    computed: {
        minute2seconds: function() {
            return this.minute * 60
        }
    },
}
</script>
