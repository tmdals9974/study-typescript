export {};

interface Person {
  name: string;
  age: number;
}

interface Korean extends Person {
  liveInSeoul: boolean;
}

function swapProperty<T extends Person, K extends keyof Person>(p1: T, p2: T, key: K): void {
  //? keyof A = A의 모든 속성 이름을 나열함 .
  //? keyof Person = "name" | "age"
  const temp = p1[key];
  p1[key] = p2[key];
  p2[key] = temp;
}

const p1: Korean = {
  name: "홍길동",
  age: 23,
  liveInSeoul: true,
};
const p2: Korean = {
  name: "김삿갓",
  age: 31,
  liveInSeoul: false,
};
swapProperty(p1, p2, "age");
