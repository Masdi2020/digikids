<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent, computed, h, type HTMLAttributes } from 'vue'
import {
  AccordionRoot,
  AccordionItem as RekaItem,
  AccordionHeader,
  AccordionTrigger as RekaTrigger,
  AccordionContent as RekaContent,
  useForwardProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
} from 'reka-ui'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from './utils'

// Helper: pisahkan `class` dari props lain agar tidak diteruskan dua kali
function useDelegated<T extends { class?: HTMLAttributes['class'] }>(props: T) {
  return computed(() => {
    const { class: _, ...delegated } = props
    return delegated
  })
}

export const Accordion = defineComponent({
  name: 'Accordion',
  inheritAttrs: false,
  props: {} as Record<string, never>,
  setup(_, { slots, attrs }) {
    return () =>
      h(
        AccordionRoot,
        { 'data-slot': 'accordion', ...attrs },
        () => slots.default?.(),
      )
  },
})

export const AccordionItem = defineComponent({
  name: 'AccordionItem',
  inheritAttrs: false,
  props: ['value', 'disabled', 'class'] as unknown as undefined,
  setup(props: AccordionItemProps & { class?: HTMLAttributes['class'] }, { slots, attrs }) {
    const forwarded = useForwardProps(useDelegated(props))
    return () =>
      h(
        RekaItem,
        {
          'data-slot': 'accordion-item',
          ...forwarded.value,
          ...attrs,
          class: cn('border-b last:border-b-0', props.class),
        },
        () => slots.default?.(),
      )
  },
})

export const AccordionTrigger = defineComponent({
  name: 'AccordionTrigger',
  inheritAttrs: false,
  props: ['class'] as unknown as undefined,
  setup(props: AccordionTriggerProps & { class?: HTMLAttributes['class'] }, { slots, attrs }) {
    const forwarded = useForwardProps(useDelegated(props))
    return () =>
      h(AccordionHeader, { class: 'flex' }, () =>
        h(
          RekaTrigger,
          {
            'data-slot': 'accordion-trigger',
            ...forwarded.value,
            ...attrs,
            class: cn(
              'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
              props.class,
            ),
          },
          () => [
            slots.default?.(),
            h(ChevronDown, {
              class:
                'text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200',
            }),
          ],
        ),
      )
  },
})

export const AccordionContent = defineComponent({
  name: 'AccordionContent',
  inheritAttrs: false,
  props: ['class'] as unknown as undefined,
  setup(props: AccordionContentProps & { class?: HTMLAttributes['class'] }, { slots, attrs }) {
    const forwarded = useForwardProps(useDelegated(props))
    return () =>
      h(
        RekaContent,
        {
          'data-slot': 'accordion-content',
          ...forwarded.value,
          ...attrs,
          class:
            'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm',
        },
        () => h('div', { class: cn('pt-0 pb-4', props.class) }, slots.default?.()),
      )
  },
})

export default Accordion
</script>
