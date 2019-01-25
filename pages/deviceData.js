import features from "../data/metal-features";

// - Use Tabula
// - Convert with https://csv.js.org/convert/

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

const [families, featureModels] = addFeatures({
  iOSFamily1: {
    name: "iOS Family 1",
    gpu: ["A7"],
    devices: APUs.A7,
    features: {
      /* filled in below */
    }
  },
  iOSFamily2: {
    name: "iOS Family 2",
    tvName: "tvOS Family 1",
    gpu: ["A8"],
    devices: [...APUs.A8, ...APUs.A8X],
    features: {
      /* filled in below */
    }
  },
  iOSFamily3: {
    name: "iOS Family 3",
    tvName: "tvOS Family 2",
    gpu: ["A9", "A10"],
    devices: [...APUs.A9, ...APUs.A9X, ...APUs.A10, ...APUs.A10X],
    features: {
      /* filled in below */
    }
  },
  iOSFamily4: {
    name: "iOS Family 4",
    gpu: ["A11"],
    devices: [, ...APUs.A11],
    features: {
      /* filled in below */
    }
  },
  iOSFamily5: {
    name: "iOS Family 5",
    gpu: ["A12"],
    devices: [...APUs.A12, ...APUs.A12X],
    features: {
      /* filled in below */
    }
  },
  macOSFamily1: {
    name: "macOS Family 1",
    devices: [
      "iMac Pro",
      "iMac 2012+",
      "MacBook 2015+",
      "MacBook Pro 2012+",
      "MacBook Air 2012+",
      "Mac mini 2012+",
      "Mac Pro late 2013"
    ]
  },
  macOSFamily2: {
    name: "macOS Family 2",
    devices: [
      "iMac 2015+",
      "MacBook Pro 2016+",
      "MacBook 2016+",
      "iMac Pro 2017+"
    ]
  }
});

function addFeatures(fam) {
  const blackList = new Set("MetalKit");
  const osWhitelist = new Set(["iOS 12", "tvOS 12", "macOS 10.14"]);
  const deepCopy = a => JSON.parse(JSON.stringify(a));
  const families = deepCopy(fam);
  const [, ...OSes] = Object.values(features[0]);
  const [, ...familyNumbers] = Object.values(features[1]);
  const [, ...featureVersions] = Object.values(features[2]);
  const [, ...techNames] = Object.values(features[3]);

  const template = {};
  Object.entries(families).forEach(([k, v]) => {
    v.features = deepCopy(template);
  });

  const guessValuesType = values => {
    if (values.every(v => v === "" || v === "✓")) {
      return "boolean";
    } else if (values.every(v => v.match(/([0-9.]+)/) !== null)) {
      return "number";
    } else if (values.every(v => v === "")) {
      return "crap";
    } else if (values.find(v => v.match(/.*\n.*/) !== null)) {
      return "array";
    } else {
      return "string";
    }
  };
  const startAt = 5;

  const featureModels = Array(startAt).fill(null);
  for (let j = startAt; j < features.length; j++) {
    const [featureName, ...values] = features[j];

    // Replace any number of spaces or commas with _ to make the key
    const key = featureName.replace(/[\s,]+/g, "_");

    featureModels[j] = {
      name: featureName,
      type: guessValuesType(values),
      key
    };
  }

  for (let i in OSes) {
    const os = OSes[i];
    const techName = techNames[i];
    const familyNumber = familyNumbers[i];
    const featureVersion = featureVersions[i];
    // Find the right gpu family
    if (!osWhitelist.has(os)) {
      continue;
    }
    const [_, osType, osVersion] = os.match(/(.+) ([0-9.]+)/);
    const familyKey = `${osType}Family${familyNumber}`;
    const familyObject = families[familyKey];
    if (familyObject !== undefined) {
      for (let j = startAt; j < features.length; j++) {
        const { type, key } = featureModels[j];
        if (type == "crap" || blackList.has(key)) {
          continue;
        }
        const value = features[j][i];

        const formatValue = value => {
          switch (type) {
            case "boolean":
              return value == "✓";
            case "number":
              return parseFloat(value);
            case "array":
              return value.split("\n");
            default:
              return value;
          }
        };
        familyObject.features[key] = formatValue(value);
      }
    } else {
      console.log("no family found", familyKey);
    }
  }

  return [families, featureModels.slice(startAt)];
}

export { families, featureModels };

export const iOSFamilies = [
  families.iOSFamily1,
  families.iOSFamily2,
  families.iOSFamily3,
  families.iOSFamily4,
  families.iOSFamily5
];
export const macOSFamilies = [families.macOSFamily1, families.macOSFamily2];

export default () => <pre>{JSON.stringify(families)}</pre>;
