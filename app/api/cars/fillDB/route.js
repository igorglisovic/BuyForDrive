import { connectToDB } from '@utils/database'
import { Car } from '@models/car'

export const POST = async req => {
  const cars = [
    {
      creator: '64d192d75506a768e1754cca',
      brand_id: '64d8c0efd7a49bfd5341e1de', // Volkswagen
      model_id: '65a1b6d81c19d219a3533590', // Caddy
      reg_year_id: '64eb22b50c2f0a6713e4af8c',
      reg_month_id: '64d8888cd7a49bfd5341e1d0',
      mileage: '125000',
      doors_id: '64d8eb2fd7a49bfd5341e204',
      body_type_id: '64d8ebd0d7a49bfd5341e207',
      fuel_type_id: '64e10a7e61137eb1aa4492a7',
      transmission_type_id: '64e10af561137eb1aa4492a9',
      power: { hp: '120', kw: '89' },
      displacement: '1,600',
      seats_id: '64ea66e4c0c9ac79ef74b810',
      steering_side: 'left',
      drivetrain_id: '64eb11790c2f0a6713e4af6f',
      color_id: '64eb163b0c2f0a6713e4af71',
      air_conditioning_id: '64eb1df90c2f0a6713e4af7d',
      price: '15000',
      fixed_price: false,
      owners_id: '64eb522b0c2f0a6713e4af94',
      description:
        'The Volkswagen Caddy offers versatile cargo space and comfortable seating for passengers.',
      images: [
        {
          public_id: 'xma4zafplgmdyhnhwslx',
          version: '1696319406',
          _id: '651bc7b39dce35bcd0fbc96d',
        },
        {
          public_id: 'vufqhn5vbrqcrfaezuhe',
          version: '1696319407',
          _id: '651bc7b39dce35bcd0fbc96e',
        },
        {
          public_id: 'f4k7ck39lyfwwmlwzxse',
          version: '1696319408',
          _id: '651bc7b39dce35bcd0fbc96f',
        },
      ],
    },
  ]

  try {
    await connectToDB()

    const newCar = await Car.insertMany(cars)

    // const newCar = new Car({
    //   creator: '64d192d75506a768e1754cca',
    //   brand_id: '64d8c0efd7a49bfd5341e1e7',
    //   model_id: '64d8c1abd7a49bfd5341e1ea',
    //   reg_year_id: '64eb22b50c2f0a6713e4af8c',
    //   reg_month_id: '64d8888cd7a49bfd5341e1d0',
    //   mileage: '22,222',
    //   doors_id: '64d8eb2fd7a49bfd5341e204',
    //   body_type_id: '64d8ebd0d7a49bfd5341e207',
    //   fuel_type_id: '64e10a7e61137eb1aa4492a7',
    //   transmission_type_id: '64e10af561137eb1aa4492a9',
    //   power: { hp: '431', kw: '321' },
    //   displacement: '4,400',
    //   seats_id: '64ea66e4c0c9ac79ef74b810',
    //   steering_side: 'right',
    //   drivetrain_id: '64eb11790c2f0a6713e4af6f',
    //   color_id: '64eb163b0c2f0a6713e4af71',
    //   air_conditioning_id: '64eb1df90c2f0a6713e4af7d',
    //   price: '50,600',
    //   fixed_price: false,
    //   owners_id: '64eb522b0c2f0a6713e4af94',
    //   description:
    //     'A sleek and powerful vehicle that combines elegance with performance. It offers a luxurious driving experience and is sure to turn heads wherever you go.',
    //   images: [
    //     {
    //       public_id: 'xma4zafplgmdyhnhwslx',
    //       version: '1696319406',
    //       _id: '651bc7b39dce35bcd0fbc96d',
    //     },
    //     {
    //       public_id: 'vufqhn5vbrqcrfaezuhe',
    //       version: '1696319407',
    //       _id: '651bc7b39dce35bcd0fbc96e',
    //     },
    //     {
    //       public_id: 'f4k7ck39lyfwwmlwzxse',
    //       version: '1696319408',
    //       _id: '651bc7b39dce35bcd0fbc96f',
    //     },
    //   ],
    // })

    return new Response(JSON.stringify(newCar), { status: 201 })
  } catch (error) {
    return new Response('Failed to create new car')
  }
}
