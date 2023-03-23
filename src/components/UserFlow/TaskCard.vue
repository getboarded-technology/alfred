<template>
  <div class="task-card">
    <div class="task-card-top-section">
      <div class="task-card-top-section-img">
        <img
          :src="require('@/assets/images/company/Cocacola.png')"
          style="width: 100%; height: 100%; object-fit: cover"
        >
      </div>
      <h2 class="task-card-top-section-heading">
        Wells Fargo
      </h2>
      <h2 class="task-card-top-section-daily">
        15.023 xDAI
      </h2>
      <h2 class="task-card-top-section-date">
        4 days ago
      </h2>
    </div>

    <div class="task-card-display-picture">
      <img
        :src="require('@/assets/images/company/task1.png')"
        style="width: 100%; height: 100%; object-fit: cover"
        alt="task1"
      >
    </div>
    <div class="task-card-content">
      <h3 class="task-card-content-heading">
        Lorem ipsum dolor sit amet, consectetur
      </h3>
      <h4 class="task-card-content-description">
        An intense way to learn about the process and practice your designs
        skills — My 1st hackathon Hackathons have been on my mind since I heard
        it was a good way to gain experience as a junior UX designer. As my
        portfolio...
      </h4>
    </div>
    <div class="task-card-activity">
      <div class="task-card-hashTag-cont">
        <h5 class="task-card-hashTag-heading">
          Being Focus
        </h5>
        <div
          v-for="(value, index) in ['Productivity', 'Mindfullness', 'Business']"
          :key="index"
          class="task-card-hashTag"
        >
          <h5 class="task-card-hashTag-text">
            #{{ value }}
          </h5>
        </div>
      </div>
      <div>
        <div class="task-card-mark">
          <div
            v-for="(value, i) in ['Do', 'Doing', 'Done']"
            :key="i"
            :class="
              taskStatus === value ? 'task-card-mark-text active' : 'task-card-mark-text'
            "
            @click="taskStatus = value"
          >
            {{ value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskCard',
  data() {
    return {
      taskStatus: 'Doing',
    }
  },
}
</script>
