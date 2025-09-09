import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, effect, signal } from '@angular/core';

export interface AdSlide {
  id?: string;
  imageUrl: string;
  alt?: string;
  link?: string;
  title?: string;
}


@Component({
  selector: 'app-ad-carousel',
  imports: [CommonModule, ],
  templateUrl: './ad-carousel.component.html',
  styleUrl: './ad-carousel.component.css'
})
export class AdCarouselComponent implements OnDestroy {
  /** Slides a mostrar */
  @Input({ required: true }) slides: AdSlide[] = [];
  /** Config */
  @Input() autoplay = true;
  @Input() intervalMs = 4000;
  @Input() showArrows = true;
  @Input() showDots = true;

  private timer: any;
  index = signal(0);

  constructor() {
    effect(() => {
      // Reiniciar autoplay cuando cambian slides/props
      this.clearTimer();
      if (this.autoplay && this.slides.length > 1) {
        this.timer = setInterval(() => this.next(), this.intervalMs);
      }
    });
  }

  ngOnDestroy() { this.clearTimer(); }
  private clearTimer() { if (this.timer) { clearInterval(this.timer); this.timer = null; } }


  transform() { return `translateX(-${this.index() * 100}%)`; }
  next() { this.index.set((this.index() + 1) % Math.max(this.slides.length, 1)); }
  prev() { this.index.set((this.index() - 1 + this.slides.length) % Math.max(this.slides.length, 1)); }
  goTo(i: number) { this.index.set(i); }
  pause() { this.clearTimer(); }
  resume() {
    if (this.autoplay && !this.timer && this.slides.length > 1) {
      this.timer = setInterval(() => this.next(), this.intervalMs);
    }
  }
  onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') this.prev();
    if (e.key === 'ArrowRight') this.next();
  }


}
