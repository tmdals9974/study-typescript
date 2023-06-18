export {};

interface Person {
  name: string;
  age: number;
}

type T1 = Person["name"]; // T1 = string;

//? T의 모든 속성의 타입은 그대로 유지하면서, 모두 readonly를 붙여줌, ts기본내장타입.
type _Readonly<T> = { readonly [P in keyof T]: T[P] };
type T2 = _Readonly<Person>;

//? T의 모든 속성의 타입은 그대로 유지하면서, 모두 선택 속성으로 만듬. ts기본내장타입.
type _Partial<T> = { [P in keyof T]?: T[P] };
type T3 = _Partial<Person>;

//? T의 일부 속성만 선택하여 사용할 수 있게 해줌. ts기본내장타입.
type _Pick<T, K extends keyof T> = { [P in K]: T[P] };
type T4 = _Pick<Person, "name">;

//? K 속성들로 이루어진 인터페이스를 만들어줌. 값의 타입은 모두 T로 설정. ts기본내장타입.
type _Record<K extends string, T> = { [P in K]: T };
type T5 = _Record<"p1" | "p2", Person>;

// ====================================

enum Fruit {
  Apple,
  Banana,
  Orange,
}

// * mapped-type 없이 enum을 활용 시 아래와 같음.
// * 해당 코드는 시스템 상 enum과 연관이 없어서 인텔리센스가 작동하지 않음
const FRUIT_PRICE = {
  [Fruit.Apple]: 1000,
  [Fruit.Banana]: 1500,
  [Fruit.Orange]: 2000,
};

// * mapped-type + enum
// * enum 속성 중 빠진 것이 있으면 오류 발생.
const FRUIT_PRICE2: { [key in Fruit]: number } = {
  [Fruit.Apple]: 1000,
  [Fruit.Banana]: 1500,
  [Fruit.Orange]: 2000,
};
