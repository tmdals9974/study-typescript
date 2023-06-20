# Section 0. 타입스크립트 시작하기

## 1. 타입스크립트란?

- `Javascript`: 동적 타입 언어. 변수의 타입은 런타임에 결졍된다.
  - `동적타입 언어`: 진입 장벽이 낮고, 코드의 양이 적을 때 생산성이 높다. 타입 오류가 런타임 시 발견된다. (Python, PHP)
- `Typescript`: 정적 타입 언어. 변수의 타임이 컴파일 타임에 결졍된다. 자바스크립트의 슈퍼셋.
  - `정적타입 언어`: 진입 장벽이 높고, 코드의 양이 많을 때 생산성이 높다. 타입 오류가 컴파일 시 발견된다. (Java, C#)
  - Microsoft에서 개발/관리함. 그래서 VSCode와도 궁합이 잘맞음.

## 2. 타입스크립트를 사용하는 이유: 높은 생산성

- IDE가 정적타입언어를 분석하여 여러 기능을 제공해주어 높은 생산성을 제공

## 3. 타입스크립트 설치부터 컴파일까지

```shell
# node project init
npm init -y

# typescript download
npm i typescript

# typescript config file init
npx tsc --init

# typescript compile
npx tsc
```

## 4. 타입스크립트 실행 방법 및 몇가지 팁

1. 타입스크립트 정석적인 실행방법

```shell
# typescript compile
npx tsc

# 컴파일 된 js파일을 실행
node index.js
```

2. `Code Runner` 사용

- VSCode Extension `Code Runner` 설치
- `npm install ts-node`
- settings.json에 아래와 같이 설정

```json
  "code-runner.executorMap" : {
    "typescript": "node_modules/.bin/ts-node"
  }
```

- 줄단위/파일단위로 Code Runner를 실행하여 타입스크립트 실행 가능

3. `Playground` 이용

- Typescript 공식 홈페이지 내 Playground를 이용하여 실행

# Section 1. 타입 정의하기

## 1. 몇 가지 기본 타입1

number, boolean, string, number[], Array<number>, [string, number]

## 2. 몇 가지 기본 타입2

- undefined, null, object, any
- `ts의 array와 null은 js에서는 object 타입 판정임.`
- 함수의 반환 타입
  - void, never
- 유니온 타입 (`|`)

```typescript
let v1: number | undefined; //number 또는 undefined 타입만 허용
let v2: 10 | 20 | 30; //10, 20, 30 중 하나만 허용 (숫자와 문자열의 리터럴도 타입으로 사용 가능)
```

- 인터섹션 타입 (`&`)

```typescript
let v1: (1 | 3 | 5) & (3 | 5 | 7); //교집합인 3과 5만 허용
```

- `type` 키워드

```typescript
type Width = number | string; //type 키워드를 이용해 타입에 별칭 부여 가능
let width: Width;
```

## 3. enum 타입

```typescript
enum Fruit {
  Apple,
  Banana = 5,
  Orange,
} //자동으로 0, 5, 6 할당
enum Language {
  Korean = "ko",
  English = "en",
  Japanese = "jp",
} //문자열 할당 가능
const v1: Fruit = Fruit.Apple;
const v2: Fruit.Apple | Fruit.Banana = Fruit.Banana; //enum 내 속성은 개별타입으로도 사용 가능

const enum Item {
  Mask,
  Water,
} // const enum을 사용 시 enum 객체는 생성되지 않고, 값 참조만 사용되기 때문에 번들 크기를 줄일 수 있다. 다만, enum 객체를 이용한 유틸리티 함수를 사용할 수 없다.
```

## 4. 함수 타입1

```typescript
function getText(name: string, age: number = 15, language?: string): string {
  // 매개변수와 리턴타입 설정 가능.
  // 선택 매개변수는 제일 뒤에 와야함. 중간에 넣고싶다면 age: number | undefined와 같은 방법으로 대체해야함.
  // 선택 매개변수에는 기본값 부여 불가능.
  const nameText = name.substr(0, 10);
  const ageText = age >= 35 ? "senior" : "junior";
  const languageText = language ? language.substr(0, 10) : "";
  return `name: ${nameText}, age: ${ageText}, language: ${languageText}`;
}

function getText(name: string, ...rest: number[]): string {
  // ... 를 이용하여 나머지 매개변수 (rest parameter)를 사용 가능.
  // name 이후에 오는 모든 매개변수를 rest 변수에 배열로 담는 형식.
  return "";
}
```

## 5. 자바스크립트 this 이해하기

```javascript
function Counter() {
  this.value = 0;
  this.add = (amount) => {
    //화살표 함수로 정의
    this.value += amount;
  };
}

const counter = new Counter(); // new 연산자로 함수를 호출하면 인스턴스가 생성됨.
counter.add(5); //value = 5
const add = counter.add;
add(2); //value = 7. 화살표 함수의 this는, 화살표 함수가 생성될 당시의 this를 가리킨다.

//==========================================

function Counter2() {
  this.value = 0;
  this.add = function (amount) {
    // 화살표함수가 아닌 일반함수로 정의
    this.value += amount;
  };
}

const counter2 = new Counter2();
counter2.add(5); //value = 5
const add2 = counter2.add;
add2(2); //value = 2. 일반함수의 this는, 해당 함수를 호출한 주체를 가리킨다. counter2.add를 했을때는 counter2가 주체였으나, add2 에서는 주체가 없기때문에 전역 객체를 가리킨다. (브라우저: window/노드: global)
```

## 6. 함수 타입2

```typescript
function getParam(this: string, index: number): string {
  //함수 매개변수 맨 앞에 this의 타입 정의 가능.
  const params = this.split(",");
  if (index < 0 || params.index <= index) {
    return "";
  }
  return this.split(",")[index];
}

interface String {
  getParam(this: string, index: number): string;
}
String.prototype.getParam = getParam;

// ==============================================

function add(x: number, y: number): number; //함수 오버로드를 통해 상세한 타입 정의가 가능
function add(x: string, y: string): string; //함수 오버로드를 통해 상세한 타입 정의가 가능
function add(x: number | string, y: number | string): number | string {
  /**
   * 요구사항
   * x,y가 모두 number일 때 number 반환
   * x,y가 모두 string일 때 string 반환
   * 그 외의 타입은 허용하지 않음 (x number y string 도 불가)
   */
  if (typeof x === "number" && typeof y === "number") return x + y;
  return (Number(x) + Number(y)).toString();
}
const v1: number = add(1, 2);
const v2: string = add(1, "2");

// ==============================================

function getText({ name, age = 15, language }: { name: string; age?: number; language?: string }): string {
  // named parameter: 매개변수에 이름을 부여해줌.
  return "";
}

getText({ name: "aaa" });
getText({ name: "aaa", age: 11 });
```

## 7. 인터페이스

```typescript
//인터페이스로 객체의 타입을 정의
interface Person {
  readonly name: string; //읽기 전용. 이후 변경 불가.
  age: number;
  gender?: string; //선택 속성
  [key: string]: string | number; //인덱스 타입. interface에서 속성 이름을 정의하지 않고 값의 타입만 정의하는 것을 의미함.
}
const p1: Person = { name: "name", age: 1, birthday: "950924" };

// ==============================================

interface YearPriceMap {
  [year: number]: number; //속성 이름에 숫자와 문자열을 사용 가능. 속성 이름에 숫자를 입력 시, 내부적으로 문자열로 변환해서 사용함.
  [year: string]: string | number; //윗 줄에서 number로 들어온 속성 이름이 문자열로 변환 되기 때문에,  ***속성의 타입은 반드시 Number를 포함해야함***
  // *** 타입스크립트 4.4버전부터, 인덱스로 문자열을 입력해도 숫자로 파싱 가능하면 숫자로 인식하게 변경됨. ***
}

// ==============================================

interface GetText {
  (name: string, age: number): string;
  totalCall?: number; // interface로 함수 타입을 정의할 때, 함수의 속성값도 같이 정의할 수 있음.
}

const getText: GetText = function (name, age) {
  if (getText.totalCall !== undefined) {
    getText.totalCall += 1; //함수 내부에서도 속성값 사용 가능
    console.log(`totalCall: ${getText.totalCall}`);
  }
  return "";
};

getText.totalCall = 0;
getText("", 0);

// ==============================================

interface Person {
  name: string;
  age: number;
  isYoungerThan(age: number): boolean;
}

class SomePerson implements Person {
  // interface는 class로 구현될 수 있음.
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  isYoungerThan(age: number) {
    return this.age < age;
  }
}

// ==============================================

interface Person {
  name: string;
  age: number;
}

interface Korean extends Person {
  // extends 를 이용하여 기존 인터페이스를 확장 가능. 다중 확장 가능.
  isLiveInSeoul: boolean;
}
```

## 8. 클래스

```typescript
class Person {
  constructor(public name: string, public age: number) {} //typescript 편의기능. 생성자 매개변수에 접근제한자를 작성하면, 자동으로 멤버변수로 세팅해줌.
  sayHello() {
    console.log("person hello");
  }
}

class Programmer extends Person {
  private readonly height: number; //private 대신 # 사용 가능

  constructor(name: string, age: number, height: number) {
    super(name, age);
    this.height = height;
  }
  fixBug() {
    console.log("bug fixed");
  }
  sayHello() {
    super.sayHello();
    console.log("programmer hello");
  }
}

const programmer = new Programmer("이승민", 29, 177);
programmer.sayHello();
```

# Section 2. 타입 호환성

## 1. 타입 호환성

- 타입 호환성? 어떤 타입을 다른 타입으로 취급해도 되는 지 판단 하는 것
- 타입스크립트는 `값 자체의 타입`보다는 `값이 가진 내부 구조`에 기반하여 타입 호환성을 검사한다.
- 인터페이스 A가 인터페이스 B로 할당 가능 하기 위한 조건
  1. B에 있는 모든 필수 속성의 이름이 A에도 존재해야 한다. (속성명)
  2. 같은 속성 이름에 대해, A의 속성이 B의 속성에 할당 가능해야 한다. (속성타입)

```typescript
interface Person {
  name: string;
  age: number;
}
interface Product {
  name: string;
  age: number;
}
const person: Person = { name: "mike", age: 23 };
const product: Product = person; //Person과 Product의 내부 구조가 같기에 가능.
```

- 함수 타입 A가 함수 타입 B로 할당 가능하기 위한 조건
  1. A의 매개변수 개수가 B의 매개변수 개수보다 적어야 한다.
  2. 같은 위치의 매개변수에 대해 B의 매개변수가 A의 매개변수로 할당 가능해야 한다.
  3. A의 반환값은 B의 반환값으로 할당 가능해야 한다.

```typescript
type F1 = (a: number, b: string) => string;
type F2 = (a: number, b: string | number) => string;
type F3 = (a: number) => string;
type F4 = (a: number) => number | string;
let f1: F1 = (a, b) => `${a} ${b.length}`;
let f2: F2 = (a, b) => `${a} ${b}`;
let f3: F3 = (a) => `${a}`;
let f4: F4 = (a) => (a < 10 ? a : "too big");

f1 = f3;
//f3 = f1; //error

f1 = f2;
//f2 = f1; //error

f4 = f3;
//f3 = f4; //error
```

# Section 3. 타입스크립트 고급 기능

## 1. 제네릭

- 제네릭? 타입 정보가 동적으로 결정되는 타입.
- `src/generic.ts` 참고

```typescript
function makeArray<T>(defaultValue: T, size: number): T[] {
  const arr: T[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(defaultValue);
  }
  return arr;
}
const arr1 = makeArray<number>(1, 10);
const arr2 = makeArray<string>("empty", 10);

// ===================================

class Stack<D> {
  private items: D[] = [];
  push(item: D) {
    this.items.push(item);
  }
  pop() {
    return this.items.pop();
  }
}
const numberStack = new Stack<number>();
numberStack.push(10);

// =======================================

function identity<T extends number | string>(p1: T): T {
  return p1;
}
identity(1);
identity("a");
//identity([]); //error
```

## 2. 맵드 타입

- `src/mapped-type.ts` 참고

```typescript
type T1 = { [K in "prop1" | "prop2"]: boolean }; //T1 = { prop1: boolean; prop2: boolean; }

//==========================================

interface Person {
  name: string;
  age: number;
}

type MakeBoolean<T> = { [P in keyof T]?: boolean };
const pMap: MakeBoolean<Person> = {};
pMap.name = true;
pMap.age = false;
```

## 3. 조건부 타입

- `src/conditional.ts` 참고

```typescript
// T extends U ? X : Y
type IsStringType<T> = T extends string ? "yes" : "no"; //값이 아닌 'yes'/'no' 문자열 리터럴 타입을 할당
type T1 = IsStringType<string>; // type T1 = "yes"
type T2 = IsStringType<number>; // type T2 = "no"
type T3 = IsStringType<string | number>; // type T3 = "yes" | "no"     =>  조건부 타입일 경우, 유니온이 IsStringType<string> | IsStringType<number> 로 해석되기 때문임.

type Array2<T> = Array<T>;
type T4 = Array2<string | number>; // 조건부 타입이 아니기 때문에 string[] | number[] 가 아니라 (string | number)[] 로 해석됨
```

# Section 4. 생산성을 높이는 타입스크립트의 기능

## 1. 타입 추론

- 타입 추론으로 인해 코드(타입 정의)를 덜 작성하면서도 같은 수준의 타입 안정성을 유지 할 수 있다.

```typescript
let v1 = 123; //타입 추론으로 인해 number 타입
let v2 = "abc"; //타입 추론으로 인해 string 타입
let v3: typeof v1 = 234; //가능

const v4 = 123; //재할당 불가능한 const이기에 123 타입
const v5 = "abc"; //재할당 불가능한 const이기에 'abc' 타입
//let v6: typeof v4 = 234; //불가능, 123만 가능

const arr1 = [10, 20, 30]; //number[]
const [n1, n2, n3] = arr1; //비구조화할당이지만 n1,n2,n3 모두 number로 자동추론
//arr1.push("a");  //에러

const obj = { id: "abcd", age: 123, language: "korean" }; //타입추론 { id: string; age: number; language: string; }
const { id, age, language } = obj; //자동 타입추론

// ===========================================

interface Person {
  name: string;
  age: number;
}
interface Korean extends Person {
  liveInSeoul: boolean;
}
interface Japanese extends Person {
  liveInTokyo: boolean;
}

const p1: Person = { name: "mike", age: 23 };
const p2: Korean = { name: "mike", age: 25, liveInSeoul: true };
const p3: Japanese = { name: "mike", age: 27, liveInTokyo: false };

const arr1 = [p1, p2, p3]; //Person[]
const arr2 = [p2, p3]; //(Korean | Japanese)[]

// ===========================================

function func1(a = "abc", b = 10) {
  //func1(a?: string, b?: number): string 으로 타입추론
  return `${a} ${b}`;
}
//func1(3, 6); //타입 에러
//const v1: number = func1("a", 1); //타입 에러

function func2(value: number) {
  //func2(value: number): string | number
  if (value < 10) {
    return value;
  } else {
    return `${value} is too big`;
  }
}
```

## 2. 타입 가드

```typescript
function print(value: number | string) {
  if (typeof value === "number") {
    //console.log((value as number).toFixed(2)); //as는 값의 타입을 개발자가 확신하는 경우에 입력하여 타입을 강제하는 기능. 사용을 지양해야하는 기능
    console.log(value.toFixed(2)); //타입가드 기능 덕에 윗 줄의 코드처럼 as를 사용하지 않아도, if문을 분석하여 value를 number타입으로 바꿔줌.
  } else {
    //console.log((value as string).trim());
    console.log(value.trim());
  }
}

// ==========================================

class Person {
  age: number;
  constructor(age: number) {
    this.age = age;
  }
}
class Product {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
function print(value: Person | Product) {
  if (value instanceof Person) {
    //class이기 때문에 instanceof 사용 가능, 타입가드 작동
    console.log(value.age);
  } else {
    console.log(value.name);
  }
}

// ==========================================

interface Person {
  type: "a";
  age: number;
}
interface Product {
  type: "b";
  name: string;
}
function print(value: Person | Product) {
  // if (value instanceof Person) {} //interface는 instanceof 가 불가능하기에 에러 발생
  // if (value.type === "a") {} //인터페이스에 식별 가능한 유니온 타입을 추가하여 비교. 타입가드 작동 가능.
  switch (
    value.type //식별 가능한 유니온 타입은 switch 문에 적합
  ) {
    case "a":
      console.log(value.age);
      break;
    case "b":
      console.log(value.name);
      break;
  }
}

// ==========================================
interface Person {
  age: number;
}
interface Product {
  name: string;
}

// 타입을 검사하는 함수를 작성하여 타입가드 이용 가능
function isPerson(x: Person | Product): x is Person {
  //반환타입 : Person인지 검사하는 함수임을 작성
  return (x as Person).age !== undefined;
}

function print(value: Person | Product) {
  if (isPerson(value)) {
    console.log(value.age);
  } else {
    console.log(value.name);
  }
}

// ==========================================

interface Person {
  age: number;
}
interface Product {
  name: string;
}

function print(value: Person | Product) {
  if ("age" in value) {
    // 속성 존재 여부를 검사하는 in 기능을 이용하여 타입가드 이용 가능
    console.log(value.age);
  } else {
    console.log(value.name);
  }
}
```
