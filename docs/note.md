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
