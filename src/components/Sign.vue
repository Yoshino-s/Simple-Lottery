<template>
  <div id="sign_con">
  <canvas id="sign_area"></canvas>
  </div>
</template>
<script lang="ts">
/* eslint-disable no-multi-assign */
import { Component, Prop, Vue } from 'vue-property-decorator';
import isM from 'ismobilejs';

@Component
export default class Sign extends Vue {
  private width!: number;

  private height!: number;

  private canvas!: HTMLCanvasElement;

  private ctx!: CanvasRenderingContext2D;

  mounted() {
    this.init();
  }

  init() {
    const isMobile = isM(navigator.userAgent).phone;

    const canvas = this.canvas = document.getElementById('sign_area') as HTMLCanvasElement;
    const con = document.getElementById('sign_con') as HTMLDivElement;

    const context = this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.width = con.clientWidth;
    this.height = con.clientHeight;

    canvas.width = this.width;
    canvas.height = this.height;

    const background = '#000';
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = 'white';
    context.shadowBlur = 1;
    context.shadowColor = 'white';
    context.fillStyle = background;
    context.lineWidth = 2;
    context.fillRect(0, 0, this.width, this.height);


    let pressed = false;


    const point = { x: 0, y: 0 };

    const paint = (signal: number) => {
      switch (signal) {
        case 1:
          context.beginPath();
          context.moveTo(point.x, point.y);
        // eslint-disable-next-line no-fallthrough
        case 2:
          context.lineTo(point.x, point.y);
          context.stroke();
          break;
        default:
      }
    };
    const create = (signal: number) => (e: UIEvent) => {
      if (signal === 1) {
        pressed = true;
      } else {
        e.preventDefault();
      }
      if (signal === 1 || pressed) {
        const { left, top } = this.canvas.getBoundingClientRect();
        let p: {clientX: number, clientY: number} = { clientX: 0, clientY: 0 };
        if (isMobile) {
          [p] = Array.from((e as TouchEvent).touches);
          console.log((e as TouchEvent).touches[0]);
        } else {
          p = (e as MouseEvent);
        }
        point.x = p.clientX - left;
        point.y = p.clientY - top;

        paint(signal);
      }
    };

    const start = create(1);
    const move = create(2);

    const { requestAnimationFrame } = window;
    const optimizedMove = requestAnimationFrame ? (e: UIEvent) => {
      requestAnimationFrame(() => {
        move(e);
      });
    } : move;
    if (isMobile) {
      canvas.addEventListener('touchstart', start);
      canvas.addEventListener('touchmove', optimizedMove);
      ['touchcancel', 'touchend'].forEach((event) => {
        canvas.addEventListener(event, () => {
          pressed = false;
        });
      });
    } else {
      canvas.addEventListener('mousedown', start);
      canvas.addEventListener('mousemove', optimizedMove);
      ['mouseup', 'mouseleave'].forEach((event) => {
        canvas.addEventListener(event, () => {
          pressed = false;
        });
      });
    }
  }

  toClear() {
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  toSave(): string {
    const base64Img = this.canvas.toDataURL();
    return base64Img;
  }
}
</script>
<style scoped>
sign_con {
  width: 100%;
  height: 100%;
}
</style>
