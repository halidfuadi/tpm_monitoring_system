<template>
  <div class="container-fluid p-0">
    <div class="row mb-2">
      <div class="col">
        <label>Line</label>
        <select class="form-select">
          <!-- option here -->
        </select>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="d-flex flex-row justify-content-between align-items-center">
          <template v-if="isMobile">
            <div v-for="(item, i) in dailyOpts" :key="i" class="flex-col">
              <button
                :class="
                  'btn btn-sm ' +
                  (item.is_active ? 'btn-primary' : 'btn-outline-primary') +
                  ' rounded-circle'
                "
                type="button"
              >
                {{ item.label }}
              </button>
            </div>
          </template>

          <template v-else>
            <div
              v-for="(item, i) in dailyDesktopOpts"
              :key="i"
              class="flex-col"
            >
              <button
                :class="
                  'btn btn-sm ' +
                  (item.is_active ? 'btn-primary' : 'btn-outline-primary') +
                  ' rounded-circle'
                "
                type="button"
              >
                {{ item.label }}
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import api from '@/apis/CommonAPI'
import { Toaster } from 'vue-sonner'
import { mapGetters } from 'vuex'

export default {
  name: 'TpmTodayActivites',

  data() {
    return {
      isLoading: false,
      dailyOpts: [
        {
          label: 'S',
          is_active: false,
          date: null,
        },
        {
          label: 'S',
          is_active: false,
          date: null,
        },
        {
          label: 'R',
          is_active: false,
          date: null,
        },
        {
          label: 'K',
          is_active: false,
          date: null,
        },
        {
          label: 'J',
          is_active: false,
          date: null,
        },
        {
          label: 'S',
          is_active: false,
          date: null,
        },
        {
          label: 'M',
          is_active: false,
          date: null,
        },
      ],
      dailyDesktopOpts: [
        {
          label: 'Senin',
          is_active: false,
          date: null,
        },
        {
          label: 'Selasa',
          is_active: false,
          date: null,
        },
        {
          label: 'Rabu',
          is_active: false,
          date: null,
        },
        {
          label: 'Kamis',
          is_active: false,
          date: null,
        },
        {
          label: 'Jumat',
          is_active: false,
          date: null,
        },
        {
          label: 'Sabtu',
          is_active: false,
          date: null,
        },
        {
          label: 'Minggu',
          is_active: false,
          date: null,
        },
      ],
      containerDateOfThisWeek: [],
      windowWidth: window.innerWidth,
      filter: {
        line_id: localStorage.getItem('line_id') ?? -1,
        date: null,
      },
      isMobile: false,
      dataSTW: [],
    }
  },
  watch: {
    windowWidth() {
      console.log(this.windowWidth)
      if (this.windowWidth < 500) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    },
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
    },
  },
  async mounted() {
    this.isLoading = true
    this.onResize()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
}
</script>

<style scoped>
.w100-line {
  min-width: 100px;
}

.w40-date {
  min-width: 40px;
  z-index: -1 !important;
}

.w300-item-check {
  min-width: 300px;
}

.w200-mc {
  min-width: 100px;
}

.w200-per {
  min-width: 90px;
}

th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  background: white;
}

thead {
  top: 0;
  position: sticky;
  z-index: 1 !important;
}

tr td:nth-child(1),
tr td:nth-child(2),
tr td:nth-child(3),
tr td:nth-child(4),
tr th:nth-child(1),
tr th:nth-child(2),
tr th:nth-child(3),
tr th:nth-child(4) {
  position: sticky;
  left: 0;
}

tr th:nth-child(2),
tr td:nth-child(2) {
  left: 30px;
}

tr th:nth-child(3),
tr td:nth-child(3) {
  left: 100px;
}

tr th:nth-child(4),
tr td:nth-child(4) {
  left: 200px;
}
</style>
