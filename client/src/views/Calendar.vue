<template>

    <div>
     <b-calendar class = "calendar" block locale="en-US"></b-calendar>

    {{ new Date().toJSON().slice(0,10).replace(/-/g,'-')}} </div>
</template>

<script>
export default {
  name: 'calendar'
}
</script>

<style scoped>
 .calendar {
    padding: 30px;
 }
 </style>
