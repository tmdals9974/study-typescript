export {};

type T1 = number | string | never; // ? never는 제거되어 number | string이 됨. 해당 기법을 조건부 타입에서 자주 이용함.
type _Exclude<T, U> = T extends U ? never : T; // ? T가 U에 할당 가능하다면 제거하는 타입. 기본내장타입.
type T2 = _Exclude<1 | 3 | 5 | 7, 1 | 5 | 9>; // * 3 | 7
type T3 = _Exclude<string | number | (() => void), Function>; // * string | number
type _Extract<T, U> = T extends U ? T : never; // ? T가 U에 할당 불가하다면 제거하는 타입. 기본내장타입.
type T4 = _Extract<1 | 3 | 5 | 7, 1 | 5 | 9>; // * 1 | 5

// ===============================

type _ReturnType<T> = T extends (...args: any[]) => infer R ? R : any; // ? T가 함수 일 때, T 함수의 반환 타입을 뽑아주는 타입.
// ? T extends (...args: any[]) => infer R ? R : any   : 함수에 할당 가능한 타입이라면, R(함수의 반환 타입)을 추출
// ? infer: 타입 추론을 위해 사용.

type T5 = _ReturnType<() => string>; //string

function f1(s: string): number {
  return s.length;
}
type T6 = _ReturnType<typeof f1>; //number

// ===============================

// ? infer 활용
type Unpacked<T> = T extends (infer U)[] // ? T가 특정 타입의 배열이면
  ? U // ? 해당 타입 사용
  : T extends (...args: any[]) => infer U // ? T가 함수 타입이라면
  ? U // ? 함수의 반환 타입을 사용
  : T extends Promise<infer U> // ? T가 프로미스 타입이라면
  ? U // ? 프로미스 반환값 사용
  : T; // ? 모두 아니라면 T를 그대로 사용
type T0 = Unpacked<string>; // * string
type T01 = Unpacked<string[]>; // * string
type T02 = Unpacked<() => string>; // * string
type T03 = Unpacked<Promise<string>>; // * string
type T04 = Unpacked<Promise<string>[]>; // * Promise<string> (첫번째 조건문)
type T05 = Unpacked<Unpacked<Promise<string>[]>>; //* string (첫번째 조건문, 세번째 조건문)

// ===============================

// ? 값이 문자열인 속성 이름을 추출하는 타입
type StringPropertyNames<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T]; // ? Person['name' | never | 'nation'] 과 같은 효과를 냄 => never는 제거되어 결국 Person['name' | 'nation']이 됨

interface Person {
  name: string;
  age: number;
  nation: string;
}

type T10 = StringPropertyNames<Person>;

type StringProperties<T> = Pick<T, StringPropertyNames<T>>;
type T11 = StringProperties<Person>;

// ===============================

type _Omit<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>; // ? 입력받은 U를 제거한 나머지 속성을 반환하는 타입, 기본내장타입
type T12 = _Omit<Person, "nation" | "age">;

// ===============================

type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U; // T와 U에서 겹치는 속성이 있다면, 해당 속성을 T에서 제거 후 U와 교집합 처리하는 타입.

type T13 = Overwrite<Person, { age: string; nation: string }>;
const p: T13 = {
  name: "mike",
  age: "23",
  nation: "korea",
};
