// let m = [1, 0, 1, 1];
// let g = [1, 0, 0, 1];

let m = [1, 1];
let g = [1, 0];

const mainFunc = (m, g) => {
  let { tBit, rem } = crcFirstFunc(m, g);
  let newtBit = [...m, ...rem];
  // console.log(newtBit);
  console.log(newtBit, g);
  // return crcFunc(newtBit, g);
  return crcSecondFunc(newtBit, g);
};

const crcFirstFunc = (m, g) => {
  let count = 0;
  let res = [];
  let tBit = [];
  let iBit;
  while (count < g.length) {
    iBit = m[0] & g[0];
    tBit.push(iBit);

    for (let i = 0; i < g.length; i++) {
      res.push(m[i] ^ (g[i] * iBit));
    }
    res[0] != 0 ? (res = res) : (res = res.splice(1));
    m = [...res, 0];
    res = [];
    count++;
  }
  m = m.splice(0, m.length - 1);

  return {
    tBit,
    rem: m,
  };
};

const crcSecondFunc = (m, g) => {
  let origin = m;
  let changing = m;
  let count = 0;
  //  let inc=1
  let res = [];
  let tBit = [];
  let iBit;

  while (count < g.length) {
    iBit = m[0] & g[0];
    tBit.push(iBit);

    for (let i = 0; i < g.length; i++) {
      res.push(changing[i] ^ (g[i] * iBit));
    }
    res[0] != 0 ? (res = res) : (res = res.splice(1));
    m = [...res, origin[g.length + count]];
    res = [];
    count++;
  }
  changing = changing.splice(0, changing.length - 1);

  return {
    transBit: tBit,
    crcRem: changing,
  };
};
console.log(mainFunc([1, 0, 1, 1], [1, 0, 0, 1]));
