// Side bar information

export const steps = [
  {
    name: "Step 1",
    info: "your info",
  },
  {
    name: "Step 2",
    info: "Select plan",
  },
  {
    name: "Step 3",
    info: "Add-ons",
  },
  {
    name: "Step 4",
    info: "Summary",
  },
];

export const stepsDetails = [
  {
    name: 'Personal Info',
    stepGuide: 'Please provide your name, email address, and phone number.',
    infoToBeGathered: ['name', 'email address', 'phone number']
  },
  {
    name: 'Select your plan',
    stepGuide: 'You have the option of monthly or yearly billing.',
    infoToBeGathered: ['planType'],
    planOptions: [
      {
        name: 'Arcade',
        price: {
          monthly: 9,
          yearly: 90,
          sale: '2 months free',

        },
      },
      {
        name: 'Advanced',
        price: {
          monthly: 12,
          yearly: 120,
          sale: '2 months free',

        },
      },
      {
        name: 'Pro',
        price: {
          monthly: 15,
          yearly: 150,
          sale: '2 months free',
        },
      },
    ],
  },
  {
    name: 'Pick add-ons',
    stepGuide: 'Add-ons help enhance your gaming experience.',
    infoToBeGathered: ['addOns'],
    services: [
      {
        serviceName: 'Online service',
        serviceCaption: 'Access to multiplayer games',
        price: 1
      },
      {
        serviceName: 'Larger storage',
        serviceCaption: 'Extra 1TB of cloud save',
        price: 2
      },
      {
        serviceName: 'Customizable Profile',
        serviceCaption: 'Custom theme on your profile',
        price: 2
      },
    ],
  },
  {
    name: 'Finishing up',
    stepGuide: 'Double-check everything looks OK before confirming.',
    infoToBeGathered: ['total'],
  },
];
