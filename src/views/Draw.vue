<template>
  <div>
    <mu-container>
      <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;" :raised="true" class="m">
        <mu-card-title :title="title"></mu-card-title>
        <div v-if="!finish">
          <mu-form :model="form">
            <mu-form-item label="Count" prop="count">
              <mu-text-field v-model="form.count" prop="count" :error-text="err"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="Code" prop="code">
              <mu-text-field
                v-model="form.code"
                prop="code"
                :action-icon="visibility ? 'visibility_off' : 'visibility'"
                :action-click="() => (visibility = !visibility)"
                :type="visibility ? 'text' : 'password'"
              ></mu-text-field>
            </mu-form-item>
            <mu-form-item class="c">
              <mu-button color="primary" @click="submit">Submit</mu-button>
            </mu-form-item>
          </mu-form>
        </div>
        <div v-if="finish">
          <mu-list>
            <mu-list-item v-for="item in list" :key="item.id" @click="odialog(item)" button>
              <mu-list-item-action>
                <mu-avatar>
                  <img :src="item.img"/>
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-title>{{item.id}}</mu-list-item-title>
            </mu-list-item>
          </mu-list>
          <mu-button color="primary" @click="next">Next</mu-button>
        </div>
      </mu-card>
    </mu-container>
    <mu-dialog title="Sign" width="360px" :open.sync="opendialog">
      <img :src="img" style="width: 100%"/>
    </mu-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import fp2 from 'fingerprintjs2';

interface Item {
  id: number,
  img: string,
}

@Component
export default class Draw extends Vue {
  private title: string = 'Draw';

  private visibility: boolean = false;

  private opendialog: boolean = false;

  private finish: boolean = false;

  private list: Item[] = [];

  private img: string = '';

  private form: {
    count: number,
    code: string,
  } = {
    count: 1,
    code: '',
  }

  next() {
    this.img = '';
    this.list = [];
    this.finish = false;
    this.form.count = 1;
    this.form.code = '';
    this.title = 'Draw';
  }

  odialog(item: Item) {
    this.img = item.img;
    this.opendialog = true;
  }

  get err(): string {
    if (Number.isNaN(Number(this.form.count))) {
      return 'Must be a number';
    }
    return '';
  }

  submit() {
    this.title = 'Draw';
    const ch = btoa(this.form.code).slice(0, 5) + btoa(`${this.form.count}sallt`)[0];
    fetch('./api/draw', {
      method: 'POST',
      body: JSON.stringify({ count: this.form.count, code: this.form.code, ch }),
    }).then(res => res.json()).then((res) => {
      if (!res.ok) {
        this.title = res.msg;
      } else {
        this.list = (res.list as Item[]);
      }
      this.finish = true;
    });
  }
}
</script>
<style scoped>
.m {
  padding: 10px;
}
.c {
  text-align: center;
}
</style>
