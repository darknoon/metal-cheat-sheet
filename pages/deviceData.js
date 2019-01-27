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
    gpus: ["A7"],
    devices: APUs.A7,
    features: {
      /* filled in below */
    }
  },
  iOSFamily2: {
    name: "iOS Family 2",
    tvName: "tvOS Family 1",
    gpus: ["A8"],
    devices: [...APUs.A8, ...APUs.A8X],
    features: {
      /* filled in below */
    }
  },
  iOSFamily3: {
    name: "iOS Family 3",
    tvName: "tvOS Family 2",
    gpus: ["A9", "A10"],
    devices: [...APUs.A9, ...APUs.A9X, ...APUs.A10, ...APUs.A10X],
    features: {
      /* filled in below */
    }
  },
  iOSFamily4: {
    name: "iOS Family 4",
    gpus: ["A11"],
    devices: [, ...APUs.A11],
    features: {
      /* filled in below */
    }
  },
  iOSFamily5: {
    name: "iOS Family 5",
    gpus: ["A12"],
    devices: [...APUs.A12, ...APUs.A12X],
    features: {
      /* filled in below */
    }
  },

  tvOSFamily1: {
    name: "tvOS Family 1",
    gpus: ["A8"],
    devices: ["Apple TV"],
    features: {}
  },
  tvOSFamily2: {
    name: "tvOS Family 2",
    gpus: ["A9"],
    devices: ["Apple TV 4K"],
    features: {}
  },

  macOSFamily1: {
    name: "macOS Family 1",
    gpus: [],
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
    gpus: [
      "Intel Iris Graphics 5xx",
      "Intel Iris Plus Graphics 6xx",
      "Intel HD Graphics 5xx",
      "Intel HD Graphics 6xx",
      "AMD FirePro Dxxx",
      "AMD Radeon R9 M2xx",
      "AMD Radeon R9 M3xx",
      "AMD Radeon Pro 4xx",
      "AMD Radeon Pro 5xx",
      "AMD Radeon Pro Vega"
    ],
    devices: [
      "iMac 2015+",
      "MacBook Pro 2016+",
      "MacBook 2016+",
      "iMac Pro 2017+"
    ]
  }
});

function addFeatures(fam) {
  const eqSet = (as, bs) => {
    if (as.size !== bs.size) {
      return false;
    }
    for (var a of as) {
      if (!bs.has(a)) {
        return false;
      }
    }
    return true;
  };

  const blackList = new Set("MetalKit");
  const osWhitelist = new Set(["iOS 12", "tvOS 12", "macOS 10.14"]);
  const deepCopy = a => JSON.parse(JSON.stringify(a));
  const families = deepCopy(fam);
  const [, ...OSes] = Object.values(features[0]);
  const [, ...familyNumbers] = Object.values(features[1]);
  const [, ...featureVersions] = Object.values(features[2]);
  const [, ...techNames] = Object.values(features[3]);

  Object.entries(families).forEach(([k, v]) => {
    v.features = {};
  });

  const valueMatchesPixelFormatCap = v => {
    const pxSet = new Set([
      "Filter",
      "Write",
      "Color",
      "MSAA",
      "Resolve",
      "Blend",
      "All",
      "Not available"
    ]);

    return v.split("\n").every(v => pxSet.has(v));
  };
  const guessValuesType = values => {
    if (values.every(v => v === "")) {
      return "crap";
    } else if (values.every(v => v === "" || v === "✓")) {
      return "boolean";
    } else if (values.every(v => v.match(/([0-9.]+$)/) !== null)) {
      return "number";
    } else if (values.every(valueMatchesPixelFormatCap)) {
      return "pixelFormatCapability";
    } else if (values.find(v => v.match(/.*\n.*/) !== null)) {
      // All values
      return "array";
    } else {
      return "string";
    }
  };

  const formatValue = (value, type) => {
    switch (type) {
      case "boolean":
        return value == "✓";
      case "number":
        return parseFloat(value);
      case "pixelFormatCapability": {
        if (value == "All") {
          return ["Filter", "Write", "Color", "MSAA", "Resolve", "Blend"];
        } else if (value == "Not available") {
          return [];
        } else {
          return value.split("\n");
        }
      }
      case "array":
        return value.split("\n");
      default:
        return value;
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
        // if (type == "crap" || blackList.has(key)) {
        //   continue;
        // }
        const value = features[j][i];

        familyObject.features[key] = formatValue(value, type);
      }
      familyObject.featureVersion = featureVersion;
      familyObject.techName = techName;
    } else {
      console.log("no family found", familyKey);
    }
  }

  return [families, featureModels.slice(startAt)];
}

export { families, featureModels };

export const iOSFamilies = {
  iOSFamily1: families.iOSFamily1,
  iOSFamily2: families.iOSFamily2,
  iOSFamily3: families.iOSFamily3,
  iOSFamily4: families.iOSFamily4,
  iOSFamily5: families.iOSFamily5
};

export const macOSFamilies = {
  macOSFamily1: families.macOSFamily1,
  macOSFamily2: families.macOSFamily2
};

export const tvOSFamilies = {
  tvOSFamily1: families.tvOSFamily1,
  tvOSFamily2: families.tvOSFamily2
};

export default () => <pre>{JSON.stringify(families)}</pre>;
