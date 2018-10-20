<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <span class="dashboard-title">Shambles Counter</span>
    </header>
    <section class="controls">
      <div class="controls-left">
        <button class="btn btn-success btn-lg" @click="emit(SocketTypes.Increment)">Add</button>
        <button class="btn btn-danger btn-lg" @click="emit(SocketTypes.Decrease)">Minus</button>
      </div>
      <div class="controls-right">
        <button class="btn btn-primary btn-lg" @click="emit(SocketTypes.Reset)">Reset</button>
      </div>
    </section>
    <div class="content-container">
      <div class="container">
          <div class="card mb-4">
            <div class="card-header">Settings</div>
            <div class="card-body">
              <div class="form-group">
                <label for="singular">Singular term</label>
                <input class="form-control" v-model="singular">
              </div>
              <div class="form-group">
                <label for="plural">Plural term</label>
                <input class="form-control" v-model="plural">
              </div>
              <button class="btn btn-primary" @click="updateLabels()">Update</button>
            </div>
          </div>

          <div class="card">
            <div class="card-header">Position</div>
            <div class="card-body">
              <div class="form-group">
                <label for="position">Position</label>
                <select id="position" class="form-control" :value="position" @change="emit(SocketTypes.CounterPosition, $event.target.value)">
                  <option v-for="(entry, key) in CounterPosition" :key="key">{{ key }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="alignment">Alignment</label>
                <select id="alignment" class="form-control" :value="alignment" @change="emit(SocketTypes.CounterAlignment, $event.target.value)">
                  <option v-for="(entry, key) in CounterAlignment" :key="key">{{ key }}</option>
                </select>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CounterAlignment,
  CounterPosition
} from "@/store/mutations/app.mutations";
import { SocketTypes } from "@/store/mutations/socket.mutations";
import { mapState } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
      CounterAlignment,
      CounterPosition,
      SocketTypes,
      singular: null,
      plural: null
    };
  },
  computed: {
    ...mapState(["position", "alignment", "labelSingular", "labelPlural"])
  },
  methods: {
    emit(type, data) {
      this.$socket.emit(type, data);
    },
    updateLabels() {
      const data = {
        labelSingular: this.singular,
        labelPlural: this.plural
      };
      this.emit(SocketTypes.CounterLabel, data);
    }
  },
  created() {
    this.singular = this.labelSingular;
    this.plural = this.labelPlural;
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 1.5rem;
  padding-bottom: 5rem;
}
.dashboard {
  display: flex;
  flex-direction: column;
  flex: 1 100%;
  .dashboard-header {
    flex: 0 0 auto;
    background: #dedede;
    padding: 0.75rem 1.5rem;
    border-bottom: 1px solid #ccc;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  }
  .dashboard-title {
    font-size: 1.25rem;
    font-weight: bold;
    text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.9);
    display: block;
    text-align: center;
  }

  .content-container {
    flex: 1 1 100%;
    overflow: auto;
  }

  .controls {
    flex: 0 0 auto;
    padding: 1.5rem;
    background: #dedede;
    border-top: 1px solid#DDD;

    display: flex;
    flex-direction: row;
    .controls-left {
      display: flex;
      flex-direction: column;
      flex: 1 1 100%;
      padding-right: 0.375rem;
      .btn:first-child {
        margin-bottom: 0.75rem;
      }
    }
    .controls-right {
      display: flex;
      flex-direction: column;
      flex: 0 0 120px;
      padding-left: 0.375rem;
      .btn {
        flex: 1 1 100%;
      }
    }
  }
}
</style>
