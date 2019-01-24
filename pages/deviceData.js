export const APUs = {
  A7: ["iPhone 5S", "iPad Air 1", "iPad Mini 2", "iPad Mini 3"],
  A8: ["iPhone 6", "iPhone 6+", "iPod Touch 6", "iPad Mini 4"],
  A8X: ["iPad Air 2"],
  A9: ["iPhone 6S", "iPhone 6S+", "iPhone SE", 'iPad 9.7" 5th Gen (2017)'],
  A9X: ["iPad Pro 1st Gen"],
  A10: ["iPhone 7", "iPhone 7+", "iPad 9.7 6th Gen (2018)"],
  A10X: ['iPad Pro 10.5" (2017)', 'iPad Pro 12.9" 2 (2017)', "Apple TV 4K"],
  A11: ["iPhone X", "iPhone 8", "iPhone 8+"],
  A12: ["iPhone XS", "iPhone XS Max", "iPhone XR"],
  A12X: ["iPad Pro (2018)"]
};

export const families = {
  iOS1: {
    name: "iOS_1",
    gpu: ["A7"],
    devices: APUs.A7
  },
  iOS2: {
    name: "iOS_2",
    tvName: "tvOS_1",
    gpu: ["A8"],
    devices: [...APUs.A8, ...APUs.A8X]
  },
  iOS3: {
    name: "iOS_3",
    tvName: "tvOS_2",
    gpu: ["A9", "A10"],
    devices: [...APUs.A9, ...APUs.A9X, ...APUs.A10, ...APUs.A10X]
  },
  iOS4: {
    name: "iOS_4",
    gpu: ["A11", "A12"],
    devices: [...APUs.A12, ...APUs.A12X, ...APUs.A11]
  },
  macOS1: {
    name: "macOS_1",
    devices: [
      "iMac Pro models",
      "iMac models from 2012 or later",
      "MacBook models from 2015 or later",
      "MacBook Pro models from 2012 or later",
      "MacBook Air models from 2012 or later",
      "Mac mini models from 2012 or later",
      "Mac Pro models from late 2013"
    ]
  },
  macOS2: {
    name: "macOS_2",
    devices: [
      "iMac models from 2015 or later",
      "MacBook Pro models from 2016 or later",
      "MacBook models from 2016 or later",
      "iMac Pro models from 2017 or later"
    ]
  }
};

export const iOSFamilies = [
  families.iOS1,
  families.iOS2,
  families.iOS3,
  families.iOS4
];
export const macOSFamilies = [families.macOS1, families.macOS2];
