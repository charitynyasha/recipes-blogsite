import RecipeBanner from '@/app/components/RecipeBanner'
import React from 'react'
import FoodItems from '@/app/components/FoodItems'
import FoodComp from '@/app/components/FoodComp'
const page = () => {
  return (
    <>
    
      <section className='mt-10'>
      <RecipeBanner
        category={"APPETIZER"}
        description={'kick off your meals with our tempting appetizers .From finger foods to elegant starters, explore a variety of appetizer recipes perfect for any occasion'} />
      </section>
      <section className="mt-10">
              <div className="grid md:grid-cols-6 gap-6 container w-full mx-auto h-auto ">
                <div className="flex flex-col place-content-start items-center gap-4 col-span-4">
                  <FoodItems 
                  initialFoodItems={[]} 
                  apiRoute="appetizer"
                  styles={`sticky top-10`}
                   />
                </div>
                <div className="flex flex-col  place-content-start md:col-span-2 gap-6  ">
                  <FoodComp styles={undefined}            />
                </div>
              </div>
            </section>
      </>
  )
}

export default page