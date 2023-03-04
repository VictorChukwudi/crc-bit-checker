const mainFunc = (msgBits, genBits) => {
  let arrayMsgBits = msgBits.split("");
  let arrayGenBits = genBits.split("");

  const { transmittedBits, remainder } = crcFirstFunc(
    arrayMsgBits,
    arrayGenBits
  );
  const newMsgBits = [...arrayMsgBits, ...remainder];
  const { transBits, rem } = crcSecondFunc(newMsgBits, arrayGenBits);
  // return crcSecondFunc(newMsgBits, genBits);
  let remSum = rem.split("").reduce((prev, curr) => prev + curr);
  // console.log(remSum);

  return remSum == 0
    ? `The message bits: ${msgBits} , transmitted, is error-free.`
    : `The message bits: ${msgBits}, transmitted, is contains an error.`;
};

//First CRC Long Division Process
const crcFirstFunc = (msgBits, genBits) => {
  let extendedMsgBits = [...msgBits];
  let extendedMsgBitsChanging = [...msgBits];
  for (let i = 0; i < genBits.length - 1; i++) {
    extendedMsgBitsChanging.push(0);
    extendedMsgBits.push(0);
  }

  let count = 0;
  let result = [];
  let transmittedBits = [];
  let intermediateBit;
  while (count < msgBits.length) {
    intermediateBit = extendedMsgBitsChanging[0] & genBits[0];
    transmittedBits.push(intermediateBit);

    for (let i = 0; i < genBits.length; i++) {
      result.push(extendedMsgBitsChanging[i] ^ (genBits[i] * intermediateBit));
    }

    result[0] != 0 ? (result = result) : (result = result.splice(1));
    extendedMsgBitsChanging = [
      ...result,
      extendedMsgBits[genBits.length + count],
    ];
    result = [];
    count++;
  }
  return {
    transmittedBits: transmittedBits.join(""),
    remainder: extendedMsgBitsChanging.join(""),
  };
};

//Second CRC Long Division Process
const crcSecondFunc = (newMsgBits, genBits) => {
  let changingMsgBits = newMsgBits;
  let count = 0;
  let intermediateBit;
  let transBits = [];
  let result = [];
  let constraint = newMsgBits.length - genBits.length + 1;
  let sum = changingMsgBits.reduce((prev, curr) => prev + curr);
  while (count < constraint && sum != 0) {
    intermediateBit = changingMsgBits[0] & genBits[0];
    transBits.push(intermediateBit);
    for (let i = 0; i < genBits.length; i++) {
      result.push(changingMsgBits[i] ^ (genBits[i] * intermediateBit));
    }
    result[0] == 0 ? (result = result.splice(1)) : (result = result);
    changingMsgBits = [...result, newMsgBits[genBits.length + count]];
    result = [];
    count++;
  }
  changingMsgBits = changingMsgBits.map((el) => {
    return el == null ? (el = 0) : (el = el);
  });
  return {
    transBits: transBits.join(""),
    rem: changingMsgBits.splice(0, changingMsgBits.length).join(""),
  };
};

console.log(mainFunc("1010001101", "110101"));
console.log(mainFunc("1011", "1001"));
