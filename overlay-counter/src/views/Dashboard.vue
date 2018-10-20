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
            <div class="card-header with-controls"><span class="card-header-title">Milestones</span><button v-b-modal="'addMilestone'" class="btn btn-primary">Add</button></div>
            <div class="card-body">
              <div class="table-responsive" v-if="notifications.length > 0">
                <table class="table">
                  <thead>
                      <tr>
                        <th>Target</th>
                        <th>Message</th>
                        <th>Image file</th>
                        <th>Sound file</th>
                        <th></th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(entry, index) in notifications" :key="index">
                      <td>{{ entry.target }}</td>
                      <td>{{ entry.message }}</td>
                      <td>{{ entry.image || 'none' }}</td>
                      <td>{{ entry.sound || 'none' }}</td>
                      <td><button class="btn btn-danger btn-sm" @click="emit(SocketTypes.CounterMilestoneDelete, index)">Delete</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else>
                <b-alert variant="primary" show>No milestones exist</b-alert>
              </div>
            </div>
          </div>

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
    <b-modal id="addMilestone" ref="addMilestone" title="Add a new milestone">
      <b-alert variant="warning" show v-if="newMilestone.error">{{ newMilestone.error }}</b-alert>
      <div class="form-group">
        <label for="mNumber">Target</label>
        <input type="number" class="form-control" id="mNumber" v-model="newMilestone.target">
        <small class="text-muted">What number to show this on</small>
      </div>
      <div class="form-group">
        <label for="mMessage">Message</label>
        <input class="form-control" id="mMessage" v-model="newMilestone.message">
        <small class="text-muted">The message you want to show</small>
      </div>
      <div class="form-group">
        <label for="mImage">Image source path <span class="text-muted">(optional)</span></label>
        <input class="form-control" id="mImage" v-model="newMilestone.image">
        <small class="text-muted">Relative path to public or source on the web</small>
      </div>
      <div class="form-group">
        <label for="mSound">Sound source path <span class="text-muted">(optional)</span></label>
        <input class="form-control" id="mSound" v-model="newMilestone.sound">
        <small class="text-muted">Must be MP3. Relative path to public or source on the web</small>
      </div>
      <div slot="modal-footer">
        <button class="btn btn-secondary mr-1" @click="dismissModal('addMilestone')">Cancel</button>
        <button class="btn btn-primary" @click="saveMilestone()">Save</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {
  CounterAlignment,
  CounterPosition
} from "@/store/mutations/app.mutations";
import { SocketTypes } from "@/store/mutations/socket.mutations";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
      CounterAlignment,
      CounterPosition,
      SocketTypes,
      singular: null,
      plural: null,
      newMilestone: {
        target: null,
        message: null,
        image: null,
        sound: null,
        error: null
      }
    };
  },
  computed: {
    ...mapState([
      "position",
      "alignment",
      "labelSingular",
      "labelPlural",
      "notifications"
    ]),
    ...mapGetters(["findNotification"])
  },
  methods: {
    emit(type, data) {
      this.$socket.emit(type, data);
    },
    saveMilestone() {
      const data = {
        target: parseInt(this.newMilestone.target, 10),
        message: this.newMilestone.message,
        image: this.newMilestone.image,
        sound: this.newMilestone.sound
      };

      if (!this.findNotification(data.target)) {
        this.emit(SocketTypes.CounterMilestoneAdd, data);
        this.resetMilestone();
        this.dismissModal("addMilestone");
      } else {
        this.newMilestone.error = `A milstone already exists for ${
          data.target
        }. Please select a new number`;
      }
    },
    resetMilestone() {
      this.newMilestone.error = null;
      this.newMilestone.target = null;
      this.newMilestone.message = null;
      this.newMilestone.image = null;
      this.newMilestone.sound = null;
    },
    dismissModal(target) {
      this.resetMilestone();
      this.$refs[target].hide();
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

.card-header.with-controls {
  flex-direction: row;
  display: flex;
  .card-header-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 100%;
  }
  > .btn {
    flex: 0 0 auto;
  }
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
