import { connectToDB } from '@utils/database'
import { Car } from '@models/car'

export const POST = async req => {
  try {
    await connectToDB()
    const cars = [
      {
        creator: '64d192d75506a768e1754cca',
        brand_id: '64d8c0efd7a49bfd5341e1e3',
        model_id: '656ae2dfb31933d23e020de9',
        reg_year_id: '64d8c433d7a49bfd5341e203',
        reg_month_id: '64d8888cd7a49bfd5341e1cb',
        mileage: '0',
        doors_id: '64d8eb2fd7a49bfd5341e205',
        body_type_id: '64d8ebd0d7a49bfd5341e207',
        fuel_type_id: '64e10a7e61137eb1aa4492a8',
        transmission_type_id: '64e10af561137eb1aa4492a9',
        power: { hp: '650', kw: '485' },
        displacement: '6,500',
        seats_id: '64ea66e4c0c9ac79ef74b812',
        steering_side: 'left',
        drivetrain_id: '64eb11790c2f0a6713e4af6f',
        color_id: '64eb16930c2f0a6713e4af74',
        air_conditioning_id: '64eb1df90c2f0a6713e4af7d',
        price: '550,000',
        fixed_price: false,
        owners_id: '64eb522b0c2f0a6713e4af9c',
        description:
          "The Diablo is a legendary supercar known for its stunning design and impressive performance. This model is a true collector's item.",
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
      {
        creator: '64d192d75506a768e1754cca',
        brand_id: '64d8c0efd7a49bfd5341e1e3',
        model_id: '656ae2dfb31933d23e020de8',
        reg_year_id: '64d8c433d7a49bfd5341e203',
        reg_month_id: '64d8888cd7a49bfd5341e1cc',
        mileage: '0',
        doors_id: '64d8eb2fd7a49bfd5341e205',
        body_type_id: '64d8ebd0d7a49bfd5341e209',
        fuel_type_id: '64e10a7e61137eb1aa4492a8',
        transmission_type_id: '64e10af561137eb1aa4492a9',
        power: { hp: '640', kw: '477' },
        displacement: '6,500',
        seats_id: '64ea66e4c0c9ac79ef74b814',
        steering_side: 'left',
        drivetrain_id: '64eb11790c2f0a6713e4af6f',
        color_id: '64eb16930c2f0a6713e4af73',
        air_conditioning_id: '64eb1df90c2f0a6713e4af7d',
        price: '630,000',
        fixed_price: false,
        owners_id: '64eb522b0c2f0a6713e4af9d',
        description:
          'The Murciélago is a powerful and iconic supercar that offers exhilarating performance. This model is in excellent condition and ready to thrill its next owner.',
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
      {
        creator: '64d192d75506a768e1754cca',
        brand_id: '64d8c0efd7a49bfd5341e1e3',
        model_id: '656ae2dfb31933d23e020de6',
        reg_year_id: '64d8c433d7a49bfd5341e203',
        reg_month_id: '64d8888cd7a49bfd5341e1d0',
        mileage: '0',
        doors_id: '64d8eb2fd7a49bfd5341e205',
        body_type_id: '64d8ebd0d7a49bfd5341e209',
        fuel_type_id: '64e10a7e61137eb1aa4492a8',
        transmission_type_id: '64e10af561137eb1aa4492a9',
        power: { hp: '650', kw: '485' },
        displacement: '4,000',
        seats_id: '64ea66e4c0c9ac79ef74b812',
        steering_side: 'left',
        drivetrain_id: '64eb11790c2f0a6713e4af6e',
        color_id: '64eb16930c2f0a6713e4af74',
        air_conditioning_id: '64eb1df90c2f0a6713e4af7d',
        price: '400,000',
        fixed_price: false,
        owners_id: '64eb522b0c2f0a6713e4af9e',
        description:
          'The Urus is a luxurious SUV that combines power and style. This model is perfect for those who want a high-performance vehicle with plenty of space and comfort.',
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
      {
        creator: '64d192d75506a768e1754cca',
        brand_id: '64d8c0efd7a49bfd5341e1e3',
        model_id: '656ae2dfb31933d23e020de7',
        reg_year_id: '64d8c433d7a49bfd5341e203',
        reg_month_id: '64d8888cd7a49bfd5341e1d1',
        mileage: '60,000',
        doors_id: '64d8eb2fd7a49bfd5341e205',
        body_type_id: '64d8ebd0d7a49bfd5341e209',
        fuel_type_id: '64e10a7e61137eb1aa4492a8',
        transmission_type_id: '64e10af561137eb1aa4492a9',
        power: { hp: '610', kw: '455' },
        displacement: '5,200',
        seats_id: '64ea66e4c0c9ac79ef74b814',
        steering_side: 'left',
        drivetrain_id: '64eb11790c2f0a6713e4af6f',
        color_id: '64eb16930c2f0a6713e4af73',
        air_conditioning_id: '64eb1df90c2f0a6713e4af7d',
        price: '550,000',
        fixed_price: false,
        owners_id: '64eb522b0c2f0a6713e4af9f',
        description:
          'The Huracan is a stunning supercar known for its sleek design and powerful performance. This model is sure to turn heads wherever it goes.',
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
      {
        creator: '64d192d75506a768e1754cca',
        brand_id: '64d8c0efd7a49bfd5341e1e3',
        model_id: '656ae2dfb31933d23e020de5',
        reg_year_id: '64d8c433d7a49bfd5341e203',
        reg_month_id: '64d8888cd7a49bfd5341e1cb',
        mileage: '40,000',
        doors_id: '64d8eb2fd7a49bfd5341e204',
        body_type_id: '64d8ebd0d7a49bfd5341e207',
        fuel_type_id: '64e10a7e61137eb1aa4492a7',
        transmission_type_id: '64e10af561137eb1aa4492a9',
        power: { hp: '700', kw: '522' },
        displacement: '6,500',
        seats_id: '64ea66e4c0c9ac79ef74b812',
        steering_side: 'left',
        drivetrain_id: '64eb11790c2f0a6713e4af6f',
        color_id: '64eb16930c2f0a6713e4af78',
        air_conditioning_id: '64eb1df90c2f0a6713e4af7d',
        price: '650,000',
        fixed_price: false,
        owners_id: '64eb522b0c2f0a6713e4af9d',
        description:
          'The Aventador is a flagship supercar from Lamborghini, known for its breathtaking performance and iconic design. This model is a true showstopper.',
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

    // const cars = await Car.find({}) // Get all cars

    // // Update each car document
    // cars.forEach(async car => {
    //   // Format the price using Intl.NumberFormat('en-US') format
    //   const randomNum = Math.floor(Math.random() * (35000 - 10000 + 1)) + 10000

    //   car.price = new Intl.NumberFormat('en-US').format(randomNum)

    //   // Save the updated car document
    //   await car.save()
    // })

    const newCar = await Car.insertMany(cars)

    return new Response(JSON.stringify(newCar), { status: 201 })
  } catch (error) {
    return new Response('Failed to create new car')
  }
}
