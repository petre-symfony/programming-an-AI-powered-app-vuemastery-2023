<script setup>

</script>

<template>
  <article class="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
    <div class="mt-4">
      <h3>Enter the text you would like to ask questions about</h3>
      <section>
        <!-- Text area to input text for analysis-->
      </section>
    </div>
    <div>
      <div>
        <div class="flex rounded-md shadow-sm mt-4">
          <div class="relative flex flex-grow items-strech focus-within:z-10">
            <!-- Input to add a question we want to ask about the text -->
          </div>
          <!-- Button to send text and question to OpenAI -->
        </div>
      </div>
      <!-- AI displayed response -->
    </div>
  </article>
  <div class="flex justify-end">
    <!-- Clear button to reset all the data -->
  </div>
</template>