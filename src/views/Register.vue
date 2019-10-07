<template>
  <div>
    <mu-container>
      <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;" :raised="true">
        <mu-card-media title="Welcome" sub-title="From yoshino-s">
          <img src="/header.jpg" />
        </mu-card-media>
        <mu-card-text>
          <h3>
            Your number is
            <code>{{ number }}</code>.
          </h3>It seems that it is a good number.
        </mu-card-text>
      </mu-card>
    </mu-container>
    <mu-dialog
      width="360"
      transition="slide-bottom"
      title="Sign your name here."
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="signopen"
    >
      <Sign ref="sign" />
      <mu-button slot="actions" flat color="primary" @click="clear">Clear</mu-button>
      <mu-button slot="actions" flat color="primary" @click="ok">Ok</mu-button>
    </mu-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import fp2 from 'fingerprintjs2';
import Sign from '../components/Sign.vue';

@Component({ components: { Sign } })
export default class Register extends Vue {
  private number: string = 'waiting';

  private signopen: boolean = false;

  private fp: string = '';

  private ch: string = '';

  private ip: string = '';

  mounted() {
    fp2.getV18((v) => {
      this.fp = v;
      fetch('https://httpbin.org/ip')
        .then(res => res.json())
        .then((res) => {
          [this.ip] = res.origin.split(',');
          const tch = btoa(`${this.ip}sallt`) + this.ip + btoa(`${this.ip}ssaLt${this.fp}`);
          this.ch = tch.slice(0, 5) + btoa(tch).slice(0, 5);
          return fetch('./api/reg', {
            method: 'POST',
            body: JSON.stringify({ ch: this.ch, fingerprint: this.fp }),
          }).then(r => r.json());
        })
        .then((res) => {
          if (!res.ok) {
            this.number = res.msg;
          } else {
            this.number = res.number;
          }
          if (res.newOne) {
            this.open();
          }
        });
    });
  }

  open() {
    this.signopen = true;
  }

  clear() {
    (this.$refs.sign as Sign).toClear();
  }

  ok() {
    this.signopen = false;
    const img = (this.$refs.sign as Sign).toSave();
    fetch('./api/sign', {
      method: 'POST',
      body: JSON.stringify({ ch: this.ch, img, fingerprint: this.fp }),
    });
  }
}
</script>
<style scoped>
</style>
