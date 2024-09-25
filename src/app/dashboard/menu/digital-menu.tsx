"use client"

import React, { useEffect, useState } from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Menu } from "./schema"
import { getMenus } from "@/actions/menu"

const DigitalMenu = () => {
  // TODO use real data and fetch w useSWR
  const [menu, setMenu] = useState<Menu | null>(null)

  useEffect(() => {
    const fetchMenu = async () => {
      const data = await getMenus()
      console.log("data", data)
      if (data.length > 0) {
        setMenu(data[0]) // Assuming you want the first menu
      }
    }

    fetchMenu()
  }, [])

  if (!menu) {
    return <div>No Menu</div>
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{menu.title}</h1>
      <p className="mb-6">{menu.description}</p>

      {menu.categories.map((category, categoryIndex) => (
        <Accordion key={categoryIndex} type="single" collapsible className="w-full mb-4">
          <AccordionItem value={`category-${categoryIndex}`} className="border-none">
            <AccordionTrigger className="px-4 py-2 hover:no-underline">{category.title}</AccordionTrigger>
            <AccordionContent className="border-t">
              <div className="space-y-4 p-4">
                <p className="mb-4">{category.description}</p>
                {category.items.map(
                  (item, itemIndex) =>
                    !item.hidden && (
                      <div key={itemIndex} className="mb-4">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p>{item.description}</p>
                        <p className="font-bold">${item.price.toFixed(2)}</p>
                        {item.image_src && <img src={item.image_src} alt={item.title} className="w-full h-auto mt-2" />}
                      </div>
                    )
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  )
}

export default DigitalMenu
