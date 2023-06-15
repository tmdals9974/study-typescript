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
