<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, provide, inject, computed, defineComponent } from 'vue';
import type { Ref } from 'vue';

type AccordionType = "single" | "multiple";

interface AccordionContext {
  type: AccordionType;
  openItems: Ref<string[]>;
  toggle: (value: string) => void;
  isOpen: (value: string) => boolean;
}

interface AccordionItemContext {
  value: string;
  isOpen: Ref<boolean>;
}

const accordionProps = withDefaults(
  defineProps<{
    type?: AccordionType;
    defaultValue?: string | string[];
    collapsible?: boolean;
    class?: string;
  }>(),
  {
    type: "single",
    collapsible: false,
  }
);

const openItems = ref<string[]>(
  accordionProps.defaultValue
    ? Array.isArray(accordionProps.defaultValue)
      ? accordionProps.defaultValue
      : [accordionProps.defaultValue]
    : []
);

function toggle(value: string) {
  if (accordionProps.type === "single") {
    if (openItems.value.includes(value)) {
      if (accordionProps.collapsible) {
        openItems.value = [];
      }
    } else {
      openItems.value = [value];
    }
  } else {
    if (openItems.value.includes(value)) {
      openItems.value = openItems.value.filter((v) => v !== value);
    } else {
      openItems.value = [...openItems.value, value];
    }
  }
}

function isOpen(value: string) {
  return openItems.value.includes(value);
}

provide<AccordionContext>("accordion", {
  type: accordionProps.type,
  openItems,
  toggle,
  isOpen
})
</script>

<script lang="ts">
import { DefineComponent, h, inject, ref, computed, Transition } from 'vue';
import { cn } from './utils';

export const AccordionItem = defineComponent({
  name: "AccordionItem",
  props: {
    value: { type: String, required: true },
    class: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    const accordion = inject<AccordionContext>("accordion")!;
    const isOpen = computed(() => accordion.isOpen(props.value));

    provide<AccordionItemContext>("accordionItem", {
      value: props.value,
      isOpen,
    });

    return () =>
      h(
        "div",
        {
          "data-slot": "accordion-item",
          "data-state": isOpen.value ? "open" : "closed",
          class: cn("border-b last:border-b-0", props.class),
        },
        slots.default?.()
      );
  },
});

export const AccordionTrigger = defineComponent({
  name: "AccordionTrigger",
  props: {
    class: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    const accordion = inject<AccordionContext>("accordion")!;
    const item = inject<AccordionItemContext>("accordionItem")!;

    return () =>
      h("div", { class: "flex", role: "heading", "aria-level": 3 }, [
        h(
          "button",
          {
            "data-slot": "accordion-trigger",
            "data-state": item.isOpen.value ? "open" : "closed",
            disabled: props.disabled,
            onClick: () => !props.disabled && accordion.toggle(item.value),
            "aria-expanded": item.isOpen.value,
            class: cn(
              "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
              props.class
            ),
          },
          [
            slots.default?.(),
            h(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                class: cn(
                  "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200",
                  item.isOpen.value ? "rotate-180" : ""
                ),
              },
              [h("path", { d: "m6 9 6 6 6-6" })]
            ),
          ]
        ),
      ]);
  },
});

export const AccordionContent = defineComponent({
  name: "AccordionContent",
  props: {
    class: { type: String, default: "" },
  },
  setup(props, { slots }) {
    const item = inject<AccordionItemContext>("accordionItem")!;

    return () =>
      h(
        Transition,
        {
          name: "accordion",
          onBeforeEnter: (el: Element) => {
            (el as HTMLElement).style.height = "0";
            (el as HTMLElement).style.overflow = "hidden";
          },
          onEnter: (el: Element) => {
            (el as HTMLElement).style.height =
              (el as HTMLElement).scrollHeight + "px";
          },
          onAfterEnter: (el: Element) => {
            (el as HTMLElement).style.height = "";
            (el as HTMLElement).style.overflow = "";
          },
          onBeforeLeave: (el: Element) => {
            (el as HTMLElement).style.height =
              (el as HTMLElement).scrollHeight + "px";
            (el as HTMLElement).style.overflow = "hidden";
          },
          onLeave: (el: Element) => {
            (el as HTMLElement).style.height = "0";
          },
          onAfterLeave: (el: Element) => {
            (el as HTMLElement).style.height = "";
            (el as HTMLElement).style.overflow = "";
          },
        },
        () =>
          item.isOpen.value
            ? h(
                "div",
                {
                  "data-slot": "accordion-content",
                  "data-state": "open",
                  class: "overflow-hidden text-sm",
                  style: { transition: "height 200ms ease" },
                },
                [h("div", { class: cn("pt-0 pb-4", props.class) }, slots.default?.())]
              )
            : null
      );
  },
});

export default defineComponent({
  name: "Accordion",
});
</script>

<template>
  <div data-slot="accordion" :class="accordionProps.class">
    <slot />
  </div>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: height 200ms ease, opacity 200ms ease;
}
.accordion-enter-from,
.accordion-leave-to {
  height: 0;
  opacity: 0;
}
</style>
