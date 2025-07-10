"use client";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { type Faq } from "../../_sections/faq";
import { sendEvent } from "basehub/events";
import { GeneralEvents } from "../../../lib/basehub/fragments";

export function Accordion({
  items,
  eventsKey,
}: {
  items: Faq["questions"]["items"];
  eventsKey: GeneralEvents["ingestKey"];
}) {
  const [activeItems, setActiveItems] = React.useState<string[]>([]);

  return (
    <AccordionPrimitive.Root
      className="flex w-full flex-col items-stretch gap-2 lg:gap-8"
      type="multiple"
      value={activeItems}
      onValueChange={(activeItems) => setActiveItems(activeItems)}
    >
      {items.map((item) => (
        <AccordionItem
          key={item._title}
          {...item}
          eventsKey={eventsKey}
          isActive={activeItems.includes(item._title)}
        />
      ))}
    </AccordionPrimitive.Root>
  );
}

function AccordionItem({
  _title,
  answer,
  isActive,
  eventsKey,
}: Faq["questions"]["items"][0] & { isActive: boolean; eventsKey: GeneralEvents["ingestKey"] }) {
  return (
    <AccordionPrimitive.Item key={_title} className="flex flex-col" value={_title}>
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger
          className="outline-hidden focus-visible:ring-3 flex w-full items-start gap-3 rounded-md py-2 text-lg font-medium leading-relaxed tracking-tighter ring-[--accent-500]"
          onClick={() => {
            sendEvent(eventsKey, {
              eventType: "faq_expanded",
            });
          }}
        >
          {isActive ? (
            <MinusCircledIcon className="my-1.5 size-4 shrink-0" />
          ) : (
            <PlusCircledIcon className="my-1.5 size-4 shrink-0" />
          )}

          <span className="text-start">{_title}</span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown transform overflow-hidden pl-7 leading-relaxed tracking-tight text-[--text-tertiary] dark:text-[--dark-text-tertiary]">
        <div>{answer}</div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}
