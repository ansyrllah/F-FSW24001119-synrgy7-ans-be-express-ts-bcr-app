import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert([
    {
      typeDriver: "With Driver",
      plate: "DBH-3491",
      manufacture: "Ford",
      model: "F150",
      image:
        "https://res.cloudinary.com/dpavtrweo/image/upload/v1715801964/challenge5/hoqqtv26r8qgv46jexlm.jpg",
      rentPerDay: 200000,
      capacity: 2,
      description:
        "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
      transmission: "Automatic",
      available: true,
      type: "Sedan",
      year: 2022,
      availableAt: new Date(),
      options: JSON.stringify([
        "Cruise Control",
        "Tinted Glass",
        "Tinted Glass",
        "Tinted Glass",
        "AM/FM Stereo",
      ]),
      specs: JSON.stringify([
        "Brake assist",
        "Leather-wrapped shift knob",
        "Glove box lamp",
        "Air conditioning w/in-cabin microfilter",
        "Body color folding remote-controlled pwr mirrors",
        "Dual-stage front airbags w/occupant classification system",
      ]),
      created_at: new Date(),
    },
    {
      typeDriver: "With Driver",
      plate: "WXB-3984",
      manufacture: "BMW",
      model: "X5",
      image:
        "https://res.cloudinary.com/dpavtrweo/image/upload/v1715801963/challenge5/wjkgvj4akcrenh1mmwec.jpg",
      rentPerDay: 800000,
      capacity: 6,
      description:
        "Rear passenger map pockets. Electrochromic rearview mirror. Dual chrome exhaust tips. Locking glove box.",
      availableAt: new Date(),
      transmission: "Automatic",
      available: false,
      type: "Convertible",
      year: 2019,
      options: JSON.stringify([
        "Keyless Entry",
        "Power Windows",
        "MP3 (Single Disc)",
        "CD (Multi Disc)",
        "Navigation",
      ]),
      specs: JSON.stringify([
        "Rear passenger map pockets",
        "Electrochromic rearview mirror",
        "Dual chrome exhaust tips",
        "Locking glove box",
        "Pwr front vented disc/rear drum brakes",
      ]),
      created_at: new Date(),
    },
    {
      typeDriver: "Without Driver",
      plate: "OSL-4224",
      manufacture: "Lincoln",
      model: "MKZ",
      image: "https://res.cloudinary.com/dpavtrweo/image/upload/v1715801963/challenge5/ifpfouew8d4wlv8zm3in.jpg",
      rentPerDay: 900000,
      capacity: 6,
      description: "Driver & front passenger map pockets. Direct-type tire pressure monitor system. Cargo area lamp. Glove box lamp.",
      availableAt: new Date(),
      transmission: "Automanual",
      available: true,
      type: "Sedan",
      year: 2021,
      options: JSON.stringify([
        "Bucket Seats",
        "Airbag: Passenger",
        "Airbag: Driver",
        "Power Seats",
        "Airbag: Side",
        "Antilock Brakes",
        "CD (Multi Disc)",
      ]),
      specs: JSON.stringify([
        "Driver & front passenger map pockets",
        "Direct-type tire pressure monitor system",
        "Cargo area lamp",
        "Glove box lamp",
        "Silver finish interior door handles",
        "Driver & front passenger advanced multistage airbags w/occupant sensors",
        "Silver accent IP trim finisher -inc: silver shifter finisher",
        "Fasten seat belt warning light/chime",
      ]),
      created_at: new Date(),
    },
  ]);
}
