const crc = (message, generated) => {
  let msgArr = message.split("");
  let genArr = generated.split("");

  let tBit;
  let iBit;
  let counter = 0;
  while (counter < generated.length - 1) {
    msgArr.push("0");
    counter++;
  }
  msgArr = msgArr.map((i) => parseInt(i));
  genArr = genArr.map((i) => parseInt(i));

  let msgInt = parseInt(msgArr.join(""));
  let genInt = parseInt(generated);

  tBit = msgArr[0] & genArr[0];
  iBit = msgArr[0] & genArr[0];
  console.log(tBit);
};

const compareFunc = async (a, b) => {
  return a & b;
};

crc("1011", "1001");
