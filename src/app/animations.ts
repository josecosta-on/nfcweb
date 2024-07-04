import { animate, animateChild, group, query, state, style, transition, trigger } from "@angular/animations";

export const slideAnimation = trigger('slideAnimate', [
    state('in', style({ transform: 'translateX(0)' })), 
    state('out', style({ transform: 'translateX(-100%)' })),
    transition('out => in', [animate('200ms ease-out')]),

]);

export const zoomInOutAnimation = trigger('zoomInOut', [
    state('void', style({ transform: 'scale(0)' })), // Element starts shrunk
    state('in', style({ transform: 'scale(1)' })), // Element zooms in to full size
    state('out', style({ transform: 'scale(0.5)' })), // Element zooms out to smaller size
    transition('void => in', [animate('200ms ease-in')]),
    transition('in => out', [animate('100ms ease-out')]),
    transition('out => in', [animate('200ms ease-out')]),

    ]);

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('void => *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ left: '-100%' })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ left: '100%', opacity: 0 }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ], { optional: true }),
        query('@*', animateChild(), { optional: true })
      ]),
    ])
  ]);