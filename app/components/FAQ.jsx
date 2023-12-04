import { useState } from 'react'
import Container from './Container'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

const cardsData = [
  {
    active: true,
    title: 'Buying',
    content: [
      {
        title: 'How do I buy a car?',
        description:
          "Car buying involves several steps that include researching vehicles, browsing inventory, securing financing and negotiating. In order to purchase the right car for you at a fair price, you should first know the type of car you want and how much you want to spend on it. From there, you'll need to identify models that fit your budget and preferences, then search inventory for potential options. After that, it's wise to secure financing prior to visiting the dealership. You'll then need to inspect the car, test drive it and negotiate the sale.",
      },
      {
        title: 'What car should I buy?',
        description:
          'The right car for you depends on many factors, including your wants, needs, lifestyle and budget. After taking time to think about these areas, we can help you identify models that work for you.',
      },
      {
        title: 'When is the best time to buy a car?',
        description:
          'Shoppers looking for the best deal on a new car are typically advised to wait until the end of the year when automakers offer their most generous incentives. Additionally, automakers usually offer deals around Memorial Day, 4th of July, Labor Day and Black Friday. However, the ongoing inventory shortage and supply chain issues have forced automakers to scale back on incentives in recent months.',
      },
      {
        title: 'How many miles is too many for a used car?',
        description:
          "Depending on who you ask, the average miles driven per year is 10,000 to 15,000, with around 12,000 the most common measurement. What's more important, though, is knowing how well the car has been maintained so that you can estimate how many miles it has left.",
      },
      {
        title: 'What should I look for when buying a car?',
        description:
          "There are some basic checks and tests you can perform on a used car that should help you identify whether it has certain problems. Some tasks you can perform yourself include reading the vehicle history, looking at the title, checking for rust or frame damage, inspecting fluids, looking for dashboard warning lights, testing various features and looking over its maintenance history. It's also recommended to have a trusted mechanic perform an inspection before you buy the car.",
      },
    ],
  },
  {
    title: 'Financing & leasing',
    content: [
      {
        title: 'Can you lease a used car?',
        description:
          "Most dealers don't offer leasing on used cars, but used cars that were leased when new and are now for sale provide some benefits, such as good condition and low miles.",
      },
      {
        title: 'How do I finance a used car?',
        description:
          "Using the dealership's lender is convenient, but it's best to shop around at banks and credit unions ahead of time so you'll know whose rate is best when you're at a dealership. This research may take a few days but can be well worth the time.",
      },
      {
        title: 'Are loan rates higher for used cars?',
        description:
          'Yes, loan rates are higher overall for used versus new cars, but they may be better if the car is factory-certified pre-owned because manufacturers may offer attractive interest rates to promote CPO sales. Before financing with a dealer, bank, or credit union, check the national average interest rates for used cars at Bankrate.com.',
      },
      {
        title: 'How do I know if I can afford the payments?',
        description:
          "You can estimate your payments here using Cars.com's finance calculators. You should have a down payment of at least 20%; financing lasting no longer than four years; and a principal, interest and insurance total not exceeding 10% of your gross household income.",
      },
    ],
  },
  {
    title: 'Warranty',
    content: [
      {
        title: 'Are extended warranties worth the money?',
        description:
          'Extended warranties offer peace of mind, but apart from the coverage included with factory-certified pre-owned cars, additional plans come with a price that studies have shown to be higher than the benefits you can claim in repairs.',
      },
      {
        title: 'What warranty comes with a used car?',
        description:
          "Initial warranties are limited by the miles and age of a car, so if the car has higher miles, original warranties may no longer apply. Also note that warranties don't always transfer to subsequent buyers. Check the vehicle manufacturer's specifications for warranty limits.",
      },
      {
        title: 'What is a bumper-to-bumper warranty and what does it cover?',
        description:
          "Often called a basic warranty or new-vehicle warranty, a bumper-to-bumper policy covers components such as air conditioning, audio systems, vehicle sensors, fuel systems, and major electrical components. Most policies exclude regular maintenance such as fluid top-offs and oil changes, but a growing number of brands have separate free-maintenance provisions. Bumper-to-bumper warranties typically expire faster than powertrain warranties. Terms are typically three years or 36,000 miles, although some have terms as high as six years or 60,000 miles. Check the vehicle manufacturer's specifications for bumper-to-bumper warranty limits.",
      },
    ],
  },
  {
    title: 'Certified Used Cars',
    content: [
      {
        title: 'What does CPO mean?',
        description:
          'A certified pre-owned or CPO car has been inspected to meet minimum quality standards and typically includes some type of warranty. While dealers and third parties certify cars, the gold standard is an automaker-certified vehicle that provides a factory-backed warranty, often extending the original coverage. Vehicles must be in excellent condition and have low miles and wear to be certified, which is why off-lease vehicles feed many CPO programs.',
      },
    ],
  },
]

const FAQ = () => {
  const [cards, setCards] = useState(cardsData)
  const [clickedCard, setClickedCard] = useState()

  const cardVariants = {
    closed: {
      opacity: 0,
      visibility: 'hidden',
      height: 0,
      y: 20,
      margin: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
      transitionEnd: {
        display: 'none',
      },
    },
    open: {
      opacity: 1,
      visibility: 'visible',
      y: 0,
      height: 'fit-content',
      display: 'flex',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const buttonVariants = {
    closed: {
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      rotate: '180deg',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const handleClick = index => {
    setCards(
      cards.map((card, i) => {
        if (card.active && i !== index) return { ...card, active: false }
        if (i === index && !card.active) return { ...card, active: true }
        if (i === index && card.active) return { ...card, active: false }
        else return card
      })
    )

    setClickedCard(
      ...cards.filter((card, i) => {
        if (i === index) return card
      })
    )
  }

  return (
    <section className="py-10">
      <Container>
        <h2 className="text-2xl font-bold mb-4 capitalize">
          Used car buying, financing, and warranty FAQs
        </h2>
        <ul className="flex flex-col gap-5">
          {cards?.map((card, i) => (
            <li
              className="px-7 rounded-[37px] shadow-md bg-white"
              key={card.title}
            >
              <button
                onClick={() => handleClick(i)}
                className="flex justify-between items-center w-full py-3.5"
              >
                <h3
                  className={`text-2xl uppercase ${card.active && 'font-bold'}`}
                >
                  {card.title}
                </h3>
                <motion.div
                  variants={buttonVariants}
                  initial={cards[i].active ? 'open' : 'closed'}
                  animate={cards[i].active ? 'open' : 'closed'}
                >
                  <FontAwesomeIcon icon={faAngleDown} />
                </motion.div>
              </button>
              {card.content.map((article, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial={cards[i].active ? 'open' : 'closed'}
                  animate={cards[i].active ? 'open' : 'closed'}
                  className={`flex flex-col gap-2 ${
                    index !== card.content.length - 1
                      ? 'border-b-[1px]'
                      : 'border-none'
                  }`}
                >
                  <h4
                    className={`font-semibold ${index !== 0 ? 'mt-5' : 'mt-0'}`}
                  >
                    {article.title}
                  </h4>
                  <p className="font-normal text-sm mb-5">
                    {article.description}
                  </p>
                </motion.div>
              ))}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export default FAQ
